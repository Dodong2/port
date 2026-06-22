import os
import subprocess
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predict import predict, load_model
from learner import save_pattern, get_learned_count

RETRAIN_THRESHOLD = 20
_learned_since_retrain = 0

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading model...")
    load_model()
    print(f"Learned patterns in DB: {get_learned_count()}")
    print("Bot ready!")
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    tag: str
    score: float
    lang: str

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    global _learned_since_retrain

    message = req.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    result = predict(message)

    if result["tag"] != "unknown":
        save_pattern(message, result["tag"])
        _learned_since_retrain += 1

        if _learned_since_retrain >= RETRAIN_THRESHOLD:
            print(f"Auto-retraining after {RETRAIN_THRESHOLD} new patterns...")
            _retrain()
            _learned_since_retrain = 0

    return result

def _retrain():
    # ✅ Fix 1 — python3 hindi python (para sa Linux/Render)
    subprocess.Popen(["python3", "train.py"])

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "learned_count": get_learned_count()
    }

@app.get("/stats")
async def stats():
    return {
        "learned_patterns": get_learned_count(),
        "learned_since_last_retrain": _learned_since_retrain,
        "retrain_threshold": RETRAIN_THRESHOLD
    }

# ✅ Fix 2 — $PORT para sa Render
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)