# Portfolio CAG (Ollama, walang LangChain)

Phase 2 ng RAG/CAG learning ni Carl - Cache-Augmented Generation gamit
ang Ollama Python library nang direkta.

## Bakit CAG dito

Static/hindi madalas magbago ang portfolio content, kaya bagay ito sa
CAG: buong knowledge ipinapasok sa system prompt (walang chunking, walang
vector database, walang retrieval step).

## Setup

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env

Siguraduhin naka-run si Ollama (`ollama serve` kung kailangan).

## Paano patakbuhin

# CLI testing muna
python cag.py

# FastAPI server (para ikonekta sa React frontend)
uvicorn main:app --reload --port 8000

## File structure

portfolio-cag-ollama/
├── data/
│   └── portfolio.json    <- ang buong "preloaded knowledge"
├── config.py               <- naglo-load ng JSON, gumagawa ng system prompt
├── cag.py                   <- core logic: system prompt + tanong -> Ollama
├── main.py                   <- FastAPI wrapper (parehong shape ng RAG version)
├── requirements.txt
├── .env.example
└── .gitignore
