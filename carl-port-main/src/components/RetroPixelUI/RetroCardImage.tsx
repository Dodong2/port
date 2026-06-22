/* hooks */
import { useRetroModal } from '../../hooks/useRetroModal';
/* types */
import type { ProjectsTypes } from '../../types/shared-types';
/* components */
import RetroButton from './RetroButton';
import RetroContainer from './RetroContainer';
import TypingEffect from '../TypingEffect';
import RetroModal from './RetroModal';

interface RetroCardImageProps {
    data: ProjectsTypes;

}

const RetroCardImage = ({ data }: RetroCardImageProps) => {
    const { active, read, openModal, closeModal, handleMouseEnter, handleMouseLeave, handleCardClick, animate } = useRetroModal()

    return (
        <div>
            <div
                className={`
        relative bg-[#1a1a2e] border-4 border-white rounded-sm overflow-hidden
        cursor-pointer transition-all duration-300 
        shadow-[8px_8px_0px_rgba(0,0,0,0.3)]
        hover:shadow-[12px_12px_0px_rgba(0,0,0,0.4)]
        hover:-translate-y-2
      `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleCardClick}
            >
                {/* Pixel Grid Overlay */}
                <div
                    className={`absolute inset-0 black/70 backdrop-blur-sm transition-opacity duration-200 ${animate ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)
          `
                    }}
                />

                {/* Badge */}
                <div className="absolute top-1 right-1 bg-[#4ecdc4] text-[#1a1a2e] text-[8px] px-1.5 py-0.5 z-4 font-['Press_Start_2P']">
                    {data.projectTitle}
                </div>

                {/* Card Inner */}
                {/* Card Inner */}
                <div className="relative p-4 z-1 min-h-[220px] flex items-center justify-center">
                    <div className="w-full h-full max-w-sm">
                        <img
                            src={data.image}
                            alt="images"
                            loading="lazy"
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>

                {/* Overlay */}
                <div className={`
        absolute inset-0 bg-[rgba(26,26,46,0.95)] 
        flex flex-col justify-center items-center p-5
        border-4 border-[#e9ff6b] z-3
        transition-all duration-300
        backdrop-blur-sm
        ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    {data.projectStats.map((stat, index) => (
                        <div key={index} className="w-full mb-2">
                            <div className="flex justify-between text-[8px] mb-1">
                                <span className="text-[#92f29c]">{stat.label}</span>
                                <span className="text-white">{stat.value}/100</span>
                            </div>
                            <div className="relative h-2 overflow-hidden bg-white/10">
                                <div
                                    className="h-full bg-[#4ecdc4] absolute top-0 left-0 transition-all duration-500"
                                    style={{ width: active ? `${stat.value}%` : '0%' }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className='mt-2'>
                        <RetroButton color='blue' onClick={openModal}>Read</RetroButton>
                    </div>
                </div>
            </div>

            {/* modal description */}
            {read && (
                <RetroModal onClose={closeModal} animate={animate}>
                    <RetroContainer size="lg" title={data.projectTitle}>
                        <div className="space-y-2 text-[10px] sm:text-[12px] md:text-[14px] text-white leading-relaxed">
                            <p className="text-[#92f29c]">{data.created}</p>
                            <TypingEffect texts={data.descriptions} />
                        </div>
                    </RetroContainer>

                </RetroModal>
            )}
        </div>
    );
};

export default RetroCardImage;
