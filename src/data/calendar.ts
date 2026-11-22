export interface IslamicEvent {
  id: string
  month: number
  day: number
  /** nombre de jours de l'événement (ex. 10 premiers jours) */
  length?: number
  title: string
  kind: 'fete' | 'jeune' | 'periode' | 'memoire'
  text: string
  ref?: string
}

export const EVENTS: IslamicEvent[] = [
  { id: 'nouvel-an', month: 1, day: 1, title: 'Nouvel an hégirien', kind: 'memoire', text: "Début de l'année musulmane, en souvenir de l'Hégire (622). Aucune célébration particulière n'est prescrite.", ref: 'Calendrier instauré sous le califat de ‘Umar' },
  { id: 'achoura', month: 1, day: 10, title: '‘Âchoûrâ’', kind: 'jeune', text: "Jeûne recommandé, en souvenir du jour où Allah sauva Moïse de Pharaon. Il est recommandé de jeûner aussi le 9.", ref: "« J'espère d'Allah qu'il expie l'année passée » : Muslim n°1162 ; jeûner le 9 : Muslim n°1134" },
  { id: 'ramadan', month: 9, day: 1, length: 30, title: 'Ramadan', kind: 'jeune', text: "Mois du jeûne obligatoire et de la révélation du Coran. La date exacte du début dépend de l'observation du croissant.", ref: 'Coran 2:183-185' },
  { id: 'dix-nuits', month: 9, day: 21, length: 10, title: 'Les dix dernières nuits', kind: 'periode', text: "Les nuits les plus précieuses de l'année : on y recherche Laylat al-Qadr, surtout les nuits impaires.", ref: '« Recherchez-la dans les nuits impaires des dix dernières » : al-Bukhârî n°2017' },
  { id: 'fitr', month: 10, day: 1, title: 'Aïd al-Fitr', kind: 'fete', text: "Fête de la rupture du jeûne : zakât al-fitr avant la prière, prière de l'Aïd, joie et visites familiales. Il est interdit de jeûner ce jour-là.", ref: 'Interdiction de jeûner les deux Aïds : al-Bukhârî n°1990, Muslim n°1137' },
  { id: 'chawwal', month: 10, day: 2, length: 6, title: 'Les six jours de Chawwal', kind: 'jeune', text: "Jeûner six jours de Chawwal (consécutifs ou non, après l'Aïd) après le Ramadan équivaut à jeûner toute l'année.", ref: 'Muslim n°1164' },
  { id: 'dhul-hijja', month: 12, day: 1, length: 10, title: 'Les dix premiers jours de Dhou al-Hijja', kind: 'periode', text: "Les meilleurs jours de l'année pour les bonnes œuvres : dhikr (takbîr, tahlîl, tahmîd), jeûne (sauf le jour de l'Aïd), aumône.", ref: "« Il n'y a pas de jours où les bonnes œuvres sont plus aimées d'Allah que ces dix jours » : al-Bukhârî n°969, Abû Dâwûd n°2438" },
  { id: 'arafat', month: 12, day: 9, title: 'Jour de ‘Arafat', kind: 'jeune', text: "Les pèlerins se tiennent à ‘Arafat. Pour ceux qui ne font pas le hajj, le jeûne de ce jour est fortement recommandé.", ref: "« Il expie l'année passée et l'année à venir » : Muslim n°1162" },
  { id: 'adha', month: 12, day: 10, title: 'Aïd al-Adha', kind: 'fete', text: "Fête du sacrifice, en souvenir d'Abraham : prière de l'Aïd puis sacrifice d'un mouton (ou autre bête) pour ceux qui le peuvent.", ref: 'Coran 108:2 ; 37:102-107' },
  { id: 'tachriq', month: 12, day: 11, length: 3, title: 'Jours de Tachrîq', kind: 'fete', text: "Les 11, 12 et 13 Dhou al-Hijja : jours de fête, de dhikr, où il n'est pas permis de jeûner (sauf exception pour le pèlerin).", ref: "« Les jours de Tachrîq sont des jours où l'on mange, boit et se souvient d'Allah » : Muslim n°1141" },
]

export const RECURRING_FASTS = [
  { title: 'Lundi et jeudi', text: "Jours où les actes sont présentés à Allah ; le Prophète ﷺ aimait jeûner ces jours-là.", ref: 'at-Tirmidhî n°747 ; Muslim n°1162 (le lundi)' },
  { title: 'Les « jours blancs » : 13, 14 et 15 de chaque mois hégirien', text: "Jeûner trois jours par mois équivaut à jeûner toute l'année ; il est recommandé de choisir les jours de pleine lune.", ref: 'an-Nasâ’î n°2420, at-Tirmidhî n°761 ; al-Bukhârî n°1979' },
  { title: 'Le mois de Mouharram', text: "« Le meilleur jeûne après le Ramadan est celui du mois d'Allah, Mouharram. »", ref: 'Muslim n°1163' },
  { title: 'Le mois de Cha‘bane', text: "Le Prophète ﷺ jeûnait beaucoup pendant Cha‘bane.", ref: 'al-Bukhârî n°1969, Muslim n°1156' },
]
