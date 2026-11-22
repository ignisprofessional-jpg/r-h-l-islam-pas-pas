import type { Level } from '../../lib/store'
import type { Lesson } from '../types'
import { lessonsDebutant } from './debutant'
import { lessonsFoi } from './foi'
import { lessonsBases } from './bases'
import { lessonsHalal } from './halal'
import { lessonsAvance } from './avance'

export const LESSONS: Lesson[] = [...lessonsDebutant, ...lessonsFoi, ...lessonsBases, ...lessonsHalal, ...lessonsAvance]
export const lessonById = (id: string) => LESSONS.find((l) => l.id === id)

export const LEVELS: { id: Level; label: string; arabic: string; text: string }[] = [
  { id: 'debutant', label: 'Débutant', arabic: 'مبتدئ', text: "Découvrir l'islam, la shahada, les piliers, les ablutions, la prière et les premières sourates." },
  { id: 'intermediaire', label: 'Intermédiaire', arabic: 'متوسط', text: 'Maîtriser les cinq prières, plus de sourates, les hadiths, le Coran, les règles alimentaires et la foi.' },
  { id: 'avance', label: 'Avancé', arabic: 'متقدم', text: 'Sciences du Coran, tafsir, sciences du hadith, fiqh, écoles juridiques et histoire.' },
]

/** Un module du parcours : une leçon, ou une rubrique interactive suivie par des étapes/états. */
export interface Module {
  id: string
  title: string
  text: string
  to: string
  icon: string
  /** id de leçon(s) ou clé de suivi qui détermine si le module est terminé */
  track: { lessons?: string[]; steps?: { group: string; count: number }; surahs?: number[]; quiz?: string[] }
}

export const PARCOURS: Record<Level, { title: string; modules: Module[] }[]> = {
  debutant: [
    {
      title: "Découvrir l'islam",
      modules: [
        { id: 'm-decouvrir', title: "Qu'est-ce que l'islam ?", text: 'Le sens de l’islam et ses sources.', to: '/cours/decouvrir-islam', icon: 'compass', track: { lessons: ['decouvrir-islam'] } },
        { id: 'm-allah', title: 'Qui est Allah ?', text: 'Le Dieu unique et miséricordieux.', to: '/cours/qui-est-allah', icon: 'sparkle', track: { lessons: ['qui-est-allah'] } },
        { id: 'm-shahada', title: 'Comprendre la shahada', text: 'L’attestation de foi.', to: '/cours/shahada', icon: 'sparkle', track: { lessons: ['shahada'] } },
      ],
    },
    {
      title: 'Les fondements',
      modules: [
        { id: 'm-piliers', title: 'Les cinq piliers', text: 'Vue d’ensemble et chaque pilier.', to: '/piliers', icon: 'columns', track: { lessons: ['piliers-intro', 'pilier-salat', 'pilier-zakat', 'pilier-siyam', 'pilier-hajj'] } },
        { id: 'm-iman', title: 'Les six piliers de la foi', text: 'Ce que croit le musulman.', to: '/cours/iman-six-piliers', icon: 'star', track: { lessons: ['iman-six-piliers'] } },
      ],
    },
    {
      title: 'Pratiquer',
      modules: [
        { id: 'm-wudu', title: 'Les ablutions', text: 'Le guide pas à pas.', to: '/ablutions', icon: 'drop', track: { steps: { group: 'wudu', count: 10 } } },
        { id: 'm-priere', title: 'Découvrir la prière', text: 'Gestes et paroles, très lentement.', to: '/priere/guide', icon: 'prayer', track: { steps: { group: 'guide-priere', count: 14 } } },
        { id: 'm-sourates', title: 'Les premières sourates', text: 'Al-Fâtiha, Al-Ikhlâs, Al-Falaq, An-Nâs.', to: '/sourates', icon: 'book', track: { surahs: [1, 112, 113, 114] } },
      ],
    },
  ],
  intermediaire: [
    {
      title: 'La pratique',
      modules: [
        { id: 'm-5prieres', title: 'Maîtriser les cinq prières', text: 'Rak‘ats, horaires, prières surérogatoires.', to: '/priere', icon: 'prayer', track: { lessons: ['priere-approfondie'], quiz: ['quiz-priere'] } },
        { id: 'm-plus-sourates', title: 'Apprendre davantage de sourates', text: 'Al-Kawthar, Al-‘Asr, Al-Fîl, Quraysh, Al-Mâ‘ûn, An-Nasr.', to: '/sourates', icon: 'book', track: { surahs: [108, 103, 105, 106, 107, 110] } },
        { id: 'm-halal', title: 'Les règles alimentaires', text: 'Halal, haram et nuances.', to: '/halal', icon: 'leaf', track: { lessons: ['halal-principes', 'porc-alcool', 'viande', 'necessite', 'famille-non-musulmane', 'divergences'] } },
      ],
    },
    {
      title: 'La connaissance',
      modules: [
        { id: 'm-hadith', title: 'Comprendre les hadiths', text: 'Isnâd, matn et grands recueils.', to: '/cours/hadith-intro', icon: 'list', track: { lessons: ['hadith-intro'] } },
        { id: 'm-coran', title: 'Approfondir le Coran', text: 'Structure, révélation, compilation.', to: '/cours/coran-approfondir', icon: 'book', track: { lessons: ['coran-approfondir'] } },
        { id: 'm-foi', title: 'Approfondir les bases de la foi', text: 'Anges, livres, prophètes, Jour dernier, destin.', to: '/bases', icon: 'star', track: { lessons: ['anges', 'livres', 'prophetes', 'jour-dernier', 'destin'] } },
        { id: 'm-sira', title: 'La vie du Prophète ﷺ et l’histoire', text: 'Sîra et grandes étapes.', to: '/cours/vie-prophete', icon: 'mosque', track: { lessons: ['vie-prophete', 'histoire-islam'] } },
      ],
    },
  ],
  avance: [
    {
      title: 'Le Coran',
      modules: [
        { id: 'm-ulum', title: 'Étude approfondie du Coran', text: 'Les sciences du Coran.', to: '/cours/etude-coran', icon: 'book', track: { lessons: ['etude-coran'] } },
        { id: 'm-tafsir', title: 'Introduction au tafsir', text: 'Méthodes et grands commentateurs.', to: '/cours/tafsir-intro', icon: 'book', track: { lessons: ['tafsir-intro'] } },
      ],
    },
    {
      title: 'Le hadith et le fiqh',
      modules: [
        { id: 'm-sc-hadith', title: 'Les sciences du hadith', text: 'Degrés d’authenticité.', to: '/cours/sciences-hadith', icon: 'list', track: { lessons: ['sciences-hadith'] } },
        { id: 'm-fiqh', title: 'Introduction au fiqh', text: 'Sources et statuts des actes.', to: '/cours/fiqh-intro', icon: 'graduation', track: { lessons: ['fiqh-intro'] } },
        { id: 'm-ecoles', title: 'Les écoles juridiques', text: 'Les quatre écoles sunnites.', to: '/cours/ecoles-juridiques', icon: 'graduation', track: { lessons: ['ecoles-juridiques'] } },
      ],
    },
    {
      title: "L'histoire",
      modules: [{ id: 'm-histoire', title: 'Histoire islamique approfondie', text: 'Savants, âge d’or, époque moderne.', to: '/cours/histoire-approfondie', icon: 'layers', track: { lessons: ['histoire-approfondie'] } }],
    },
  ],
}
