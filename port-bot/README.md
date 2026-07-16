# Portfolio RAG - Production (Supabase + Groq)

Final na deployment-ready na bersyon: RAG bilang core (dahil mas accurate,
napatunayan na sa testing), Supabase para sa vector storage (libre,
sapat sa laki ng portfolio mo kahit lumaki pa sa hinaharap), Groq para
sa generation (mabilis, walang server na kailangan i-host, walang
Ollama/laptop dependency).

## Bakit ganito ang setup

- Lumalaki ang portfolio.json mo sa paglipas ng panahon (bagong
  projects, bagong skills) - RAG ang bagay dito, hindi CAG, dahil
  hindi ito lalabas sa context window kahit lumaki pa.
- Walang self-hosted na LLM - si Groq ang bahala, kaya wala nang
  "matagal mag-reload" o "mag-restart ang server" na concern.
- May simpleng cache layer (exact-match na tanong) para sa mas
  mabilis na sagot sa paulit-ulit na tanong, kahit stateless si Groq.

## Setup

### 1. Gumawa ng Supabase project
   - Pumunta sa https://supabase.com, gumawa ng bagong project (libre)
   - Buksan ang SQL Editor, i-paste at patakbuhin ang laman ng
     `supabase_setup.sql`
   - Kunin ang Project URL at anon/public API key sa
     Project Settings > API

### 2. Kumuha ng Groq API key
   - https://console.groq.com/keys

### 3. Python environment

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

I-lagay ang totoong Supabase URL/key at Groq API key sa `.env`.

## Paano patakbuhin

```
# Ingestion - isang beses lang (o kada may binago sa portfolio.json)
python ingest.py

# CLI testing
python query.py

# FastAPI server (para ikonekta sa React frontend)
uvicorn main:app --reload --port 8000
```

## File structure

```
portfolio-rag-deploy/
├── data/
│   └── portfolio.json      <- lumalaking dataset, i-edit kapag may bago
├── supabase_setup.sql        <- ipaste sa Supabase SQL Editor, isang beses lang
├── config.py                  <- env vars, Supabase/Groq clients, embedding model
├── ingest.py                   <- JSON -> chunks -> embeddings -> Supabase
├── query.py                     <- cache check -> retrieval -> Groq generation
├── main.py                       <- FastAPI wrapper
├── requirements.txt
├── .env.example
└── .gitignore
```
