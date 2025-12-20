import type { RefObject } from "react";

/**
 * Animation type definitions
 */

export interface HeroAnimationRefs {
    container: RefObject<HTMLElement>;
    headlineLines: string; // CSS selector for headline lines
    subtext: RefObject<HTMLParagraphElement>;
    cta: RefObject<HTMLDivElement>;
    visual?: RefObject<HTMLDivElement>;
}

export interface ParallaxAnimationRefs {
    trigger: RefObject<HTMLElement>;
    content: string; // CSS selector for content
    visual: string; // CSS selector for visual element
}

export interface CardRevealOptions {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    scrollTrigger?: {
        start?: string;
        toggleActions?: string;
    };
}

export interface HeroAnimationOptions {
    delay?: number;
    duration?: number;
}

export interface ParallaxAnimationOptions {
    contentY?: number;
    visualY?: number;
    scrub?: boolean | number;
}
