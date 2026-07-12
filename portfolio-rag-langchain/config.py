import os
from dotenv import load_dotenv

load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama").lower()


EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

CHROMA_PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "portfolio_docs"


def get_embeddings():
    """Gumagawa ng embedding function - parehas ito, local o Groq man ang LLM."""
    from langchain_huggingface import HuggingFaceEmbeddings

    return HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL_NAME)


def get_llm():
    """Nagbabalik ng tamang LLM base sa LLM_PROVIDER sa .env file."""
    if LLM_PROVIDER == "groq":
        from langchain_groq import ChatGroq

        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError(
                "LLM_PROVIDER=groq pero walang GROQ_API_KEY sa .env file mo. "
                "Kumuha ka ng key sa https://console.groq.com/keys"
            )
        model = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
        return ChatGroq(model=model, api_key=api_key, temperature=0.3)

    elif LLM_PROVIDER == "ollama":
        from langchain_ollama import ChatOllama

        model = os.getenv("OLLAMA_MODEL", "gemma2:2b")
        return ChatOllama(model=model, temperature=0.3)

    else:
        raise ValueError(
            f"Hindi kilalang LLM_PROVIDER: '{LLM_PROVIDER}'. "
            "Gamitin 'ollama' o 'groq' sa .env file."
        )