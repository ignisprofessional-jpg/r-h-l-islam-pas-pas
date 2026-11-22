import type { Block } from './types'
import { qcm, vf, type QuizQ } from './types'

export type Pose = 'debout' | 'takbir' | 'qiyam' | 'ruku' | 'itidal' | 'sujud' | 'jalsa' | 'tashahhud' | 'salam'

export interface Words { ar: string; tr: string; fr: string; ref?: string; repeat?: string }

export interface GuideStep {
  id: string
  title: string
  pose: Pose
  short: string
  slow: string[]
  words?: Words[]
  tip?: string
  mistakes?: string[]
}

/* -------- Formules de la prière (texte arabe des formules transmises) -------- */
export const W = {
  takbir: { ar: 'اللَّهُ أَكْبَرُ', tr: 'Allâhu akbar', fr: 'Allah est le plus grand.', ref: 'Abû Dâwûd n°61, at-Tirmidhî n°3 (« son entrée est le takbir »)' },
  istiftah: { ar: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ', tr: 'Subhânaka-llâhumma wa bi-hamdik, wa tabâraka-smuk, wa ta‘âlâ jadduk, wa lâ ilâha ghayruk', fr: "Gloire et pureté à Toi, ô Allah, et par Ta louange. Béni soit Ton nom, élevée soit Ta majesté, et il n'y a de divinité que Toi.", ref: 'Abû Dâwûd n°775, at-Tirmidhî n°243 — recommandé, non obligatoire' },
  taawwudh: { ar: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', tr: 'A‘ûdhu billâhi mina-sh-shaytâni-r-rajîm', fr: 'Je cherche refuge auprès d’Allah contre Satan le maudit.', ref: 'Coran, sourate 16, verset 98' },
  basmala: { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', tr: 'Bismi-llâhi-r-Rahmâni-r-Rahîm', fr: 'Au nom d’Allah, le Tout Miséricordieux, le Très Miséricordieux.', ref: 'Coran, sourate 1, verset 1' },
  amin: { ar: 'آمِين', tr: 'Âmîn', fr: 'Exauce-nous (ô Allah).', ref: 'al-Bukhârî n°780, Muslim n°410' },
  ruku: { ar: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ', tr: 'Subhâna Rabbiya-l-‘Adhîm', fr: 'Gloire et pureté à mon Seigneur, le Très Grand.', ref: 'Muslim n°772 ; Abû Dâwûd n°871', repeat: '3 fois (au moins 1)' },
  samia: { ar: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ', tr: 'Sami‘a-llâhu li-man hamidah', fr: 'Allah entend celui qui Le loue.', ref: 'al-Bukhârî n°789, 796' },
  rabbana: { ar: 'رَبَّنَا وَلَكَ الْحَمْدُ', tr: 'Rabbanâ wa laka-l-hamd', fr: 'Notre Seigneur, à Toi la louange.', ref: 'al-Bukhârî n°796' },
  sujud: { ar: 'سُبْحَانَ رَبِّيَ الْأَعْلَى', tr: 'Subhâna Rabbiya-l-A‘lâ', fr: 'Gloire et pureté à mon Seigneur, le Très Haut.', ref: 'Muslim n°772 ; Abû Dâwûd n°871', repeat: '3 fois (au moins 1)' },
  jalsa: { ar: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي', tr: 'Rabbi-ghfir lî, Rabbi-ghfir lî', fr: 'Seigneur, pardonne-moi. Seigneur, pardonne-moi.', ref: 'Abû Dâwûd n°874 ; Ibn Mâja n°897' },
  tashahhud: {
    ar: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    tr: 'At-tahiyyâtu lillâhi wa-s-salawâtu wa-t-tayyibât. As-salâmu ‘alayka ayyuha-n-nabiyyu wa rahmatu-llâhi wa barakâtuh. As-salâmu ‘alaynâ wa ‘alâ ‘ibâdi-llâhi-s-sâlihîn. Ash-hadu an lâ ilâha illa-llâh, wa ash-hadu anna Muhammadan ‘abduhu wa rasûluh.',
    fr: "Les salutations sont à Allah, ainsi que les prières et les bonnes choses. Que la paix soit sur toi, ô Prophète, ainsi que la miséricorde d'Allah et Ses bénédictions. Que la paix soit sur nous et sur les vertueux serviteurs d'Allah. J'atteste qu'il n'y a de divinité qu'Allah, et j'atteste que Muhammad est Son serviteur et Son messager.",
    ref: 'Version d’Ibn Mas‘ûd : al-Bukhârî n°831, Muslim n°402',
  },
  salawat: {
    ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
    tr: 'Allâhumma salli ‘alâ Muhammadin wa ‘alâ âli Muhammad, kamâ sallayta ‘alâ Ibrâhîma wa ‘alâ âli Ibrâhîm, innaka Hamîdun Majîd. Allâhumma bârik ‘alâ Muhammadin wa ‘alâ âli Muhammad, kamâ bârakta ‘alâ Ibrâhîma wa ‘alâ âli Ibrâhîm, innaka Hamîdun Majîd.',
    fr: "Ô Allah, prie sur Muhammad et sur la famille de Muhammad, comme Tu as prié sur Abraham et sur la famille d'Abraham ; Tu es certes Digne de louange et de gloire. Ô Allah, bénis Muhammad et la famille de Muhammad, comme Tu as béni Abraham et la famille d'Abraham ; Tu es certes Digne de louange et de gloire.",
    ref: 'Salât ibrâhîmiyya : al-Bukhârî n°3370',
  },
  duaFinal: {
    ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
    tr: 'Allâhumma innî a‘ûdhu bika min ‘adhâbi jahannam, wa min ‘adhâbi-l-qabr, wa min fitnati-l-mahyâ wa-l-mamât, wa min sharri fitnati-l-masîhi-d-dajjâl',
    fr: "Ô Allah, je cherche refuge auprès de Toi contre le châtiment de l'Enfer, le châtiment de la tombe, les épreuves de la vie et de la mort, et le mal de l'épreuve du faux messie.",
    ref: 'Muslim n°588 — recommandé avant le salam',
  },
  salam: { ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', tr: 'As-salâmu ‘alaykum wa rahmatu-llâh', fr: "Que la paix soit sur vous, ainsi que la miséricorde d'Allah.", ref: 'Muslim n°582 ; Abû Dâwûd n°996' },
} satisfies Record<string, Words>

/* -------- Guide pas à pas : une prière de deux rak‘ats (ex. Fajr) -------- */
export const GUIDE: GuideStep[] = [
  {
    id: 'preparation',
    title: 'Se préparer',
    pose: 'debout',
    short: 'Être en état d’ablution, propre, couvert, tourné vers La Mecque, à l’heure de la prière.',
    slow: [
      "Avant de prier, on vérifie quelques conditions. Ne vous inquiétez pas, cela devient vite naturel.",
      "**1. Les ablutions** : faites le woudou (voir la rubrique Ablutions).",
      "**2. La propreté** : le corps, les vêtements et l'endroit doivent être propres (un tapis de prière n'est pas obligatoire, un sol propre suffit).",
      "**3. La tenue** : l'homme couvre au minimum du nombril aux genoux (et ses épaules, selon de nombreux savants) ; la femme couvre tout son corps sauf le visage et les mains (et les pieds selon l'école hanafite).",
      "**4. La direction** : on se tourne vers la Ka‘ba à La Mecque (la *qibla*). Une application boussole ou un site de qibla peut vous aider. Depuis la France, c'est approximativement vers le sud-est.",
      "**5. L'heure** : la prière doit être faite pendant son horaire (voir les horaires du jour dans la rubrique Prière).",
    ],
    tip: 'Si vous ne connaissez pas la direction exacte, faites de votre mieux : l’effort sincère suffit.',
  },
  {
    id: 'intention',
    title: 'L’intention (niyya)',
    pose: 'debout',
    short: 'Décider dans son cœur quelle prière on va faire.',
    slow: [
      "Debout, face à la qibla, pensez simplement : « Je vais prier la prière du Fajr (2 rak‘ats) pour Allah. »",
      "L'intention se fait **dans le cœur**. Il n'est pas nécessaire de la prononcer à voix haute.",
    ],
    mistakes: ['Croire qu’il faut réciter une formule précise d’intention à voix haute.'],
  },
  {
    id: 'takbir',
    title: 'Le takbir d’ouverture',
    pose: 'takbir',
    short: 'Lever les mains et dire « Allâhu akbar » : la prière commence.',
    slow: [
      "Levez les deux mains, paumes tournées vers la qibla, à hauteur des épaules ou des oreilles.",
      "Dites : **Allâhu akbar** (« Allah est le plus grand »).",
      "À partir de ce moment, vous êtes en prière : on ne parle plus, on ne mange pas, on regarde l'endroit où l'on se prosternera.",
    ],
    words: [W.takbir],
  },
  {
    id: 'qiyam',
    title: 'Debout : l’invocation d’ouverture',
    pose: 'qiyam',
    short: 'Poser les mains (main droite sur la gauche) et réciter l’invocation d’ouverture.',
    slow: [
      "Posez la main droite sur la main gauche, sur la poitrine ou sous le nombril (selon les écoles ; les malikites laissent souvent les bras le long du corps).",
      "Vous pouvez réciter l'invocation d'ouverture. Elle est **recommandée**, pas obligatoire : si vous ne la connaissez pas encore, passez à l'étape suivante.",
    ],
    words: [W.istiftah],
  },
  {
    id: 'fatiha',
    title: 'Réciter Al-Fâtiha',
    pose: 'qiyam',
    short: 'Dire la formule de protection, la basmala, puis réciter Al-Fâtiha et dire « Âmîn ».',
    slow: [
      "Dites à voix basse la formule de protection, puis la basmala.",
      "Récitez **Al-Fâtiha**, la première sourate du Coran. Sa récitation est un pilier de la prière pour la majorité des savants.",
      "À la fin, dites **Âmîn**.",
      "Al-Fâtiha s'apprend verset par verset dans la rubrique « Sourates à apprendre ».",
    ],
    words: [W.taawwudh, W.basmala, W.amin],
    tip: "Le texte complet d'Al-Fâtiha (arabe, phonétique, traduction et audio) est disponible dans la rubrique Sourates.",
  },
  {
    id: 'sourate',
    title: 'Réciter une autre sourate',
    pose: 'qiyam',
    short: 'Dans les deux premières rak‘ats, réciter une sourate ou quelques versets après Al-Fâtiha.',
    slow: [
      "Après Al-Fâtiha, récitez une courte sourate, par exemple **Al-Ikhlâs** (« Qul huwa-llâhu ahad… »).",
      "Cette récitation supplémentaire est recommandée (sunna) dans les deux premières rak‘ats. Elle ne se fait pas dans la 3e et la 4e rak‘a.",
    ],
  },
  {
    id: 'ruku',
    title: 'L’inclinaison (rukû‘)',
    pose: 'ruku',
    short: 'Dire « Allâhu akbar », s’incliner, mains sur les genoux, dos droit.',
    slow: [
      "Dites **Allâhu akbar** en vous inclinant.",
      "Posez les mains sur les genoux, doigts écartés, le dos bien droit et la tête dans l'alignement du dos.",
      "Restez immobile un instant (la sérénité, *tuma’nîna*, est obligatoire) et dites **trois fois** : Subhâna Rabbiya-l-‘Adhîm.",
    ],
    words: [W.takbir, W.ruku],
    mistakes: ['Se relever trop vite sans marquer de pause.', 'Courber le dos exagérément ou relever la tête.'],
  },
  {
    id: 'itidal',
    title: 'Se redresser (i‘tidâl)',
    pose: 'itidal',
    short: 'Se relever en disant « Sami‘a-llâhu li-man hamidah », puis « Rabbanâ wa laka-l-hamd ».',
    slow: [
      "Redressez-vous en disant : **Sami‘a-llâhu li-man hamidah**.",
      "Une fois bien droit et immobile, dites : **Rabbanâ wa laka-l-hamd**.",
      "Derrière un imam, on dit seulement « Rabbanâ wa laka-l-hamd ».",
    ],
    words: [W.samia, W.rabbana],
  },
  {
    id: 'sujud1',
    title: 'La prosternation (sujûd)',
    pose: 'sujud',
    short: 'Dire « Allâhu akbar » et se prosterner sur sept parties du corps.',
    slow: [
      "Dites **Allâhu akbar** et descendez vers le sol.",
      "Posez **sept parties** du corps : le front (avec le nez), les deux mains, les deux genoux et les orteils des deux pieds.",
      "Les coudes sont relevés du sol, écartés du corps ; les doigts sont joints, tournés vers la qibla.",
      "Dites **trois fois** : Subhâna Rabbiya-l-A‘lâ. C'est le moment où l'on est le plus proche d'Allah : on peut aussi Lui faire des invocations personnelles (de préférence en arabe dans la prière obligatoire, selon de nombreux savants).",
    ],
    words: [W.takbir, W.sujud],
    tip: "« Le moment où le serviteur est le plus proche de son Seigneur, c'est lorsqu'il est prosterné : multipliez donc les invocations » (Muslim n°482).",
  },
  {
    id: 'jalsa',
    title: 'S’asseoir entre les deux prosternations',
    pose: 'jalsa',
    short: 'Dire « Allâhu akbar », s’asseoir calmement et demander pardon.',
    slow: [
      "Dites **Allâhu akbar** et redressez-vous en position assise : assis sur le pied gauche, le pied droit dressé, orteils vers la qibla.",
      "Posez les mains sur les cuisses et dites : **Rabbi-ghfir lî, Rabbi-ghfir lî**.",
    ],
    words: [W.takbir, W.jalsa],
  },
  {
    id: 'sujud2',
    title: 'La deuxième prosternation',
    pose: 'sujud',
    short: 'Dire « Allâhu akbar » et se prosterner à nouveau, comme la première fois.',
    slow: [
      "Dites **Allâhu akbar** et prosternez-vous à nouveau exactement comme la première fois.",
      "Dites trois fois : Subhâna Rabbiya-l-A‘lâ.",
      "**La première rak‘a est terminée !** Une rak‘a = debout + récitation + inclinaison + redressement + deux prosternations.",
    ],
    words: [W.takbir, W.sujud],
  },
  {
    id: 'rakaa2',
    title: 'La deuxième rak‘a',
    pose: 'qiyam',
    short: 'Se relever en disant « Allâhu akbar » et refaire la même chose (sans l’invocation d’ouverture).',
    slow: [
      "Relevez-vous en disant **Allâhu akbar**.",
      "Récitez Al-Fâtiha, puis une courte sourate (par exemple Al-Kawthar ou An-Nâs).",
      "Puis inclinaison, redressement, deux prosternations — comme dans la première rak‘a.",
      "Après la deuxième prosternation, **ne vous relevez pas** : restez assis pour le tachahhoud.",
    ],
    words: [W.takbir],
  },
  {
    id: 'tashahhud',
    title: 'Le tachahhoud',
    pose: 'tashahhud',
    short: 'Assis, réciter le tachahhoud, puis la prière sur le Prophète ﷺ et une invocation.',
    slow: [
      "Asseyez-vous comme entre les prosternations (dans la dernière position assise d'une prière de 3 ou 4 rak‘ats, beaucoup s'assoient sur le côté gauche, pied gauche sous la jambe droite : c'est le *tawarruk*).",
      "Posez la main gauche sur la cuisse gauche, la main droite sur la cuisse droite, et **levez l'index droit** en direction de la qibla au moment de l'attestation (selon les écoles, on le lève fixe ou on le bouge légèrement).",
      "Récitez le **tachahhoud**, puis la **prière sur le Prophète** ﷺ (salât ibrâhîmiyya), puis, si vous le pouvez, l'invocation de protection.",
    ],
    words: [W.tashahhud, W.salawat, W.duaFinal],
  },
  {
    id: 'salam',
    title: 'Le salam : terminer la prière',
    pose: 'salam',
    short: 'Tourner la tête à droite puis à gauche en disant « As-salâmu ‘alaykum wa rahmatu-llâh ».',
    slow: [
      "Tournez la tête vers la **droite** en disant : **As-salâmu ‘alaykum wa rahmatu-llâh**.",
      "Puis vers la **gauche** en disant la même chose.",
      "**Félicitations, votre prière est terminée !** Vous pouvez ensuite faire les invocations d'après la prière (voir la rubrique Invocations).",
    ],
    words: [W.salam],
    tip: 'Une seule salutation (à droite) suffit pour sortir de la prière selon la majorité ; la seconde est recommandée.',
  },
]

/* -------- Les cinq prières -------- */
export interface PrayerInfo {
  id: 'fajr' | 'dhohr' | 'asr' | 'maghrib' | 'isha'
  name: string
  arabic: string
  timingKey: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha'
  rakaat: number
  loud: string
  window: string
  sunnaBefore?: string
  sunnaAfter?: string
  notes: string[]
}

export const PRAYERS: PrayerInfo[] = [
  {
    id: 'fajr',
    name: 'Fajr (l’aube)',
    arabic: 'الفجر',
    timingKey: 'Fajr',
    rakaat: 2,
    loud: 'Récitation à voix haute dans les deux rak‘ats (pour l’imam et celui qui prie seul, selon la majorité).',
    window: "De l'aube véritable (lueur horizontale à l'est) jusqu'au lever du soleil.",
    sunnaBefore: '2 rak‘ats très fortement recommandées (sunna du Fajr).',
    notes: ['C’est la plus courte des prières obligatoires.', '« Les deux rak‘ats de l’aube sont meilleures que ce bas-monde et ce qu’il contient » (Muslim n°725).', 'Si vous vous réveillez après le lever du soleil, priez dès le réveil : l’oubli et le sommeil sont excusés (Muslim n°684).'],
  },
  {
    id: 'dhohr',
    name: 'Dhohr (midi)',
    arabic: 'الظهر',
    timingKey: 'Dhuhr',
    rakaat: 4,
    loud: 'Récitation à voix basse dans les quatre rak‘ats.',
    window: "Juste après le zénith (le soleil commence à décliner) jusqu'à ce que l'ombre d'un objet soit égale à sa longueur (deux fois selon l'école hanafite).",
    sunnaBefore: '4 rak‘ats (2 × 2) recommandées.',
    sunnaAfter: '2 rak‘ats recommandées.',
    notes: ['Le vendredi, la prière du vendredi (jumu‘a, 2 rak‘ats) remplace le Dhohr pour ceux qui y assistent.', 'Après la 2e rak‘a : premier tachahhoud (sans le salam), puis on se relève pour la 3e et la 4e, où l’on récite seulement Al-Fâtiha.'],
  },
  {
    id: 'asr',
    name: '‘Asr (l’après-midi)',
    arabic: 'العصر',
    timingKey: 'Asr',
    rakaat: 4,
    loud: 'Récitation à voix basse dans les quatre rak‘ats.',
    window: "De la fin du temps du Dhohr jusqu'au coucher du soleil ; il est préférable de ne pas la retarder jusqu'à ce que le soleil jaunisse.",
    sunnaBefore: '4 rak‘ats recommandées, non régulières (at-Tirmidhî n°430).',
    notes: ['Elle est souvent identifiée à la « prière médiane » mentionnée dans le Coran (sourate 2, verset 238), selon de nombreux savants (al-Bukhârî n°2931, Muslim n°627).', 'Même déroulement que le Dhohr.'],
  },
  {
    id: 'maghrib',
    name: 'Maghrib (le coucher du soleil)',
    arabic: 'المغرب',
    timingKey: 'Maghrib',
    rakaat: 3,
    loud: 'À voix haute dans les deux premières rak‘ats, à voix basse dans la troisième.',
    window: "Du coucher complet du soleil jusqu'à la disparition des lueurs rouges du crépuscule.",
    sunnaAfter: '2 rak‘ats recommandées.',
    notes: ['Son temps est relativement court : mieux vaut ne pas la retarder.', 'Après la 2e rak‘a : premier tachahhoud, puis on se relève pour la 3e (Al-Fâtiha seule), puis tachahhoud final et salam.', 'En voyage, le Maghrib n’est jamais raccourci.'],
  },
  {
    id: 'isha',
    name: '‘Ishâ (la nuit)',
    arabic: 'العشاء',
    timingKey: 'Isha',
    rakaat: 4,
    loud: 'À voix haute dans les deux premières rak‘ats, à voix basse dans les deux dernières.',
    window: "De la disparition du crépuscule jusqu'au milieu de la nuit (préférable), et jusqu'à l'aube en cas de nécessité selon la majorité.",
    sunnaAfter: '2 rak‘ats recommandées, puis le witr (nombre impair de rak‘ats) avant l’aube.',
    notes: ['Le Prophète ﷺ a fixé la fin de son temps préféré au milieu de la nuit (Muslim n°612).', 'Le witr clôt la prière de la nuit : « Faites du witr votre dernière prière de la nuit » (al-Bukhârî n°998).'],
  },
]

/* -------- Le cours complet sur la prière (sections) -------- */
export const PRAYER_COURSE: { id: string; title: string; icon: string; blocks: Block[] }[] = [
  {
    id: 'pourquoi',
    title: 'Pourquoi les musulmans prient',
    icon: 'heart',
    blocks: [
      { t: 'p', text: "La prière (**salât**) est le lien quotidien entre le croyant et Allah. Elle a été prescrite par Allah, elle est le deuxième pilier de l'islam, et elle apporte paix intérieure, discipline et rappel de l'essentiel." },
      { t: 'verse', key: '20:14' },
      { t: 'verse', key: '2:45' },
      { t: 'hadith', text: "« Le premier acte sur lequel le serviteur sera jugé le Jour de la Résurrection, c'est la prière. »", ref: 'Rapporté par at-Tirmidhî (n°413) et an-Nasâ’î (n°465), d’après Abû Hurayra' },
    ],
  },
  {
    id: 'cinq',
    title: 'Les cinq prières quotidiennes',
    icon: 'clock',
    blocks: [
      { t: 'table', head: ['Prière', 'Rak‘ats obligatoires', 'Récitation', 'Moment'], rows: [
        ['Fajr', '2', 'Voix haute', 'Aube → lever du soleil'],
        ['Dhohr', '4', 'Voix basse', 'Après le zénith → milieu d’après-midi'],
        ['‘Asr', '4', 'Voix basse', 'Milieu d’après-midi → coucher du soleil'],
        ['Maghrib', '3', 'Haute (1-2), basse (3)', 'Coucher du soleil → fin du crépuscule'],
        ['‘Ishâ', '4', 'Haute (1-2), basse (3-4)', 'Nuit → milieu de la nuit'],
      ] },
      { t: 'p', text: "Au total : **17 rak‘ats obligatoires** par jour. Une **rak‘a** est une « unité » de prière : station debout, récitation, inclinaison, redressement et deux prosternations." },
      { t: 'verse', key: '11:114' },
    ],
  },
  {
    id: 'horaires',
    title: 'Les horaires et leurs différences',
    icon: 'sun',
    blocks: [
      { t: 'p', text: "Les horaires dépendent de la **position du soleil** : ils changent chaque jour et selon la ville. C'est pourquoi on utilise un calendrier ou une application." },
      { t: 'list', items: [
        "**Méthodes de calcul** : pour le Fajr et le ‘Ishâ, les organismes utilisent différents angles du soleil sous l'horizon (12°, 15°, 18°…). Cela peut créer des écarts de plusieurs minutes, voire plus en été en Europe. Suivez de préférence le calendrier de votre mosquée.",
        "**Le ‘Asr** : l'école hanafite le calcule plus tard (ombre égale à deux fois la longueur de l'objet) que les autres écoles (ombre égale à la longueur).",
        "**Les heures à éviter** pour les prières surérogatoires : au lever du soleil, au zénith, et au coucher du soleil (Muslim n°831).",
      ] },
      { t: 'verse', key: '4:103' },
    ],
  },
  {
    id: 'conditions',
    title: 'Les conditions de validité',
    icon: 'checkCircle',
    blocks: [
      { t: 'p', text: "Les **conditions** (*shurût*) sont ce qui doit être réuni **avant** de commencer pour que la prière soit valide :" },
      { t: 'list', ordered: true, items: [
        "**Être musulman**, sain d'esprit et doué de discernement.",
        "**Être en état de pureté** : avoir fait les ablutions (ou le ghusl si nécessaire).",
        "**La propreté** du corps, des vêtements et du lieu.",
        "**Couvrir sa ‘awra** (les parties du corps à couvrir).",
        "**Être tourné vers la qibla** (sourate 2, verset 144).",
        "**L'entrée du temps** de la prière.",
        "**L'intention** (niyya).",
      ] },
      { t: 'p', text: "Les **piliers** (*arkân*) sont les éléments **à l'intérieur** de la prière qui ne peuvent être omis : le takbir d'ouverture, la station debout (pour qui le peut), Al-Fâtiha, l'inclinaison, le redressement, les prosternations, l'assise entre elles, le dernier tachahhoud, le salam, la sérénité dans chaque position et le respect de l'ordre. La liste exacte varie légèrement selon les écoles." },
      { t: 'hadith', text: "« La clé de la prière est la purification, son entrée est le takbir et sa sortie est le salam (taslîm). »", ref: 'Rapporté par Abû Dâwûd (n°61) et at-Tirmidhî (n°3), d’après ‘Alî' },
      { t: 'verse', key: '2:144' },
    ],
  },
  {
    id: 'ablutions',
    title: 'Les ablutions',
    icon: 'drop',
    blocks: [
      { t: 'p', text: "On ne peut pas prier sans être en état de pureté. Les ablutions (**woudou**) se font avec de l'eau, dans un ordre précis. Elles ont leur propre guide interactif, avec chaque étape illustrée." },
      { t: 'hadith', text: "« Allah n'accepte pas la prière de l'un de vous s'il a perdu ses ablutions, jusqu'à ce qu'il les refasse. »", ref: 'Rapporté par al-Bukhârî (n°135) et Muslim (n°225), d’après Abû Hurayra' },
      { t: 'link', to: '/ablutions', label: 'Ouvrir le guide des ablutions' },
    ],
  },
  {
    id: 'gestes',
    title: 'Les gestes de la prière',
    icon: 'prayer',
    blocks: [
      { t: 'p', text: "La prière suit toujours la même succession de positions. Le guide interactif les illustre une par une :" },
      { t: 'list', ordered: true, items: ['Takbir d’ouverture (mains levées)', 'Station debout (qiyâm) : récitation', 'Inclinaison (rukû‘)', 'Redressement (i‘tidâl)', 'Première prosternation (sujûd)', 'Assise (jalsa)', 'Seconde prosternation', 'Tachahhoud (assis) après la 2e rak‘a et à la fin', 'Salam à droite puis à gauche'] },
      { t: 'hadith', text: "Un homme pria rapidement puis salua le Prophète ﷺ, qui lui dit : « Retourne prier, car tu n'as pas prié. » Puis il lui enseigna : « Incline-toi jusqu'à être serein dans l'inclinaison, puis redresse-toi jusqu'à être droit, puis prosterne-toi jusqu'à être serein dans la prosternation… »", ref: 'Rapporté par al-Bukhârî (n°757) et Muslim (n°397), d’après Abû Hurayra' },
      { t: 'link', to: '/priere/guide', label: 'Ouvrir le guide illustré pas à pas' },
    ],
  },
  {
    id: 'paroles',
    title: 'Les paroles à prononcer',
    icon: 'volume',
    blocks: [
      { t: 'p', text: "Voici les formules principales, dans l'ordre. Elles se disent en arabe. Le guide pas à pas les présente au bon moment." },
      { t: 'arabic', ...W.takbir },
      { t: 'arabic', ...W.istiftah },
      { t: 'arabic', ...W.taawwudh },
      { t: 'arabic', ...W.ruku },
      { t: 'arabic', ...W.samia },
      { t: 'arabic', ...W.rabbana },
      { t: 'arabic', ...W.sujud },
      { t: 'arabic', ...W.jalsa },
    ],
  },
  {
    id: 'sourates',
    title: 'Les sourates à apprendre',
    icon: 'book',
    blocks: [
      { t: 'p', text: "Pour prier, il faut d'abord connaître **Al-Fâtiha**, récitée dans chaque rak‘a. Ensuite, quelques sourates courtes suffisent pour les deux premières rak‘ats :" },
      { t: 'list', items: ['Al-Fâtiha (indispensable)', 'Al-Ikhlâs (4 versets)', 'Al-Kawthar (3 versets, la plus courte)', 'Al-‘Asr (3 versets)', 'An-Nâs et Al-Falaq'] },
      { t: 'hadith', text: "« Pas de prière pour celui qui ne récite pas la Fâtiha du Livre. »", ref: 'Rapporté par al-Bukhârî (n°756) et Muslim (n°394), d’après ‘Ubâda ibn as-Sâmit' },
      { t: 'link', to: '/sourates', label: 'Apprendre les sourates (texte, audio, exercices)' },
      { t: 'note', tone: 'gentle', title: 'Vous ne les connaissez pas encore ?', text: "Commencez à prier quand même pendant que vous apprenez. Un hadith rapporte qu'à un homme qui ne pouvait encore rien apprendre du Coran, le Prophète ﷺ enseigna de dire : « Subhâna-llâh, wa-l-hamdu lillâh, wa lâ ilâha illa-llâh, wa-llâhu akbar, wa lâ hawla wa lâ quwwata illâ billâh » (Abû Dâwûd n°832, an-Nasâ’î n°924). Les savants considèrent cela comme une solution provisoire, le temps d'apprendre Al-Fâtiha. Vous pouvez aussi suivre un imam à la mosquée." },
    ],
  },
  {
    id: 'tachahhoud',
    title: 'Le tachahhoud',
    icon: 'sparkle',
    blocks: [
      { t: 'p', text: "Le **tachahhoud** (« attestation ») se récite en position assise : après la 2e rak‘a (premier tachahhoud, dans les prières de 3 ou 4 rak‘ats) et à la fin de chaque prière (dernier tachahhoud). Il s'enseignait avec autant de soin qu'une sourate du Coran." },
      { t: 'arabic', ...W.tashahhud },
      { t: 'p', text: "Dans le **dernier** tachahhoud, on ajoute la prière sur le Prophète ﷺ (salât ibrâhîmiyya), puis une invocation :" },
      { t: 'arabic', ...W.salawat },
      { t: 'arabic', ...W.duaFinal },
      { t: 'note', tone: 'scholar', text: "Il existe plusieurs versions authentiques du tachahhoud (Ibn Mas‘ûd, Ibn ‘Abbâs, ‘Umar). Celle d'Ibn Mas‘ûd, présentée ici, est la plus répandue ; les malikites utilisent souvent celle de ‘Umar. Toutes sont valides." },
    ],
  },
  {
    id: 'salam',
    title: 'Le salam',
    icon: 'check',
    blocks: [
      { t: 'p', text: "Le **salam** (ou taslîm) termine la prière. On tourne la tête vers la droite, puis vers la gauche, en disant :" },
      { t: 'arabic', ...W.salam },
      { t: 'hadith', text: "Sa‘d raconte : « Je voyais le Messager d'Allah ﷺ saluer à sa droite et à sa gauche, au point que je voyais la blancheur de sa joue. »", ref: 'Rapporté par Muslim (n°582)' },
      { t: 'link', to: '/douas?cat=apres-priere', label: 'Les invocations après la prière' },
    ],
  },
  {
    id: 'obligatoire-sunna',
    title: 'Obligatoire ou surérogatoire ?',
    icon: 'layers',
    blocks: [
      { t: 'terms', items: [
        { term: 'Fard (obligatoire)', def: 'Les cinq prières quotidiennes et la prière du vendredi pour les hommes concernés. Les délaisser est une faute grave.' },
        { term: 'Sunna mu’akkada (fortement recommandée)', def: 'Les prières que le Prophète ﷺ faisait régulièrement : 2 avant le Fajr, 4 avant et 2 après le Dhohr, 2 après le Maghrib, 2 après le ‘Ishâ, et le witr.' },
        { term: 'Nâfila (surérogatoire libre)', def: 'Toute prière volontaire supplémentaire : prière de la nuit (qiyâm al-layl), prière du matin (duhâ)…' },
      ] },
      { t: 'p', text: "Les prières surérogatoires complètent les éventuels manques des prières obligatoires et rapprochent d'Allah. Mais pour un débutant, la priorité est d'abord d'établir les **cinq prières obligatoires**." },
      { t: 'link', to: '/cours/priere-approfondie', label: 'Approfondir : witr, vendredi, prière en groupe, oubli…' },
    ],
  },
]

export const QUIZ_PRIERE: QuizQ[] = [
  qcm('Combien de rak‘ats compte la prière du Maghrib ?', ['2', '3', '4', '5'], 1, 'Le Maghrib compte 3 rak‘ats.'),
  qcm('Combien de rak‘ats obligatoires y a-t-il au total par jour ?', ['5', '12', '17', '20'], 2, '2 + 4 + 4 + 3 + 4 = 17 rak‘ats.'),
  qcm('Que dit-on dans l’inclinaison (rukû‘) ?', ['Subhâna Rabbiya-l-A‘lâ', 'Subhâna Rabbiya-l-‘Adhîm', 'Rabbi-ghfir lî', 'Allâhu akbar seulement'], 1, 'Subhâna Rabbiya-l-‘Adhîm (Muslim n°772).'),
  qcm('Que dit-on dans la prosternation (sujûd) ?', ['Subhâna Rabbiya-l-A‘lâ', 'Sami‘a-llâhu li-man hamidah', 'Âmîn', 'As-salâmu ‘alaykum'], 0, 'Subhâna Rabbiya-l-A‘lâ : gloire à mon Seigneur, le Très Haut.'),
  vf('L’intention doit obligatoirement être prononcée à voix haute.', false, 'L’intention se fait dans le cœur.'),
  qcm('Combien de parties du corps touchent le sol pendant la prosternation ?', ['3', '5', '7', '9'], 2, 'Sept : le front (avec le nez), les deux mains, les deux genoux, les orteils des deux pieds (al-Bukhârî n°812).'),
  vf('On récite une sourate après Al-Fâtiha dans la 3e et la 4e rak‘a.', false, 'Dans la 3e et la 4e rak‘a, on récite seulement Al-Fâtiha.'),
  qcm('Comment se termine la prière ?', ['Par le takbir', 'Par le salam à droite puis à gauche', 'Par « Âmîn »', 'En se relevant'], 1, '« Sa sortie est le taslîm » (Abû Dâwûd n°61).'),
  qcm('Quelle prière se récite à voix basse ?', ['Fajr', 'Maghrib', 'Dhohr', '‘Ishâ'], 2, 'Le Dhohr et le ‘Asr se récitent à voix basse.'),
  vf('Être tourné vers la qibla est une condition de validité de la prière.', true, 'Oui (sourate 2, verset 144), sauf cas d’incapacité ou de doute après effort.'),
]
