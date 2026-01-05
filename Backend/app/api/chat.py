from fastapi import APIRouter, HTTPException
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from app.schemas.chat_schemas import ChatRequest, ChatResponse, ChatMessage
from app.core.deps import VectorStore_Dep, LLM_Dep
from langchain_core.prompts import ChatPromptTemplate

router = APIRouter()

#Prompt template
medical_template = ChatPromptTemplate.from_messages([
    ("system",
     "You are a medical information assistant specializing in TMJ disorders. "
     "Answer ONLY using the provided context. "
     "If the context does not contain enough information, say so clearly. "
     "Use precise medical terminology. "
     "This is for informational purposes only and does not replace professional medical advice."),
    ("human",
     "Context:\n{context}\n\nQuestion:\n{question}\n\nAnswer:")
])

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

format_docs_runnable = RunnableLambda(format_docs)

output_parser = StrOutputParser()


@router.post("", response_model=ChatResponse)
async def chat(body: ChatRequest, vectorstore: VectorStore_Dep, llm: LLM_Dep):
    """
    Stateless RAG chat endpoint for TMJ medical queries.
    """
    #Extract latest user message
    try:
        query = next(
            msg.content for msg in reversed(body.messages) if msg.role == "user"
        )
    except StopIteration:
        raise HTTPException(400, "No user message provided")

    #Build retriever
    retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 5},
    )

    #Build RAG chain
    rag_chain = (
        {
            "context": retriever | format_docs_runnable,
            "question": RunnablePassthrough(),
        }
        | medical_template
        | llm
        | output_parser
    )

    #Invoke chain
    query_answer = await rag_chain.ainvoke(query)

    #Build ChatResponse
    response = ChatResponse(
        answer = ChatMessage(
            role="bot",
            content=query_answer
        )
    )
    return response