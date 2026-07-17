"""
CONFIG MODULE
=============
Dito naka-set up ang tatlong "kliyente" na gagamitin natin:

1. Supabase client  - para sa pag-imbak/paghahanap ng embeddings
                       (kapalit ng ChromaDB natin dati)
2. Groq client       - para sa generation (kapalit ng Ollama -
                       walang server na kailangan i-host)
3. Embedding model   - para i-convert ang text into numbers
                       (sentence-transformers, parehong ginamit
                       natin dati sa RAG)
"""

import os

from dotenv import load_dotenv

load_dotenv()

# NOTE: Dati may HF_HUB_OFFLINE/TRANSFORMERS_OFFLINE dito para sa
# MABAGAL na internet sa lokal na machine. TINANGGAL ito dahil sa
# Render (at karamihan ng cloud platforms), magkaiba ang build
# container at runtime container - hindi nag-persist ang na-download
# habang build papuntang runtime, kaya kailangang payagan ang
# pag-download ULIT sa unang startup (mabilis naman ang internet
# nila, ilang segundo lang).

from supabase import create_client
from groq import Groq
from fastembed import TextEmbedding

# --- Supabase ---
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError(
        "Kulang ang SUPABASE_URL o SUPABASE_KEY sa .env file mo. "
        "Kunin mo 'to sa Supabase Dashboard > Project Settings > API."
    )

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- Groq ---
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

if not GROQ_API_KEY:
    raise ValueError(
        "SUPABASE_URL or SUPABASE_KEY is missing from your .env file. "
        "You can find these values in Supabase Dashboard > Project Settings > API."
    )

groq_client = Groq(api_key=GROQ_API_KEY)

# --- Embedding model ---
# Isang beses lang ito lo-load-in, dito na natin gagamitin sa
# ingest.py AT sa retrieval.py, para consistent ang model na
# ginagamit sa dalawang parte.
#
# Gamit natin ang fastembed (ONNX Runtime) sa halip na
# sentence-transformers (PyTorch) - PAREHONG model
# (all-MiniLM-L6-v2), PAREHONG accuracy, pero MAS MAGAAN sa RAM -
# importante ito dahil 512MB lang ang limit ng Render free tier.
EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
_embedding_model = TextEmbedding(model_name=EMBEDDING_MODEL_NAME)


def embed_text(text: str) -> list[float]:
    """Ginagawang listahan ng numbers (embedding vector) ang text."""
    return list(_embedding_model.embed([text]))[0].tolist()

TOP_K = int(os.getenv("TOP_K", "3"))