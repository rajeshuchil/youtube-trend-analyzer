import { useState, useMemo } from 'react'
import { useTrends } from '../../hooks/useTrends'
import CategoryCard from '../../components/Dashboard/CategoryCard'
import { Skeleton } from '../../components/ui/skeleton'

// Helper function to format large numbers
function formatNumber(num: number): string {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
}

function Categories() {
    const [selectedRegion] = useState('US')
    const { data, isLoading, error } = useTrends(selectedRegion)

    // Process category data
    const categoryStats = useMemo(() => {
        if (!data?.data) return []

        const categoryNames: Record<string, string> = {
            '1': 'Film & Animation',
            '10': 'Music',
            '17': 'Sports',
            '20': 'Gaming',
            '22': 'People & Blogs',
            '23': 'Comedy',
            '24': 'Entertainment',
            '25': 'News & Politics',
            '27': 'Education',
            '28': 'Science & Technology',
        }

        const categoryColors: Record<string, string> = {
            'Gaming': '#8B5CF6',
            'Music': '#3B82F6',
            'Entertainment': '#06B6D4',
            'Education': '#10B981',
            'News & Politics': '#F97316',
            'Sports': '#EF4444',
            'Film & Animation': '#F59E0B',
            'Science & Technology': '#14B8A6',
            'Comedy': '#EC4899',
            'People & Blogs': '#A855F7',
        }

        // Aggregate by category
        const categoryMap: Record<string, { count: number, totalViews: number }> = {}

        data.data.forEach(video => {
            const catName = categoryNames[video.category] || 'Other'
            if (!categoryMap[catName]) {
                categoryMap[catName] = { count: 0, totalViews: 0 }
            }
            categoryMap[catName].count++
            categoryMap[catName].totalViews += video.metrics.views
        })

        // Convert to array and sort by video count
        return Object.entries(categoryMap)
            .map(([name, stats]) => ({
                name,
                videoCount: stats.count,
                totalViews: formatNumber(stats.totalViews),
                totalViewsRaw: stats.totalViews,
                color: categoryColors[name] || '#6B7280'
            }))
            .sort((a, b) => b.videoCount - a.videoCount)
    }, [data])

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <Skeleton className="h-12 w-64 mb-8 bg-gray-800" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <Skeleton key={i} className="h-48 bg-gray-800" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Categories</h2>
                        <p className="text-gray-400">{error.message}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Categories
                    </h1>
                    <p className="text-gray-400">
                        Analyze performance across {categoryStats.length} content categories
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryStats.map((category) => (
                        <CategoryCard key={category.name} {...category} />
                    ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
                        <h3 className="text-gray-400 text-sm mb-2">Most Popular Category</h3>
                        <p className="text-2xl font-bold text-white">
                            {categoryStats[0]?.name || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {categoryStats[0]?.videoCount || 0} videos
                        </p>
                    </div>
                    <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
                        <h3 className="text-gray-400 text-sm mb-2">Total Categories</h3>
                        <p className="text-2xl font-bold text-white">
                            {categoryStats.length}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Active categories
                        </p>
                    </div>
                    <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6">
                        <h3 className="text-gray-400 text-sm mb-2">Top Category Views</h3>
                        <p className="text-2xl font-bold text-white">
                            {categoryStats[0]?.totalViews || '0'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {categoryStats[0]?.name || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
