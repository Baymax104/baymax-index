import { useEffect, useRef, type RefObject } from 'react'
import { sectionClass } from '@/utils/animation'

const GISCUS_SCRIPT_SRC = 'https://giscus.app/client.js'

interface MessageBoardSectionProps {
  sectionRef: RefObject<HTMLElement | null>
  visible: boolean
  setBoardElement: (element: HTMLDivElement | null) => void
}

export function MessageBoardSection({
  sectionRef,
  visible,
  setBoardElement,
}: MessageBoardSectionProps) {
  const boardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = boardRef.current
    if (!container) {
      return
    }

    container.replaceChildren()
    const script = document.createElement('script')
    script.src = GISCUS_SCRIPT_SRC
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', 'Baymax104/baymax-blog')
    script.setAttribute('data-repo-id', 'R_kgDOPgcTmQ')
    script.setAttribute('data-mapping', 'number')
    script.setAttribute('data-term', '3')
    script.setAttribute('data-reactions-enabled', '0')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')
    container.appendChild(script)

    return () => {
      container.replaceChildren()
    }
  }, [])

  return (
    <section ref={sectionRef} className={sectionClass(visible, 'right')}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">留言板</h2>
        <p className="text-sm text-slate-500">欢迎留言交流</p>
      </div>
      <div
        ref={(element) => {
          boardRef.current = element
          setBoardElement(element)
        }}
        className="min-h-44 scroll-mt-2"
      />
    </section>
  )
}
