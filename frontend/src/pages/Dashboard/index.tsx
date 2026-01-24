import { useState, useMemo } from 'react'
import Sidebar from '../../components/Dashboard/Sidebar'
import MetricCard from '../../components/Dashboard/MetricCard'
import TrendingTable from '../../components/Dashboard/TrendingTable'
import RegionFilter from '../../components/Dashboard/RegionFilter'
import CategoryChart from '../../components/Dashboard/CategoryChart'
import EngagementChart from '../../components/Dashboard/EngagementChart'
import { Skeleton } from '../../components/ui/skeleton'
import { Eye, Video, Heart, TrendingUp, RefreshCw } from 'lucide-react'
import { useTrends, useRefreshTrends } from '../../hooks/useTrends'

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

function Dashboard() {
    const [selectedRegion, setSelectedRegion] = useState('US')

    // Fetch trends data
    const { data, isLoading, error } = useTrends(selectedRegion)
    const refreshMutation = useRefreshTrends()

    // Transform API data for components
    const transformedData = useMemo(() => {
        if (!data?.data) return null

        const videos = data.data

        // Category name mapping
        const categoryNames: Record<string, string> = {
            '1': 'Film & Animation',
            '2': 'Autos & Vehicles',
            '10': 'Music',
            '15': 'Pets & Animals',
            '17': 'Sports',
            '19': 'Travel & Events',
            '20': 'Gaming',
            '22': 'People & Blogs',
            '23': 'Comedy',
            '24': 'Entertainment',
            '25': 'News & Politics',
            '26': 'Howto & Style',
            '27': 'Education',
            '28': 'Science & Technology',
        }

        // Transform videos for table
        const tableVideos = videos.map(video => {
            const categoryName = categoryNames[video.category] || 'Other'
            const engagementScore = video.metrics.likes + video.metrics.comments

            // Extract video ID from URL
            const videoId = video.topicId || video.url.split('v=')[1]?.split('&')[0] || 'default'
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`

            return {
                id: video.topicId,
                title: video.title,
                thumbnail: thumbnailUrl,
                category: categoryName,
                views: formatNumber(video.metrics.views),
                likes: formatNumber(video.metrics.likes),
                comments: formatNumber(video.metrics.comments),
                engagement: Math.round(engagementScore / 1000) // Convert to K
            }
        })

        // Calculate metrics
        const totalViews = videos.reduce((sum, v) => sum + v.metrics.views, 0)
        const totalLikes = videos.reduce((sum, v) => sum + v.metrics.likes, 0)
        const totalComments = videos.reduce((sum, v) => sum + v.metrics.comments, 0)
        const avgEngagement = (totalLikes + totalComments) / videos.length

        // Category distribution
        const categoryCount: Record<string, number> = {}
        videos.forEach(v => {
            const cat = categoryNames[v.category] || 'Other'
            categoryCount[cat] = (categoryCount[cat] || 0) + 1
        })

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
        }

        const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
            name,
            value,
            color: categoryColors[name] || '#6B7280'
        }))

        // Engagement by category
        const categoryEngagement: Record<string, { views: number, likes: number, comments: number }> = {}
        videos.forEach(v => {
            const cat = categoryNames[v.category] || 'Other'
            if (!categoryEngagement[cat]) {
                categoryEngagement[cat] = { views: 0, likes: 0, comments: 0 }
            }
            categoryEngagement[cat].views += v.metrics.views
            categoryEngagement[cat].likes += v.metrics.likes
            categoryEngagement[cat].comments += v.metrics.comments
        })

        const engagementData = Object.entries(categoryEngagement)
            .sort((a, b) => b[1].views - a[1].views) // Sort by views
            .slice(0, 5) // Top 5 categories
            .map(([category, data]) => ({
                category,
                views: Math.round(data.views / 1000), // Convert to K
                likes: Math.round(data.likes / 1000),
                comments: Math.round(data.comments / 1000)
            }))

        return {
            tableVideos,
            metrics: {
                totalViews,
                totalVideos: videos.length,
                totalEngagement: totalLikes + totalComments,
                avgEngagement
            },
            categoryData,
            engagementData
        }
    }, [data])

    const handleRefresh = () => {
        refreshMutation.mutate(selectedRegion)
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-black">
                <Sidebar activeItem="overview" />
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <Skeleton className="h-12 w-64 mb-8 bg-gray-800" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[1, 2, 3, 4].map(i => (
                                <Skeleton key={i} className="h-32 bg-gray-800" />
                            ))}
                        </div>
                        <Skeleton className="h-96 bg-gray-800" />
                    </div>
                </main>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex min-h-screen bg-black">
                <Sidebar activeItem="overview" />
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
                            <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Data</h2>
                            <p className="text-gray-400 mb-4">{error.message}</p>
                            <button
                                onClick={handleRefresh}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    if (!transformedData) return null

    return (
        <div className="flex min-h-screen bg-black">
            {/* Sidebar */}
            <Sidebar activeItem="overview" />

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                Dashboard Overview
                            </h1>
                            <p className="text-gray-400">
                                Real-time YouTube trends and analytics
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleRefresh}
                                disabled={refreshMutation.isPending}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <RegionFilter value={selectedRegion} onChange={setSelectedRegion} />
                        </div>
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <MetricCard
                            title="Total Views"
                            value={formatNumber(transformedData.metrics.totalViews)}
                            change={`${transformedData.metrics.totalVideos} videos`}
                            icon={Eye}
                            gradient="bg-gradient-to-br from-purple-600/20 to-blue-600/20"
                        />
                        <MetricCard
                            title="Total Videos"
                            value={transformedData.metrics.totalVideos.toString()}
                            change={`Region: ${selectedRegion}`}
                            icon={Video}
                            gradient="bg-gradient-to-br from-blue-600/20 to-cyan-600/20"
                        />
                        <MetricCard
                            title="Engagement"
                            value={formatNumber(transformedData.metrics.totalEngagement)}
                            change="Likes + Comments"
                            icon={Heart}
                            gradient="bg-gradient-to-br from-pink-600/20 to-purple-600/20"
                        />
                        <MetricCard
                            title="Avg Score"
                            value={formatNumber(transformedData.metrics.avgEngagement)}
                            change="Per video"
                            icon={TrendingUp}
                            gradient="bg-gradient-to-br from-cyan-600/20 to-blue-600/20"
                        />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <CategoryChart data={transformedData.categoryData} />
                        <EngagementChart data={transformedData.engagementData} />
                    </div>

                    {/* Trending Videos Table */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Trending Videos
                        </h2>
                        <TrendingTable videos={transformedData.tableVideos} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
