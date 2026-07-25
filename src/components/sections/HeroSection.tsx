import { ChevronUp, MessageCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { SocialLink } from '@/constants/socialLinks'
import { Typewriter } from 'react-simple-typewriter'



interface HeroSectionProps {
  socialLinks: SocialLink[]
  onMessageBoardClick: () => void
}

export function HeroSection({ socialLinks, onMessageBoardClick }: HeroSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const updateProgress = () => {
      const viewportHeight = window.innerHeight || 1
      const progress = Math.min(window.scrollY / viewportHeight, 1)
      setScrollProgress(progress)
      rafIdRef.current = null
    }

    const onScroll = () => {
      if (rafIdRef.current !== null) {
        return
      }
      rafIdRef.current = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  const contentOffset = -scrollProgress * 220
  const contentOpacity = Math.max(1 - scrollProgress * 1.15, 0)

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <img src="/banner.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/58" />
      <div
        style={{ transform: `translateY(${contentOffset}px)`, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-6xl px-8 py-20 text-center sm:px-14 sm:py-28 lg:px-24"
      >
        <a
          href="https://blog.baymaxam.top/about/"
          target="_blank"
          rel="noreferrer"
          className="group relative mx-auto block w-fit ring-4 ring-white/50 overflow-hidden rounded-full"
        >
          <img
            src="/avatar.jpg"
            alt="Baymax小振头像"
            className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
          />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-black/0 transition duration-200 group-hover:bg-black/45" />
        </a>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          <Typewriter
            words={['Baymax小振']}
            typeSpeed={160}
            loop={true}
            cursor={true}
          />
        </h1>
        <div className="mx-auto mt-6 w-fit cursor-default select-none text-base leading-8 text-slate-100/90 sm:text-lg">
          <div className="group relative overflow-hidden">
            <span className="invisible">●—● 碰个拳~</span>
            <span className="absolute inset-0 transition duration-300 ease-out group-hover:-translate-y-full">
              ●—● 碰个拳~
            </span>
            <span className="absolute inset-0 translate-y-full transition duration-300 ease-out group-hover:translate-y-0">
              Balalalala~
            </span>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{ ['--hover-color' as string]: link.color }}
              className="group inline-flex min-w-32 items-center justify-center gap-2 rounded-xl border border-white/40 bg-black/35 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--hover-color)] hover:bg-[color-mix(in_srgb,var(--hover-color)_20%,rgba(15,23,42,0.82))] hover:shadow-[0_0_14px_color-mix(in_srgb,var(--hover-color)_42%,transparent)]"
            >
              <span className="text-white group-hover:text-[var(--hover-color)]">{link.icon}</span>
              <span className="text-white group-hover:text-[var(--hover-color)]">{link.name}</span>
            </a>
          ))}
          <button
            type="button"
            onClick={onMessageBoardClick}
            style={{ ['--hover-color' as string]: '#fbbf24' }}
            className="group inline-flex min-w-32 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/40 bg-black/35 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--hover-color)] hover:bg-[color-mix(in_srgb,var(--hover-color)_20%,rgba(15,23,42,0.82))] hover:shadow-[0_0_14px_color-mix(in_srgb,var(--hover-color)_42%,transparent)]"
          >
            <span className="text-white group-hover:text-[var(--hover-color)]">
              <MessageCircle className="h-4 w-4" />
            </span>
            <span className="text-white group-hover:text-[var(--hover-color)]">留言板</span>
          </button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center">
        <div className="inline-flex flex-col items-center gap-1 text-white/90">
          <span className="text-xs tracking-[0.18em] text-white/70">PULL UP</span>
          <ChevronUp className="h-5 w-5 animate-bounce" strokeWidth={2.4} />
        </div>
      </div>
    </section>
  )
}
