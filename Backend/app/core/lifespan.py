from contextlib import asynccontextmanager
from fastapi import FastAPI
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings
from app.core.deps import get_settings
from langchain_openai import ChatOpenAI

@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()

    app.state.embeddings = OpenAIEmbeddings(
        model=settings.embedding_model,
        api_key=settings.openai_api_key,
    )

    app.state.vectorstore = PineconeVectorStore(
        pinecone_api_key=settings.pinecone_api_key,
        index_name=settings.pinecone_index_name,
        embedding=app.state.embeddings,
    )

    app.state.llm = ChatOpenAI(
        api_key=settings.openai_api_key,
        model="gpt-4o-mini",
        temperature=0.0,
        timeout=30,
        max_retries=2
    )

    yield
