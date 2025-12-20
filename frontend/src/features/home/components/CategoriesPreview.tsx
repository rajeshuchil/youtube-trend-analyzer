import { Link } from "react-router-dom";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { CategoryCardSkeleton } from "../../../components/SkeletonLoaders";
import type { Category } from "../../../types";

interface CategoriesPreviewProps {
    categories: Category[];
    isLoading: boolean;
}

export function CategoriesPreview({ categories, isLoading }: CategoriesPreviewProps) {
    const categoriesSection = useScrollAnimation();

    return (
        <section
            ref={categoriesSection.elementRef as React.RefObject<HTMLElement>}
            className={`categories-preview animate-section ${categoriesSection.isVisible ? "is-visible" : ""
                }`}
        >
            <div className="section-header">
                <div>
                    <span className="section-label">Explore</span>
                    <h2 className="section-title">Popular Categories</h2>
                </div>
                <Link to="/categories" className="view-all-link">
                    View All <span className="arrow">→</span>
                </Link>
            </div>
            <div className="categories-grid">
                {isLoading ? (
                    <>
                        <CategoryCardSkeleton />
                        <CategoryCardSkeleton />
                        <CategoryCardSkeleton />
                        <CategoryCardSkeleton />
                        <CategoryCardSkeleton />
                        <CategoryCardSkeleton />
                        <CategoryCardSkeleton />
                        <CategoryCardSkeleton />
                    </>
                ) : (
                    categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/trends?categoryId=${category.id
                                }&categoryTitle=${encodeURIComponent(category.name)}`}
                            className="category-preview-card"
                        >
                            <h4 className="category-title">{category.name}</h4>
                            <span className="category-link">Explore →</span>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
}
