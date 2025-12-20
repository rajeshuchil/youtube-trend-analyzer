import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import {
    createHeroEntranceAnimation,
    createHeroParallaxAnimation,
} from "../../../animations/heroAnimations";

export function HeroSection() {
    // Refs for animation targets
    const heroRef = useRef<HTMLElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    /**
     * Hero entrance animation
     * Staggered reveal using extracted animation function
     */
    useLayoutEffect(() => {
        const ctx = createHeroEntranceAnimation({
            container: heroRef,
            headlineLines: ".hero-headline-line",
            subtext: subtextRef,
            cta: ctaRef,
        });

        return () => ctx.revert();
    }, []);

    /**
     * Hero parallax scroll effect
     * Subtle movement on scroll using extracted animation function
     */
    useLayoutEffect(() => {
        const ctx = createHeroParallaxAnimation({
            trigger: heroRef,
            content: ".hero-content",
            visual: ".hero-visual",
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero-asmodee">
            <div className="hero-asmodee-background">
                <img
                    src="/hero-background.jpg"
                    alt="TrendAnalyzer Team"
                    className="hero-asmodee-image"
                />
                <div className="hero-asmodee-overlay"></div>
            </div>

            <div className="hero-asmodee-content hero-content">
                <div className="hero-asmodee-inner">
                    <h1 className="hero-asmodee-title">
                        <div className="hero-headline-line">We are</div>
                        <div className="hero-headline-line">inspired by</div>
                        <div className="hero-headline-line">trends</div>
                    </h1>

                    <p ref={subtextRef} className="hero-asmodee-subtitle">
                        We're data enthusiasts and our mission is to uncover trending
                        patterns and insights that truly connect with you.
                    </p>

                    <div ref={ctaRef} className="hero-asmodee-cta">
                        <Link to="/trends" className="btn-asmodee-primary">
                            Discover trending insights
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
