interface RetroModalProps {
    children: React.ReactNode
    onClose: () => void
    animate: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' // Add size prop
}

const RetroModal = ({ children, onClose, animate, size = 'md' }: RetroModalProps) => {

    // Size variants
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg sm:max-w-xl',
        lg: 'max-w-2xl lg:max-w-4xl',
        xl: 'max-w-5xl lg:max-w-6xl',
        full: 'max-w-[95vw]'
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                style={{
                    backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px)
          `
                }}
            />

            {/* Modal content */}
            <div
                className={`
          relative z-50 w-[90%] ${sizeClasses[size]}
          transition-all duration-200
          origin-center
          ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
        `}
                style={{ imageRendering: 'pixelated' }}
            >
                {children}
            </div>
        </div>
    )
}
export default RetroModal