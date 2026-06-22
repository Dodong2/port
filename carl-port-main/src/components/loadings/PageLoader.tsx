import { usePageLoader } from "../../hooks/usePageLoader";
import type { PageLoaderProps } from '../../types/shared-types'

const PageLoader = ({ minLoadTime = 2000, onComplete }: PageLoaderProps) => {
  const { progress } = usePageLoader({ minLoadTime, onComplete })

  return (
    <div className="bg-[#303030] h-screen z-50 flex items-center justify-center px-4 py-4 relative">
      <div className="absolute w-full max-w-md p-3">
        <p className="text-sm text-left text-white">
          LOADING QUEST...
        </p>

        {/* Custom Pixel Progress Bar */}
        <div className="relative w-full h-8 overflow-hidden bg-gray-800 border-4 border-gray-600">
          {/* Progress Fill */}
          <div
            className="h-full transition-all duration-300 ease-out bg-linear-to-r from-sky-400 to-sky-500"
            style={{ width: `${progress}%` }}
          />

          {/* Pixel Grid Effect (optional) */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)
              `
            }}
          />

          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xs drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PageLoader