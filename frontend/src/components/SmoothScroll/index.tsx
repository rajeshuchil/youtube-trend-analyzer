import { useEffect, useRef, ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'

interface SmoothScrollProps {
    children: ReactNode
}

function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Initialize Lenis with mobile-optimized settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 3, // Increased for less "draggy" feel on touch
            infinite: false,
        })

        lenisRef.current = lenis

        // Animation frame loop
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Cleanup
        return () => {
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}

export default SmoothScroll
