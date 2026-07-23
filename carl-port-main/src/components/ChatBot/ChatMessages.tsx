import BotFire from "../../assets/images/botfire.png";
import type { ChatMessage } from "../../types/shared-types";
import TypingDots from "./TypingDots";

interface ChatMessagesProps {
  messages: ChatMessage[];
  loading: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({ messages, loading, bottomRef }: ChatMessagesProps) {
  return (
    <div className="relative z-[3] flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
      {messages.map((msg, i) => {
        const isBot = msg.role === "bot";
        return (
          <div
            key={i}
            className={`flex items-end ${isBot ? "flex-row" : "flex-row-reverse"}`}
          >
            {isBot && (
              <img
                src={BotFire}
                alt="Bot"
                className="w-20 h-20 rounded-sm flex-shrink-0 self-end"
                style={{ imageRendering: "pixelated" }}
              />
            )}

            <div className={`flex flex-col gap-1 max-w-[72%] ${isBot ? "" : "items-end"}`}>
              <div
                className={`
                  relative px-2.5 py-2 text-[12px] leading-[1.9] tracking-wide
                  border-2 bg-black/20
                  ${isBot
                    ? "border-white/30 text-[#4ecdc4]"
                    : "border-[#e9ff6b]/60 text-[#e9ff6b]"
                  }
                `}
              >
                {msg.text}
              </div>

              <span
                className={`text-[10px] tracking-wider font-['Press_Start_2P'] ${
                  isBot ? "text-white/25" : "text-[#e9ff6b]/30"
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex gap-2 items-end">
          <img
            src={BotFire}
            alt="Bot"
            className="w-7 h-7 rounded-sm flex-shrink-0"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="border-2 border-white/30 bg-black/20 px-2.5 py-2">
            <TypingDots />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}