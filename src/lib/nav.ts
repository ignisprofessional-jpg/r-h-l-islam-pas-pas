export interface NavItem { to: string; label: string; icon: string; desc: string; group: string }

export const NAV: NavItem[] = [
  { to: '/', label: 'Tableau de bord', icon: 'home', desc: 'Votre accueil personnalisé', group: 'Accueil' },
  { to: '/parcours', label: 'Mon parcours', icon: 'graduation', desc: 'Débutant, intermédiaire, avancé', group: 'Accueil' },
  { to: '/coran', label: 'Le Coran', icon: 'book', desc: 'Les 114 sourates, audio, traduction, tafsir', group: 'Coran' },
  { to: '/sourates', label: 'Sourates à apprendre', icon: 'sparkle', desc: 'Parcours de mémorisation', group: 'Coran' },
  { to: '/arabe', label: 'Arabe coranique', icon: 'letters', desc: 'Alphabet, voyelles, lecture', group: 'Coran' },
  { to: '/priere', label: 'La prière', icon: 'prayer', desc: 'Cours complet et guide pas à pas', group: 'Pratique' },
  { to: '/ablutions', label: 'Les ablutions', icon: 'drop', desc: 'Woudou et ghusl illustrés', group: 'Pratique' },
  { to: '/douas', label: 'Invocations', icon: 'hands', desc: 'Douas classées par situation', group: 'Pratique' },
  { to: '/dhikr', label: 'Compteur de dhikr', icon: 'beads', desc: 'Tasbîh personnalisable', group: 'Pratique' },
  { to: '/piliers', label: 'Les piliers', icon: 'columns', desc: "Piliers de l'islam et de la foi", group: 'Apprendre' },
  { to: '/bases', label: "Bases de l'islam", icon: 'star', desc: 'Foi, Prophète ﷺ, comportement', group: 'Apprendre' },
  { to: '/halal', label: 'Halal et haram', icon: 'leaf', desc: 'Alimentation, nuances, avis', group: 'Apprendre' },
  { to: '/quiz', label: 'Quiz et exercices', icon: 'trophy', desc: 'Tester ses connaissances', group: 'Apprendre' },
  { to: '/questions', label: 'Questions-réponses', icon: 'help', desc: 'Réponses prudentes et sourcées', group: 'Apprendre' },
  { to: '/calendrier', label: 'Calendrier islamique', icon: 'calendar', desc: 'Hégire, fêtes, jeûnes', group: 'Suivi' },
  { to: '/progression', label: 'Ma progression', icon: 'chart', desc: 'Statistiques et objectifs', group: 'Suivi' },
  { to: '/favoris', label: 'Mes favoris', icon: 'heart', desc: 'Versets, invocations, cours', group: 'Suivi' },
  { to: '/compte', label: 'Mon compte', icon: 'user', desc: 'Connexion et synchronisation', group: 'Suivi' },
  { to: '/reglages', label: 'Réglages', icon: 'settings', desc: 'Profil, thème, sauvegarde', group: 'Suivi' },
]
