import { useEffect, useState } from "react"
/* types */
import type { PageLoaderProps } from "../types/shared-types"

export const usePageLoader = ({ minLoadTime, onComplete }: PageLoaderProps) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    setTimeout(() => {
                        onComplete?.()
                    }, 300) // 300ms delay para makita yung 100%
                    return 100
                }
                return prev + 2 // adjust speed ng progress bar
            })
        }, minLoadTime / 50) // divide para smooth yung animation

        return () => {
            clearInterval(progressInterval)
        }

    }, [minLoadTime, onComplete])


    return { progress }
}