import { useState } from "react";
import { BotData } from "../data/BotData";
/* pages */
import ChatBot from "./ChatBot";

const BotPage = () => {
    const [openBot, setOpenBot] = useState(false)
    
          const ShowBot = () => {
            setOpenBot(prev => !prev)
          }

      const pixelCircleClip = `polygon(
        0% 30%, 15% 30%, 15% 15%, 30% 15%, 30% 0%,
        70% 0%, 70% 15%, 85% 15%, 85% 30%, 100% 30%,
        100% 70%, 85% 70%, 85% 85%, 70% 85%, 70% 100%,
        30% 100%, 30% 85%, 15% 85%, 15% 70%, 0% 70%
      )`;
  return (
    <section className="relative">
        <div>
        {BotData.map((bot) => (
          <div className="relative bg-red">
            <div onClick={ShowBot} className=" bg-black/30 w-30 h-30 " style={{
              clipPath: pixelCircleClip, backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)
          ` }}>
              <img
                src={bot.botImg}
                alt="Fire bot"
                loading="lazy"
                decoding="async"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-center align-center">
        {openBot && (
          <ChatBot />
        )}
        </div>

      </div>
    </section>
  )
}

export default BotPage