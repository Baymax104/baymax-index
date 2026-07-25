import { useRef } from 'react'
import { ContentBackground } from '@/components/layout/ContentBackground'
import { Footer } from '@/components/layout/Footer'
import { AboutSection } from '@/components/sections/AboutSection'
import { GithubSection } from '@/components/sections/GithubSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { MessageBoardSection } from '@/components/sections/MessageBoardSection'
import { socialLinks } from '@/constants/socialLinks'
import { useGitHubOverview } from '@/hooks/useGitHubOverview'
import { useInView } from '@/hooks/useInView'

function App() {
  const aboutRef = useRef<HTMLElement>(null)
  const githubRef = useRef<HTMLElement>(null)
  const messageRef = useRef<HTMLElement>(null)
  const messageBoardElementRef = useRef<HTMLDivElement | null>(null)
  const aboutVisible = useInView(aboutRef, 0.2)
  const githubVisible = useInView(githubRef, 0.25)
  const messageVisible = useInView(messageRef, 0.2)
  const { githubData, loading } = useGitHubOverview(githubVisible)

  return (
    <main className="bg-slate-50 text-slate-900">
      <div className="sticky top-0 z-0">
        <HeroSection
          socialLinks={socialLinks}
          onMessageBoardClick={() => {
            messageBoardElementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        />
      </div>
      <section className="relative z-10 overflow-hidden bg-slate-50 pt-14 sm:pt-20">
        <ContentBackground />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-14 sm:px-6">
          <AboutSection sectionRef={aboutRef} visible={aboutVisible} />
          <GithubSection
            sectionRef={githubRef}
            visible={githubVisible}
            loading={loading}
            githubData={githubData}
          />
          <MessageBoardSection
            sectionRef={messageRef}
            visible={messageVisible}
            setBoardElement={(element) => {
              messageBoardElementRef.current = element
            }}
          />
        </div>
        <div className="relative z-10">
          <Footer />
        </div>
      </section>
    </main>
  )
}

export default App
