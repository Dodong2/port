import { useRef, useEffect } from "react";

interface ChatInputProps {
  input: string;
  loading: boolean;
  onChange: (val: string) => void;
  onSend: () => void;
}

export default function ChatInput({ input, loading, onChange, onSend }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize: reset to 1 row then grow to fit content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends, Shift+Enter inserts newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="relative z-[3] border-t-4 border-white bg-black/40 px-3 py-2.5 flex gap-2 items-end overflow-hidden">
      <textarea
        ref={textareaRef}
        className="
          flex-1 min-w-0 bg-black/60 border-2 border-white/30
          text-[#4ecdc4] placeholder-white/20
          font-['Press_Start_2P'] text-[6px] tracking-wide leading-relaxed
          px-2.5 py-2 outline-none resize-none overflow-hidden
          focus:border-[#4ecdc4]/70
          transition-colors
        "
        rows={1}
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Carl's skills..."
        maxLength={500}
        disabled={loading}
        autoComplete="off"
      />
      <button
        className="
          bg-[#e9ff6b] text-[#1a1a2e] border-2 border-black
          font-['Press_Start_2P'] text-[6px] tracking-wide
          px-3 py-2 flex-shrink-0 cursor-pointer
          shadow-[2px_2px_0px_#000]
          hover:bg-[#4ecdc4]
          active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
          disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed disabled:shadow-none
          transition-colors
        "
        onClick={onSend}
        disabled={loading}
      >
        SEND
      </button>
    </div>
  );
}