export type GroupId = 'accueil' | 'coran' | 'apprendre' | 'pratique' | 'suivi'

export interface NavItem { to: string; label: string; icon: string; desc: string; group: GroupId }

export interface NavGroup { id: GroupId; label: string; icon: string; to: string; arabic: string; desc: string }

/** Les cinq grandes rubriques de l'application. */
export const GROUPS: NavGroup[] = [
  { id: 'accueil', label: 'Accueil', icon: 'home', to: '/', arabic: 'الرئيسية', desc: 'Votre journée et votre parcours' },
  { id: 'coran', label: 'Coran', icon: 'book', to: '/coran', arabic: 'القرآن', desc: 'Lire, écouter, mémoriser' },
  { id: 'apprendre', label: 'Apprendre', icon: 'graduation', to: '/parcours', arabic: 'التعلّم', desc: 'Cours, piliers, quiz' },
  { id: 'pratique', label: 'Pratique', icon: 'prayer', to: '/pratique', arabic: 'العبادة', desc: 'Prière, ablutions, invocations' },
  { id: 'suivi', label: 'Suivi', icon: 'chart', to: '/progression', arabic: 'المتابعة', desc: 'Progression, calendrier, favoris' },
]

export const NAV: NavItem[] = [
  { to: '/', label: 'Aujourd’hui', icon: 'home', desc: 'Votre accueil personnalisé', group: 'accueil' },
  { to: '/parcours', label: 'Mon parcours', icon: 'graduation', desc: 'Débutant, intermédiaire, avancé', group: 'apprendre' },
  { to: '/coran', label: 'Lire le Coran', icon: 'book', desc: 'Les 114 sourates, audio, traduction, tafsir', group: 'coran' },
  { to: '/sourates', label: 'Sourates à apprendre', icon: 'sparkle', desc: 'Parcours de mémorisation', group: 'coran' },
  { to: '/arabe', label: 'Arabe coranique', icon: 'letters', desc: 'Alphabet, voyelles, lecture', group: 'coran' },
  { to: '/piliers', label: 'Les piliers', icon: 'columns', desc: "Piliers de l'islam et de la foi", group: 'apprendre' },
  { to: '/bases', label: "Bases de l'islam", icon: 'star', desc: 'Foi, Prophète ﷺ, comportement', group: 'apprendre' },
  { to: '/halal', label: 'Halal et haram', icon: 'leaf', desc: 'Alimentation, nuances, avis', group: 'apprendre' },
  { to: '/questions', label: 'Questions-réponses', icon: 'help', desc: 'Réponses prudentes et sourcées', group: 'apprendre' },
  { to: '/quiz', label: 'Quiz et exercices', icon: 'trophy', desc: 'Tester ses connaissances', group: 'apprendre' },
  { to: '/priere', label: 'La prière', icon: 'prayer', desc: 'Cours complet et guide pas à pas', group: 'pratique' },
  { to: '/ablutions', label: 'Les ablutions', icon: 'drop', desc: 'Woudou et ghusl illustrés', group: 'pratique' },
  { to: '/douas', label: 'Invocations', icon: 'hands', desc: 'Douas classées par situation', group: 'pratique' },
  { to: '/dhikr', label: 'Compteur de dhikr', icon: 'beads', desc: 'Tasbîh personnalisable', group: 'pratique' },
  { to: '/progression', label: 'Ma progression', icon: 'chart', desc: 'Statistiques et objectifs', group: 'suivi' },
  { to: '/calendrier', label: 'Calendrier islamique', icon: 'calendar', desc: 'Hégire, fêtes, jeûnes', group: 'suivi' },
  { to: '/favoris', label: 'Mes favoris', icon: 'heart', desc: 'Versets, invocations, cours', group: 'suivi' },
]

/** Pages secondaires (pied de la barre latérale, menu « Plus »). */
export const SECONDARY: NavItem[] = [
  { to: '/compte', label: 'Mon compte', icon: 'user', desc: 'Connexion et synchronisation', group: 'suivi' },
  { to: '/reglages', label: 'Réglages', icon: 'settings', desc: 'Profil, thème, sauvegarde', group: 'suivi' },
]

export const itemsOf = (g: GroupId) => NAV.filter((n) => n.group === g && n.to !== '/')

/** À quel groupe appartient une adresse (pour l'onglet actif, y compris sur les pages de détail). */
export function groupOf(path: string): GroupId | null {
  if (path === '/') return 'accueil'
  const rules: [GroupId, string[]][] = [
    ['coran', ['/coran', '/sourates', '/arabe']],
    ['pratique', ['/pratique', '/priere', '/ablutions', '/douas', '/dhikr']],
    ['apprendre', ['/parcours', '/piliers', '/bases', '/halal', '/questions', '/quiz', '/cours']],
    ['suivi', ['/progression', '/calendrier', '/favoris', '/compte', '/reglages']],
  ]
  for (const [g, prefixes] of rules) if (prefixes.some((p) => path === p || path.startsWith(p + '/'))) return g
  return null
}
