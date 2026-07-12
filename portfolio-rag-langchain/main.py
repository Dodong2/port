from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from query import get_retriever, answer_question
from config import get_llm, LLM_PROVIDER

resources = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"Ina-load ang retriever at LLM (provider: {LLM_PROVIDER})...")
    resources["retriever"] = get_retriever()
    resources["llm"] = get_llm()
    print("Ready na ang RAG server.")
    yield
    resources.clear()
    
    
app = FastAPI(title="Portfolio RAG Chatbot", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_methods=["POST"],
    allow_headers=["*"]
)

class ChatRequest(BaseModel):
    question: str
    
class ChatResponse(BaseModel):
    answer: str
    
@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    answer = answer_question(
        request.question,
        resources["retriever"],
        resources["llm"]
    )
    return ChatResponse(answer=answer)

@app.get("/health")
def health():
    return { status: "ok", "llm_provider": LLM_PROVIDER }