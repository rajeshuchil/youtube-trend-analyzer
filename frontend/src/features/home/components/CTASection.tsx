import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { Link } from "react-router-dom";

export function CTASection() {
    const ctaSection = useScrollAnimation();

    return (
        <section
            ref={ctaSection.elementRef as React.RefObject<HTMLElement>}
            className={`cta-section animate-section ${ctaSection.isVisible ? "is-visible" : ""
                }`}
        >
            <div className="cta-content">
                <h2 className="cta-title">Start Exploring Trends</h2>
                <p className="cta-subtitle">
                    Join content creators and marketers discovering what's next
                </p>
                <Link to="/trends" className="btn btn-primary btn-large">
                    View Trending Content
                </Link>
            </div>
        </section>
    );
}
