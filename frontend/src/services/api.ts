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
    // Optional because the backend omits it on cache-hit responses
    refreshed?: boolean
    page: number
    limit: number
    count: number
    data: BackendVideo[]
    // Present only on data hydrated from a Phase 1 static snapshot; live
    // backend responses never include it
    meta?: TrendSnapshotMeta
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
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout for cold start

    try {
        const response = await fetch(`${API_BASE_URL}/api/youtube/trends?regionCode=${region}&maxResults=50`, {
            signal: controller.signal,
            headers: {
                'Connection': 'keep-alive'
            }
        })
        clearTimeout(timeoutId)

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to fetch trends: ${response.status} ${errorText}`)
        }
        return response.json()
    } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout - server may be starting up. Please try again.')
        }
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
        method: 'GET'
    })
    if (!response.ok) {
        throw new Error('Failed to refresh trends')
    }
    return response.json()
}

// Static snapshot metadata written by scripts/fetch-trending.mjs (Phase 1)
export interface TrendSnapshotMeta {
    region: string
    generatedAt: string
    fetchedAt: string | null
    videoCount: number
    cached: boolean
    source: string
}

export type TrendSnapshot = TrendsResponse

// Root-relative so it works on the production domain, Vercel preview
// deployments and the Vite dev server alike (SPA routes like
// /dashboard/trending would break a document-relative path).
const SNAPSHOT_BASE_PATH = '/data'

function isValidTrendPayload(payload: unknown): payload is TrendSnapshot {
    if (!payload || typeof payload !== 'object') return false

    const candidate = payload as TrendSnapshot
    if (candidate.success !== true || !Array.isArray(candidate.data) || candidate.data.length === 0) {
        return false
    }

    return candidate.data.every(
        (video) =>
            typeof video.topicId === 'string' &&
            video.topicId.length > 0 &&
            typeof video.title === 'string' &&
            video.metrics !== null &&
            typeof video.metrics === 'object' &&
            typeof video.metrics.views === 'number'
    )
}

// Load the static snapshot for a region. Returns null when the region has no
// snapshot yet (HTTP 404), when the file is malformed, or when the request
// fails — callers fall back to the live API in every case.
export async function fetchTrendSnapshot(region: string): Promise<TrendSnapshot | null> {
    // Defensive: region can come from localStorage, so only well-formed
    // ISO country codes may end up in a URL path.
    if (!/^[A-Z]{2}$/.test(region)) return null

    try {
        const response = await fetch(`${SNAPSHOT_BASE_PATH}/trends-${region}.json`, {
            headers: { Accept: 'application/json' }
        })

        if (!response.ok) {
            // A missing snapshot is an expected situation, not an error
            if (response.status !== 404) {
                console.warn(`Snapshot request for ${region} failed: HTTP ${response.status}`)
            }
            return null
        }

        const payload: unknown = await response.json()
        if (!isValidTrendPayload(payload)) {
            console.warn(`Snapshot for ${region} is malformed; ignoring it`)
            return null
        }

        return payload
    } catch (error) {
        console.warn(`Could not load snapshot for ${region}:`, error)
        return null
    }
}

// AI Chat interface
export interface AIChatRequest {
    message: string
    regionCode: string
}

export interface AIChatResponse {
    response: string
    dataContext: {
        videosAnalyzed: number
        regionCode: string
    }
}

// Chat with AI assistant
export async function chatWithAI(message: string, regionCode: string = 'US'): Promise<AIChatResponse> {
    const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            regionCode,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to get AI response')
    }

    return response.json()
}

// Export API_BASE_URL for debugging purposes
export { API_BASE_URL }
