import gsap from "gsap";
import { ANIMATION_DURATIONS, ANIMATION_EASINGS } from "./gsapConfig";
import type {
    HeroAnimationRefs,
    ParallaxAnimationRefs,
    HeroAnimationOptions,
    ParallaxAnimationOptions,
} from "./types";

/**
 * Hero Animations
 * Reusable animation functions for hero sections
 */

/**
 * Creates hero entrance animation with staggered reveals
 * @param refs - References to animated elements
 * @param options - Animation configuration options
 * @returns GSAP context for cleanup
 */
export function createHeroEntranceAnimation(
    refs: HeroAnimationRefs,
    options: HeroAnimationOptions = {}
): gsap.Context {
    const { delay = 0.3, duration = ANIMATION_DURATIONS.slow } = options;

    return gsap.context(() => {
        // Set initial states (hidden)
        gsap.set(refs.headlineLines, {
            y: 100,
            opacity: 0,
        });
        gsap.set(refs.subtext.current, {
            y: 40,
            opacity: 0,
        });
        gsap.set(refs.cta.current, {
            y: 30,
            opacity: 0,
        });
        if (refs.visual?.current) {
            gsap.set(refs.visual.current, {
                x: 60,
                opacity: 0,
            });
        }

        // Create master timeline for coordinated entrance
        const tl = gsap.timeline({
            defaults: { ease: ANIMATION_EASINGS.default },
        });

        // Staggered headline reveal
        tl.to(refs.headlineLines, {
            y: 0,
            opacity: 1,
            duration: duration,
            stagger: 0.15,
            delay,
        });

        // Subtext fade-in (overlaps with headline)
        tl.to(
            refs.subtext.current,
            {
                y: 0,
                opacity: 1,
                duration: 1,
            },
            "-=0.6"
        );

        // CTA reveal (overlaps with subtext)
        tl.to(
            refs.cta.current,
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
            },
            "-=0.5"
        );

        // Visual slide-in (overlaps with CTA, optional)
        if (refs.visual?.current) {
            tl.to(
                refs.visual.current,
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                },
                "-=0.9"
            );
        }
    }, refs.container);
}

/**
 * Creates hero parallax scroll effect
 * @param refs - References to parallax elements
 * @param options - Parallax configuration options
 * @returns GSAP context for cleanup
 */
export function createHeroParallaxAnimation(
    refs: ParallaxAnimationRefs,
    options: ParallaxAnimationOptions = {}
): gsap.Context {
    const { contentY = -50, visualY = -80, scrub = 1 } = options;

    return gsap.context(() => {
        if (refs.trigger.current) {
            // Content parallax (subtle movement + fade)
            gsap.to(refs.content, {
                y: contentY,
                opacity: 0.8,
                scrollTrigger: {
                    trigger: refs.trigger.current,
                    start: "top top",
                    end: "bottom top",
                    scrub,
                },
            });

            // Visual parallax (stronger movement)
            gsap.to(refs.visual, {
                y: visualY,
                scrollTrigger: {
                    trigger: refs.trigger.current,
                    start: "top top",
                    end: "bottom top",
                    scrub,
                },
            });
        }
    }, refs.trigger);
}
