import sqlite3
import os

DB_PATH = "db/learned.db"

def save_pattern(pattern: str, tag: str):
    """I-save ang bagong pattern na natutunan ng bot."""
    os.makedirs("db", exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS learned (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pattern TEXT NOT NULL,
            tag TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Huwag mag-duplicate
    existing = conn.execute(
        "SELECT id FROM learned WHERE pattern = ?",
        (pattern.lower().strip(),)
    ).fetchone()

    if not existing:
        conn.execute(
            "INSERT INTO learned (pattern, tag) VALUES (?, ?)",
            (pattern.lower().strip(), tag)
        )
        conn.commit()
        print(f"Learned: '{pattern}' → {tag}")

    conn.close()

def get_learned_count() -> int:
    if not os.path.exists(DB_PATH):
        return 0
    conn = sqlite3.connect(DB_PATH)
    count = conn.execute("SELECT COUNT(*) FROM learned").fetchone()[0]
    conn.close()
    return count