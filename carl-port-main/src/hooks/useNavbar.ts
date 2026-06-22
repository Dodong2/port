import { useState, useEffect, useRef, useContext } from "react"
import { ScrollContainerContext } from "../context/ScrollContainerContext"

export const useNavbar = () => {
    const [showController, setShowController] = useState(false)
    const [showNav, setShowNav] = useState(true)
    const scrollContainerRef = useContext(ScrollContainerContext)

    // show controller
    const toggleController = () => {
        setShowController(prev => !prev)
    }

    // helper for scroll router for smooth navigation
    const scrollTo = (id: string) => {
        const element = document.getElementById(id)
        const container = scrollContainerRef?.current

        if (element && container) {
            const elementTop = element.offsetTop
            container.scrollTo({
                top: elementTop,
                behavior: "smooth"
            })
        }
        setShowController(false)
    }

    // pang navbar logic: scroll up show & scroll down hide
    const lastScrollY = useRef(0)
    const idleTimer = useRef<number | null>(null)

    useEffect(() => {
        const container = scrollContainerRef?.current
        if (!container) return

        const handleScroll = () => {
            const currentScrollY = container.scrollTop

            // always show navbar kapag nasa pinaka-taas
            if (currentScrollY === 0) {
                if (idleTimer.current) {
                    clearTimeout(idleTimer.current)
                    idleTimer.current = null
                }
                setShowNav(true)
                lastScrollY.current = currentScrollY
                return
            }

            // clear idle timer
            if (idleTimer.current) {
                clearTimeout(idleTimer.current)
            }

            // scroll up → show
            if (currentScrollY < lastScrollY.current) {
                setShowNav(true)
                setShowController(false)
            }

            // scroll down → hide
            if (currentScrollY > lastScrollY.current) {
                setShowNav(false)
                setShowController(false)
            }

            // idle hide after 5s
            idleTimer.current = window.setTimeout(() => {
                setShowNav(false)
            }, 5000)

            lastScrollY.current = currentScrollY
        }

        container.addEventListener("scroll", handleScroll)

        return () => {
            container.removeEventListener("scroll", handleScroll)
            if (idleTimer.current) clearTimeout(idleTimer.current)
        }
    }, [scrollContainerRef])

    return { showController, showNav, toggleController, scrollTo }
}