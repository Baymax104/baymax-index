import type { RefObject } from 'react'
import { sectionClass } from '@/utils/animation'

interface AboutSectionProps {
  sectionRef: RefObject<HTMLElement | null>
  visible: boolean
}

const profileFacts = [
  { label: '研究方向', value: '大模型应用' },
  { label: '状态', value: 'AI算法实习中' },
  { label: '关键词', value: '代码 | 音乐 | 魔方' },
  { label: '能量来源', value: '新技术和好旋律' },
]

const identityTags = [
  {
    tag: '# 程序员',
    content: '研二，目前在一家AI公司算法岗实习🧑‍💻',
    style: 'border-fuchsia-200 bg-gradient-to-r from-fuchsia-100 via-pink-100 to-rose-100 text-fuchsia-700',
  },
  {
    tag: '# 阿巴阿巴人机',
    content: 'MBTI是ISTJ，人机程度100%🤖',
    style: 'border-cyan-200 bg-gradient-to-r from-cyan-100 via-sky-100 to-blue-100 text-cyan-700',
  },
  {
    tag: '# 修仙键盘侠',
    content: '爱好编程💻，探索各种各样的技术，感兴趣的都会涉猎一点',
    style: 'border-violet-200 bg-gradient-to-r from-violet-100 via-indigo-100 to-purple-100 text-violet-700',
  },
  {
    tag: '# KTV野生麦霸',
    content: '爱好唱歌🎤，听歌偏vocal，华语歌为主，对声乐略有研究',
    style: 'border-orange-200 bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 text-orange-700',
  },
  {
    tag: '# 养生魔友',
    content: '爱好玩魔方🧊，三阶魔方速拧平均12秒，参加过WCA比赛',
    style: 'border-emerald-200 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 text-emerald-700',
  },
]

export function AboutSection({ sectionRef, visible }: AboutSectionProps) {
  return (
    <section ref={sectionRef} className={sectionClass(visible, 'right')}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-50 via-sky-50 to-rose-50 p-5 sm:p-6">
        <div className="pointer-events-none absolute -left-20 -top-16 h-44 w-44 rounded-full bg-fuchsia-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-10 h-44 w-44 rounded-full bg-cyan-200/25 blur-3xl" />
        <div className="relative grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto]">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full border border-violet-200 bg-violet-100 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700">
                ABOUT BAYMAX
              </p>
              <h2 className="text-3xl font-bold text-slate-900">关于我</h2>
            </div>
            <div className="self-center py-8 text-base leading-8 text-slate-700 lg:py-10">
              <p className="text-xl font-semibold text-slate-900">Hello, 我是Baymax小振</p>
              <p className="mt-3">
                研二在读，目前在一家 AI 公司做算法方向实习，持续打磨工程与模型落地能力。
              </p>
              <p className="mt-3">
                喜欢把理性和热爱都放进生活里：写代码、听人声、玩魔方，保持稳定且长期的成长节奏。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {profileFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl border border-slate-200/80 bg-white px-3 py-2 shadow-sm shadow-slate-200/70"
                >
                  <p className="text-xs font-medium tracking-wide text-slate-500">{fact.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid h-full gap-3 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-1">
            {identityTags.map((item) => (
              <div
                key={item.tag}
                className="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 shadow-sm shadow-violet-100/80 backdrop-blur"
              >
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${item.style}`}
                >
                  {item.tag}
                </span>
                <p className="mt-2 text-sm leading-7 text-slate-700">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
