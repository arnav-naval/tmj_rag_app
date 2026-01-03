from functools import lru_cache
from fastapi import FastAPI
from api import chat
from .core.settings import Settings

app = FastAPI()

@lru_cache
def get_settings() -> Settings:
    return Settings()

app.include_router(chat.router, prefix="/chat")