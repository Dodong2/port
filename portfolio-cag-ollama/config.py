import json
import os
from pathlib import Path


from dotenv import load_dotenv

load_dotenv()

DATA_PATH = Path(__file__).parent / "data" / "portfolio.json"

OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma2:2b")
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")

KEEP_ALIVE = os.getenv("OLLAMA_ALIVE", "30m")

def load_portfolio_data() -> dict:
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
    
def build_system_prompt() -> str:
    data = load_portfolio_data()

    lines = []
    lines.append("Ikaw ay ang portfolio assistant ni Carl. Sagutin mo ang")
    lines.append("mga tanong ng user GAMIT LANG ang impormasyon sa ibaba.")
    lines.append("Kung wala kang mahanap na sagot dito, sabihin mo nang")
    lines.append("diretso na wala kang info tungkol dun - huwag kang")
    lines.append("mag-imbento ng sagot. Sumagot sa parehong wika ng tanong")
    lines.append("(Filipino/Taglish kung Taglish, English kung English).")
    lines.append("")
    lines.append("=== TUNGKOL KAY CARL ===")
    lines.append(data["about"])
    lines.append("")
    lines.append("=== PAANO GAMITIN ANG PORTFOLIO SITE ===")
    lines.append(data["site_behavior"])
    lines.append("")
    lines.append("=== CONTACT ===")
    lines.append(f"GitHub: {data['contact']['github']}")
    lines.append(f"Portfolio: {data['contact']['portfolio_url']}")
    lines.append("")
    lines.append("=== SKILLS ===")
    for group in data["skills"]:
        lines.append(f"\n{group['category']}:")
        for item in group["items"]:
            lines.append(f"  - {item['name']}: {item['proficiency']}%")
    lines.append("")
    lines.append("=== PROJECTS ===")
    for p in data["projects"]:
        lines.append(f"\n{p['title']} ({p['year']})")
        lines.append(p["description"])
        lines.append(f"Tools used: {', '.join(p['tools_used'])}")
    lines.append("")
    lines.append("=== PAST WORK ===")
    for w in data["past_work"]:
        lines.append(f"\n{w['title']}")
        lines.append(w["description"])
        
    return "\n".join(lines)