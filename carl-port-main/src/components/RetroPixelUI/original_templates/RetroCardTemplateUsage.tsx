import { useState } from "react";
import RetroCardTemplate from "./RetroCardTemplate";
import { initialCards } from "../../../data/retroCards";
import type { ViewMode, RetroCardData } from "../../../types/shared-types";

const RetroCardTemplateUsage = () => {
    const [viewMode] = useState<ViewMode>('grid');
    const [cards, setCards] = useState<RetroCardData[]>(initialCards);

    const randomizeStats = () => {
        setCards(cards.map(card => ({
            ...card,
            stats: card.stats.map(stat => ({
                ...stat,
                value: Math.floor(Math.random() * 51) + 50
            }))
        })));
    };

    return (
        <>
            <div className={`grid gap-6 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
                {cards.map(card => (
                    <RetroCardTemplate key={card.id} data={card} viewMode={viewMode} />
                ))}
            </div>

            <button
                className="
            block mx-auto bg-[#ff6b6b] text-[#1a1a2e] border-none 
            px-5 py-2.5 text-sm cursor-pointer transition-all duration-200
            shadow-[4px_4px_0px_rgba(0,0,0,0.5)]
            hover:shadow-[6px_6px_0px_rgba(0,0,0,0.5)]
            hover:-translate-x-0.5 hover:-translate-y-0.5
            active:shadow-[2px_2px_0px_rgba(0,0,0,0.5)]
            active:translate-x-0.5 active:translate-y-0.5
          "
                onClick={randomizeStats}
            >
                RANDOMIZE STATS
            </button>
        </>
    )
}

export default RetroCardTemplateUsage