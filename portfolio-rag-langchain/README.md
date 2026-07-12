# Portfolio RAG (LangChain version)

Phase 1 ng RAG learning ni Carl - LangChain-based implementation, madaling
i-deploy, madaling i-switch mula local Ollama papuntang Groq.

## Setup

```bash
cd portfolio-rag-langchain
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Siguraduhin running si Ollama sa background (`ollama serve` kung hindi pa
auto-running) at nasa `.env` mo ang `LLM_PROVIDER=ollama`.

## Paano patakbuhin

```bash
# 1. Ingestion - isang beses lang (o kada may bagong content sa data/)
python ingest.py

# 2. Query - interactive CLI para testing
python query.py
```

## File structure

```
portfolio-rag-langchain/
├── data/
│   └── portfolio.md      <- PALITAN mo ng totoong info mo
├── config.py              <- LLM provider switch (ollama/groq) + embeddings
├── ingest.py               <- Load -> chunk -> embed -> save sa ChromaDB
├── query.py                <- Retrieve -> augment -> generate (CLI test)
├── requirements.txt
├── .env.example
└── chroma_db/              <- auto-generated, dito naka-save yung vectors
```

## Susunod na steps

1. Palitan yung `data/portfolio.md` ng totoong content mo (o dagdagan ng
   ibang .md files - automatic na babasahin lahat ng `ingest.py`)
2. Patakbuhin `ingest.py` ulit kapag may binago sa content
3. Kapag okay na yung sagot sa `query.py`, gagawa tayo ng FastAPI endpoint
   para dito (Phase 1.5) tapos ikonekta sa React frontend
4. Sa Phase 2, tatalakayin natin yung deployment options (kasama yung
   Groq switch kung saan applicable)
