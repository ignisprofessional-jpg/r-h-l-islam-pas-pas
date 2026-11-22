/**
 * Les 99 noms d'Allah selon la liste la plus répandue (rapportée par at-Tirmidhî, n°3507).
 * Texte arabe et translittération : API Aladhan (Islamic Network), copiés tels quels dans asma.source.json.
 * Sens en français : formulation pédagogique rédigée pour ce site.
 * Note : le hadith authentique (al-Bukhârî n°2736, Muslim n°2677) mentionne 99 noms sans les énumérer ;
 * l'énumération est discutée par les savants, et Allah a d'autres noms en dehors de cette liste.
 */
import source from './asma.source.json'

const FR = [
  'Le Tout Miséricordieux', 'Le Très Miséricordieux', 'Le Roi, le Souverain', 'Le Très Saint, le Pur', 'La Paix, Celui qui est exempt de tout défaut',
  'Celui qui donne la sécurité et la foi', 'Le Préservateur, Celui qui veille sur tout', 'Le Tout-Puissant, l’Invincible', 'Le Contraignant, Celui qui répare', 'Le Superbe, Celui à qui revient la grandeur',
  'Le Créateur', 'Celui qui donne l’existence', 'Celui qui donne forme', 'Le Grand Pardonneur', 'Le Dominateur suprême',
  'Le Donateur généreux', 'Celui qui accorde la subsistance', 'Celui qui ouvre (les portes du bien), le Juge', 'L’Omniscient', 'Celui qui restreint',
  'Celui qui étend (Ses dons)', 'Celui qui abaisse', 'Celui qui élève', 'Celui qui honore', 'Celui qui humilie',
  'Celui qui entend tout', 'Celui qui voit tout', 'Le Juge', 'Le Juste', 'Le Doux, le Bienveillant subtil',
  'Le Parfaitement informé', 'Le Longanime, Celui qui ne se hâte pas de punir', 'L’Immense, le Magnifique', 'Le Pardonneur', 'Le Très Reconnaissant',
  'Le Très Haut', 'Le Très Grand', 'Le Gardien', 'Celui qui nourrit et maintient', 'Celui qui suffit, Celui qui compte',
  'Le Majestueux', 'Le Généreux', 'L’Observateur vigilant', 'Celui qui répond aux invocations', 'L’Immense, Celui dont les dons sont vastes',
  'Le Sage', 'Le Très Aimant', 'Le Glorieux', 'Celui qui ressuscite', 'Le Témoin',
  'La Vérité', 'Le Garant, Celui à qui l’on s’en remet', 'Le Fort', 'L’Inébranlable', 'Le Protecteur, l’Allié',
  'Le Digne de louange', 'Celui qui dénombre tout', 'Celui qui crée sans modèle', 'Celui qui fait revenir (à la vie)', 'Celui qui donne la vie',
  'Celui qui donne la mort', 'Le Vivant', 'Celui qui subsiste par Lui-même et fait subsister toute chose', 'Celui qui trouve tout ce qu’Il veut', 'Le Noble, le Glorieux',
  'L’Un', 'L’Unique', 'Celui dont toute chose a besoin', 'Le Capable', 'Le Tout-Puissant',
  'Celui qui avance', 'Celui qui retarde', 'Le Premier', 'Le Dernier', 'L’Apparent (au-dessus de tout)',
  'Le Caché (proche de tout)', 'Le Gouverneur', 'Le Très Élevé', 'Le Bienfaisant', 'Celui qui accepte le repentir',
  'Celui qui punit les injustes', 'Celui qui efface les fautes', 'Le Très Compatissant', 'Le Possesseur de la royauté', 'Le Détenteur de la majesté et de la générosité',
  'L’Équitable', 'Celui qui rassemble', 'Le Riche, Celui qui se suffit à Lui-même', 'Celui qui enrichit', 'Celui qui empêche (ce qu’Il veut)',
  'Celui qui peut nuire (par Sa sagesse)', 'Celui qui accorde le bienfait', 'La Lumière', 'Le Guide', 'Le Créateur incomparable',
  'L’Éternel, Celui qui demeure', 'L’Héritier de toute chose', 'Le Guide vers la droiture', 'Le Patient',
]

export interface DivineName { n: number; ar: string; tr: string; fr: string }

export const ASMA: DivineName[] = (source as { n: number; ar: string; tr: string }[]).map((x, i) => ({ ...x, fr: FR[i] ?? '' }))
