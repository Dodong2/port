import os

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from query import answer_question
from config import GROQ_MODEL
from rate_limit import is_allowed

RATE_LIMIT_PER_DAY = int(os.getenv("RATE_LIMIT_PER_DAY", "4"))

app = FastAPI(title="Portfolio RAG Chatbot (Supabase + Groq")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://carl-port-bot.netlify.app"
    ],
    allow_methods=["POST"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=300)
    
class ChatResponse(BaseModel):
    answer: str
    remaining_today: int
    
@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, http_request: Request):
    
    client_ip = http_request.client.host
    
    allowed, remaining = is_allowed(client_ip, RATE_LIMIT_PER_DAY)
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail=(
                f"You have reached the daily limit of {RATE_LIMIT_PER_DAY} "
                "questions. Please try again tomorrow!"
            )
        )
    
    answer = answer_question(request.question)
    return ChatResponse(answer=answer, remaining_today=remaining)

@app.get("/health")
def health():
    return {"status": "ok", "model": GROQ_MODEL}