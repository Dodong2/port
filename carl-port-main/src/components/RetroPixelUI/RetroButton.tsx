import type { ReactNode, ButtonHTMLAttributes } from "react"

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    color: "red" | "yellow" | "blue"
    readModal?: () => void
}

const RetroButton = ({ children, color, ...props }: RetroButtonProps) => {

    const colorClassMap: Record<RetroButtonProps["color"], string> = {
        red: 'bg-red-500',
        yellow: 'bg-amber-500',
        blue: 'bg-blue-500',
    }

    return (
        <button className="relative w-56 h-10 transition-transform duration-200 hover:-translate-y-1.25 active:translate-y-0 group active:scale-75" {...props}>
            {/* Shadow Layer */}
            <div className="absolute inset-0 bg-gray-600 blur-sm opacity-50 translate-y-2.5 -z-10"
                style={{
                    clipPath: 'polygon(0% 8px, 4px 8px, 4px 4px, 8px 4px, 8px 0%, calc(100% - 8px) 0%, calc(100% - 8px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 8px), 0% calc(100% - 8px))'
                }}
            ></div>

            {/* Button Face */}
            <div className={`absolute inset-0 flex items-center justify-center ${colorClassMap[color]} border-4 border-white`}
                style={{
                    clipPath: 'polygon(0% 8px, 4px 8px, 4px 4px, 8px 4px, 8px 0%, calc(100% - 8px) 0%, calc(100% - 8px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 8px), 0% calc(100% - 8px))'
                }}
            >
                {/* Text */}
                <span className="z-10 text-base font-bold tracking-wider text-white uppercase"
                    style={{
                        textShadow: '2px 2px 0 #000'
                    }}
                >
                    {children}
                </span>

                {/* Glow Effect */}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-linear-to-br from-transparent to-pink-400 group-hover:opacity-20"
                    style={{
                        clipPath: 'polygon(0% 8px, 4px 8px, 4px 4px, 8px 4px, 8px 0%, calc(100% - 8px) 0%, calc(100% - 8px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 8px), 0% calc(100% - 8px))'
                    }}
                ></div>
            </div>
        </button>

    )
}

export default RetroButton