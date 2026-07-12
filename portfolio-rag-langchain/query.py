from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate

from config import get_embeddings, get_llm, CHROMA_PERSIST_DIR, COLLECTION_NAME, LLM_PROVIDER

# Prompt template - dito natin sinasabi sa LLM kung paano gamitin yung
# context na nakuha natin sa retrieval, at ano ang gagawin kung wala
# talagang related na info (para di sya mag-imbento/"mag-hallucinate")
PROMPT_TEMPLATE = """Ikaw ay chatbot ni Carl, isang portfolio assistant. Sagutin mo
ang tanong ng user GAMIT LANG ang context na nasa baba. Kung wala kang
mahanap na sagot sa context, sabihin mo lang nang diretso na wala kang
info tungkol dun - huwag kang mag-imbento ng sagot.
 
Sumagot ka sa parehong wika ng tanong (Filipino/Taglish kung Taglish,
English kung English).
 
Context:
{context}
 
Tanong: {question}
 
Sagot:"""

def get_retriever():
    embeddings = get_embeddings()
    vectorstore = Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
        persist_directory=CHROMA_PERSIST_DIR,
    )
    # k=3: kunin yung top 3 pinaka-related chunks
    return vectorstore.as_retriever(search_kwargs={"k": 3})

def answer_question(question: str, retriever, llm) -> str:
    # Step 1 & 2: retrieval
    relevant_chunks = retriever.invoke(question)
    context = "\n\n".join(doc.page_content for doc in relevant_chunks)

    # Step 3 & 4: augmented generation
    prompt = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    chain = prompt | llm

    response = chain.invoke({"context": context, "question": question})
    return response.content

def main():
    print(f"Gamit na LLM provider: {LLM_PROVIDER}")
    print("Ina-load ang retriever at LLM...")
    retriever = get_retriever()
    llm = get_llm()
    
    print("\nRAG chatbot ready! (i-type 'exit' para umalis)\n")
    
    while True:
        question = input("Tanong: ").strip()
        if question.lower() in ("exit", "quit"):
            break
        if not question:
            continue
        
        answer = answer_question(question, retriever, llm)
        print(f"\nSagot: {answer}\n")
        
        
if __name__ == "__main__":
    main()
