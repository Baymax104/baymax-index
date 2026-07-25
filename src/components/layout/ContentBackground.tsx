const accentLines = [
  { left: '8%', top: '5rem', width: '4.5rem', rotate: '-45deg', hideOnMobile: false },
  { left: '18%', top: '23rem', width: '3.5rem', rotate: '-44deg', hideOnMobile: false },
  { left: '58%', top: '8rem', width: '3.75rem', rotate: '-2deg', hideOnMobile: true },
  { right: '10%', top: '3.25rem', width: '3.25rem', rotate: '92deg', hideOnMobile: true },
  { right: '16%', top: '29rem', width: '4rem', rotate: '-42deg', hideOnMobile: false },
  { left: '9%', top: '46rem', width: '3rem', rotate: '72deg', hideOnMobile: true },
  { right: '7%', top: '58rem', width: '5rem', rotate: '18deg', hideOnMobile: true },
  { left: '14%', bottom: '6rem', width: '4rem', rotate: '55deg', hideOnMobile: true },
]

const specks = [
  { left: '3%', top: '20rem' },
  { left: '21%', top: '31rem' },
  { left: '38%', top: '6.5rem' },
  { right: '14%', top: '22rem' },
  { right: '3%', top: '35rem' },
  { left: '16%', top: '62rem' },
  { right: '25%', top: '68rem' },
  { right: '9%', bottom: '10rem' },
]

export function ContentBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.18) 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
      />
      {accentLines.map((line, index) => (
        <span
          key={`line-${index}`}
          className={`absolute h-px bg-slate-300/65 ${line.hideOnMobile ? 'hidden sm:block' : ''}`}
          style={{
            left: line.left,
            right: line.right,
            top: line.top,
            bottom: line.bottom,
            width: line.width,
            transform: `rotate(${line.rotate})`,
          }}
        />
      ))}
      {specks.map((speck, index) => (
        <span
          key={`speck-${index}`}
          className="absolute h-0.5 w-0.5 bg-slate-400/65"
          style={{
            left: speck.left,
            right: speck.right,
            top: speck.top,
            bottom: speck.bottom,
          }}
        />
      ))}
    </div>
  )
}
