from fastapi import APIRouter, Depends
from app.core.deps import Embeddings_Dep, VectorStore_Dep
from langchain_pinecone import PineconeVectorStore

router = APIRouter()

@router.post("")
async def chat(message: str, vectorstore: VectorStore_Dep):
    docs = vectorstore.similarity_search(message, k=5)
    return docs