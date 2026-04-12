import { BookOpenText, Pin, Star } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

export function BlogIcon() {
  return <BookOpenText className="h-5 w-5" strokeWidth={1.8} />
}

export function GitHubIcon() {
  return <FaGithub className="h-5 w-5" />
}

export function StarIcon() {
  return <Star className="h-3.5 w-3.5" strokeWidth={2} />
}

export function PinIcon() {
  return <Pin className="h-4 w-4" strokeWidth={2} />
}
