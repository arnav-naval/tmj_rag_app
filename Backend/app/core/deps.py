from functools import lru_cache
from langchain_core.vectorstores import VectorStore
from app.core.settings import Settings
from fastapi import Request, Depends
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_pinecone import PineconeVectorStore
from typing import Annotated

@lru_cache
def get_settings() -> Settings:
    return Settings()

def get_vectorstore(request: Request) -> PineconeVectorStore:
    return request.app.state.vectorstore

def get_embeddings(request: Request) -> OpenAIEmbeddings:
    return request.app.state.embeddings

def get_llm(request: Request) -> ChatOpenAI:
    return request.app.state.llm

Embeddings_Dep = Annotated[
    OpenAIEmbeddings,
    Depends(get_embeddings),
]

VectorStore_Dep = Annotated[
    VectorStore,
    Depends(get_vectorstore),
]

LLM_Dep = Annotated[
    ChatOpenAI,
    Depends(get_llm),
]