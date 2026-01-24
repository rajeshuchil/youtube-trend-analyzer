import { useState } from 'react'
import SearchBar from '../../components/Dashboard/SearchBar'
import VideoCard from '../../components/Dashboard/VideoCard'
import { searchTrends } from '../../services/api'
import { Skeleton } from '../../components/ui/skeleton'
import { Search as SearchIcon, TrendingUp } from 'lucide-react'

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

interface SearchResult {
    id: string
    title: string
    thumbnail: string
    category: string
    views: string
    likes: string
    comments: string
    engagement: number
}

function Search() {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasSearched, setHasSearched] = useState(false)

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

    const handleSearch = async (query: string) => {
        setSearchQuery(query)
        setIsLoading(true)
        setError(null)
        setHasSearched(true)

        try {
            const response = await searchTrends(query, 'US')

            if (response.data && response.data.length > 0) {
                const formattedResults = response.data.map(video => {
                    const categoryName = categoryNames[video.category] || 'Other'
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
                        engagement: video.metrics.likes + video.metrics.comments,
                    }
                })
                setResults(formattedResults)
            } else {
                setResults([])
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to search videos')
            setResults([])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Search Trending Videos
                    </h1>
                    <p className="text-gray-400">
                        Find trending videos by keyword or topic
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-12">
                    <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <Skeleton key={i} className="h-80 bg-gray-800" />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
                        <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
                        <p className="text-gray-400">{error}</p>
                    </div>
                )}

                {/* Results */}
                {!isLoading && !error && hasSearched && (
                    <>
                        {results.length > 0 ? (
                            <>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-white">
                                        Found {results.length} results for "{searchQuery}"
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {results.map((video) => (
                                        <VideoCard key={video.id} {...video} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-400 mb-2">
                                    No results found
                                </h2>
                                <p className="text-gray-500">
                                    Try searching with different keywords
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Empty State (before search) */}
                {!isLoading && !error && !hasSearched && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-600/20 mb-6">
                            <TrendingUp className="w-10 h-10 text-purple-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Start Searching
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Enter a keyword to find trending videos
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {['Music', 'Gaming', 'Technology', 'Sports', 'Comedy'].map((keyword) => (
                                <button
                                    key={keyword}
                                    onClick={() => handleSearch(keyword)}
                                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    {keyword}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search
