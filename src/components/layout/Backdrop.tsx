import { Parallax } from '@/lib/motion'

const stars = [
  { x: '6%',  y: '12%', s: 18, speed: -0.06, d: '0s' },
  { x: '88%', y: '8%',  s: 26, speed: -0.14, d: '1s' },
  { x: '78%', y: '38%', s: 14, speed: -0.22, d: '.4s' },
  { x: '14%', y: '52%', s: 22, speed: -0.1,  d: '1.6s' },
  { x: '94%', y: '66%', s: 16, speed: -0.18, d: '2.2s' },
  { x: '48%', y: '82%', s: 20, speed: -0.08, d: '.9s' },
  { x: '30%', y: '28%', s: 12, speed: -0.26, d: '2.6s' },
  { x: '62%', y: '92%', s: 24, speed: -0.12, d: '1.2s' },
]

/* Fondo fijo: manchas de color que derivan, cambian de tono por sección y hacen parallax */
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <Parallax speed={0.05} className="absolute -top-[18vmax] -left-[16vmax]">
        <div className="blob animate-drift" style={{ background: 'radial-gradient(circle, var(--b1), transparent 65%)' }} />
      </Parallax>
      <Parallax speed={-0.04} className="absolute top-[10vh] -right-[22vmax]">
        <div className="blob animate-drift" style={{ background: 'radial-gradient(circle, var(--b2), transparent 65%)', animationDelay: '-8s', animationDirection: 'alternate-reverse' }} />
      </Parallax>
      <Parallax speed={0.07} className="absolute -bottom-[26vmax] left-[18vw]">
        <div className="blob animate-drift" style={{ background: 'radial-gradient(circle, var(--b3), transparent 65%)', animationDelay: '-15s' }} />
      </Parallax>

      {stars.map((st, i) => (
        <Parallax key={i} speed={st.speed} className="absolute" style={{ left: st.x, top: st.y }}>
          <svg
            width={st.s}
            height={st.s}
            viewBox="-10 -10 20 20"
            className="animate-twinkle text-ink"
            style={{ animationDelay: st.d }}
          >
            <path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10Z" fill="currentColor" opacity=".55" />
          </svg>
        </Parallax>
      ))}
    </div>
  )
}
