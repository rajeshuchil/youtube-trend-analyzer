import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global GSAP Configuration
 * Centralized animation constants and plugin registration
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize GSAP with global settings
 * Call this once at app startup (main.tsx)
 */
export function initGSAP(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Set global defaults if needed
    gsap.defaults({
        ease: "power3.out",
    });

    console.log("[GSAP] Initialized with plugins:", { ScrollTrigger: true });
}

/**
 * Animation Duration Constants
 * Use these instead of hardcoded values for consistency
 */
export const ANIMATION_DURATIONS = {
    fast: 0.3,
    base: 0.8,
    slow: 1.2,
    xSlow: 1.8,
} as const;

/**
 * Animation Easing Presets
 * Consistent easing curves across the app
 */
export const ANIMATION_EASINGS = {
    default: "power3.out",
    smooth: "power2.out",
    elastic: "elastic.out(1, 0.5)",
    bounce: "bounce.out",
} as const;

/**
 * ScrollTrigger Default Configuration
 * Standard settings for scroll-triggered animations
 */
export const SCROLL_TRIGGER_DEFAULTS = {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none none",
} as const;

/**
 * Stagger Timing Presets
 * Common stagger delays for grid items
 */
export const STAGGER_PRESETS = {
    fast: 0.05,
    base: 0.1,
    slow: 0.15,
    xSlow: 0.2,
} as const;
