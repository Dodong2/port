import os

from dotenv import load_dotenv

load_dotenv()

os.environ["HF_HUB_OFFLINE"] = "1"
os.environ["TRANSFORMERS_OFFLINE"] = "1"

from supabase import create_client
from groq import Groq
from fastembed import TextEmbedding

# --- Supabase ---
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError(
        "SUPABASE_URL or SUPABASE_KEY is missing from your .env file. "
        "You can find these values in Supabase Dashboard > Project Settings > API."
    )

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- Groq ---
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

if not GROQ_API_KEY:
    raise ValueError(
        "GROQ_API_KEY is missing from your .env file. "
        "Get your API key from https://console.groq.com/keys"
    )

groq_client = Groq(api_key=GROQ_API_KEY)

EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
_embedding_model = TextEmbedding(embed_name=EMBEDDING_MODEL_NAME)

def embed_text(text: str) -> list[float]:
    return list(_embedding_model.embed([text])[0].tolist())

TOP_K = int(os.getenv("TOP_K", "3"))