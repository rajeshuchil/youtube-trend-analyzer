export interface Trend {
    platform: string,
    topicId: string,
    title: string,
    url: string,
    metrics: {
        views: number,
        likes: number,
        comments: number,
        retweets?: number,
    };
    category?: string,
    regionCode: string,
    keyword?: string,
    fetchedAt?: string,
    timestamp?: string, 
}

export interface Category {
    id: string,
    title: string,
    regionCode: string,
    fetchedAt?: string,
}