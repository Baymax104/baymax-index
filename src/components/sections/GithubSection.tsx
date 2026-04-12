import type { RefObject } from 'react'
import { PinIcon, StarIcon } from '@/components/icons/SocialIcons'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import type { GitHubOverview } from '@/types/profile'
import { formatNumber } from '@/utils/format'
import { sectionClass } from '@/utils/animation'

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
        <Badge variant="outline" className="border-slate-300 bg-slate-100 text-slate-600">
          数据源：{loading ? '加载中' : githubData.source === 'live' ? '实时' : '占位'}
        </Badge>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }, (_, index) => (
              <Card key={`stats-skeleton-${index}`} size="sm" className="border border-slate-200 bg-slate-50 ring-0 shadow-none">
                <CardHeader className="px-4 py-0">
                  <Skeleton className="h-3 w-16 bg-slate-200" />
                </CardHeader>
                <CardContent className="px-4 pt-2">
                  <Skeleton className="h-6 w-28 bg-slate-200" />
                </CardContent>
              </Card>
            ))
          : stats.map((stat) => (
              <Card key={stat.label} size="sm" className="border border-slate-200 bg-slate-50 ring-0 shadow-none">
                <CardHeader className="px-4 py-0">
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </CardHeader>
                <CardContent className="px-4 pt-1">
                  <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
      </div>
      <Separator className="my-8 bg-slate-200" />
      <h3 className="inline-flex items-center gap-2 text-lg font-medium text-slate-900">
        <PinIcon />
        Pinned
      </h3>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }, (_, index) => (
              <Card key={`project-skeleton-${index}`} className="h-full border border-slate-200 bg-white ring-0 shadow-none">
                <CardHeader className="pb-1">
                  <Skeleton className="h-5 w-32 bg-slate-200" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full bg-slate-200" />
                  <Skeleton className="mt-2 h-4 w-3/4 bg-slate-200" />
                </CardContent>
                <CardContent className="mt-auto flex items-center justify-between pt-0">
                  <Skeleton className="h-4 w-14 bg-slate-200" />
                  <Skeleton className="h-4 w-12 bg-slate-200" />
                </CardContent>
                <CardContent className="pt-0">
                  <Skeleton className="h-5 w-20 rounded-full bg-slate-200" />
                </CardContent>
              </Card>
            ))
          : githubData.projects.map((project) => (
              <a key={project.id} href={project.url} target="_blank" rel="noreferrer" className="block">
                <Card className="h-full border border-slate-200 bg-white ring-0 shadow-none transition duration-300 hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/80">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-base font-semibold text-slate-900">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 min-h-11 text-sm text-slate-600">{project.description}</p>
                  </CardContent>
                  <CardContent className="mt-auto flex items-center justify-between pt-0 text-xs text-slate-500">
                    <span>{project.language}</span>
                    <span className="inline-flex items-center gap-1 text-amber-500">
                      <StarIcon />
                      {formatNumber(project.stars)}
                    </span>
                  </CardContent>
                  <CardContent className="pt-0">
                    <Badge variant="outline" className="border-slate-200 text-slate-500">
                      查看仓库
                    </Badge>
                  </CardContent>
                </Card>
              </a>
            ))}
      </div>
    </section>
  )
}
