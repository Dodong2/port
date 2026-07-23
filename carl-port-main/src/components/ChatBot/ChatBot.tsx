import { useChatBot } from "../../hooks/useChatBot";
import { useChatScroll } from "../../hooks/useChatScroll";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatBot() {
  const { messages, input, setInput, loading, sendMessage } = useChatBot();
  const bottomRef = useChatScroll(messages);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes pixelBlink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `}</style>

      <div
        className="
          relative bg-[#1a1a2e] border-4 border-white rounded-sm overflow-hidden
          shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
          flex flex-col
          w-full max-w-[1300px] min-h-screen
          font-['Press_Start_2P']
        "
      >
        {/* Pixel Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[2] opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
              repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)
            `,
          }}
        />

        <ChatHeader loading={loading} />

        <ChatMessages messages={messages} loading={loading} bottomRef={bottomRef} />

        <ChatInput
          input={input}
          loading={loading}
          onChange={setInput}
          onSend={sendMessage}
        />
      </div>
    </>
  );
}