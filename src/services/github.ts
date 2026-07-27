import { githubFallback } from '@/data/fallback'
import type { GitHubOverview } from '@/types/profile'

const GITHUB_OVERVIEW_ENDPOINT = import.meta.env.DEV
  ? 'https://baymax-index-api.vercel.app/api/github/overview'
  : '/api/github/overview'

async function requestJson<T>(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return (await response.json()) as T
}

export async function getGitHubOverview(): Promise<GitHubOverview> {
  try {
    return await requestJson<GitHubOverview>(GITHUB_OVERVIEW_ENDPOINT)
  } catch {
    return githubFallback
  }
}
