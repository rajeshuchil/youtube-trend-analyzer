import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { HeroCard } from "./HeroCard.tsx";
import styles from "./HeroCards.module.css";

export interface HeroCardData {
    id: string;
    pill: string;
    headline: string;
    href?: string;
    analyticsTag?: string;
}

interface HeroCardsProps {
    cards: HeroCardData[];
}

export function HeroCards({ cards }: HeroCardsProps) {
    const cardsRef = useRef<HTMLDivElement>(null);

    /**
     * GSAP entrance animation
     * Cards fade in with slight upward movement, staggered
     */
    useLayoutEffect(() => {
        const cardElements = cardsRef.current?.querySelectorAll(`.${styles.card}`);

        if (!cardElements || cardElements.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardElements,
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }, cardsRef);

        return () => ctx.revert();
    }, [cards]);

    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <section className={styles.heroCards}>
            <div className={styles.container}>
                <div ref={cardsRef} className={styles.scroller}>
                    {cards.map((card) => (
                        <HeroCard key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
