import { useEffect, useRef, useState } from 'react'
import { Footer } from './components/layout/Footer'
import { GithubSection } from './components/sections/GithubSection'
import { HeroSection } from './components/sections/HeroSection'
import { socialLinks } from './constants/socialLinks'
import { githubFallback } from './data/fallback'
import { useInView } from './hooks/useInView'
import { getGitHubOverview } from './services/github'
import type { GitHubOverview } from './types/profile'

function App() {
  const githubRef = useRef<HTMLElement>(null)
  const githubVisible = useInView(githubRef, 0.25)

  const [githubData, setGithubData] = useState<GitHubOverview>(githubFallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const github = await getGitHubOverview()
      setGithubData(github)
      setLoading(false)
    }

    void loadData()
  }, [])

  return (
    <main className="bg-slate-50 text-slate-900">
      <div className="sticky top-0 z-0">
        <HeroSection socialLinks={socialLinks} />
      </div>
      <section className="relative z-10 bg-slate-50 pt-14 sm:pt-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-14 sm:px-6">
          <GithubSection
            sectionRef={githubRef}
            visible={githubVisible}
            loading={loading}
            githubData={githubData}
          />
        </div>
        <Footer />
      </section>
    </main>
  )
}

export default App
