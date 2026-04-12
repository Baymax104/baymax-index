import { useEffect, useState, type RefObject } from 'react'

export function useInView<T extends HTMLElement>(ref: RefObject<T | null>, threshold = 0.2) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || visible) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold, visible])

  return visible
}
