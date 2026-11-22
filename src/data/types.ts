import type { Level } from '../lib/store'

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'list'; items: string[]; ordered?: boolean }
  | { t: 'note'; tone?: 'info' | 'tip' | 'warning' | 'scholar' | 'gentle'; title?: string; text: string }
  /** Verset(s) chargé(s) en direct depuis Quran.com — jamais recopié à la main. Ex. "2:183" ou "2:183-185" */
  | { t: 'verse'; key: string; intro?: string }
  /** Sens d'un hadith, avec sa référence dans les recueils. La formulation française est un résumé fidèle du sens. */
  | { t: 'hadith'; text: string; ref: string }
  /** Formule arabe connue (prière, invocation…) avec translittération et sens. */
  | { t: 'arabic'; ar: string; tr?: string; fr?: string; ref?: string }
  | { t: 'terms'; items: { term: string; def: string }[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'link'; to: string; label: string; text?: string }

export interface QuizQ {
  type: 'qcm' | 'vf' | 'memo'
  q: string
  options: string[]
  answer: number
  explain: string
  /** Texte arabe affiché en grand (lettre, syllabe…) */
  ar?: string
  /** Texte arabe à faire écouter (synthèse vocale) */
  speak?: string
}

export type CategoryId = 'decouvrir' | 'piliers' | 'foi' | 'prophete' | 'comportement' | 'halal' | 'priere' | 'coran' | 'hadith' | 'fiqh' | 'histoire'

export interface Lesson {
  id: string
  title: string
  level: Level
  category: CategoryId
  minutes: number
  summary: string
  icon?: string
  arabic?: string
  sections: { title: string; blocks: Block[] }[]
  quiz?: QuizQ[]
  sources?: string[]
}

export const CATEGORIES: Record<CategoryId, { label: string; icon: string }> = {
  decouvrir: { label: "Découvrir l'islam", icon: 'compass' },
  piliers: { label: "Les piliers de l'islam", icon: 'columns' },
  foi: { label: 'Les piliers de la foi', icon: 'star' },
  prophete: { label: 'Le Prophète ﷺ', icon: 'mosque' },
  comportement: { label: 'Le bon comportement', icon: 'heart' },
  halal: { label: 'Halal et haram', icon: 'leaf' },
  priere: { label: 'La prière', icon: 'prayer' },
  coran: { label: 'Le Coran', icon: 'book' },
  hadith: { label: 'Les hadiths', icon: 'list' },
  fiqh: { label: 'Le fiqh (jurisprudence)', icon: 'graduation' },
  histoire: { label: "L'histoire islamique", icon: 'layers' },
}

export const vf = (q: string, isTrue: boolean, explain: string): QuizQ => ({ type: 'vf', q, options: ['Vrai', 'Faux'], answer: isTrue ? 0 : 1, explain })
export const qcm = (q: string, options: string[], answer: number, explain: string): QuizQ => ({ type: 'qcm', q, options, answer, explain })
export const memo = (q: string, options: string[], answer: number, explain: string): QuizQ => ({ type: 'memo', q, options, answer, explain })
