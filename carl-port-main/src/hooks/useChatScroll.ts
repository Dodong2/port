import { useRef, useEffect } from "react";
import type { ChatMessage } from "../types/shared-types";

/**
 * Scrolls to bottom ONLY when a new message is appended.
 * Does NOT scroll on loading state changes, preventing the
 * "auto-scroll on send, user has to scroll back up" bug.
 */
export function useChatScroll(messages: ChatMessage[]) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const prevLengthRef = useRef(messages.length);

  useEffect(() => {
    const newMessage = messages.length > prevLengthRef.current;
    prevLengthRef.current = messages.length;

    if (newMessage) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return bottomRef;
}