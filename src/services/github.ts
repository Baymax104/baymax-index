import { githubFallback } from '@/data/fallback'
import type { GitHubOverview } from '@/types/profile'

const GITHUB_USERNAME = 'Baymax104'

interface GitHubUserResponse {
  public_repos: number
}

interface GitHubRepoResponse {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  html_url: string
  fork: boolean
  owner: {
    login: string
  }
  contributors_url: string
}

interface GitHubContributorResponse {
  login: string | null
  contributions: number
}

async function requestJson<T>(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return (await response.json()) as T
}

function getTopLanguage(repos: GitHubRepoResponse[]) {
  const counter = repos.reduce<Record<string, number>>((acc, repo) => {
    const language = repo.language
    if (!language) {
      return acc
    }
    acc[language] = (acc[language] ?? 0) + 1
    return acc
  }, {})

  const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1])
  return sorted[0]?.[0] ?? 'Unknown'
}

async function getTotalCommits(repos: GitHubRepoResponse[]) {
  const ownRepos = repos.filter(
    (repo) => !repo.fork && repo.owner.login.toLowerCase() === GITHUB_USERNAME.toLowerCase(),
  )

  const commitCounts = await Promise.all(
    ownRepos.map(async (repo) => {
      try {
        const contributors = await requestJson<GitHubContributorResponse[]>(
          `${repo.contributors_url}?per_page=100`,
        )
        const ownContributor = contributors.find(
          (contributor) => contributor.login?.toLowerCase() === GITHUB_USERNAME.toLowerCase(),
        )
        return ownContributor?.contributions ?? 0
      } catch {
        return 0
      }
    }),
  )

  return commitCounts.reduce((sum, count) => sum + count, 0)
}

export async function getGitHubOverview(): Promise<GitHubOverview> {
  try {
    const [user, repos] = await Promise.all([
      requestJson<GitHubUserResponse>(`https://api.github.com/users/${GITHUB_USERNAME}`),
      requestJson<GitHubRepoResponse[]>(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      ),
    ])

    const totalCommits = await getTotalCommits(repos)

    return {
      source: 'live',
      stats: {
        repoCount: user.public_repos,
        topLanguage: getTopLanguage(repos),
        totalCommits,
      },
      projects: githubFallback.projects,
    }
  } catch {
    return githubFallback
  }
}
