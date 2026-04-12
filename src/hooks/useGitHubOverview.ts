import useSWR from 'swr'
import { githubFallback } from '@/data/fallback'
import { getGitHubOverview } from '@/services/github'

export function useGitHubOverview(enabled: boolean) {
  const { data, isLoading } = useSWR(enabled ? 'github-overview' : null, getGitHubOverview, {
    fallbackData: githubFallback,
    dedupingInterval: 60_000,
  })

  return {
    githubData: data ?? githubFallback,
    loading: enabled && isLoading,
  }
}
