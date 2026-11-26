import { LESSONS } from '../data/lessons'
import { QAS } from '../data/qa'
import { DUAS, DUA_CATS } from '../data/duas'
import { ASMA } from '../data/asma'
import { LETTERS } from '../data/arabic'
import chapters from '../data/chapters.json'
import { NAV, SECONDARY } from './nav'
import { PRAYER_COURSE, GUIDE, PRAYERS } from '../data/prayer'
import { WUDU_SECTIONS } from '../data/wudu'
import { LEARN_SURAHS } from '../data/learnSurahs'
import type { Block } from '../data/types'

export interface SearchItem { kind: string; title: string; text?: string; to: string; icon: string; hay: string }

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'‘`ʿʾ\-_.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

let INDEX: SearchItem[] | null = null

const build = (): SearchItem[] => {
  const items: SearchItem[] = []
  for (const n of [...NAV, ...SECONDARY]) items.push({ kind: 'Rubrique', title: n.label, text: n.desc, to: n.to, icon: n.icon, hay: '' })
  for (const l of LESSONS)
    items.push({
      kind: 'Cours',
      title: l.title,
      text: l.summary,
      to: `/cours/${l.id}`,
      icon: l.icon ?? 'book',
      hay: l.sections.map((s) => s.title + ' ' + s.blocks.map((b) => ('text' in b ? b.text : 'items' in b && Array.isArray(b.items) ? b.items.map((x) => (typeof x === 'string' ? x : x.term + ' ' + x.def)).join(' ') : '')).join(' ')).join(' '),
    })
  const blockText = (b: Block) => ('text' in b ? b.text : 'items' in b && Array.isArray(b.items) ? b.items.map((x) => (typeof x === 'string' ? x : x.term + ' ' + x.def)).join(' ') : 'tr' in b ? `${b.tr ?? ''} ${b.fr ?? ''}` : '')
  for (const s of PRAYER_COURSE) items.push({ kind: 'Prière', title: s.title, text: 'Cours complet sur la prière', to: '/priere', icon: 'prayer', hay: s.blocks.map(blockText).join(' ') })
  for (const g of GUIDE) items.push({ kind: 'Guide prière', title: g.title, text: g.short, to: '/priere/guide', icon: 'prayer', hay: g.slow.join(' ') + ' ' + (g.words ?? []).map((w) => w.tr + ' ' + w.fr).join(' ') })
  for (const p of PRAYERS) items.push({ kind: 'Prière', title: `Prière du ${p.name}`, text: `${p.rakaat} rak‘ats`, to: `/priere/${p.id}`, icon: 'clock', hay: p.window + ' ' + p.notes.join(' ') })
  for (const s of WUDU_SECTIONS) items.push({ kind: 'Ablutions', title: s.title, text: 'Guide des ablutions', to: '/ablutions', icon: 'drop', hay: s.blocks.map(blockText).join(' ') + ' woudou wudu' })
  for (const s of LEARN_SURAHS) items.push({ kind: 'Sourate à apprendre', title: s.name, text: `${s.meaning} — parcours de mémorisation`, to: `/sourates/${s.id}`, icon: 'sparkle', hay: s.theme + ' ' + s.why })
  for (const q of QAS) items.push({ kind: 'Question', title: q.q, text: q.tags.join(' · '), to: `/questions#${q.id}`, icon: 'help', hay: q.tags.join(' ') + ' ' + q.answer.map((b) => ('text' in b ? b.text : '')).join(' ') })
  for (const d of DUAS) items.push({ kind: 'Invocation', title: d.title, text: DUA_CATS.find((c) => c.id === d.cat)?.label, to: `/douas?cat=${d.cat}#${d.id}`, icon: 'hands', hay: (d.tr ?? '') + ' ' + (d.fr ?? '') })
  for (const c of chapters) items.push({ kind: 'Sourate', title: `${c.id}. ${c.nameSimple}`, text: `${c.nameFr} · ${c.versesCount} versets`, to: `/coran/${c.id}`, icon: 'book', hay: `${c.nameFr} ${c.nameArabic} sourate ${c.id}` })
  for (const a of ASMA) items.push({ kind: "Nom d'Allah", title: a.tr, text: a.fr, to: `/bases/noms-allah#n${a.n}`, icon: 'star', hay: a.ar })
  for (const l of LETTERS) items.push({ kind: 'Lettre arabe', title: `${l.ar}  ${l.name}`, text: l.sound, to: '/arabe', icon: 'letters', hay: l.translit })
  return items.map((i) => ({ ...i, hay: norm(`${i.title} ${i.text ?? ''} ${i.hay}`) }))
}

export function search(q: string, limit = 30): SearchItem[] {
  INDEX ??= build()
  const n = norm(q)
  if (!n) return []
  const terms = n.split(' ')
  const scored: { item: SearchItem; score: number }[] = []
  for (const item of INDEX) {
    if (!terms.every((t) => item.hay.includes(t))) continue
    const title = norm(item.title)
    let score = 0
    if (title.startsWith(n)) score += 10
    if (title.includes(n)) score += 5
    if (item.kind === 'Rubrique') score += 4
    if (item.kind === 'Cours' || item.kind === 'Question') score += 2
    scored.push({ item, score })
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.item)
}
