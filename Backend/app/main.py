from fastapi import FastAPI
from app.api import chat
from app.core.deps import get_settings
from app.core.lifespan import lifespan

app = FastAPI(lifespan=lifespan)


app.include_router(chat.router, prefix="/chat")