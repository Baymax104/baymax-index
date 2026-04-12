import type { RefObject } from 'react'
import { PinIcon, StarIcon } from '../icons/SocialIcons'
import type { GitHubOverview } from '../../types/profile'
import { formatNumber } from '../../utils/format'
import { sectionClass } from '../../utils/animation'

interface GithubSectionProps {
  sectionRef: RefObject<HTMLElement | null>
  visible: boolean
  loading: boolean
  githubData: GitHubOverview
}

export function GithubSection({ sectionRef, visible, loading, githubData }: GithubSectionProps) {
  const stats = [
    { label: '项目数量', value: formatNumber(githubData.stats.repoCount) },
    { label: '最多语言', value: githubData.stats.topLanguage },
    { label: '项目贡献', value: `${formatNumber(githubData.stats.totalCommits)} Commits` },
  ]

  return (
    <section ref={sectionRef} className={sectionClass(visible, 'left')}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">GitHub</h2>
        <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-600">
          数据源：{loading ? '加载中' : githubData.source === 'live' ? '实时' : '占位'}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
      <h3 className="mt-8 inline-flex items-center gap-2 text-lg font-medium text-slate-900">
        <PinIcon />
        Pinned
      </h3>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {githubData.projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/80"
          >
            <p className="text-base font-semibold text-slate-900">{project.name}</p>
            <p className="mt-2 line-clamp-2 min-h-11 text-sm text-slate-600">{project.description}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{project.language}</span>
              <span className="inline-flex items-center gap-1 text-amber-500">
                <StarIcon />
                {formatNumber(project.stars)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
