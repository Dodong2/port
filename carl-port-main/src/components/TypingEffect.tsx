import { useAutoTypingText } from "../hooks/useAutoTypingText"

interface TypingEffectProps {
    texts: string[]
}

const TypingEffect = ({ texts }: TypingEffectProps) => {
    const { typing, displayedText } = useAutoTypingText(texts)

    return (
        <p className="text-justify">
            {displayedText}
            {typing && <span className="animate-pulse">▌</span>}
        </p>
    )
}

export default TypingEffect