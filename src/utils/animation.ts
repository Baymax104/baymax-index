export function sectionClass(visible: boolean, direction: 'left' | 'right') {
  const offset = direction === 'left' ? '-translate-x-8' : 'translate-x-8'
  const active = visible ? 'translate-x-0 opacity-100' : `${offset} opacity-0`
  return `rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/80 transition duration-700 ${active}`
}
