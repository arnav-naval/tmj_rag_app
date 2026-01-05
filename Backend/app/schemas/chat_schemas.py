from pydantic import BaseModel
from typing import Literal, List

class ChatMessage(BaseModel):
    role: Literal["user", "bot"]
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    answer: ChatMessage
