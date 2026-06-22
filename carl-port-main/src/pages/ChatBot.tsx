import BotFire from '../assets/images/botfire.png'
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "bot"; text: string; time: string };

const BOT_URL = "http://localhost:8000/chat";

function getTime() {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

function TypingDots() {
  return (
    <div className="flex gap-1.5 items-center py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-1.5 h-1.5 bg-[#4ecdc4]"
          style={{ animation: `pixelBlink 1.2s ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hey! I'm Carl's portfolio assistant. Ask me anything about his skills, projects, or experience!",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [clock, setClock] = useState(getTime());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const id = setInterval(() => setClock(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((prev) => [...prev, { role: "user", text, time: getTime() }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(BOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply, time: getTime() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, hindi ako makonekta ngayon. Try again!",
          time: getTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      

      <div
        className="
          relative bg-[#1a1a2e] border-4 border-white rounded-sm overflow-hidden
          shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
          flex flex-col
          w-full max-w-[1300px] min-h-screen
        "
      >
        {/* Pixel Grid Overlay — same as RetroCard */}
        <div
          className="absolute inset-0 pointer-events-none z-[2] opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
              repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)
            `,
          }}
        />

        {/* Header */}
        <div className="relative z-[3] flex items-center justify-between border-b-4 border-white px-3 py-2 bg-[#1a1a2e]">
          <div className="flex items-center gap-2">
            <span className="text-[#4ecdc4] text-[20px] leading-none">
              CARL'S ASSISTANT
            </span>
          </div>
          {/* Badge — same style as RetroCard cardTitle badge */}
          <div className="bg-[#e9ff6b] text-[#1a1a2e] text-[7px] px-1.5 py-0.5">
            {loading ? "THINKING..." : "ONLINE"}
          </div>
        </div>

        {/* Status bar */}
        <div className="relative z-[3] flex justify-between items-center bg-black/40 border-b border-white/20 px-3 py-1">
          <span className="text-[#92f29c] text-[5px]">SYS:OK &nbsp; v1.0</span>
          <span className="text-white/40 text-[5px]">{clock}</span>
        </div>

        {/* Messages */}
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
                  {/* Bubble — uses same border/bg language as RetroCard program items */}
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
                    className={`text-[10px] tracking-wider ${
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

        {/* Input */}
        <div className="relative z-[3] border-t-4 border-white bg-black/40 px-3 py-2.5 flex gap-2">
          <input
            className="
              flex-1 bg-black/60 border-2 border-white/30
              text-[#4ecdc4] placeholder-white/20
              font-['Press_Start_2P'] text-[6px] tracking-wide
              px-2.5 py-2 outline-none
              focus:border-[#4ecdc4]/70
              transition-colors
            "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about Carl's skills..."
            maxLength={200}
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
            onClick={sendMessage}
            disabled={loading}
          >
            SEND
          </button>
        </div>
      </div>
    </>
  );
}