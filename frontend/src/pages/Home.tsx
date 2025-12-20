import { useMemo, useEffect } from "react";
import { getTrends, getCategories } from "../api/youtube";
import { useCachedData } from "../hooks/useCachedData";
import { HeroSection } from "../features/home/components/HeroSection";
import { HeroCards } from "../features/home/components/HeroCards";
import type { HeroCardData } from "../features/home/components/HeroCards";
import { TrendingStrip } from "../features/home/components/TrendingStrip";
import { CategoriesPreview } from "../features/home/components/CategoriesPreview";
import { FeaturesSection } from "../features/home/components/FeaturesSection";
import { CTASection } from "../features/home/components/CTASection";

export default function Home() {
  console.log("[Home] Component rendered"); // Debug log

  /**
   * OPTIMIZATION 1: Parallel API calls with caching
   * Previously: Sequential (trends → categories)
   * Now: Parallel + cached with stale-while-revalidate
   */
  const {
    data: trendsData,
    isLoading: trendsLoading,
    isValidating: trendsValidating,
    error: trendsError,
  } = useCachedData({
    fetcher: async () => {
      const res = await getTrends({ regionCode: "US", maxResults: 6 });
      return res.data?.success ? res.data.data || [] : [];
    },
    endpoint: "trends",
    params: { regionCode: "US", maxResults: 6 },
    ttl: 5 * 60 * 1000, // Fresh for 5 minutes
    staleWhileRevalidate: 30 * 60 * 1000, // Serve stale for 30 minutes while revalidating
    revalidateOnFocus: true,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isValidating: categoriesValidating,
    error: categoriesError,
  } = useCachedData({
    fetcher: async () => {
      const res = await getCategories({ regionCode: "US" });
      return res.data?.success ? res.data.data || [] : [];
    },
    endpoint: "categories",
    params: { regionCode: "US" },
    ttl: 10 * 60 * 1000, // Fresh for 10 minutes (categories change less frequently)
    staleWhileRevalidate: 60 * 60 * 1000, // Serve stale for 1 hour
    revalidateOnFocus: true,
  });

  // Log errors for debugging
  useEffect(() => {
    if (trendsError) console.error("Trends fetch error:", trendsError);
    if (categoriesError)
      console.error("Categories fetch error:", categoriesError);
  }, [trendsError, categoriesError]);

  /**
   * OPTIMIZATION 2: Memoized derived state
   * Prevents unnecessary recalculations on every render
   */
  const featuredTrends = useMemo(() => {
    return trendsData?.slice(0, 6) || [];
  }, [trendsData]);

  const topCategories = useMemo(() => {
    return categoriesData?.slice(0, 8) || [];
  }, [categoriesData]);

  /**
   * Hero Cards Data
   * Editorial-style insight cards that appear below the hero
   */
  const heroCards: HeroCardData[] = useMemo(() => {
    return [
      {
        id: "1",
        pill: "TRENDING",
        headline: "FASTEST GROWING\nGAMING VIDEO\nTHIS WEEK",
        href: "/trends?category=gaming",
        analyticsTag: "hero-card-trending",
      },
      {
        id: "2",
        pill: "CATEGORY",
        headline: "TOP PERFORMING\nCATEGORY TODAY",
        href: "/categories",
        analyticsTag: "hero-card-category",
      },
      {
        id: "3",
        pill: "INSIGHT",
        headline: "MOST WATCHED\nCHANNEL INSIGHT",
        href: "/trends",
        analyticsTag: "hero-card-insight",
      },
      {
        id: "4",
        pill: "ANALYSIS",
        headline: "VIRAL CONTENT\nBREAKDOWN REPORT",
        href: "/trends?sortBy=views",
        analyticsTag: "hero-card-analysis",
      },
    ];
  }, []);

  /**
   * OPTIMIZATION 4: Background revalidation indicator
   * Show subtle indicator when refreshing in background
   */
  const isRevalidating = trendsValidating || categoriesValidating;

  return (
    <div className="home-container">
      {/* Background revalidation indicator */}
      {isRevalidating && (
        <div className="revalidation-indicator">
          <div className="revalidation-pulse"></div>
          Updating data...
        </div>
      )}

      {/* Hero Section - Asmodee-Inspired Full-Bleed Image */}
      <HeroSection />

      {/* Hero Cards - Editorial Insight Cards */}
      <HeroCards cards={heroCards} />

      {/* Trending Videos - 4 Cards (Asmodee-style) */}
      <TrendingStrip
        trends={featuredTrends.slice(0, 4)}
        isLoading={trendsLoading}
      />

      {/* Categories Preview */}
      <CategoriesPreview
        categories={topCategories}
        isLoading={categoriesLoading}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
