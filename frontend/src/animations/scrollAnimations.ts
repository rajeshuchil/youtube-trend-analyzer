import gsap from "gsap";
import type { RefObject } from "react";
import {
    ANIMATION_DURATIONS,
    ANIMATION_EASINGS,
    STAGGER_PRESETS,
} from "./gsapConfig";
import type { CardRevealOptions } from "./types";

/**
 * Scroll-triggered Animations
 * Reusable animation functions for scroll effects
 */

/**
 * Creates card reveal animation on scroll
 * Cards fade in from bottom with stagger effect
 * 
 * @param trigger - Element that triggers the animation
 * @param cardSelector - CSS selector for cards to animate
 * @param options - Animation configuration options
 * @returns GSAP context for cleanup
 */
export function createCardRevealAnimation(
    trigger: RefObject<HTMLElement>,
    cardSelector: string,
    options: CardRevealOptions = {}
): gsap.Context {
    const {
        y = 60,
        opacity = 0,
        duration = ANIMATION_DURATIONS.base,
        stagger = STAGGER_PRESETS.base,
        ease = ANIMATION_EASINGS.smooth,
        scrollTrigger = {},
    } = options;

    const {
        start = "top 80%",
        toggleActions = "play none none none",
    } = scrollTrigger;

    return gsap.context(() => {
        gsap.from(cardSelector, {
            y,
            opacity,
            duration,
            stagger,
            ease,
            scrollTrigger: {
                trigger: trigger.current,
                start,
                toggleActions,
            },
        });
    }, trigger);
}

/**
 * Creates staggered entrance animation
 * Generic animation for grid items or lists
 * 
 * @param elements - CSS selector or array of elements
 * @param options - Animation configuration options
 * @returns GSAP context (if trigger ref provided) or timeline
 */
export function createStaggeredEntranceAnimation(
    elements: string | HTMLElement[],
    options: {
        y?: number;
        stagger?: number;
        duration?: number;
        delay?: number;
        scrollTrigger?: gsap.plugins.ScrollTriggerInstanceVars;
    } = {}
) {
    const {
        y = 40,
        stagger = STAGGER_PRESETS.base,
        duration = ANIMATION_DURATIONS.base,
        delay = 0,
        scrollTrigger,
    } = options;

    return gsap.from(elements, {
        y,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: ANIMATION_EASINGS.smooth,
        scrollTrigger,
    });
}
