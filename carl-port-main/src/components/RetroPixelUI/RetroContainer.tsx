import { type ReactNode } from 'react'

interface RetroContainerProps {
  children: ReactNode
  title?: string
  variant?: 'default' | 'nes' | 'gameboy' | 'terminal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const RetroContainer = ({ 
  children, 
  title, 
  variant = 'default',
  size = 'md',
  className = '' 
}: RetroContainerProps) => {
  
  const sizeClasses = {
    sm: 'max-w-sm p-2 text-xs',
    md: 'max-w-md p-4 text-sm',
    lg: 'max-w-lg p-5 text-base',
    xl: 'max-w-xl p-8 text-lg'
  }

  const variants = {
    // Classic pixel border
    default: `
      bg-gradient-to-br from-gray-800 to-gray-900 
      border-4 border-white 
      shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]
      relative
    `,
    
    // NES-style
    nes: `
      bg-gradient-to-b from-blue-900 to-blue-950
      border-4 border-gray-300
      shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.5),inset_4px_4px_0px_rgba(255,255,255,0.3)]
      relative
    `,
    
    // Game Boy style
    gameboy: `
      bg-gradient-to-br from-green-100 to-green-200
      border-4 border-green-800
      shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)]
      relative
    `,
    
    // Terminal style
    terminal: `
      bg-black
      border-2 border-green-500
      shadow-[0_0_20px_rgba(34,197,94,0.3)]
      relative
      font-mono
    `
  }

  return (
    <div className={`${variants[variant]} ${sizeClasses[size]} ${className} w-full`}>
      {/* Title Bar */}
      {title && (
        <div className="absolute px-2 bg-gray-800 border-2 border-white -top-3 left-4">
          <span className="text-white font-['Press_Start_2P'] text-[10px] sm:text-xs">
            {title}
          </span>
        </div>
      )}

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
      <div className="relative z-10 leading-relaxed text-white">
        {children}
      </div>
    </div>
  )
}

export default RetroContainer

//Usage
// import RetroContainer from './RetroContainer'

// // Basic usage
// <RetroContainer title="PLAYER STATUS">
//   <p>Health: 100%</p>
//   <p>Level: 42</p>
// </RetroContainer>

// // NES Style
// <RetroContainer variant="nes" size="lg" title="GAME MENU">
//   <h2 className="mb-4 text-xl">Select Option</h2>
//   <ul className="space-y-2">
//     <li>▶ Continue</li>
//     <li>  New Game</li>
//     <li>  Settings</li>
//   </ul>
// </RetroContainer>

// // Game Boy Style
// <RetroContainer variant="gameboy" size="md">
//   <p className="text-green-900">Pokemon Battle!</p>
//   <p className="text-green-900">What will you do?</p>
// </RetroContainer>

// // Terminal Style
// <RetroContainer variant="terminal" size="xl" title="SYSTEM.EXE">
//   <p className="text-green-500">Loading quest data...</p>
//   <p className="text-green-500">&gt; Initializing player stats</p>
//   <p className="text-green-500">&gt; Ready_</p>
// </RetroContainer>

// // Responsive text example
// <RetroContainer size="lg" title="MISSION BRIEF">
//   <h3 className="mb-2 text-sm sm:text-base md:text-lg lg:text-xl">
//     Quest: Save the Kingdom
//   </h3>
//   <p className="text-xs leading-relaxed sm:text-sm md:text-base">
//     The dark lord has stolen the sacred crystal. 
//     Journey through 8 dungeons to retrieve it and restore peace.
//   </p>
// </RetroContainer>