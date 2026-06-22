import { useLoopTypingText } from "../hooks/useLoopTypingText"

interface TypingLoopEffectProps {
    texts: string[]
    className?: string
}

const TypingLoopEffect = ({ texts, className }: TypingLoopEffectProps) => {
    const { displayedText } = useLoopTypingText(texts)

    return (
        <p className={className}>
            {displayedText}
            <span className="animate-pulse">▌</span>
        </p>
    )
}

export default TypingLoopEffect