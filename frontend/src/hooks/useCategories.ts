import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../services/api'

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours - categories rarely change
        gcTime: 1000 * 60 * 60 * 24, // 24 hours (formerly cacheTime in React Query v4)
        retry: 2,
    })
}

