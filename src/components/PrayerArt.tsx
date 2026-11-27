import { useId } from 'react'
import type { PrayerTimes } from '../lib/api'

type Key = keyof Omit<PrayerTimes, 'hijri'>

/** Le ciel de chaque prière, dans une fenêtre en arc (mihrab). */
const SKIES: Record<Key, { top: string; bottom: string; ground?: string }> = {
  Fajr: { top: '#16214f', bottom: '#5b6fc0', ground: '#121a3d' },
  Sunrise: { top: '#6d58d2', bottom: '#f6ad62' },
  Dhuhr: { top: '#2a86ec', bottom: '#93d5ff' },
  Asr: { top: '#3b9ce8', bottom: '#b5e1ff', ground: '#c98549' },
  Maghrib: { top: '#e2702a', bottom: '#ffc883' },
  Isha: { top: '#0c173f', bottom: '#2a4392', ground: '#0d1636' },
}

export function PrayerArch({ prayer, size = 40 }: { prayer: Key; size?: number }) {
  const id = useId().replace(/:/g, '')
  const sky = SKIES[prayer]
  const arch = 'M3 46V21a17 17 0 0 1 34 0v25z'
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky.top} />
          <stop offset="1" stopColor={sky.bottom} />
        </linearGradient>
        <radialGradient id={`g${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6cf" />
          <stop offset="0.55" stopColor="#ffe08a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`c${id}`}>
          <path d={arch} />
        </clipPath>
      </defs>
      <g clipPath={`url(#c${id})`}>
        <rect width="40" height="46" fill={`url(#s${id})`} />
        {(prayer === 'Fajr' || prayer === 'Isha') && (
          <g fill="#fff" opacity="0.85">
            <circle cx="11" cy="15" r="0.8" />
            <circle cx="27" cy="11" r="0.6" />
            <circle cx="31" cy="22" r="0.7" />
            <circle cx="15" cy="26" r="0.5" />
            <circle cx="22" cy="18" r="0.45" />
          </g>
        )}
        {prayer === 'Isha' && <path d="M24 13.5a6.5 6.5 0 1 0 5 10.6 5.2 5.2 0 0 1-5-10.6z" fill="#ffe7a6" />}
        {prayer === 'Fajr' && <rect y="34" width="40" height="12" fill="#8fa1e6" opacity="0.35" />}
        {prayer === 'Sunrise' && <circle cx="20" cy="40" r="8" fill="#ff7b3a" />}
        {prayer === 'Maghrib' && <circle cx="20" cy="39" r="8.5" fill="#ff6a2b" />}
        {prayer === 'Dhuhr' && (
          <>
            <circle cx="20" cy="20" r="11" fill={`url(#g${id})`} />
            <circle cx="20" cy="20" r="5" fill="#fff8dc" />
          </>
        )}
        {prayer === 'Asr' && (
          <>
            <circle cx="25" cy="25" r="9" fill={`url(#g${id})`} />
            <circle cx="25" cy="25" r="4.2" fill="#fff4cf" />
          </>
        )}
        {sky.ground && <path d="M0 40c8-4 16-5 24-3s12 2 16 0v9H0z" fill={sky.ground} />}
      </g>
    </svg>
  )
}
