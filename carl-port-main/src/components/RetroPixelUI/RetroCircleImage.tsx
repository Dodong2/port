// components/RetroCircleImage.tsx
// components/RetroCircleImage.tsx
import { useState } from 'react';

interface RetroCircleImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'nes' | 'arcade' | 'neon' | 'glitch';
  badge?: string;
  className?: string;
}

const RetroCircleImage = ({
  src,
  alt,
  size = 'md',
  variant = 'default',
  badge,
  className = ''
}: RetroCircleImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
    xl: 'w-72 h-72'
  };

  const variants = {
    default: `
      shadow-[8px_8px_0px_rgba(0,0,0,0.8)]
    `,
    nes: `
      shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.5),inset_4px_4px_0px_rgba(255,255,255,0.3),8px_8px_0px_rgba(0,0,0,0.5)]
    `,
    arcade: `
      shadow-[0_0_20px_rgba(250,204,21,0.5),8px_8px_0px_rgba(0,0,0,0.6)]
    `,
    neon: `
      shadow-[0_0_20px_rgba(34,211,238,0.8),0_0_40px_rgba(34,211,238,0.4),inset_0_0_20px_rgba(34,211,238,0.2)]
    `,
    glitch: `
      shadow-[4px_0_0_rgba(0,255,255,0.5),-4px_0_0_rgba(255,0,255,0.5),8px_8px_0px_rgba(0,0,0,0.8)]
    `
  };

  const borderColors = {
    default: '#ffffff',
    nes: '#d1d5db',
    arcade: '#facc15',
    neon: '#22d3ee',
    glitch: '#ef4444'
  };

  const clipPathPolygon = `polygon(
    0% 15%, 5% 15%, 5% 10%, 10% 10%, 10% 5%, 15% 5%, 15% 0%,
    85% 0%, 85% 5%, 90% 5%, 90% 10%, 95% 10%, 95% 15%, 100% 15%,
    100% 85%, 95% 85%, 95% 90%, 90% 90%, 90% 95%, 85% 95%, 85% 100%,
    15% 100%, 15% 95%, 10% 95%, 10% 90%, 5% 90%, 5% 85%, 0% 85%
  )`;

  return (
    <div className="relative inline-block">
      {/* Shadow Layer */}
      <div
        className={`
          ${sizeClasses[size]}
          absolute top-2 left-2
          bg-black/40
          pointer-events-none
        `}
        style={{
          clipPath: clipPathPolygon
        }}
      />

      {/* Main Image Container */}
      <div
        className={`
          ${variants[variant]} 
          ${sizeClasses[size]} 
          ${className}
          relative
          overflow-hidden
          transition-all duration-300
          cursor-pointer
          ${isHovered ? 'scale-110' : 'scale-100'}
        `}
        style={{
          clipPath: clipPathPolygon
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Pixelated Border Effect */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }}>
          <defs>
            <clipPath id={`pixelCircle-${alt}`}>
              <polygon points="
                0,15 5,15 5,10 10,10 10,5 15,5 15,0
                85,0 85,5 90,5 90,10 95,10 95,15 100,15
                100,85 95,85 95,90 90,90 90,95 85,95 85,100
                15,100 15,95 10,95 10,90 5,90 5,85 0,85
              "
                vectorEffect="non-scaling-stroke"
                transform="scale(0.01)"
                style={{ transformOrigin: 'center' }}
              />
            </clipPath>
          </defs>
          <rect
            x="0" y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke={borderColors[variant]}
            strokeWidth="4"
            clipPath={`url(#pixelCircle-${alt})`}
          />
        </svg>

        {/* Image */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`
            w-full h-full object-cover
            transition-transform duration-500
            ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
          `}
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Pixel Scanline Effect */}
        <div
          className={`
            absolute inset-0 pointer-events-none
            transition-opacity duration-300
            ${isHovered ? 'opacity-20' : 'opacity-10'}
          `}
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)
            `
          }}
        />

        {/* Glow Effect on Hover */}
        {isHovered && variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-400/10 animate-pulse" />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-2 right-8 bg-red-500 text-white text-[8px] px-2 py-1 font-['Press_Start_2P'] shadow-lg z-10"
            style={{
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)'
            }}>
            {badge}
          </div>
        )}

        {/* Glitch Effect */}
        {isHovered && variant === 'glitch' && (
          <>
            <div
              className="absolute inset-0 bg-cyan-500/20 mix-blend-screen animate-pulse"
              style={{ animationDuration: '0.1s' }}
            />
            <div
              className="absolute inset-0 bg-magenta-500/20 mix-blend-screen animate-pulse"
              style={{ animationDuration: '0.15s', animationDelay: '0.05s' }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RetroCircleImage;

/* USAGE */
//  {/* Circle Image - Default */}
//         <RetroCircleImage
//           size="lg"
//           variant="default"
//           src={Me}
//           alt="Mario"
//           badge="HERO"
//         />

//         {/* Circle Image - NES Style */}
//         <RetroCircleImage
//           size="lg"
//           variant="nes"
//           src={Me}
//           alt="Pac-Man"
//         />

//         {/* Circle Image - Arcade Style */}
//         <RetroCircleImage
//           size="lg"
//           variant="arcade"
//           src={Me}
//           alt="Sonic"
//           badge="FAST"
//         />

//         {/* Circle Image - Neon Style */}
//         <RetroCircleImage
//           size="lg"
//           variant="neon"
//           src={Me}
//           alt="Link"
//         />

//         {/* Circle Image - Glitch Style */}
//         <RetroCircleImage
//           size="lg"
//           variant="glitch"
//           src={Me}
//           alt="Ryu"
//           badge="WARRIOR"
//         />

//         {/* Mixed Example */}
//         <RetroCircleContainer size="xl" variant="nes">
//           <RetroCircleImage
//             size="sm"
//             variant="neon"
//             src={Me}
//             alt="Samus"
//           />
//           <h3 className="text-white font-['Press_Start_2P'] text-xs mt-4 mb-2">
//             SAMUS
//           </h3>
//           <button className="bg-yellow-400 text-gray-900 px-3 py-1 text-[8px] font-['Press_Start_2P'] hover:bg-yellow-300 transition-colors">
//             SELECT
//           </button>
//         </RetroCircleContainer>