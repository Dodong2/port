import { useState, useEffect } from "react"

export const useAutoTypingText = (texts: string[]) => {
  const [textIndex, setTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')

  const currentText = texts[textIndex] ?? ""

  const TypingSpeed = 10

  useEffect(() => {
    if (!currentText) return

    if (displayedText.length < currentText.length) {

      const timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1))
      }, TypingSpeed)

      return () => clearTimeout(timeout)
    }
  }, [displayedText, currentText])

  const typing = displayedText.length < currentText.length;

  return {
    typing,
    displayedText,
    setTextIndex
  }
}

