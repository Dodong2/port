from pathlib import Path

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import MarkdownTextSplitter
from langchain_chroma import Chroma

from config import get_embeddings, CHROMA_PERSIST_DIR, COLLECTION_NAME

DATA_DIR = Path(__file__).parent / "data"


def load_documents():
    """Basahin lahat ng .md files sa data/ folder."""
    documents = []
    for md_file in DATA_DIR.glob("*.md"):
        loader = TextLoader(str(md_file), encoding="utf-8")
        documents.extend(loader.load())
    return documents


def chunk_documents(documents):
    splitter = MarkdownTextSplitter(chunk_size=500, chunk_overlap=50)
    return splitter.split_documents(documents)


def main():
    print("Naglo-load ng documents...")
    documents = load_documents()
    print(f"  -> {len(documents)} file(s) na-load")

    print("Nagha-chunk ng content...")
    chunks = chunk_documents(documents)
    print(f"  -> {len(chunks)} chunks nabuo")

    print("Gumagawa ng embeddings at sina-save sa ChromaDB...")
    print("  (unang beses lang ito magtatagal, magda-download ng embedding model)")
    embeddings = get_embeddings()

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory=CHROMA_PERSIST_DIR,
    )

    print(f"\nTapos na! {len(chunks)} chunks naka-store sa '{CHROMA_PERSIST_DIR}'")
    print("Patakbuhin mo na ngayon: python query.py")


if __name__ == "__main__":
    main()