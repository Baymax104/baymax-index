import type { ReactNode } from 'react'
import { BlogIcon, GitHubIcon } from '@/components/icons/SocialIcons'

export interface SocialLink {
  name: string
  href: string
  color: string
  icon: ReactNode
}

export const socialLinks: SocialLink[] = [
  {
    name: '博客',
    href: 'https://blog.baymaxam.top',
    color: '#5fb7b3',
    icon: <BlogIcon />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Baymax104',
    color: '#60a5fa',
    icon: <GitHubIcon />,
  },
]
