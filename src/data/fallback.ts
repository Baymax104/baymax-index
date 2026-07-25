import type { GitHubOverview } from '@/types/profile'

export const githubFallback: GitHubOverview = {
  source: 'fallback',
  stats: {
    repoCount: 27,
    topLanguage: 'Python',
    totalCommits: 949,
  },
  projects: [
    {
      id: 'baymax-blog',
      name: 'baymax-blog',
      description: 'Baymax小振的个人博客',
      language: 'Unknown',
      stars: 0,
      url: 'https://github.com/Baymax104/baymax-blog',
    },
    {
      id: 'ysu-ai-training',
      name: 'ysu-ai-training',
      description: 'YSU算法培训',
      language: 'Jupyter Notebook',
      stars: 0,
      url: 'https://github.com/Baymax104/ysu-ai-training',
    },
    {
      id: 'jeykll-cli',
      name: 'jeykll-cli',
      description: 'Jekyll Blog CLI Tool',
      language: 'Python',
      stars: 0,
      url: 'https://github.com/Baymax104/jeykll-cli',
    },
    {
      id: 'icmpv6-parser',
      name: 'icmpv6-parser',
      description: 'ICMPv6协议分析器',
      language: 'C#',
      stars: 0,
      url: 'https://github.com/Baymax104/icmpv6-parser',
    },
    {
      id: 'CampusNavigator',
      name: 'CampusNavigator',
      description: '基于高德地图Android API的北工大校园导航APP',
      language: 'Java',
      stars: 2,
      url: 'https://github.com/Baymax104/CampusNavigator',
    },
    {
      id: 'baymax-agent',
      name: 'baymax-agent',
      description: 'Baymax MCP Agent',
      language: 'Python',
      stars: 0,
      url: 'https://github.com/Baymax104/baymax-agent',
    },
  ],
}
