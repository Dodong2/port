import { useState } from "react";

export const useRetroModal = () => {
    const [active, setActive] = useState(false);
    const [read, setRead] = useState(false)
    const [animate, setAnimate] = useState(false)
    const isMobile = window.matchMedia('(hover: none)').matches;

    /* ---------------- Modal controls ---------------- */
    const openModal = () => {
        setActive(true)
        setRead(true)

        requestAnimationFrame(() => {
            setAnimate(true)
        })
    }

    const closeModal = () => {
        setAnimate(false)

        setTimeout(() => {
            setRead(false)
        }, 200)
    }

    /* ---------------- Card interactions ---------------- */
    const handleMouseEnter = () => {
        if (!isMobile) setActive(true)
    }

    const handleMouseLeave = () => {
        if (!isMobile) setActive(false)
    }

    const handleCardClick = () => {
        if (isMobile) setActive(prev => !prev)
    }

    return {
        active,
        read,
        animate,
        isMobile,
        openModal,
        closeModal,
        handleMouseEnter,
        handleMouseLeave,
        handleCardClick
    }
}