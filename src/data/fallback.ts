import type { GitHubOverview } from '../types/profile'

export const githubFallback: GitHubOverview = {
  source: 'fallback',
  stats: {
    repoCount: 18,
    topLanguage: 'TypeScript',
    totalCommits: 1328,
  },
  projects: [
    {
      id: 1,
      name: 'baymax-index',
      description: '个人主页导航站点与数据展示页面',
      language: 'TypeScript',
      stars: 26,
      url: 'https://github.com/Baymax104',
    },
    {
      id: 2,
      name: 'blog-theme',
      description: '简洁风格的博客主题模板',
      language: 'Vue',
      stars: 18,
      url: 'https://github.com/Baymax104',
    },
    {
      id: 3,
      name: 'tools-collection',
      description: '开发常用脚本与自动化工具集合',
      language: 'JavaScript',
      stars: 12,
      url: 'https://github.com/Baymax104',
    },
  ],
}
