export interface Letter {
  ar: string
  name: string
  nameAr: string
  translit: string
  sound: string
  connects: boolean
  sun: boolean
  example: { word: string; tr: string; fr: string }
}

const TATWEEL = 'ـ'

export const LETTERS: Letter[] = [
  { ar: 'ا', name: 'Alif', nameAr: 'أَلِف', translit: 'â / a', sound: "Support de voyelle. Avec une fatha avant lui, il allonge le son « a » (â).", connects: false, sun: false, example: { word: 'أَحَد', tr: 'ahad', fr: 'un, unique' } },
  { ar: 'ب', name: 'Bâ’', nameAr: 'بَاء', translit: 'b', sound: 'Comme le « b » français de « bateau ».', connects: true, sun: false, example: { word: 'بَيْت', tr: 'bayt', fr: 'maison' } },
  { ar: 'ت', name: 'Tâ’', nameAr: 'تَاء', translit: 't', sound: 'Comme le « t » français de « table ».', connects: true, sun: true, example: { word: 'تَوْبَة', tr: 'tawba', fr: 'repentir' } },
  { ar: 'ث', name: 'Thâ’', nameAr: 'ثَاء', translit: 'th', sound: "Comme le « th » anglais de « think » : la langue entre les dents, sans voix.", connects: true, sun: true, example: { word: 'ثَوَاب', tr: 'thawâb', fr: 'récompense' } },
  { ar: 'ج', name: 'Jîm', nameAr: 'جِيم', translit: 'j', sound: 'Comme « dj » dans « djinn ».', connects: true, sun: false, example: { word: 'جَنَّة', tr: 'janna', fr: 'paradis, jardin' } },
  { ar: 'ح', name: 'Hâ’', nameAr: 'حَاء', translit: 'ḥ', sound: "Un « h » soufflé du milieu de la gorge, comme quand on souffle sur des lunettes pour les nettoyer.", connects: true, sun: false, example: { word: 'حَمْد', tr: 'hamd', fr: 'louange' } },
  { ar: 'خ', name: 'Khâ’', nameAr: 'خَاء', translit: 'kh', sound: "Comme la « jota » espagnole ou le « ch » allemand de « Bach ».", connects: true, sun: false, example: { word: 'خَيْر', tr: 'khayr', fr: 'bien' } },
  { ar: 'د', name: 'Dâl', nameAr: 'دَال', translit: 'd', sound: 'Comme le « d » français.', connects: false, sun: true, example: { word: 'دِين', tr: 'dîn', fr: 'religion' } },
  { ar: 'ذ', name: 'Dhâl', nameAr: 'ذَال', translit: 'dh', sound: "Comme le « th » anglais de « this » : la langue entre les dents, avec la voix.", connects: false, sun: true, example: { word: 'ذِكْر', tr: 'dhikr', fr: 'rappel (d’Allah)' } },
  { ar: 'ر', name: 'Râ’', nameAr: 'رَاء', translit: 'r', sound: 'Un « r » roulé, comme en espagnol ou en italien.', connects: false, sun: true, example: { word: 'رَبّ', tr: 'rabb', fr: 'Seigneur' } },
  { ar: 'ز', name: 'Zây', nameAr: 'زَاي', translit: 'z', sound: 'Comme le « z » de « zèbre ».', connects: false, sun: true, example: { word: 'زَكَاة', tr: 'zakât', fr: 'aumône obligatoire' } },
  { ar: 'س', name: 'Sîn', nameAr: 'سِين', translit: 's', sound: 'Comme le « s » de « soleil ».', connects: true, sun: true, example: { word: 'سَلَام', tr: 'salâm', fr: 'paix' } },
  { ar: 'ش', name: 'Shîn', nameAr: 'شِين', translit: 'sh', sound: 'Comme le « ch » de « chat ».', connects: true, sun: true, example: { word: 'شُكْر', tr: 'shukr', fr: 'gratitude' } },
  { ar: 'ص', name: 'Sâd', nameAr: 'صَاد', translit: 'ṣ', sound: "Un « s » emphatique : prononcé avec la langue plus basse et la bouche arrondie, le son est plus « épais ».", connects: true, sun: true, example: { word: 'صَبْر', tr: 'sabr', fr: 'patience' } },
  { ar: 'ض', name: 'Dâd', nameAr: 'ضَاد', translit: 'ḍ', sound: "Un « d » emphatique, prononcé avec les bords de la langue contre les molaires. Lettre propre à l'arabe.", connects: true, sun: true, example: { word: 'ضُحَى', tr: 'duhâ', fr: 'matinée' } },
  { ar: 'ط', name: 'Ṭâ’', nameAr: 'طَاء', translit: 'ṭ', sound: 'Un « t » emphatique, son épais et profond.', connects: true, sun: true, example: { word: 'طَهَارَة', tr: 'tahâra', fr: 'pureté' } },
  { ar: 'ظ', name: 'Ẓâ’', nameAr: 'ظَاء', translit: 'ẓ', sound: 'Un « dh » emphatique (comme ذ, mais épais).', connects: true, sun: true, example: { word: 'ظُلْم', tr: 'zulm', fr: 'injustice' } },
  { ar: 'ع', name: '‘Ayn', nameAr: 'عَيْن', translit: '‘', sound: "Son guttural sans équivalent en français : on contracte le milieu de la gorge. Écoutez-le dans les récitations (‘alaykum, ‘Arafat).", connects: true, sun: false, example: { word: 'عِلْم', tr: '‘ilm', fr: 'science' } },
  { ar: 'غ', name: 'Ghayn', nameAr: 'غَيْن', translit: 'gh', sound: 'Comme le « r » grasseyé parisien de « Paris ».', connects: true, sun: false, example: { word: 'غَفُور', tr: 'ghafûr', fr: 'pardonneur' } },
  { ar: 'ف', name: 'Fâ’', nameAr: 'فَاء', translit: 'f', sound: 'Comme le « f » de « fleur ».', connects: true, sun: false, example: { word: 'فَجْر', tr: 'fajr', fr: 'aube' } },
  { ar: 'ق', name: 'Qâf', nameAr: 'قَاف', translit: 'q', sound: "Un « k » prononcé tout au fond de la gorge, près de la luette.", connects: true, sun: false, example: { word: 'قُرْآن', tr: 'qur’ân', fr: 'Coran' } },
  { ar: 'ك', name: 'Kâf', nameAr: 'كَاف', translit: 'k', sound: 'Comme le « k » de « kilo ».', connects: true, sun: false, example: { word: 'كِتَاب', tr: 'kitâb', fr: 'livre' } },
  { ar: 'ل', name: 'Lâm', nameAr: 'لَام', translit: 'l', sound: 'Comme le « l » de « lune ».', connects: true, sun: true, example: { word: 'لَيْل', tr: 'layl', fr: 'nuit' } },
  { ar: 'م', name: 'Mîm', nameAr: 'مِيم', translit: 'm', sound: 'Comme le « m » de « mère ».', connects: true, sun: false, example: { word: 'مَسْجِد', tr: 'masjid', fr: 'mosquée' } },
  { ar: 'ن', name: 'Nûn', nameAr: 'نُون', translit: 'n', sound: 'Comme le « n » de « nuit ».', connects: true, sun: true, example: { word: 'نُور', tr: 'nûr', fr: 'lumière' } },
  { ar: 'ه', name: 'Hâ’', nameAr: 'هَاء', translit: 'h', sound: "Un « h » expiré léger, comme dans l'anglais « hello ».", connects: true, sun: false, example: { word: 'هُدَى', tr: 'hudâ', fr: 'guidée' } },
  { ar: 'و', name: 'Wâw', nameAr: 'وَاو', translit: 'w / û', sound: "Comme « w » dans « watt » ; après une damma, il allonge le son « ou » (û).", connects: false, sun: false, example: { word: 'وُضُوء', tr: 'wudû’', fr: 'ablutions' } },
  { ar: 'ي', name: 'Yâ’', nameAr: 'يَاء', translit: 'y / î', sound: "Comme « y » dans « yoga » ; après une kasra, il allonge le son « i » (î).", connects: true, sun: false, example: { word: 'يَوْم', tr: 'yawm', fr: 'jour' } },
]

export const letterForms = (l: Letter) => ({
  isolee: l.ar,
  debut: l.connects ? l.ar + TATWEEL : l.ar,
  milieu: TATWEEL + l.ar + (l.connects ? TATWEEL : ''),
  fin: TATWEEL + l.ar,
})

export interface Lecon { id: string; title: string; mark?: string; intro: string; rows: { ar: string; tr: string; note?: string }[]; tips?: string[] }

export const VOWEL_LESSONS: Lecon[] = [
  {
    id: 'courtes',
    title: 'Les voyelles courtes (harakât)',
    intro: "L'arabe s'écrit de droite à gauche et les voyelles courtes sont de petits signes placés au-dessus ou au-dessous des lettres. Il y en a trois.",
    rows: [
      { ar: 'بَ', tr: 'ba', note: 'Fatha : un petit trait au-dessus → son « a »' },
      { ar: 'بِ', tr: 'bi', note: 'Kasra : un petit trait au-dessous → son « i »' },
      { ar: 'بُ', tr: 'bou', note: 'Damma : une petite boucle au-dessus → son « ou » (u)' },
      { ar: 'كَتَبَ', tr: 'kataba', note: 'Il a écrit' },
      { ar: 'سَمِعَ', tr: 'sami‘a', note: 'Il a entendu' },
    ],
    tips: ['Dans le Coran, toutes les voyelles sont écrites : c’est idéal pour apprendre à lire.'],
  },
  {
    id: 'longues',
    title: 'Les voyelles longues',
    intro: "Une voyelle courte suivie de sa lettre « sœur » devient longue : on tient le son deux temps.",
    rows: [
      { ar: 'بَا', tr: 'bâ', note: 'Fatha + alif → « â » long' },
      { ar: 'بِي', tr: 'bî', note: 'Kasra + yâ’ → « î » long' },
      { ar: 'بُو', tr: 'boû', note: 'Damma + wâw → « û » long' },
      { ar: 'نُور', tr: 'nûr', note: 'lumière' },
      { ar: 'رَحِيم', tr: 'rahîm', note: 'très miséricordieux' },
    ],
  },
  {
    id: 'tanwin',
    title: 'Le tanwîn',
    intro: "Le tanwîn est une voyelle doublée en fin de mot : elle ajoute un son « n ». Il marque souvent un mot indéfini.",
    rows: [
      { ar: 'بًا', tr: 'ban', note: 'Fathatân (deux traits au-dessus), souvent avec un alif' },
      { ar: 'بٍ', tr: 'bin', note: 'Kasratân (deux traits au-dessous)' },
      { ar: 'بٌ', tr: 'boun', note: 'Dammatân (double boucle)' },
      { ar: 'أَحَدٌ', tr: 'ahadun', note: 'unique (sourate 112)' },
      { ar: 'كِتَابًا', tr: 'kitâban', note: 'un livre' },
    ],
  },
  {
    id: 'soukoun',
    title: 'Le soukoun',
    intro: "Le soukoun est un petit rond au-dessus d'une lettre : il indique l'absence de voyelle. La lettre s'appuie sur la voyelle qui la précède.",
    rows: [
      { ar: 'أَبْ', tr: 'ab', note: 'b sans voyelle' },
      { ar: 'مِنْ', tr: 'min', note: 'de (préposition)' },
      { ar: 'قُلْ', tr: 'qul', note: 'Dis ! (début des sourates 112-114)' },
      { ar: 'بِسْمِ', tr: 'bismi', note: 'au nom de' },
    ],
  },
  {
    id: 'chadda',
    title: 'La chadda',
    intro: "La chadda (petit « w » au-dessus) double la lettre : on la prononce deux fois, une première fois sans voyelle puis avec la voyelle.",
    rows: [
      { ar: 'رَبَّ', tr: 'rabba', note: 'rab-ba' },
      { ar: 'إِنَّ', tr: 'inna', note: 'certes' },
      { ar: 'مُحَمَّد', tr: 'Muhammad', note: 'mu-ham-mad' },
      { ar: 'الْجَنَّة', tr: 'al-janna', note: 'le paradis' },
    ],
  },
]

export const READING_RULES: { title: string; text: string; examples: { ar: string; tr: string; fr?: string }[] }[] = [
  {
    title: "L'article « al » et les lettres lunaires",
    text: "Devant les 14 lettres **lunaires**, le « l » de l'article « al » (ال) se prononce normalement.",
    examples: [{ ar: 'الْقَمَر', tr: 'al-qamar', fr: 'la lune' }, { ar: 'الْكِتَاب', tr: 'al-kitâb', fr: 'le livre' }, { ar: 'الْحَمْدُ', tr: 'al-hamdu', fr: 'la louange' }],
  },
  {
    title: "L'article « al » et les lettres solaires",
    text: "Devant les 14 lettres **solaires**, le « l » ne se prononce pas : il est assimilé, et la lettre suivante porte une chadda.",
    examples: [{ ar: 'الشَّمْس', tr: 'ash-shams', fr: 'le soleil' }, { ar: 'الرَّحْمَٰن', tr: 'ar-Rahmân', fr: 'le Tout Miséricordieux' }, { ar: 'النَّاس', tr: 'an-nâs', fr: 'les gens' }],
  },
  {
    title: 'Le tâ’ marbûta (ة)',
    text: "C'est un « t » qui ne s'écrit qu'en fin de mot. Il se prononce « t » quand on enchaîne, et « h » (ou rien) quand on s'arrête.",
    examples: [{ ar: 'صَلَاة', tr: 'salâh / salât', fr: 'prière' }, { ar: 'زَكَاة', tr: 'zakâh / zakât', fr: 'aumône' }],
  },
  {
    title: 'La hamza (ء)',
    text: "La hamza est un petit coup de glotte, comme la coupure entre les deux « a » de « Ah ! Ah ! ». Elle peut s'écrire seule ou sur un support (أ إ ؤ ئ).",
    examples: [{ ar: 'سَأَلَ', tr: 'sa’ala', fr: 'il a demandé' }, { ar: 'قُرْآن', tr: 'qur’ân', fr: 'Coran' }],
  },
  {
    title: 'Le nom « Allah »',
    text: "Le « l » du nom Allah se prononce **épais** (emphatique) après une fatha ou une damma, et **fin** après une kasra.",
    examples: [{ ar: 'قَالَ اللَّهُ', tr: 'qâla-llâhu (épais)', fr: 'Allah a dit' }, { ar: 'بِسْمِ اللَّهِ', tr: 'bismi-llâhi (fin)', fr: 'au nom d’Allah' }],
  },
  {
    title: 'La prolongation (madd)',
    text: "Le signe ~ (madda) au-dessus d'une lettre longue indique qu'il faut prolonger davantage le son (4 à 6 temps selon les cas). Les détails relèvent du tajwîd.",
    examples: [{ ar: 'الضَّالِّينَ', tr: 'ad-dââllîn', fr: 'les égarés (fin d’Al-Fâtiha)' }, { ar: 'آمَنُوا', tr: 'âmanû', fr: 'ils ont cru' }],
  },
  {
    title: 'La nasalisation (ghunna)',
    text: "Le nûn et le mîm avec chadda (نّ ، مّ) se prononcent en faisant résonner le son dans le nez pendant deux temps.",
    examples: [{ ar: 'إِنَّ', tr: 'in-na', fr: 'certes' }, { ar: 'ثُمَّ', tr: 'thum-ma', fr: 'ensuite' }],
  },
]

export const ARABIC_NOTE =
  "La prononciation audio des lettres utilise la synthèse vocale arabe de votre appareil lorsqu'elle est disponible. Elle aide à se repérer mais ne remplace ni un enseignant ni l'écoute d'un récitateur : pour entendre les sons exacts, écoutez les récitations du Coran (par exemple la récitation pédagogique d'al-Husary, dans le lecteur)."
