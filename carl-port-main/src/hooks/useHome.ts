import { useState, useEffect } from "react"
import { HomeData } from "../data/HomeData"

export const useHome = () => {
    const [showResume, setShowResume] = useState(false)
    const [textIndex, setTextIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState("")


    const home = HomeData[0]
    const dialogues = home.dialogue

    const currentDialogue = dialogues[textIndex] ?? "";

    useEffect(() => {
        if (!currentDialogue) return;

        if (displayedText.length < currentDialogue.length) {

            const timeout = setTimeout(() => {
                setDisplayedText(currentDialogue.slice(0, displayedText.length + 1))
            }, 30)

            return () => clearTimeout(timeout)
        }
    }, [displayedText, currentDialogue])

    const handleContinue = () => {
        if (textIndex < dialogues.length - 1) {
            setTextIndex(textIndex + 1)
            setDisplayedText("")
        } else {
            setShowResume(true)
        }
    }


    const isTyping = displayedText.length < currentDialogue.length;
    const showContinue = !isTyping && displayedText.length > 0;

    return {
        showResume,
        displayedText,
        isTyping,
        showContinue,
        handleContinue,
        isLastDialogue: textIndex === dialogues.length - 1
    }
}
