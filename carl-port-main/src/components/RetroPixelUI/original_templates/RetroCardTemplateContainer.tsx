// components/RetroCardContainer.tsx
import { useState } from 'react';
import RetroCardTemplate from './RetroCardTemplate';
import type { RetroCardData, ViewMode } from '../../../types/shared-types';
import { initialCards } from '../../../data/retroCards';

const RetroCardTemplateContainer = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
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
    <div className="min-h-screen bg-[#1a1a2e] text-white p-5 relative font-['Press_Start_2P']"
      style={{
        backgroundImage: `
          linear-gradient(rgba(26,26,46,0.9), rgba(26,26,46,0.9)),
          repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
          repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)
        `
      }}
    >
      {/* Scanline Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-999 opacity-30"
        style={{
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.05) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* CRT Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-998"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)'
        }}
      />

      <div className="relative z-10 w-full mx-auto max-w-170">
        {/* Header */}
        <header className="py-4 mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl tracking-wider text-[#92f29c] mb-2.5 animate-pulse"
            style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.6)' }}>
            PIXEL LEGENDS
          </h1>
          <p className="text-xs text-[#4ecdc4] mb-4">
            RETRO GAMING HALL OF FAME
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-5">
          <button
            className={`
              border-2 px-4 py-2 text-[10px] transition-all duration-200
              hover:-translate-y-0.5
              ${viewMode === 'grid'
                ? 'bg-[#4ecdc4] text-[#1a1a2e] border-[#4ecdc4]'
                : 'bg-[#1a1a2e] text-white border-[#4ecdc4]'
              }
            `}
            onClick={() => setViewMode('grid')}
          >
            GRID VIEW
          </button>
          <button
            className={`
              border-2 px-4 py-2 text-[10px] transition-all duration-200
              hover:-translate-y-0.5
              ${viewMode === 'list'
                ? 'bg-[#4ecdc4] text-[#1a1a2e] border-[#4ecdc4]'
                : 'bg-[#1a1a2e] text-white border-[#4ecdc4]'
              }
            `}
            onClick={() => setViewMode('list')}
          >
            LIST VIEW
          </button>
        </div>

        {/* Cards Grid */}
        <div className={`
          grid gap-6 mb-8
          ${viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
          }
        `}>
          {cards.map(card => (
            <RetroCardTemplate key={card.id} data={card} viewMode={viewMode} />
          ))}
        </div>

        {/* Randomize Button */}
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

        {/* Footer */}
        <footer className="mt-8 text-[8px] text-white/50 text-center">
          © 2023 PIXEL LEGENDS • PRESS START TO PLAY
        </footer>
      </div>
    </div>
  );
};

export default RetroCardTemplateContainer;