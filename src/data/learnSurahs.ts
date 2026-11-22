/**
 * Parcours des sourates à apprendre.
 * Le texte arabe, la translittération, la traduction et l'audio sont chargés depuis Quran.com.
 * Les explications ci-dessous sont des résumés pédagogiques rédigés pour ce site, fidèles aux
 * explications classiques (tafsir d'Ibn Kathîr et d'as-Sa‘dî). Elles ne sont ni une traduction
 * ni un tafsir complet : le tafsir sourcé est accessible verset par verset dans le lecteur.
 */

export interface LearnSurah {
  id: number
  order: number
  name: string
  meaning: string
  why: string
  theme: string
  virtue?: { text: string; ref: string }
  verses: string[]
}

export const LEARN_SURAHS: LearnSurah[] = [
  {
    id: 1,
    order: 1,
    name: 'Al-Fâtiha',
    meaning: "L'Ouverture",
    why: 'Elle est récitée dans chaque rak‘a de chaque prière : c’est la première sourate à apprendre.',
    theme: "Une prière complète : louange d'Allah, reconnaissance de Sa royauté, engagement à n'adorer que Lui, puis demande de guidée.",
    virtue: { text: "« Pas de prière pour celui qui ne récite pas la Fâtiha du Livre. »", ref: 'al-Bukhârî n°756, Muslim n°394' },
    verses: [
      "On commence au nom d'Allah, en cherchant Sa bénédiction. **Ar-Rahmân** évoque une miséricorde immense qui englobe toute la création ; **ar-Rahîm** une miséricorde constante, notamment envers les croyants.",
      "Toute louange parfaite revient à Allah, le **Seigneur des mondes** : Il a créé et prend soin de tout ce qui existe (humains, djinns, animaux, univers).",
      "Le rappel de Sa miséricorde, juste après Sa seigneurie : Allah est un Maître miséricordieux.",
      "Il est le seul Maître du **Jour de la rétribution**, le Jour du Jugement, où chacun recevra la récompense de ses actes.",
      "Le cœur de la sourate : « C'est Toi seul que nous adorons, et c'est Toi seul dont nous implorons l'aide. » On réserve l'adoration à Allah et on reconnaît avoir besoin de Son aide pour y parvenir.",
      "La demande la plus importante : être guidé sur le **droit chemin** (l'islam) et y rester ferme.",
      "Le chemin de ceux qu'Allah a comblés (les prophètes, les véridiques, les martyrs et les vertueux), et non celui de ceux qui ont connu la vérité sans la suivre, ni de ceux qui se sont égarés faute de la connaître. On termine par « Âmîn » (qui ne fait pas partie de la sourate).",
    ],
  },
  {
    id: 112,
    order: 2,
    name: 'Al-Ikhlâs',
    meaning: 'Le culte pur',
    why: 'Très courte (4 versets), elle résume la croyance en l’unicité d’Allah.',
    theme: "Qui est Allah ? Unique, Celui dont toute chose a besoin, sans parent ni enfant, sans égal.",
    virtue: { text: "Le Prophète ﷺ a dit qu'elle équivaut à un tiers du Coran.", ref: 'al-Bukhârî n°5013, Muslim n°811' },
    verses: [
      "« Dis : Il est Allah, **Unique** (*Ahad*). » Il est unique dans Son être, Ses noms, Ses attributs et Ses actes ; rien ne Lui ressemble.",
      "Allah est **as-Samad** : Celui vers qui toutes les créatures se tournent dans leurs besoins, et qui Lui-même n'a besoin de rien ni de personne.",
      "Il n'a pas d'enfant et n'est pas né : Il n'a ni commencement ni descendance.",
      "Personne et rien ne Lui est égal ou comparable.",
    ],
  },
  {
    id: 113,
    order: 3,
    name: 'Al-Falaq',
    meaning: "L'Aube naissante",
    why: 'Sourate de protection, récitée matin, soir et avant de dormir.',
    theme: "Chercher refuge auprès d'Allah contre les maux extérieurs : le mal des créatures, de la nuit, de la sorcellerie et de l'envie.",
    virtue: { text: "« N'as-tu pas vu des versets révélés cette nuit, tels qu'on n'en a jamais vu de pareils ? Qul a‘ûdhu bi-Rabbi-l-falaq et Qul a‘ûdhu bi-Rabbi-n-nâs. »", ref: 'Muslim n°814' },
    verses: [
      "« Dis : je cherche refuge auprès du **Seigneur de l'aube**. » Celui qui fait jaillir la lumière de l'obscurité peut aussi dissiper tout mal.",
      "Contre le mal de tout ce qu'Il a créé, dans ce qu'il peut avoir de nuisible.",
      "Contre le mal de l'obscurité quand elle s'étend : la nuit, moment où beaucoup de dangers se cachent.",
      "Contre le mal de celles (ou ceux) qui soufflent sur les nœuds : la **sorcellerie**.",
      "Contre le mal de l'**envieux** quand il envie, souhaitant voir disparaître les bienfaits des autres.",
    ],
  },
  {
    id: 114,
    order: 4,
    name: 'An-Nâs',
    meaning: 'Les Hommes',
    why: 'Dernière sourate du Coran, sœur d’Al-Falaq, très utile contre les mauvaises pensées.',
    theme: "Chercher refuge auprès d'Allah contre les maux intérieurs : les suggestions de Satan et des mauvaises influences.",
    virtue: { text: "Récitée avec Al-Ikhlâs et Al-Falaq, trois fois matin et soir : « elles te suffiront contre toute chose ».", ref: 'Abû Dâwûd n°5082, at-Tirmidhî n°3575' },
    verses: [
      "« Dis : je cherche refuge auprès du **Seigneur des hommes**. »",
      "Le **Roi des hommes** : Celui qui détient toute autorité sur eux.",
      "La **Divinité des hommes** : le seul qui mérite d'être adoré. Trois noms qui montrent qu'Allah protège parfaitement.",
      "Contre le mal du **tentateur furtif** (*al-waswâs al-khannâs*) : Satan qui souffle de mauvaises pensées et recule lorsqu'on se souvient d'Allah.",
      "Celui qui souffle ces mauvaises suggestions dans le cœur des gens.",
      "Qu'il soit parmi les **djinns** ou parmi les **hommes** : les mauvaises influences peuvent venir des deux.",
    ],
  },
  {
    id: 108,
    order: 5,
    name: 'Al-Kawthar',
    meaning: "L'Abondance",
    why: 'La plus courte sourate du Coran (3 versets) : idéale pour la prière.',
    theme: "Une consolation pour le Prophète ﷺ : Allah lui a donné un bien immense ; la réponse est la prière et le sacrifice pour Allah.",
    virtue: { text: "Le Prophète ﷺ a expliqué qu'al-Kawthar est un fleuve qu'Allah lui a promis au Paradis, qui contient un bien abondant.", ref: 'Muslim n°400' },
    verses: [
      "« Nous t'avons accordé **al-Kawthar** » : un bien abondant, dont un fleuve au Paradis promis au Prophète ﷺ.",
      "En remerciement, **prie pour ton Seigneur et sacrifie** pour Lui seul (comme le sacrifice de l'Aïd al-Adha).",
      "Celui qui te hait, c'est lui qui sera « sans postérité » (*abtar*). Les ennemis du Prophète ﷺ le traitaient ainsi après la mort de ses fils ; or c'est son message qui a perduré.",
    ],
  },
  {
    id: 103,
    order: 6,
    name: 'Al-‘Asr',
    meaning: 'Le Temps',
    why: '3 versets qui résument tout le chemin du salut.',
    theme: "Tous les humains sont perdants, sauf ceux qui réunissent quatre qualités : la foi, les bonnes actions, s'encourager à la vérité et à la patience.",
    virtue: { text: "Selon une parole attribuée à l'imam ash-Shâfi‘î, si les gens méditaient cette sourate, elle leur suffirait.", ref: 'Cité notamment par Ibn Kathîr dans son tafsir' },
    verses: [
      "Allah jure **par le Temps** : le temps est précieux, c'est le capital de notre vie.",
      "L'être humain est **en perte** : chaque jour qui passe le rapproche de la fin.",
      "Sauf ceux qui **croient**, **font de bonnes œuvres**, **se recommandent mutuellement la vérité** et **se recommandent mutuellement la patience**.",
    ],
  },
  {
    id: 105,
    order: 7,
    name: 'Al-Fîl',
    meaning: "L'Éléphant",
    why: 'Une histoire courte et marquante, l’année de la naissance du Prophète ﷺ.',
    theme: "Allah a protégé la Ka‘ba contre l'armée d'Abraha, venue la détruire avec des éléphants.",
    verses: [
      "« N'as-tu pas vu comment ton Seigneur a agi envers les gens de l'**Éléphant** ? » L'armée d'Abraha, gouverneur du Yémen, vint pour détruire la Ka‘ba, vers l'an 570.",
      "Allah a fait échouer leur ruse.",
      "Il a envoyé contre eux des **oiseaux** en groupes successifs.",
      "Ces oiseaux leur lançaient des **pierres d'argile** durcie.",
      "Il les a rendus comme de la **paille mâchée** : l'armée fut anéantie et la Ka‘ba protégée.",
    ],
  },
  {
    id: 106,
    order: 8,
    name: 'Quraysh',
    meaning: 'Les Quraysh',
    why: 'Liée à Al-Fîl, elle rappelle les bienfaits d’Allah sur la tribu du Prophète ﷺ.',
    theme: "Allah a accordé à Quraysh la sécurité et la nourriture : qu'ils adorent donc le Seigneur de la Ka‘ba.",
    verses: [
      "Pour le **pacte de sécurité** dont bénéficiaient les Quraysh, la tribu de La Mecque.",
      "Leurs **caravanes d'hiver** (vers le Yémen) **et d'été** (vers la Syrie) voyageaient en sécurité grâce au respect de la Ka‘ba.",
      "Qu'ils adorent donc le **Seigneur de cette Maison** (la Ka‘ba).",
      "Lui qui les a **nourris** contre la faim et **rassurés** contre la peur. Deux bienfaits à reconnaître : la subsistance et la sécurité.",
    ],
  },
  {
    id: 107,
    order: 9,
    name: 'Al-Mâ‘ûn',
    meaning: "L'Ustensile",
    why: 'Elle relie la prière et la bonté envers les autres.',
    theme: "Celui qui renie la rétribution maltraite les faibles ; et malheur à ceux qui négligent leur prière, font les choses pour être vus et refusent la moindre aide.",
    verses: [
      "« As-tu vu celui qui traite de mensonge la **rétribution** (le Jour du Jugement) ? »",
      "C'est lui qui **repousse l'orphelin** avec dureté,",
      "et qui n'encourage pas à **nourrir le pauvre**.",
      "Malheur donc à ceux qui prient…",
      "… tout en étant **négligents** de leur prière (la retardant sans raison ou la faisant sans attention),",
      "qui agissent **pour être vus** des gens,",
      "et qui refusent de prêter même les **petits objets d'usage** (*al-mâ‘ûn* : un ustensile, un outil, un petit service).",
    ],
  },
  {
    id: 110,
    order: 10,
    name: 'An-Nasr',
    meaning: 'Le Secours',
    why: 'L’une des dernières sourates révélées, porteuse d’un bel enseignement d’humilité.',
    theme: "Quand vient la victoire d'Allah, on répond par la louange et la demande de pardon, non par l'orgueil.",
    virtue: { text: "Ibn ‘Abbâs a compris qu'elle annonçait l'approche de la fin de la mission du Prophète ﷺ.", ref: 'al-Bukhârî n°4970' },
    verses: [
      "Lorsque vient le **secours d'Allah** et la **victoire** (la conquête de La Mecque, en 630),",
      "et que tu vois les gens **entrer en masse** dans la religion d'Allah,",
      "alors **glorifie ton Seigneur par Sa louange** et **demande-Lui pardon** : Il accepte toujours le repentir. Après cette sourate, le Prophète ﷺ disait souvent dans son inclinaison : « Subhânaka-llâhumma Rabbanâ wa bi-hamdik, Allâhumma-ghfir lî » (al-Bukhârî n°817, Muslim n°484).",
    ],
  },
]

export const learnSurahById = (id: number) => LEARN_SURAHS.find((s) => s.id === id)
