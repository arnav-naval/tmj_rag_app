from contextlib import asynccontextmanager
from fastapi import FastAPI
from pinecone import Pinecone
from ..main import get_settings
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()

    app.state.pinecone = Pinecone(
        api_key=settings.pinecone_api_key,
    )

    app.state.embeddings = OpenAIEmbeddings(
        model=settings.embedding_model,
        api_key=settings.openai_api_key,
    )

    app.state.vectorstore = PineconeVectorStore(
        index_name=settings.pinecone_index_name,
        embedding=app.state.embeddings,
    )

    yield

    app.state.vectorstore.close()