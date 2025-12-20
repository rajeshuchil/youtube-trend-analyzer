import { useNavigate } from "react-router-dom";
import type { HeroCardData } from "./HeroCards";
import styles from "./HeroCards.module.css";

interface HeroCardProps {
    card: HeroCardData;
}

export function HeroCard({ card }: HeroCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (card.href) {
            navigate(card.href);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <article
            className={styles.card}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View insight: ${card.headline}`}
        >
            <div className={styles.cardHeader}>
                <span className={styles.pill}>{card.pill}</span>
                <svg
                    className={styles.arrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <h3 className={styles.headline}>{card.headline}</h3>
        </article>
    );
}
