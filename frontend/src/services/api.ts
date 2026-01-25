// Automatically detect environment and use appropriate API
// In development: uses localhost
// In production: uses VITE_API_URL from Vercel environment variables
const isDevelopment = import.meta.env.DEV

const LOCAL_API = 'http://localhost:5000'
const PRODUCTION_API = import.meta.env.VITE_API_URL || 'https://youtube-trend-analyzer-ry6z.onrender.com'

const API_BASE_URL = isDevelopment ? LOCAL_API : PRODUCTION_API

console.log(`🔗 API Mode: ${isDevelopment ? 'Development (localhost)' : 'Production'} - Using: ${API_BASE_URL}`)

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
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/youtube/trends?regionCode=${region}&maxResults=50`, {
            signal: controller.signal,
            headers: {
                'Connection': 'keep-alive'
            }
        })
        clearTimeout(timeoutId)
        
        if (!response.ok) {
            throw new Error('Failed to fetch trends')
        }
        return response.json()
    } catch (error) {
        clearTimeout(timeoutId)
        throw error
    }
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
    const response = await fetch(`${API_BASE_URL}/api/youtube/trends?keyword=${encodeURIComponent(keyword)}&regionCode=${region}`)
    if (!response.ok) {
        throw new Error('Failed to search trends')
    }
    return response.json()
}

// Refresh trends data
export async function refreshTrends(region: string = 'US'): Promise<TrendsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/youtube/trends/refresh?regionCode=${region}`, {
        method: 'POST'
    })
    if (!response.ok) {
        throw new Error('Failed to refresh trends')
    }
    return response.json()
}
