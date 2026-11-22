import type { Pose } from '../data/prayer'
import type { WuduPart } from '../data/wudu'

/* ------------------------------------------------------------------ */
/* Positions de la prière — silhouettes pédagogiques, vue de profil,   */
/* la personne regarde vers la droite (direction de la qibla).         */
/* ------------------------------------------------------------------ */

type Fig = { head: [number, number, number]; lines: string[]; faint?: string[]; extra?: 'finger' | 'turn' }

const STAND_LEGS = ['M80 82 L76 122', 'M80 82 L85 122']
const POSES: Record<Pose, Fig> = {
  debout: { head: [80, 30, 10], lines: ['M80 42 L80 82', ...STAND_LEGS, 'M80 48 L78 68 L80 84'] },
  takbir: { head: [80, 30, 10], lines: ['M80 42 L80 82', ...STAND_LEGS, 'M80 48 L97 56 L100 33'], faint: ['M80 48 L93 58 L95 35'] },
  qiyam: { head: [80, 30, 10], lines: ['M80 42 L80 82', ...STAND_LEGS, 'M80 48 L74 64 L90 62'], faint: ['M80 48 L76 66 L92 64'] },
  itidal: { head: [80, 30, 10], lines: ['M80 42 L80 82', ...STAND_LEGS, 'M80 48 L79 68 L81 84'] },
  ruku: { head: [118, 79, 9.5], lines: ['M66 82 L64 122', 'M66 82 L69 122', 'M66 82 L106 79', 'M102 80 L86 92 L69 101'] },
  sujud: { head: [109, 113, 9], lines: ['M40 121 L64 122', 'M64 122 L57 88', 'M57 88 L97 107', 'M92 106 L86 117 L102 122'] },
  jalsa: { head: [72, 62, 10], lines: ['M100 121 L64 122', 'M66 112 L100 119', 'M66 112 L70 74', 'M70 80 L80 98 L96 111'] },
  tashahhud: { head: [72, 62, 10], lines: ['M100 121 L64 122', 'M66 112 L100 119', 'M66 112 L70 74', 'M70 80 L82 98 L94 109'], extra: 'finger' },
  salam: { head: [72, 62, 10], lines: ['M100 121 L64 122', 'M66 112 L100 119', 'M66 112 L70 74', 'M70 80 L80 98 L96 111'], extra: 'turn' },
}

export const POSE_LABEL: Record<Pose, string> = {
  debout: 'Debout, face à la qibla',
  takbir: 'Takbir : mains levées',
  qiyam: 'Qiyâm : debout, mains posées',
  itidal: 'I‘tidâl : redressé',
  ruku: 'Rukû‘ : inclinaison',
  sujud: 'Sujûd : prosternation',
  jalsa: 'Jalsa : assis',
  tashahhud: 'Tachahhoud : index levé',
  salam: 'Salam : tête à droite puis à gauche',
}

export function PrayerFigure({ pose, className = '', showLabel = false }: { pose: Pose; className?: string; showLabel?: boolean }) {
  const f = POSES[pose]
  return (
    <figure className={className}>
      <svg viewBox="0 0 160 140" className="h-full w-full" role="img" aria-label={POSE_LABEL[pose]}>
        <defs>
          <linearGradient id="mat" x1="0" x2="1">
            <stop offset="0" stopColor="var(--gold)" stopOpacity="0.25" />
            <stop offset="1" stopColor="var(--gold)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* arche discrète */}
        <path d="M22 124 V60 a58 52 0 0 1 116 0 V124" fill="none" stroke="var(--gold)" strokeOpacity="0.25" strokeWidth="1.2" />
        <path d="M80 12 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3z" fill="var(--gold)" opacity="0.35" />
        {/* tapis */}
        <rect x="26" y="123" width="108" height="6" rx="2" fill="url(#mat)" stroke="var(--gold)" strokeOpacity="0.6" strokeWidth="0.8" />
        {/* direction qibla */}
        <g opacity="0.7">
          <path d="M138 30 h12 m-4 -4 l4 4 -4 4" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
          <text x="144" y="22" textAnchor="middle" fontSize="7" fill="var(--muted)" fontFamily="var(--font-sans)">
            qibla
          </text>
        </g>
        <g fill="none" stroke="var(--primary)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all .4s' }}>
          {f.faint?.map((d) => <path key={d} d={d} opacity="0.35" />)}
          {f.lines.map((d) => <path key={d} d={d} />)}
          {f.extra === 'finger' && <path d="M94 109 L101 101" strokeWidth="3.5" stroke="var(--gold)" />}
        </g>
        <circle cx={f.head[0]} cy={f.head[1]} r={f.head[2]} fill="var(--primary)" />
        {f.extra === 'turn' && (
          <g fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round">
            <path d="M86 52 q10 10 0 20" />
            <path d="M83 70 l3 2 1-4" />
            <path d="M58 52 q-10 10 0 20" opacity="0.6" />
            <path d="M61 70 l-3 2 -1-4" opacity="0.6" />
          </g>
        )}
      </svg>
      {showLabel && <figcaption className="mt-1 text-center text-xs font-semibold text-muted">{POSE_LABEL[pose]}</figcaption>}
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* Illustrations des ablutions                                         */
/* ------------------------------------------------------------------ */

const Drop = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 -7 C4 -2 6 1 6 4 a6 6 0 0 1 -12 0 c0 -3 2 -6 6 -11z" fill="#5aa9d6" opacity="0.85" />
)

export function WuduFigure({ part, className = '' }: { part: WuduPart; className?: string }) {
  const hl = 'var(--gold)'
  const base = 'var(--primary)'
  const face = (zone: 'visage' | 'bouche' | 'nez' | 'tete' | 'oreilles') => (
    <g>
      {/* épaules */}
      <path d="M38 132 c4-22 20-30 42-30 s38 8 42 30" fill="none" stroke={base} strokeWidth="5" strokeLinecap="round" />
      {/* tête */}
      <ellipse cx="80" cy="60" rx="28" ry="34" fill={zone === 'visage' ? hl : 'var(--surface-2)'} fillOpacity={zone === 'visage' ? 0.45 : 1} stroke={base} strokeWidth="4" />
      {/* cheveux / tête */}
      <path d="M52 52 c2-22 14-30 28-30 s26 8 28 30 c-8-8-18-12-28-12 s-20 4-28 12z" fill={zone === 'tete' ? hl : base} fillOpacity={zone === 'tete' ? 0.8 : 0.85} />
      {/* oreilles */}
      <ellipse cx="51" cy="62" rx="5" ry="9" fill={zone === 'oreilles' ? hl : 'var(--surface-2)'} stroke={base} strokeWidth="3" />
      <ellipse cx="109" cy="62" rx="5" ry="9" fill={zone === 'oreilles' ? hl : 'var(--surface-2)'} stroke={base} strokeWidth="3" />
      {/* yeux */}
      <circle cx="70" cy="58" r="2.5" fill={base} />
      <circle cx="90" cy="58" r="2.5" fill={base} />
      {/* nez */}
      <path d="M80 60 l-4 12 h8" fill={zone === 'nez' ? hl : 'none'} stroke={base} strokeWidth="2.5" strokeLinejoin="round" />
      {/* bouche */}
      <path d="M71 81 q9 7 18 0" fill={zone === 'bouche' ? hl : 'none'} stroke={base} strokeWidth="3" strokeLinecap="round" />
      {zone === 'bouche' && <circle cx="80" cy="83" r="12" fill="none" stroke={hl} strokeWidth="2.5" strokeDasharray="3 3" />}
      {zone === 'nez' && <circle cx="80" cy="67" r="12" fill="none" stroke={hl} strokeWidth="2.5" strokeDasharray="3 3" />}
      {zone === 'tete' && <path d="M60 30 q20 -14 40 0" fill="none" stroke={hl} strokeWidth="3" strokeDasharray="4 4" markerEnd="url(#arr)" />}
      {zone === 'visage' && <Drop x={118} y={40} />}
      {zone === 'bouche' && <Drop x={110} y={92} />}
      {zone === 'nez' && <Drop x={104} y={78} s={0.8} />}
    </g>
  )

  let content: React.ReactNode
  switch (part) {
    case 'coeur':
      content = (
        <g>
          <path d="M80 118 C30 86 34 44 58 40 c12-2 18 6 22 14 c4-8 10-16 22-14 c24 4 28 46-22 78z" fill={hl} fillOpacity="0.35" stroke={base} strokeWidth="4" strokeLinejoin="round" />
          <text x="80" y="82" textAnchor="middle" fontSize="20" fill={base} fontFamily="var(--font-arabic)">نِيَّة</text>
        </g>
      )
      break
    case 'bismillah':
      content = (
        <g>
          <rect x="20" y="44" width="120" height="56" rx="14" fill={hl} fillOpacity="0.18" stroke={hl} strokeWidth="1.5" />
          <text x="80" y="82" textAnchor="middle" fontSize="28" fill={base} fontFamily="var(--font-arabic)">بِسْمِ اللَّهِ</text>
        </g>
      )
      break
    case 'mains':
      content = (
        <g stroke={base} strokeWidth="4" strokeLinejoin="round" fill={hl} fillOpacity="0.3">
          <path d="M44 120 v-34 c0-6 8-6 8 0 v-26 c0-6 8-6 8 0 v22 v-28 c0-6 8-6 8 0 v28 v-22 c0-6 8-6 8 0 v40 c0 14-8 22-20 22 c-8 0-12-4-12-2z" />
          <path d="M116 120 v-34 c0-6-8-6-8 0 v-26 c0-6-8-6-8 0 v22 v-28 c0-6-8-6-8 0 v28 v-22 c0-6-8-6-8 0 v40 c0 14 8 22 20 22 c8 0 12-4 12-2z" />
          <Drop x={80} y={28} />
          <Drop x={68} y={40} s={0.7} />
          <Drop x={92} y={40} s={0.7} />
        </g>
      )
      break
    case 'bras':
      content = (
        <g>
          <path d="M18 98 c10-8 24-10 40-10 h50 c10 0 20 6 26 14" fill="none" stroke={base} strokeWidth="18" strokeLinecap="round" opacity="0.25" />
          <path d="M18 98 c10-8 24-10 40-10 h50" fill="none" stroke={hl} strokeWidth="18" strokeLinecap="round" opacity="0.7" />
          <circle cx="112" cy="90" r="8" fill="none" stroke={base} strokeWidth="3" strokeDasharray="3 3" />
          <text x="112" y="120" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="var(--font-sans)">coude inclus</text>
          <path d="M14 98 l-6 -8 m6 8 l-8 2 m8 -2 l-6 8" stroke={base} strokeWidth="3" strokeLinecap="round" />
          <Drop x={60} y={64} />
          <Drop x={84} y={60} s={0.8} />
        </g>
      )
      break
    case 'pieds':
      content = (
        <g>
          <path d="M40 110 c0-10 10-14 22-16 l20-4 c6-14 10-30 10-46 h20 c0 20 2 40 6 56 c4 14 2 22-10 24 h-54 c-10 0-14-6-14-14z" fill={hl} fillOpacity="0.35" stroke={base} strokeWidth="4" strokeLinejoin="round" />
          <circle cx="104" cy="86" r="9" fill="none" stroke={base} strokeWidth="3" strokeDasharray="3 3" />
          <text x="117" y="80" textAnchor="start" fontSize="9" fill="var(--muted)" fontFamily="var(--font-sans)">cheville</text>
          <path d="M44 106 h4 m4 -2 h4 m4 -2 h4" stroke={base} strokeWidth="2.5" strokeLinecap="round" />
          <Drop x={70} y={70} />
          <Drop x={118} y={110} s={0.8} />
        </g>
      )
      break
    default:
      content = face(part)
  }

  return (
    <svg viewBox="0 0 160 140" className={className} role="img" aria-label={`Illustration : ${part}`}>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10z" fill="var(--gold)" />
        </marker>
      </defs>
      <circle cx="80" cy="74" r="64" fill="var(--primary-soft)" opacity="0.5" />
      {content}
    </svg>
  )
}
