import pickle
import re
import nltk
from nltk.stem import SnowballStemmer

MODEL_PATH = "model/model.pkl"

stemmer = SnowballStemmer("english")

# I-load ang model once sa memory
_model_cache = None

TL_MARKERS = {
    "ano", "sino", "nung", "mga", "niya", "ko", "ka", "mo", "ba", "po",
    "oo", "hindi", "yung", "ng", "sa", "na", "at", "ay", "ang", "kung",
    "para", "lang", "kasi", "dito", "diyan", "siya", "namin", "natin",
    "ito", "iyan", "iyon", "wala", "meron", "pwede", "gusto", "alam",
    # Dagdag na common Tagalog greetings/words
    "kamusta", "musta", "kumusta", "magandang", "umaga", "hapon",
    "gabi", "salamat", "paalam", "opo", "hoy", "oy", "pre", "pare",
    "anong", "sinong", "nasaan", "bakit", "paano", "kailan", "sino",
    "naman", "talaga", "ganon", "ganun", "yun", "dun", "dito", "jan"
}

def load_model() -> dict:
    global _model_cache
    if _model_cache is None:
        with open(MODEL_PATH, "rb") as f:
            _model_cache = pickle.load(f)
    return _model_cache

def clean_text(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s]", "", text)
    tokens = nltk.word_tokenize(text)
    return " ".join(stemmer.stem(t) for t in tokens)

def detect_lang(text: str) -> str:
    words = set(text.lower().split())
    tl_count = len(words & TL_MARKERS)
    return "tl" if tl_count >= 1 else "en"

def predict(message: str) -> dict:
    model_data = load_model()
    pipeline = model_data["pipeline"]
    responses = model_data["responses"]

    lang = detect_lang(message)
    cleaned = clean_text(message)

    # Get prediction + confidence score
    tag = pipeline.predict([cleaned])[0]
    proba = pipeline.predict_proba([cleaned])[0]
    score = max(proba)

    THRESHOLD = 0.45  # mas mababa kasi Naive Bayes ang scorer

    if score >= THRESHOLD and tag in responses:
        reply = responses[tag][lang]
        return {"tag": tag, "reply": reply, "score": round(float(score), 4), "lang": lang}

    # Fallback
    fallbacks = {
        "en": [
            "Hmm, I'm not sure about that! But I can tell you a lot about Carl's skills, projects, or experience.",
            "Good question, but that's a bit outside what I know 😅 Ask me about Carl's tech stack or projects!",
            "That's outside my expertise! I specialize in Carl's portfolio. Try asking about his work or skills!",
        ],
        "tl": [
            "Ay, hindi ko alam yan! Portfolio bot lang ako ni Carl 😅 Tanungin mo ako tungkol sa kanyang projects o skills!",
            "Hmm, wala ako sa topic diyan! Pero kung gusto mong malaman ang tungkol kay Carl — nandito ako!",
            "Out of my scope yan! Pero kung may tanong ka tungkol kay Carl, heto ako para sagutin!",
        ],
    }

    import random
    return {
        "tag": "unknown",
        "reply": random.choice(fallbacks[lang]),
        "score": round(float(score), 4),
        "lang": lang
    }