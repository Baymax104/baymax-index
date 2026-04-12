import { useRef } from 'react'
import { Footer } from '@/components/layout/Footer'
import { GithubSection } from '@/components/sections/GithubSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { socialLinks } from '@/constants/socialLinks'
import { useGitHubOverview } from '@/hooks/useGitHubOverview'
import { useInView } from '@/hooks/useInView'

function App() {
  const githubRef = useRef<HTMLElement>(null)
  const githubVisible = useInView(githubRef, 0.25)
  const { githubData, loading } = useGitHubOverview(githubVisible)

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
