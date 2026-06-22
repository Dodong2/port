// components/RetroCard.tsx
import { useState } from 'react';
import type { SkillsType } from '../../types/shared-types';

interface RetroCardTextProps {
    data: SkillsType;

}

const RetroCardText = ({ data }: RetroCardTextProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`
        relative bg-[#1a1a2e] border-4 border-white rounded-sm overflow-hidden
        cursor-pointer transition-all duration-300 
        shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
        hover:shadow-[12px_12px_0px_rgba(0,0,0,0.4)]
        hover:-translate-y-2
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
            <div className="absolute top-1 right-1 bg-[#e9ff6b] text-[#1a1a2e] text-[8px] px-1.5 py-0.5 z-4 font-['Press_Start_2P']">
                {data.cardTitle}
            </div>

            {/* Card Inner */}
            <div className="relative p-4 z-1 min-h-60">
                {/* GRID */}
                <div className="
          grid grid-cols-2 gap-2 mt-3
          text-[10px]
        ">
                    {data.programs.map((program, index) => (
                        <div
                            key={index}
                            className="
                border border-white/30 px-2 py-1
                text-[#4ecdc4] bg-black/20
                hover:bg-black/40 transition-colors
              "
                        >
                            {program}
                        </div>
                    ))}
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
                {data.programStats.map((stat, index) => (
                    <div key={index} className="w-full mb-2">
                        <div className="flex justify-between text-[8px] mb-1">
                            <span className="text-[#92f29c]">{stat.label}</span>
                            <span className="text-white">{stat.value}/100</span>
                        </div>
                        <div className="relative h-2 overflow-hidden bg-white/10">
                            <div
                                className="h-full bg-[#e9ff6b] absolute top-0 left-0 transition-all duration-500"
                                style={{ width: isHovered ? `${stat.value}%` : '0%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RetroCardText;
