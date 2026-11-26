/*
 * Jeu d'icônes de Rûh, dessiné pour l'application (grille 24, trait 1,6, extrémités arrondies).
 * Les icônes propres à Rûh reprennent des formes de l'art islamique : arc de mihrab, rehal,
 * tapis de prière, aiguière des ablutions, tasbih, minaret, étoile à huit branches.
 * `d` = tracé ; `f` = zone teintée quand l'icône est « pleine » (onglet actif, état sélectionné).
 */
type Glyph = { d: string; f?: string }

const g = (d: string, f?: string): Glyph => ({ d, f })

const glyphs: Record<string, Glyph> = {
  /* ---- Rubriques ---- */
  // Arc de mihrab avec sa porte
  home: g('M4.5 20.5V11a7.5 7.5 0 0 1 15 0v9.5zM10 20.5v-4.2a2 2 0 0 1 4 0v4.2M3 20.5h18', 'M4.5 20.5V11a7.5 7.5 0 0 1 15 0v9.5z'),
  // Coran ouvert posé sur un rehal
  book: g('M3 5.6c3.1-1 6-.6 9 1.4 3-2 5.9-2.4 9-1.4v8.8c-3.1-1-6-.6-9 1.4-3-2-5.9-2.4-9-1.4zM12 7v8.8M7.5 20.5l9-4.2M16.5 20.5l-9-4.2', 'M3 5.6c3.1-1 6-.6 9 1.4 3-2 5.9-2.4 9-1.4v8.8c-3.1-1-6-.6-9 1.4-3-2-5.9-2.4-9-1.4z'),
  // Livre d'étude avec son signet
  graduation: g('M5 5.5A2.5 2.5 0 0 1 7.5 3H19v14.5H7.5A2.5 2.5 0 0 0 5 20zM5 20a2.5 2.5 0 0 0 2.5 1H19M10 3v6l2-1.4L14 9V3', 'M5 5.5A2.5 2.5 0 0 1 7.5 3H19v14.5H7.5A2.5 2.5 0 0 0 5 20z'),
  // Tapis de prière (sajjâda) avec son arc et ses franges
  prayer: g('M6 4h12v15H6zM9 16v-5.5a3 3 0 0 1 6 0V16M6.5 21v-2M9.5 21v-2M12 21v-2M14.5 21v-2M17.5 21v-2', 'M6 4h12v15H6z'),
  // « Pas à pas » : un chemin de marches
  chart: g('M3.5 19.5h4.2v-4.3h4.2V11h4.2V6.7h4.4M3.5 19.5h17', 'M7.7 19.5v-4.3h4.2V11h4.2V6.7h4.4v12.8z'),
  // « Plus » : trois points
  grid: g('M5.5 12h.01M12 12h.01M18.5 12h.01'),
  more: g('M5.5 12h.01M12 12h.01M18.5 12h.01'),

  /* ---- Pratique ---- */
  // Aiguière des ablutions (ibrîq)
  drop: g('M9.5 6.5V4.8h5v1.7M8 10c0-2 1.6-3.5 4-3.5s4 1.5 4 3.5v5.5a4 4 0 0 1-8 0zM16 11l3.8-3M8 11.2C5.8 11.2 5 12.4 5 14s1 2.6 3 2.6M9 21h6', 'M8 10c0-2 1.6-3.5 4-3.5s4 1.5 4 3.5v5.5a4 4 0 0 1-8 0z'),
  // Deux mains levées pour l'invocation
  hands: g('M10.5 20.5c-3 0-5.5-2.2-5.5-5.5V8.2a1.3 1.3 0 0 1 2.6 0v4.3M7.6 11V5.8a1.3 1.3 0 0 1 2.6 0v6.7M13.5 20.5c3 0 5.5-2.2 5.5-5.5V8.2a1.3 1.3 0 0 0-2.6 0v4.3M16.4 11V5.8a1.3 1.3 0 0 0-2.6 0v6.7', 'M10.5 20.5c-3 0-5.5-2.2-5.5-5.5V8.2a1.3 1.3 0 0 1 2.6 0V5.8a1.3 1.3 0 0 1 2.6 0v6.7zM13.5 20.5c3 0 5.5-2.2 5.5-5.5V8.2a1.3 1.3 0 0 0-2.6 0V5.8a1.3 1.3 0 0 0-2.6 0v6.7z'),
  // Tasbih : grains en cercle et pompon
  beads: g('M12 3.2a1.1 1.1 0 1 0 0 .01M16.9 5.1a1.1 1.1 0 1 0 0 .01M18.8 10a1.1 1.1 0 1 0 0 .01M16.9 14.9a1.1 1.1 0 1 0 0 .01M7.1 14.9a1.1 1.1 0 1 0 0 .01M5.2 10a1.1 1.1 0 1 0 0 .01M7.1 5.1a1.1 1.1 0 1 0 0 .01M12 16.8v2M10.4 21.5l1.6-2.7 1.6 2.7'),
  // Minaret (horaires de prière)
  clock: g('M9.5 21V10l2.5-3 2.5 3v11M8 21h8M9.5 13.5h5M12 7V4.6M12 3.2a.9.9 0 1 0 0 .01', 'M9.5 21V10l2.5-3 2.5 3v11z'),
  minaret: g('M9.5 21V10l2.5-3 2.5 3v11M8 21h8M9.5 13.5h5M12 7V4.6M12 3.2a.9.9 0 1 0 0 .01', 'M9.5 21V10l2.5-3 2.5 3v11z'),
  // Mosquée : coupole, porte et deux minarets
  mosque: g('M2.5 21h19M6 21v-6.5a6 6 0 0 1 12 0V21M12 5.5V3.5M10 21v-3a2 2 0 0 1 4 0v3M3.5 21v-9l1-1.5 1 1.5M18.5 12l1-1.5 1 1.5v9', 'M6 21v-6.5a6 6 0 0 1 12 0V21z'),
  bell: g('M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15zM10 20.5a2 2 0 0 0 4 0', 'M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z'),
  bellOff: g('M8.5 5.8A6 6 0 0 1 18 11v4M6 11v5.5L4.5 18h12M10 20.5a2 2 0 0 0 4 0M3.5 3.5l17 17'),
  compass: g('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.8 8.2l-2.2 5.4-5.4 2.2 2.2-5.4z', 'M15.8 8.2l-2.2 5.4-5.4 2.2 2.2-5.4z'),
  pin: g('M12 21.5s-6.5-5.8-6.5-11.2a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11.2-6.5 11.2zM12 12.6a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6z', 'M12 21.5s-6.5-5.8-6.5-11.2a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11.2-6.5 11.2z'),
  locate: g('M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'),

  /* ---- Apprendre ---- */
  // Lettre bâ’ : la cuvette et son point
  letters: g('M3.5 10.5c0 3.6 2.6 5.8 8.5 5.8s8.5-2.2 8.5-5.8M12 20h.01'),
  // Étoile à huit branches (rub‘ el hizb)
  star: g('M12 2.8l2.6 2.6h3.9v3.9l2.7 2.7-2.7 2.7v3.9h-3.9L12 21.2l-2.6-2.6H5.5v-3.9L2.8 12l2.7-2.7V5.4h3.9z', 'M12 2.8l2.6 2.6h3.9v3.9l2.7 2.7-2.7 2.7v3.9h-3.9L12 21.2l-2.6-2.6H5.5v-3.9L2.8 12l2.7-2.7V5.4h3.9z'),
  sparkle: g('M12 3.5c.6 4 2.5 5.9 6.5 6.5-4 .6-5.9 2.5-6.5 6.5-.6-4-2.5-5.9-6.5-6.5 4-.6 5.9-2.5 6.5-6.5zM18.5 16c.3 1.6 1 2.2 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-.9 2.5-2.5z', 'M12 3.5c.6 4 2.5 5.9 6.5 6.5-4 .6-5.9 2.5-6.5 6.5-.6-4-2.5-5.9-6.5-6.5 4-.6 5.9-2.5 6.5-6.5z'),
  columns: g('M3 20.5h18M4.5 20.5v-10M9.5 20.5v-10M14.5 20.5v-10M19.5 20.5v-10M3 8l9-5 9 5z', 'M3 8l9-5 9 5z'),
  leaf: g('M5 19c0-8 4.5-13 15-14-1 10.5-6 15-14 15M5 19c2.5-4 5.5-7 9.5-9', 'M5 19c0-8 4.5-13 15-14-1 10.5-6 15-14 15z'),
  trophy: g('M8 20.5h8M12 16.5v4M7 3.5h10V9a5 5 0 0 1-10 0zM17 5h2.5v1.5A3.5 3.5 0 0 1 16.5 10M7 5H4.5v1.5A3.5 3.5 0 0 0 7.5 10', 'M7 3.5h10V9a5 5 0 0 1-10 0z'),
  help: g('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.4 9.3a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2.4-2.6 3.8M12 17h.01', 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'),
  calendar: g('M4 5.5h16V20H4zM8 3.5v4M16 3.5v4M4 10h16M13.6 12.6a2.8 2.8 0 1 0 2.5 4.1 2.2 2.2 0 0 1-2.5-4.1z', 'M4 5.5h16V10H4z'),
  heart: g('M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z', 'M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z'),
  bookmark: g('M6.5 3.5h11V21L12 17l-5.5 4z', 'M6.5 3.5h11V21L12 17l-5.5 4z'),
  user: g('M12 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c.8-3.6 3.8-6 7.5-6s6.7 2.4 7.5 6', 'M12 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'),
  settings: g('M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10.3 3h3.4l.5 2.4 1.6.9 2.3-.8 1.7 2.9-1.8 1.6v1.9l1.8 1.6-1.7 2.9-2.3-.8-1.6.9-.5 2.4h-3.4l-.5-2.4-1.6-.9-2.3.8-1.7-2.9 1.8-1.6V11L4.2 9.4l1.7-2.9 2.3.8 1.6-.9z'),
  target: g('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 12.01V12'),
  layers: g('M12 3 2.5 8 12 13l9.5-5zM2.5 12.5 12 17.5l9.5-5M2.5 16.5 12 21.5l9.5-5'),

  /* ---- Interface ---- */
  check: g('M5 12.5l4.5 4.5L19 7.5'),
  checkCircle: g('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12.3l2.8 2.8L16.2 9.6', 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z'),
  search: g('M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4zM16 16l4.5 4.5'),
  sun: g('M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 2.5v1.8M12 19.7v1.8M4.6 4.6l1.3 1.3M18.1 18.1l1.3 1.3M2.5 12h1.8M19.7 12h1.8M4.6 19.4l1.3-1.3M18.1 5.9l1.3-1.3'),
  // Croissant de lune
  moon: g('M19.5 14.6A8 8 0 0 1 9.4 4.5 8 8 0 1 0 19.5 14.6z', 'M19.5 14.6A8 8 0 0 1 9.4 4.5 8 8 0 1 0 19.5 14.6z'),
  play: g('M7 4.5v15l12.5-7.5z'),
  pause: g('M7 4.5h3.5v15H7zM13.5 4.5H17v15h-3.5z'),
  next: g('M5 5v14l10-7zM16.5 5H19v14h-2.5z'),
  prev: g('M19 19V5L9 12zM7.5 5H5v14h2.5z'),
  repeat: g('M17 2.5l3.5 3.5L17 9.5M3.5 11V9.5A3.5 3.5 0 0 1 7 6h13.5M7 21.5 3.5 18 7 14.5M20.5 13v1.5A3.5 3.5 0 0 1 17 18H3.5'),
  expand: g('M8.5 3.5h-5v5M15.5 3.5h5v5M3.5 15.5v5h5M20.5 15.5v5h-5'),
  x: g('M17.5 6.5l-11 11M6.5 6.5l11 11'),
  sidebar: g('M3.5 5h17v14h-17zM9.5 5v14'),
  menu: g('M4 7h16M4 12h16M4 17h16'),
  chevronRight: g('M9.5 5.5 16 12l-6.5 6.5'),
  chevronLeft: g('M14.5 5.5 8 12l6.5 6.5'),
  chevronDown: g('M5.5 9.5 12 16l6.5-6.5'),
  back: g('M15 4.5 7.5 12l7.5 7.5'),
  info: g('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5V11M12 7.6h.01'),
  alert: g('M10.4 4.3 2.6 18a1.8 1.8 0 0 0 1.6 2.7h15.6a1.8 1.8 0 0 0 1.6-2.7L13.6 4.3a1.8 1.8 0 0 0-3.2 0zM12 9.5v4M12 17.2h.01'),
  volume: g('M11 5 6.5 9H3v6h3.5L11 19zM15.5 9a4.2 4.2 0 0 1 0 6M18.5 6a8.5 8.5 0 0 1 0 12'),
  plus: g('M12 5v14M5 12h14'),
  minus: g('M5 12h14'),
  trash: g('M4 6.5h16M9 6.5V4h6v2.5M18 6.5l-.9 13.5H6.9L6 6.5M10 10.5v6M14 10.5v6'),
  refresh: g('M20 4.5v5h-5M4 19.5v-5h5M5.2 9.5A7.5 7.5 0 0 1 18.4 8L20 9.5M4 14.5 5.6 16a7.5 7.5 0 0 0 13.2-1.5'),
  download: g('M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4 16.5v3.5h16v-3.5'),
  upload: g('M12 15V4M7.5 8.5 12 4l4.5 4.5M4 16.5v3.5h16v-3.5'),
  list: g('M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01'),
  arrowLeft: g('M19 12H5.5M11.5 18 5.5 12l6-6'),
  arrowRight: g('M5 12h13.5M12.5 6l6 6-6 6'),
  eye: g('M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12zM12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z'),
  eyeOff: g('M10 5.7A10 10 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a17 17 0 0 1-2.4 3.1M6.4 7.2A16 16 0 0 0 2 12s3.6 6.5 10 6.5a9.6 9.6 0 0 0 4.6-1.2M9.9 9.9a2.8 2.8 0 0 0 4 4M3.5 3.5l17 17'),
  shuffle: g('M16 4h4v4M4 19.5 20 4M20 16v4h-4M14.5 14.5 20 20M4 4.5l5 5'),
  map: g('M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5zM9 4.5v13M15 6.5v13'),
}

export type IconName = keyof typeof glyphs

export function Icon({ name, size = 20, className = '', strokeWidth = 1.6, title, filled = false }: { name: IconName | string; size?: number; className?: string; strokeWidth?: number; title?: string; filled?: boolean }) {
  const glyph = glyphs[name] ?? glyphs.info
  const solid = name === 'play' || name === 'pause' || name === 'next' || name === 'prev'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {filled && glyph.f && <path d={glyph.f} fill="currentColor" stroke="none" opacity={0.22} />}
      {solid ? <path d={glyph.d} fill="currentColor" stroke="none" /> : <path d={glyph.d} strokeWidth={['grid', 'more'].includes(name) ? strokeWidth * 1.9 : undefined} />}
    </svg>
  )
}
