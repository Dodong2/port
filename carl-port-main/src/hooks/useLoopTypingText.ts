import { useState, useEffect } from "react"

export const useLoopTypingText = (texts: string[]) => {
    const [textIndex, setTextIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState('')
    const [isDelete, setIsDelete] = useState(false)

    const TypingSpeed = 30
    const PauseTyping = 3000
    const DeleteSpeed = 20
    const currentText = texts[textIndex] ?? ""

    useEffect(() => {
        if (!currentText) return

        // Typing
        if (!isDelete && displayedText.length < currentText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentText.slice(0, displayedText.length + 1))
            }, TypingSpeed)

            return () => clearTimeout(timeout)
        }

        // Pause after typing
        if (!isDelete && displayedText.length === currentText.length) {
            const timeout = setTimeout(() => {
                setIsDelete(true)
            }, PauseTyping)
            return () => clearTimeout(timeout)
        }

        // deleting
        if (isDelete && displayedText.length > 0) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentText.slice(0, displayedText.length - 1))
            }, DeleteSpeed)


            return () => clearTimeout(timeout)
        }

        if (isDelete && displayedText.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsDelete(false)
            setTextIndex((prev) => (prev + 1) % texts.length)
        }


    }, [displayedText, isDelete, currentText, texts.length])



    return {
        displayedText,
    }
}

