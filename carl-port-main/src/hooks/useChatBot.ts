import { useState } from "react";
import type { ChatMessage } from "./../types/shared-types";

const BOT_URL = import.meta.env.VITE_BOT_URL ?? "";

function getTime() {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

function makeMessage(role: ChatMessage["role"], text: string): ChatMessage {
  return { role, text, time: getTime() };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  makeMessage(
    "bot",
    "Hey! I'm Carl's portfolio assistant. Ask me anything about his skills, projects, or experience!"
  ),
];

export function useChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function appendMessage(role: ChatMessage["role"], text: string) {
    setMessages((prev) => [...prev, makeMessage(role, text)]);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    appendMessage("user", text);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BOT_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      const data = await res.json();

      if (res.status === 429) {
        appendMessage(
          "bot",
          data.detail ?? "You've reached today's question limit. Try again tomorrow!"
        );
        return;
      }

      if (!res.ok) {
        appendMessage("bot", "Something went wrong. Please try again.");
        return;
      }

      appendMessage("bot", data.answer);
    } catch {
      appendMessage("bot", "Sorry, I can't connect right now. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  return { messages, input, setInput, loading, sendMessage };
}