// components/RetroCircleContainer.tsx
import type { ReactNode } from 'react';

interface RetroCircleContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'nes' | 'gameboy' | 'neon';
  className?: string;
  badgeIcon?: ReactNode;
  badgeColor?: string;
}

const RetroCircleContainer = ({
  children,
  size = 'md',
  variant = 'default',
  className = '',
  badgeIcon,
  badgeColor = 'bg-red-500'
}: RetroCircleContainerProps) => {

  const sizeClasses = {
    sm: 'w-32 h-32 p-3',
    md: 'w-48 h-48 p-4',
    lg: 'w-64 h-64 p-6',
    xl: 'w-80 h-80 p-8'
  };

  const badgeSizes = {
    sm: 'w-14 h-14',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const badgePositions = {
    sm: '-top-1 -left-1',
    md: '-top-2 -left-2',
    lg: '-top-2 -left-5',
    xl: '-top-3 -left-3'
  };

  const variants = {
    default: `
      bg-gradient-to-br from-gray-800 to-gray-900 
      border-white 
      shadow-[8px_8px_0px_rgba(0,0,0,0.8)]
    `,
    nes: `
      bg-gradient-to-b from-blue-900 to-blue-950
      border-gray-300
      shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.5),inset_4px_4px_0px_rgba(255,255,255,0.3),8px_8px_0px_rgba(0,0,0,0.5)]
    `,
    gameboy: `
      bg-gradient-to-br from-green-100 to-green-200
      border-green-800
      shadow-[8px_8px_0px_rgba(0,0,0,0.4)]
    `,
    neon: `
      bg-black
      border-cyan-400
      shadow-[0_0_20px_rgba(34,211,238,0.6),0_0_40px_rgba(34,211,238,0.3),8px_8px_0px_rgba(0,0,0,0.8)]
    `
  };

  const pixelCircleClip = `polygon(
    0% 30%, 15% 30%, 15% 15%, 30% 15%, 30% 0%,
    70% 0%, 70% 15%, 85% 15%, 85% 30%, 100% 30%,
    100% 70%, 85% 70%, 85% 85%, 70% 85%, 70% 100%,
    30% 100%, 30% 85%, 15% 85%, 15% 70%, 0% 70%
  )`;

  return (
    <div className="relative inline-block w-fit h-fit">
      {/* Main Container */}
      <div className={`
        ${variants[variant]} 
        ${sizeClasses[size]} 
        ${className}
        relative
        flex flex-col items-center justify-center
        transition-transform duration-300
        hover:scale-105
      `}
        style={{
          clipPath: `polygon(
          0% 15%, 5% 15%, 5% 10%, 10% 10%, 10% 5%, 15% 5%, 15% 0%,
          85% 0%, 85% 5%, 90% 5%, 90% 10%, 95% 10%, 95% 15%, 100% 15%,
          100% 85%, 95% 85%, 95% 90%, 90% 90%, 90% 95%, 85% 95%, 85% 100%,
          15% 100%, 15% 95%, 10% 95%, 10% 90%, 5% 90%, 5% 85%, 0% 85%
        )`
        }}>
        {/* Pixel Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)
            `
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-left">
          {children}
        </div>
      </div>

      {/* Badge Icon - Top Right Pixel Circle */}
      {badgeIcon && (
        <div className={`absolute ${badgePositions[size]} z-20`}>
          {/* Badge Shadow */}
          <div
            className={`
              ${badgeSizes[size]}
              absolute top-1.5 left-1.5
              bg-black/60
            `}
            style={{ clipPath: pixelCircleClip }}
          />

          {/* Badge Main */}
          <div
            className={`
              ${badgeSizes["lg"]}
              ${badgeColor}
              relative
              flex items-center justify-center
              shadow-[4px_4px_0px_rgba(0,0,0,0.7)]
              cursor-pointer
            `}
            style={{ clipPath: pixelCircleClip }}
          >
            <div className="flex items-center justify-center w-full h-full">
              {badgeIcon}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetroCircleContainer;