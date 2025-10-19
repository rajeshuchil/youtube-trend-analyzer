import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrends, getCategories } from "../api/youtube";
import type { Trend, Category } from "../types";

export default function Home() {
  const [featuredTrends, setFeaturedTrends] = useState<Trend[]>([]);
  const [topCategories, setTopCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalCategories: 0,
    hotCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        // Load featured trends (top 6)
        const trendsRes = await getTrends({ regionCode: "US", maxResults: 6 });
        if (trendsRes.data?.success) {
          setFeaturedTrends(trendsRes.data.data.slice(0, 6));
          setStats((prev) => ({
            ...prev,
            totalVideos: trendsRes.data.data.length,
          }));
        }

        // Load categories
        const categoriesRes = await getCategories({ regionCode: "US" });
        if (categoriesRes.data?.success) {
          const categories = categoriesRes.data.data.slice(0, 8);
          setTopCategories(categories);
          setStats((prev) => ({
            ...prev,
            totalCategories: categories.length,
            hotCategories: Math.floor(categories.length * 0.3),
          }));
        }
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  if (loading) {
    return (
      <div className="home-loading">
        <div className="loading-spinner"></div>
        <p>Loading trending content...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            YouTube Trend <span className="highlight">Analyzer</span>
          </h1>
          <p className="hero-subtitle">
            Discover what's trending on YouTube across different regions and
            categories. Get real-time insights into viral content and emerging
            trends worldwide.
          </p>
          <div className="hero-actions">
            <Link to="/trends" className="btn btn-primary">
              🔥 Explore Trends
            </Link>
            <Link to="/categories" className="btn btn-secondary">
              📂 Browse Categories
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <h3>{stats.totalVideos}</h3>
            <p>Trending Videos</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalCategories}</h3>
            <p>Categories</p>
          </div>
          <div className="stat-card">
            <h3>{stats.hotCategories}</h3>
            <p>Hot Categories</p>
          </div>
        </div>
      </section>

      {/* Featured Trends Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>🔥 Trending Now</h2>
          <Link to="/trends" className="view-all-link">
            View All Trends →
          </Link>
        </div>
        <div className="featured-grid">
          {featuredTrends.map((trend, index) => (
            <div key={trend.topicId || index} className="featured-card">
              <div className="featured-rank">#{index + 1}</div>
              <div className="featured-content">
                <h3 className="featured-title">{trend.title}</h3>
                <p className="featured-channel">
                  Category: {trend.category || "General"}
                </p>
                <div className="featured-stats">
                  <span className="views">
                    👀 {trend.metrics?.views?.toLocaleString() || "N/A"} views
                  </span>
                  <span className="published">
                    📅 {trend.timestamp || "Recent"}
                  </span>
                </div>
              </div>
              <div className="featured-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="categories-preview">
        <div className="section-header">
          <h2>📂 Popular Categories</h2>
          <Link to="/categories" className="view-all-link">
            View All Categories →
          </Link>
        </div>
        <div className="categories-grid">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={`/trends?categoryId=${
                category.id
              }&categoryTitle=${encodeURIComponent(category.title)}`}
              className="category-preview-card"
            >
              <div className="category-icon">🎬</div>
              <h4>{category.title}</h4>
              <p>Explore trending content</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use Our Trend Analyzer?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Insights</h3>
            <p>
              Track trends across 8+ countries and regions to understand global
              and local preferences.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Data</h3>
            <p>
              Get up-to-date trending information with smart caching for optimal
              performance.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Filtering</h3>
            <p>
              Filter by categories, search keywords, and sort by various metrics
              to find what matters.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>
              Visual insights and statistics to help you understand trending
              patterns and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Discover What's Trending?</h2>
          <p>
            Join thousands of content creators, marketers, and trend enthusiasts
          </p>
          <Link to="/trends" className="btn btn-primary btn-large">
            🚀 Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
