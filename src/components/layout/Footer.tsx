export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-sm text-slate-500">© {year} Baymax小振. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <a
            href="https://github.com/Baymax104"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-slate-700"
          >
            GitHub
          </a>
          <a
            href="https://blog.baymaxam.top"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-slate-700"
          >
            Blog
          </a>
          <span>Built with React</span>
        </div>
      </div>
    </footer>
  )
}
