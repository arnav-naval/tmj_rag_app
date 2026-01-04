from functools import lru_cache
from app.core.settings import Settings
from fastapi import Request
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

@lru_cache
def get_settings() -> Settings:
    return Settings()

def get_vectorstore(request: Request) -> PineconeVectorStore:
    return request.app.state.vectorstore

def get_embeddings(request: Request) -> OpenAIEmbeddings:
    return request.app.state.embeddings