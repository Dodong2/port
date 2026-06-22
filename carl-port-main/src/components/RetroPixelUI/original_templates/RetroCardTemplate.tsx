// components/RetroCard.tsx
import { useState } from 'react';
import type { RetroCardData } from '../../../types/shared-types';

interface RetroCardProps {
    data: RetroCardData;
    viewMode: 'grid' | 'list';
}

const RetroCardTemplate = ({ data, viewMode }: RetroCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`
        relative bg-[#1a1a2e] border-4 border-white rounded-sm overflow-hidden
        cursor-pointer transition-all duration-300 
        shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
        hover:shadow-[12px_12px_0px_rgba(0,0,0,0.4)]
        hover:-translate-y-2
        ${viewMode === 'list' ? 'w-full' : ''}
      `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Pixel Grid Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-2 opacity-30"
                style={{
                    backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)
          `
                }}
            />

            {/* Badge */}
            <div className="absolute top-1 right-1 bg-[#ff6b6b] text-[#1a1a2e] text-[8px] px-1.5 py-0.5 z-4 font-['Press_Start_2P']">
                {data.badge}
            </div>

            {/* Card Inner */}
            <div className={`
        p-4 flex z-1 relative
        ${viewMode === 'list'
                    ? 'flex-row items-center min-h-0'
                    : 'flex-col items-center min-h-50'
                }
      `}>
                <img
                    src={data.image}
                    className={`
            w-20 h-20 transition-transform duration-300
            ${isHovered ? 'animate-bounce' : ''}
            ${viewMode === 'list' ? 'mr-5' : 'my-2.5'}
          `}
                    style={{ imageRendering: 'pixelated' }}
                    alt={`${data.name} character`}
                />

                <div className={`
          flex flex-col
          ${viewMode === 'list' ? 'items-start' : 'items-center'}
        `}>
                    <h2 className={`
            text-xs my-2.5 text-[#ff6b6b] font-['Press_Start_2P']
            drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]
            ${viewMode === 'list' ? 'text-left' : 'text-center'}
          `}>
                        {data.name}
                    </h2>
                    <p className={`
            text-[8px] text-[#4ecdc4] mb-2.5 font-['Press_Start_2P']
            ${viewMode === 'list' ? 'text-left' : 'text-center'}
          `}>
                        {data.game}
                    </p>
                </div>
            </div>

            {/* Overlay */}
            <div className={`
        absolute inset-0 bg-[rgba(26,26,46,0.95)] 
        flex flex-col justify-center items-center p-5
        border-4 border-[#4ecdc4] z-3
        transition-all duration-300
        backdrop-blur-sm
        ${isHovered
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }
      `}>
                {data.stats.map((stat, index) => (
                    <div key={index} className="w-full mb-2">
                        <div className="flex justify-between text-[8px] mb-1">
                            <span className="text-[#92f29c]">{stat.label}</span>
                            <span className="text-white">{stat.value}/100</span>
                        </div>
                        <div className="relative h-2 overflow-hidden bg-white/10">
                            <div
                                className="h-full bg-[#ff6b6b] absolute top-0 left-0 transition-all duration-500"
                                style={{ width: isHovered ? `${stat.value}%` : '0%' }}
                            />
                        </div>
                    </div>
                ))}
                <div className="text-[#ff6b6b] text-[10px] mt-2.5 text-center font-['Press_Start_2P'] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                    SPECIAL: {data.specialMove}
                </div>
            </div>
        </div>
    );
};

export default RetroCardTemplate;