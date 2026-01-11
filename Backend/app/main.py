from app.core.deps import get_settings
from fastapi import FastAPI
from app.api import chat
from app.core.deps import get_settings
from app.core.lifespan import lifespan
from fastapi.middleware.cors import CORSMiddleware
import os

settings = get_settings()

os.environ["LANGSMITH_API_KEY"] = settings.langsmith_api_key
os.environ["LANGSMITH_TRACING"] = settings.langsmith_tracing
os.environ["LANGSMITH_ENDPOINT"] = settings.langsmith_endpoint
os.environ["LANGSMITH_PROJECT"] = settings.langsmith_project

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/chat")