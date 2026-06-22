import json
import sqlite3
import pickle
import os
import re
import nltk
from nltk.stem import SnowballStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.pipeline import Pipeline


nltk.download("punkt_tab", quiet=True)
nltk.download("stopwords", quiet=True)

CORPUS_PATH = "corpus/portfolio.json"
DB_PATH = "db/learned.db"
MODEL_PATH = "model/model.pkl"

stemmer = SnowballStemmer("english")

def clean_text(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s]", "", text)
    tokens = nltk.word_tokenize(text)
    return " ".join(stemmer.stem(t) for t in tokens)

def load_corpus() -> tuple[list[str], list[str], dict]:
    with open(CORPUS_PATH, "r") as f:
        data = json.load(f)

    patterns, tags, responses = [], [], {}

    for intent in data["intents"]:          # ← 4 spaces
        tag = intent["tag"]                 # ← 8 spaces
        responses[tag] = intent["responses"] # ← 8 spaces

        for lang in ("en", "tl"):           # ← 8 spaces
            for pattern in intent["patterns"][lang]:  # ← 12 spaces
                patterns.append(clean_text(pattern))  # ← 16 spaces
                tags.append(tag)                      # ← 16 spaces

    return patterns, tags, responses        # ← 4 spaces

def load_learn() -> tuple[list[str], list[str]]:
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
    conn.commit()

    cursor = conn.execute("SELECT pattern, tag FROM learned")
    rows = cursor.fetchall()
    conn.close()

    if not rows:
        return [], []

    patterns = [clean_text(r[0]) for r in rows]
    tags = [r[1] for r in rows]
    return patterns, tags

def train():
    os.makedirs("model", exist_ok=True)

    # Load seed data
    patterns, tags, responses = load_corpus()

    # Load learned data from SQLite
    learned_patterns, learned_tags = load_learn()
     
    if learned_patterns:
        print(f"Adding {len(learned_patterns)} learned patterns...")
        patterns.extend(learned_patterns)
        tags.extend(learned_tags)

    print(f"Training on {len(patterns)} total patterns...")

    # Build pipeline: TF-IDF + Naive Bayes
    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer(
            ngram_range=(1,2),
            max_features=5000,
            sublinear_tf=True
        )),
        ("clf", CalibratedClassifierCV(LinearSVC(
            C=1.0,
            max_iter=2000
        )))
    ])

    pipeline.fit(patterns, tags)

    # Save model + responses
    with open(MODEL_PATH, "wb") as f:
        pickle.dump({"pipeline": pipeline, "responses": responses}, f)

    print(f"Model trained and saved to {MODEL_PATH}")
    print(f"   Intents: {len(set(tags))}")
    print(f"   Patterns: {len(patterns)}")

if __name__=="__main__":
    train()