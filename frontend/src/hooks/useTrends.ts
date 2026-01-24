import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTrends, refreshTrends, TrendsResponse } from '../services/api'

export function useTrends(region: string) {
    return useQuery<TrendsResponse>({
        queryKey: ['trends', region],
        queryFn: () => fetchTrends(region),
        staleTime: 1000 * 60 * 60, // 1 hour (matches backend cache)
        refetchOnWindowFocus: false,
    })
}

export function useRefreshTrends() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (region: string) => refreshTrends(region),
        onSuccess: (data, region) => {
            // Invalidate and refetch trends for this region
            queryClient.invalidateQueries({ queryKey: ['trends', region] })
        },
    })
}
