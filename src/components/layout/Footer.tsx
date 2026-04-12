import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-sm text-slate-500">© {year} Baymax小振. All rights reserved.</p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <a
            href="https://github.com/Baymax104"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-slate-700"
          >
            <Badge variant="outline" className="border-slate-200 text-slate-600">
              GitHub
            </Badge>
          </a>
          <Separator orientation="vertical" className="h-4 bg-slate-300" />
          <a
            href="https://blog.baymaxam.top"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-slate-700"
          >
            <Badge variant="outline" className="border-slate-200 text-slate-600">
              Blog
            </Badge>
          </a>
          <Separator orientation="vertical" className="h-4 bg-slate-300" />
          <Badge variant="secondary" className="bg-slate-100 text-slate-600">
            Built with React
          </Badge>
        </div>
      </div>
    </footer>
  )
}
