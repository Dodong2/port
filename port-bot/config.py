import os

from dotenv import load_dotenv

load_dotenv()

os.environ["HF_HUB_OFFLINE"] = "1"

from supabase import create_client
from groq import Groq
from sentence_transformers import SentenceTransformer

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

# --- Embedding model ---
# Isang beses lang ito lo-load-in, dito na natin gagamitin sa
# ingest.py AT sa retrieval.py, para consistent ang model na
# ginagamit sa dalawang parte.
EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

TOP_K = int(os.getenv("TOP_K", "3"))