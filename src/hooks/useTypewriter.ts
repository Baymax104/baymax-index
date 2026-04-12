import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 120) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let timeoutId: number | undefined

    const tick = () => {
      setCurrentIndex((index) => {
        if (index >= text.length) {
          window.clearTimeout(timeoutId)
          timeoutId = window.setTimeout(() => {
            setCurrentIndex(0)
            timeoutId = window.setTimeout(tick, speed)
          }, 3000)
          return index
        }
        window.clearTimeout(timeoutId)
        timeoutId = window.setTimeout(tick, speed)
        return index + 1
      })
    }

    timeoutId = window.setTimeout(tick, speed)

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [text, speed])

  return text.slice(0, currentIndex)
}
