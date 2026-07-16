from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from cag import answer_question
from config import OLLAMA_MODEL

app = FastAPI(title="Portfolio CAG Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_methods=["POST"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str
    
class ChatResponse(BaseModel):
    answer: str
    
@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = answer_question(request.question)
    return ChatResponse(answer=answer)


@app.get("/heath")
def health():
    return {"status": "ok", "model": OLLAMA_MODEL}