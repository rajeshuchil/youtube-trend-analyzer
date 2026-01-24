const API_BASE_URL = 'http://localhost:5000'

// Backend API response format
export interface BackendVideo {
    platform: string
    topicId: string
    title: string
    url: string
    metrics: {
        views: number
        likes: number
        comments: number
    }
    category: string
    regionCode: string
    timestamp: string
    fetchedAt: string
    views: number
}

export interface TrendsResponse {
    success: boolean
    cached: boolean
    refreshed: boolean
    page: number
    limit: number
    count: number
    data: BackendVideo[]
}

export interface CategoryResponse {
    success: boolean
    data: {
        id: string
        name: string
    }[]
}

// Fetch trending videos
export async function fetchTrends(region: string = 'US'): Promise<TrendsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/youtube/trends?region=${region}`)
    if (!response.ok) {
        throw new Error('Failed to fetch trends')
    }
    return response.json()
}

// Fetch categories
export async function fetchCategories(): Promise<CategoryResponse> {
    const response = await fetch(`${API_BASE_URL}/api/youtube/categories`)
    if (!response.ok) {
        throw new Error('Failed to fetch categories')
    }
    return response.json()
}

// Search trends by keyword
export async function searchTrends(keyword: string, region: string = 'US'): Promise<TrendsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/youtube/trends?keyword=${encodeURIComponent(keyword)}&region=${region}`)
    if (!response.ok) {
        throw new Error('Failed to search trends')
    }
    return response.json()
}

// Refresh trends data
export async function refreshTrends(region: string = 'US'): Promise<TrendsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/youtube/trends/refresh?region=${region}`, {
        method: 'POST'
    })
    if (!response.ok) {
        throw new Error('Failed to refresh trends')
    }
    return response.json()
}
