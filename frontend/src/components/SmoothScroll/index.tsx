import { useEffect, useRef, ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'

interface SmoothScrollProps {
    children: ReactNode
}

function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Detect Brave browser
        const isBrave = !!(navigator as any).brave && typeof (navigator as any).brave.isBrave === 'function'

        // Brave-specific optimized settings to prevent sticky/magnet scroll behavior
        const lenis = new Lenis({
            duration: isBrave ? 0.8 : 1.2, // Shorter duration for Brave
            easing: isBrave
                ? (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // Smoother easing for Brave
                : (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: isBrave ? 0.8 : 1, // Reduced for Brave
            touchMultiplier: 3,
            infinite: false,
            syncTouch: isBrave, // Enable touch sync for Brave
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
