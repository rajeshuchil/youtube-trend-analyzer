import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTrends, refreshTrends, TrendsResponse } from '../services/api'

export function useTrends(region: string) {
    return useQuery<TrendsResponse>({
        queryKey: ['trends', region],
        queryFn: () => fetchTrends(region),
        staleTime: 1000 * 60 * 30, // 30 minutes
        gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
        refetchOnWindowFocus: false,
        retry: 2,
        retryDelay: 1000,
    })
}

export function useRefreshTrends() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (region: string) => refreshTrends(region),
        onSuccess: (_data, region) => {
            // Invalidate and refetch trends for this region
            queryClient.invalidateQueries({ queryKey: ['trends', region] })
        },
    })
}
