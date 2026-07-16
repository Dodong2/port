import ollama

from config import OLLAMA_MODEL, OLLAMA_HOST, KEEP_ALIVE, build_system_prompt

SYSTEM_PROMPT = build_system_prompt()

_client = ollama.Client(host=OLLAMA_HOST)

def answer_question(question: str) -> str:
    response = _client.chat(
        model=OLLAMA_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": question}
        ],
        options={"temperature": 0.3},
        keep_alive=KEEP_ALIVE,
    )
    return response["message"]["content"]

if __name__ == "__main__":
    print(f"CAG chatbot ready! (model: {OLLAMA_MODEL})")
    print("(i-type 'exit' para umalis)\n")
    
    while True:
        question = input("Tanong: ").strip()
        if question.lower() in ("exit", "quit"):
            break
        if not question:
            continue
        
        answer = answer_question(question)
        print(f"\nAnswer: {answer}\n")