from functools import lru_cache
from langchain_core.vectorstores import VectorStore
from app.core.settings import Settings
from fastapi import Request, Depends
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from typing import Annotated

@lru_cache
def get_settings() -> Settings:
    return Settings()

def get_vectorstore(request: Request) -> PineconeVectorStore:
    return request.app.state.vectorstore

def get_embeddings(request: Request) -> OpenAIEmbeddings:
    return request.app.state.embeddings

Embeddings_Dep = Annotated[
    OpenAIEmbeddings,
    Depends(get_embeddings),
]

VectorStore_Dep = Annotated[
    VectorStore,
    Depends(get_vectorstore),
]