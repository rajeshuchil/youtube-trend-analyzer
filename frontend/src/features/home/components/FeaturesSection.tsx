import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

export function FeaturesSection() {
    const featuresSection = useScrollAnimation();

    return (
        <section
            ref={featuresSection.elementRef as React.RefObject<HTMLElement>}
            className={`features-section animate-section ${featuresSection.isVisible ? "is-visible" : ""
                }`}
        >
            <div className="section-header">
                <div>
                    <span className="section-label">Platform Features</span>
                    <h2 className="section-title">Built for Insights</h2>
                </div>
            </div>
            <div className="features-grid">
                <div className="feature-card">
                    <h3 className="feature-title">Global Coverage</h3>
                    <p className="feature-description">
                        Track trends across multiple countries and regions to understand
                        global and local content preferences.
                    </p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">Real-time Updates</h3>
                    <p className="feature-description">
                        Access up-to-date trending information with intelligent caching
                        for optimal performance.
                    </p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">Advanced Filtering</h3>
                    <p className="feature-description">
                        Filter by categories, search keywords, and sort by metrics to
                        discover what matters most.
                    </p>
                </div>
                <div className="feature-card">
                    <h3 className="feature-title">Data Analytics</h3>
                    <p className="feature-description">
                        Visual insights and statistics to help you identify trending
                        patterns and opportunities.
                    </p>
                </div>
            </div>
        </section>
    );
}
