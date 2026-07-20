import json
from pathlib import Path

from config import supabase, embedding_model

DATA_PATH = Path(__file__).parent / "data" / "portfolio.json"

def build_chunks() -> list[str]:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    chunks = []
    
    chunks.append(f"About Carl: {data['about']}")
    chunks.append(f"How the portfolio site works: {data['site_behavior']}")
    chunks.append(
        f"Contact info: GitHub - {data['contact']['github']}, "
        f"Portfolio - {data['contact']['portfolio_url']}. "
        f"{data['contact']['note']}"
    )
    
    
    for group in data["skills"]:
        items =", ".join(
            f"{item['name']} ({item['proficiency']}%)" for item in group["items"]
        )
        chunks.append(f"Carl's {group['category']} skills: {items}")
        
    for p in data["projects"]:
        chunks.append(
            f"Project: {p['title']} ({p['year']}). {p['description']} "
            f"Tools used: {', '.join(p['tools_used'])}"
        )
        
    for w in data["past_work"]:
        chunks.append(f"Past work - {w['title']}: {w['description']}")
        
    return chunks

def main():
    print("Creating chunks from portfolio.json...")
    chunks = build_chunks()
    print(f" -> {len(chunks)} chunks created.")
    
    print("Clearing existing data from the 'documents' table in Supabase...")
    # need itong step para hindi tayo magkaroon ng duplicate/outdated
    # chunks, Since paulit-ulit natin nira-run
    supabase.table("documents").delete().neq("id", 0).execute()
    
    print("Generating embeddings and uploading them to Supabase...")
    for chunk in chunks:
        vector = embedding_model.encode(chunk).tolist()
        supabase.table("documents").insert(
            {"content": chunk, "embedding": vector}
        ).execute()
    
    print(f"\nDone! {len(chunks)} chunks have been uploaded to Supabase.")
    print("You can now run: python query.py")

if __name__ == "__main__":
    main()