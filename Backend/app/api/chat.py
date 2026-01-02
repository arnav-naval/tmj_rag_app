from fastapi import APIRouter

router = APIRouter()

@router.post("")
async def chat(message: str):
    return {"message": "Hello World"}