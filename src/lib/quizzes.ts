import { LETTERS, letterForms } from '../data/arabic'
import { ASMA } from '../data/asma'
import { LEARN_SURAHS } from '../data/learnSurahs'
import { LESSONS } from '../data/lessons'
import { QUIZ_PRIERE } from '../data/prayer'
import { QUIZ_WUDU } from '../data/wudu'
import type { QuizQ } from '../data/types'
import { getVerses } from './api'

const pick = <T,>(arr: T[], n: number) => [...arr].sort(() => Math.random() - 0.5).slice(0, n)
const optionsWith = <T,>(correct: T, pool: T[], n = 4) => pick([correct, ...pick(pool.filter((x) => x !== correct), n - 1)], n)

export function lettersNameQuiz(n = 10): QuizQ[] {
  return pick(LETTERS, n).map((l) => {
    const opts = optionsWith(l.name, LETTERS.map((x) => x.name))
    return { type: 'qcm', q: 'Quelle est cette lettre ?', ar: l.ar, options: opts, answer: opts.indexOf(l.name), explain: `C’est la lettre ${l.name} (${l.translit}). ${l.sound}` }
  })
}

export function lettersFromNameQuiz(n = 10): QuizQ[] {
  return pick(LETTERS, n).map((l) => {
    const opts = optionsWith(l.ar, LETTERS.map((x) => x.ar))
    return { type: 'qcm', q: `Trouvez la lettre « ${l.name} » (${l.translit})`, options: opts, answer: opts.indexOf(l.ar), explain: `${l.name} s’écrit ${l.ar}.` }
  })
}

export function lettersFormsQuiz(n = 10): QuizQ[] {
  const connecting = LETTERS.filter((l) => l.connects)
  return pick(connecting, n).map((l) => {
    const pos = pick(['debut', 'milieu', 'fin'] as const, 1)[0]
    const label = { debut: 'au début d’un mot', milieu: 'au milieu d’un mot', fin: 'à la fin d’un mot' }[pos]
    const opts = optionsWith(l.name, connecting.map((x) => x.name))
    return { type: 'qcm', q: `Cette forme (${label}) correspond à quelle lettre ?`, ar: letterForms(l)[pos], options: opts, answer: opts.indexOf(l.name), explain: `C’est ${l.name} ${label}. Forme isolée : ${l.ar}.` }
  })
}

const SYLLABLES = LETTERS.filter((l) => !['ا', 'و', 'ي', 'ع'].includes(l.ar)).flatMap((l) => {
  const base = l.translit.split(' ')[0].replace(/[ḥṣḍṭẓ]/g, (c) => ({ ḥ: 'h', ṣ: 's', ḍ: 'd', ṭ: 't', ẓ: 'dh' })[c] ?? c)
  return [
    { ar: l.ar + 'َ', tr: base + 'a', name: l.name },
    { ar: l.ar + 'ِ', tr: base + 'i', name: l.name },
    { ar: l.ar + 'ُ', tr: base + 'ou', name: l.name },
  ]
})

export function vowelsQuiz(n = 10): QuizQ[] {
  return pick(SYLLABLES, n).map((s) => {
    const sameLetter = SYLLABLES.filter((x) => x.name === s.name).map((x) => x.tr)
    const others = SYLLABLES.filter((x) => x.name !== s.name).map((x) => x.tr)
    const opts = pick([s.tr, ...sameLetter.filter((x) => x !== s.tr), pick(others, 1)[0]], 4)
    return { type: 'qcm', q: 'Comment se lit cette syllabe ?', ar: s.ar, options: opts, answer: opts.indexOf(s.tr), explain: `${s.ar} se lit « ${s.tr} » : fatha = a, kasra = i, damma = ou.` }
  })
}

export function audioLettersQuiz(n = 8): QuizQ[] {
  return pick(LETTERS, n).map((l) => {
    const opts = optionsWith(l.ar, LETTERS.map((x) => x.ar))
    return { type: 'qcm', q: 'Écoutez le nom de la lettre, puis choisissez-la.', speak: l.nameAr, options: opts, answer: opts.indexOf(l.ar), explain: `Vous avez entendu « ${l.name} » : ${l.ar}.` }
  })
}

export function namesQuiz(n = 10): QuizQ[] {
  return pick(ASMA, n).map((a) => {
    const opts = optionsWith(a.fr, ASMA.map((x) => x.fr))
    return { type: 'memo', q: `Que signifie le nom « ${a.tr} » ?`, ar: a.ar, options: opts, answer: opts.indexOf(a.fr), explain: `${a.tr} (${a.ar}) : ${a.fr}.` }
  })
}

/** Reconnaître une sourate à partir de son premier verset (texte chargé depuis Quran.com). */
export async function surahRecognitionQuiz(translation: number): Promise<QuizQ[]> {
  const firsts = await Promise.all(LEARN_SURAHS.map((s) => getVerses(`${s.id}:${s.id === 1 ? 2 : 1}`, translation)))
  return pick(
    LEARN_SURAHS.map((s, i) => {
      const opts = optionsWith(s.name, LEARN_SURAHS.map((x) => x.name))
      return { type: 'qcm' as const, q: 'De quelle sourate vient ce verset ?', ar: firsts[i][0]?.arabic ?? '', options: opts, answer: opts.indexOf(s.name), explain: `C’est le début de la sourate ${s.name} (${s.meaning}).` }
    }),
    8,
  )
}

const fromLessons = (ids: string[], n = 10) => pick(ids.flatMap((id) => LESSONS.find((l) => l.id === id)?.quiz ?? []), n)

export interface QuizDef { id: string; title: string; text: string; icon: string; group: string; build: (translation: number) => QuizQ[] | Promise<QuizQ[]>; arabicOptions?: boolean }

export const QUIZZES: QuizDef[] = [
  { id: 'quiz-piliers', title: 'Les piliers', text: 'Piliers de l’islam et de la foi', icon: 'columns', group: 'Thèmes', build: () => fromLessons(['piliers-intro', 'shahada', 'pilier-salat', 'pilier-zakat', 'pilier-siyam', 'pilier-hajj', 'iman-six-piliers'], 12) },
  { id: 'quiz-priere', title: 'La prière', text: 'Rak‘ats, paroles, gestes, conditions', icon: 'prayer', group: 'Thèmes', build: () => pick(QUIZ_PRIERE, 10) },
  { id: 'quiz-ablutions', title: 'Les ablutions', text: 'Étapes, annulations, ghusl, tayammum', icon: 'drop', group: 'Thèmes', build: () => pick(QUIZ_WUDU, 9) },
  { id: 'quiz-foi', title: 'Les bases de la foi', text: 'Allah, anges, livres, prophètes, destin', icon: 'star', group: 'Thèmes', build: () => fromLessons(['qui-est-allah', 'anges', 'livres', 'prophetes', 'jour-dernier', 'destin'], 10) },
  { id: 'quiz-prophete', title: 'Le Prophète ﷺ et l’histoire', text: 'Sîra et grandes étapes', icon: 'mosque', group: 'Thèmes', build: () => fromLessons(['vie-prophete', 'histoire-islam', 'histoire-approfondie'], 10) },
  { id: 'quiz-halal', title: 'Halal et haram', text: 'Règles alimentaires et nuances', icon: 'leaf', group: 'Thèmes', build: () => fromLessons(['halal-principes', 'porc-alcool', 'viande', 'necessite', 'famille-non-musulmane', 'divergences'], 10) },
  { id: 'quiz-comportement', title: 'Le bon comportement', text: 'Parents, patience, pardon, sincérité', icon: 'heart', group: 'Thèmes', build: () => fromLessons(['comportements', 'parents', 'patience', 'pardon', 'sincerite', 'gratitude'], 10) },
  { id: 'quiz-sciences', title: 'Sciences islamiques', text: 'Hadith, tafsir, fiqh, écoles', icon: 'graduation', group: 'Thèmes', build: () => fromLessons(['hadith-intro', 'coran-approfondir', 'etude-coran', 'tafsir-intro', 'sciences-hadith', 'fiqh-intro', 'ecoles-juridiques'], 12) },
  { id: 'quiz-sourates', title: 'Reconnaître les sourates', text: 'Retrouver la sourate à partir de son début', icon: 'book', group: 'Coran', build: (t) => surahRecognitionQuiz(t) },
  { id: 'quiz-noms', title: 'Les noms d’Allah', text: 'Retrouver le sens de 10 noms', icon: 'sparkle', group: 'Coran', build: () => namesQuiz(10) },
  { id: 'quiz-lettres', title: 'Reconnaître les lettres', text: 'Lettre arabe → son nom', icon: 'letters', group: 'Arabe', build: () => lettersNameQuiz(10) },
  { id: 'quiz-lettres-inverse', title: 'Trouver la lettre', text: 'Nom → lettre arabe', icon: 'letters', group: 'Arabe', build: () => lettersFromNameQuiz(10), arabicOptions: true },
  { id: 'quiz-formes', title: 'Les formes des lettres', text: 'Début, milieu, fin de mot', icon: 'layers', group: 'Arabe', build: () => lettersFormsQuiz(10) },
  { id: 'quiz-voyelles', title: 'Lire les voyelles', text: 'Fatha, kasra, damma', icon: 'eye', group: 'Arabe', build: () => vowelsQuiz(10) },
  { id: 'quiz-audio', title: 'Exercice audio', text: 'Écouter et reconnaître la lettre', icon: 'volume', group: 'Arabe', build: () => audioLettersQuiz(8), arabicOptions: true },
]

export const quizById = (id: string) => QUIZZES.find((q) => q.id === id)
