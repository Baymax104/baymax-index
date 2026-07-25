export type DataSource = 'live' | 'fallback'

export interface GitHubStats {
  repoCount: number
  topLanguage: string
  totalCommits: number
}

export interface GitHubProject {
  id: number | string
  name: string
  description: string
  language: string
  stars: number
  url: string
}

export interface GitHubOverview {
  stats: GitHubStats
  projects: GitHubProject[]
  source: DataSource
}
