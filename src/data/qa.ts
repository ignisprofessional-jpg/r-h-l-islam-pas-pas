import type { Block } from './types'

export interface QA {
  id: string
  q: string
  tags: string[]
  answer: Block[]
  /** La question dépend de la situation personnelle : il faut l'avis d'une personne qualifiée. */
  askImam?: boolean
  sources: string[]
}

export const QAS: QA[] = [
  {
    id: 'premiere-priere',
    q: 'Comment faire ma première prière ?',
    tags: ['prière', 'débutant'],
    answer: [
      { t: 'p', text: "Félicitations pour cette démarche ! Voici un chemin simple :" },
      { t: 'list', ordered: true, items: [
        "Apprenez à faire **les ablutions** (guide illustré de la rubrique Ablutions).",
        "Apprenez **Al-Fâtiha**, verset par verset, avec l'audio et la phonétique (rubrique Sourates).",
        "Suivez le **guide « Je découvre la prière »** en mode lent, en commençant par une prière de 2 rak‘ats (le Fajr).",
        "Gardez le guide ouvert près de vous au début : c'est tout à fait normal de lire les paroles.",
        "Si possible, allez prier à la mosquée derrière un imam : vous suivez ses mouvements.",
      ] },
      { t: 'link', to: '/priere/guide', label: 'Ouvrir le guide pas à pas' },
      { t: 'note', tone: 'gentle', text: "Les premières prières sont parfois maladroites : Allah regarde l'effort sincère. Le Prophète ﷺ a dit que celui qui récite le Coran avec difficulté a une double récompense (al-Bukhârî n°4937, Muslim n°798)." },
    ],
    sources: ['Sahîh al-Bukhârî n°4937 ; Sahîh Muslim n°798'],
  },
  {
    id: 'ablutions',
    q: 'Comment faire les ablutions ?',
    tags: ['ablutions', 'woudou', 'débutant'],
    answer: [
      { t: 'p', text: "Les ablutions se font dans cet ordre : intention, Bismillâh, mains (3 fois), bouche (3), nez (3), visage (3), bras jusqu'aux coudes (3, droite puis gauche), essuyer la tête (1), les oreilles (1), pieds jusqu'aux chevilles (3, droite puis gauche), puis l'attestation de foi." },
      { t: 'p', text: "Les éléments **obligatoires** cités dans le Coran sont : le visage, les bras jusqu'aux coudes, essuyer la tête et laver les pieds jusqu'aux chevilles." },
      { t: 'verse', key: '5:6' },
      { t: 'link', to: '/ablutions', label: 'Ouvrir le guide illustré des ablutions' },
    ],
    sources: ['Coran 5:6 ; Sahîh al-Bukhârî n°159 ; Sahîh Muslim n°226'],
  },
  {
    id: 'shahada',
    q: 'Que signifie la shahada ?',
    tags: ['shahada', 'foi', 'conversion'],
    answer: [
      { t: 'arabic', ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', tr: 'Ash-hadu an lâ ilâha illa-llâh, wa ash-hadu anna Muhammadan rasûlu-llâh', fr: "J'atteste qu'il n'y a de divinité [digne d'adoration] qu'Allah, et j'atteste que Muhammad est le Messager d'Allah." },
      { t: 'p', text: "La première partie affirme que seul Allah mérite d'être adoré. La seconde affirme que Muhammad ﷺ est Son messager, qu'on suit son enseignement et son exemple. La prononcer avec conviction suffit pour entrer en islam." },
      { t: 'link', to: '/cours/shahada', label: 'Lire le cours complet sur la shahada' },
    ],
    sources: ['Sahîh al-Bukhârî n°8 ; Sahîh Muslim n°16'],
  },
  {
    id: 'apprendre-fatiha',
    q: 'Comment apprendre Al-Fâtiha ?',
    tags: ['fâtiha', 'sourate', 'mémorisation', 'coran'],
    answer: [
      { t: 'list', ordered: true, items: [
        "**Écoutez** plusieurs fois la sourate entière (récitation lente d'al-Husary conseillée).",
        "**Apprenez un verset à la fois** : écoutez-le, répétez-le 5 à 10 fois avec le bouton « répéter », en lisant la phonétique.",
        "**Enchaînez** : récitez le verset 1, puis 1+2, puis 1+2+3…",
        "**Testez-vous** avec les exercices (texte masqué, versets à remettre dans l'ordre, mot manquant).",
        "**Récitez-la dans vos prières** : c'est la meilleure révision.",
        "Si possible, faites-vous **écouter par quelqu'un** qui connaît la récitation, pour corriger la prononciation.",
      ] },
      { t: 'link', to: '/sourates/1', label: 'Apprendre Al-Fâtiha maintenant' },
      { t: 'note', tone: 'tip', text: "10 minutes par jour suffisent. Beaucoup de personnes apprennent Al-Fâtiha en une à deux semaines." },
    ],
    sources: ['Méthode pédagogique ; texte et audio : Quran.com'],
  },
  {
    id: 'pas-toutes-sourates',
    q: 'Que faire si je ne connais pas encore toutes les sourates ?',
    tags: ['prière', 'sourate', 'débutant', 'fâtiha'],
    answer: [
      { t: 'p', text: "C'est la situation de tous les débutants, et la religion en tient compte." },
      { t: 'list', items: [
        "**Commencez à prier tout de suite**, sans attendre de tout connaître.",
        "**En attendant de connaître Al-Fâtiha**, un hadith rapporte qu'à un homme qui ne pouvait encore rien apprendre du Coran, le Prophète ﷺ enseigna de dire : « Subhâna-llâh, wa-l-hamdu lillâh, wa lâ ilâha illa-llâh, wa-llâhu akbar, wa lâ hawla wa lâ quwwata illâ billâh » (Abû Dâwûd n°832, an-Nasâ’î n°924). Les savants y voient une solution provisoire, avec l'obligation de continuer à apprendre.",
        "**Vous pouvez lire** la phonétique sur une feuille ou un téléphone pendant cette période d'apprentissage, selon de nombreux savants contemporains, pour les prières surérogatoires notamment. Les avis divergent pour la prière obligatoire : renseignez-vous auprès de votre mosquée.",
        "**Quand vous connaissez Al-Fâtiha**, elle suffit : la sourate supplémentaire est recommandée, non obligatoire.",
        "**Priez derrière un imam** quand c'est possible : c'est lui qui récite à voix haute.",
      ] },
      { t: 'verse', key: '64:16' },
    ],
    askImam: true,
    sources: ['Sunan Abî Dâwûd n°832 ; Sunan an-Nasâ’î n°924 ; Coran 64:16'],
  },
  {
    id: 'famille-non-musulmane',
    q: 'Comment pratiquer l’islam dans une famille non musulmane ?',
    tags: ['famille', 'parents', 'conversion', 'halal'],
    answer: [
      { t: 'p', text: "C'est une situation vécue par beaucoup de nouveaux musulmans. Quelques principes, issus du Coran et de la Sunna :" },
      { t: 'list', items: [
        "**Rester bon avec ses parents** : le Coran demande de les accompagner avec bonté, même s'ils ne sont pas musulmans (sourate 31, verset 15). Le Prophète ﷺ a dit à Asmâ’ de garder le lien avec sa mère non musulmane (al-Bukhârî n°2620).",
        "**Aller à son rythme** : il n'est pas obligatoire d'annoncer sa conversion immédiatement à tout le monde. Choisissez le bon moment, avec sagesse.",
        "**Prier discrètement** si nécessaire : dans sa chambre, en regroupant éventuellement certaines prières en cas de réelle difficulté (selon des avis de savants pour les situations de gêne, à vérifier avec un imam).",
        "**Pour les repas** : expliquer simplement, proposer des alternatives (voir le cours dédié).",
        "**Éviter les débats tendus** : un bon comportement touche plus que les arguments.",
        "**Trouver du soutien** : une mosquée, des associations d'accueil des nouveaux musulmans, des amis bienveillants.",
      ] },
      { t: 'verse', key: '31:15' },
      { t: 'link', to: '/cours/famille-non-musulmane', label: 'Lire : manger dans une famille non musulmane' },
      { t: 'link', to: '/cours/parents', label: 'Lire : le respect des parents' },
    ],
    askImam: true,
    sources: ['Coran 31:15, 60:8 ; Sahîh al-Bukhârî n°2620 ; Sahîh Muslim n°1003'],
  },
  {
    id: 'rater-priere',
    q: 'Que faire si j’ai raté une prière ?',
    tags: ['prière', 'oubli', 'sommeil'],
    answer: [
      { t: 'p', text: "Si vous avez oublié une prière ou vous êtes endormi, **priez-la dès que vous vous en souvenez**, sans culpabiliser." },
      { t: 'hadith', text: "« Celui qui oublie une prière ou s'endort sans l'avoir accomplie, son expiation est de la prier dès qu'il s'en souvient. »", ref: 'Rapporté par Muslim (n°684), d’après Anas' },
      { t: 'p', text: "Si vous l'avez manquée volontairement, repentez-vous sincèrement et rattrapez-la : c'est l'avis de la grande majorité des savants. Pour les nombreuses prières manquées avant votre conversion : **elles ne sont pas dues**, car l'islam efface ce qui précède." },
      { t: 'hadith', text: "« L'islam efface ce qui le précède. »", ref: 'Rapporté par Muslim (n°121), d’après ‘Amr ibn al-‘Âs' },
    ],
    sources: ['Sahîh Muslim n°121, n°684'],
  },
  {
    id: 'fajr-reveil',
    q: 'Je n’arrive pas à me réveiller pour le Fajr. Que faire ?',
    tags: ['prière', 'fajr', 'sommeil'],
    answer: [
      { t: 'list', items: ['Se coucher plus tôt et faire les ablutions avant de dormir.', 'Mettre plusieurs réveils, loin du lit.', 'Réciter les invocations du coucher et avoir l’intention sincère de se lever.', 'Demander à un proche de vous appeler.', "Si vous vous réveillez après le lever du soleil, priez immédiatement (Muslim n°684) : ce n'est pas un péché si vous aviez pris vos dispositions."] },
      { t: 'note', tone: 'gentle', text: "Le Prophète ﷺ et ses Compagnons se sont eux-mêmes endormis une fois pendant un voyage et ont prié après le lever du soleil (Muslim n°680)." },
      { t: 'link', to: '/douas?cat=coucher', label: 'Les invocations avant de dormir' },
    ],
    sources: ['Sahîh Muslim n°680, n°684'],
  },
  {
    id: 'priere-francais',
    q: 'Puis-je prier en français ?',
    tags: ['prière', 'arabe', 'langue'],
    answer: [
      { t: 'p', text: "Les **récitations du Coran** dans la prière (Al-Fâtiha et les sourates) se font **en arabe**, selon les quatre écoles, car une traduction n'est pas le Coran. Pour les autres formules (inclinaison, prosternation), la majorité demande aussi l'arabe, avec une tolérance pour celui qui ne peut pas encore les dire, le temps qu'il apprenne." },
      { t: 'p', text: "En revanche, **les invocations personnelles en dehors de la prière** peuvent se faire dans n'importe quelle langue : Allah comprend toutes les langues. Pendant la prière, de nombreux savants recommandent de faire ses invocations en arabe, d'autres permettent sa propre langue en prosternation, notamment pour le débutant." },
      { t: 'note', tone: 'tip', text: "Les formules de la prière sont courtes : quelques jours suffisent souvent pour les retenir grâce à la phonétique." },
    ],
    askImam: true,
    sources: ['Avis des quatre écoles juridiques'],
  },
  {
    id: 'tenue-femme',
    q: 'Quelle tenue pour prier quand on est une femme ?',
    tags: ['prière', 'femme', 'tenue'],
    answer: [
      { t: 'p', text: "Pour la prière, la femme couvre tout son corps à l'exception du **visage** et des **mains** (les pieds peuvent rester découverts selon l'école hanafite). Les vêtements doivent être propres, amples et non transparents. Une grande robe ou un ensemble de prière avec un voile suffit." },
      { t: 'p', text: "Chez soi, seule, la même tenue est demandée pour la prière. En dehors de la prière, la question du voile est un sujet à part, que chacune aborde progressivement." },
    ],
    sources: ['Avis des quatre écoles juridiques'],
  },
  {
    id: 'qibla',
    q: 'Comment trouver la direction de la prière (qibla) ?',
    tags: ['prière', 'qibla', 'direction'],
    answer: [
      { t: 'p', text: "La qibla est la direction de la **Ka‘ba à La Mecque**. Depuis la France et la Belgique, elle est approximativement au **sud-est** (environ 119° depuis Paris). Vous pouvez utiliser une boussole, une application de qibla ou un site de cartographie." },
      { t: 'verse', key: '2:144' },
      { t: 'p', text: "Si vous faites un effort sincère pour la trouver et que vous vous trompez, votre prière est valide selon la majorité des savants." },
    ],
    sources: ['Coran 2:144'],
  },
  {
    id: 'toucher-coran',
    q: 'Puis-je lire le Coran sans ablutions ?',
    tags: ['coran', 'ablutions'],
    answer: [
      { t: 'list', items: [
        "**Réciter de mémoire** ou lire sur un écran sans ablutions est permis (le Prophète ﷺ invoquait Allah en tout état).",
        "**Toucher le mushaf** (le Coran en arabe imprimé) nécessite les ablutions selon les quatre écoles. Certains savants l'ont permis, mais l'avis majoritaire est de faire les ablutions.",
        "**Une traduction** du Coran n'a pas le même statut que le mushaf.",
        "En état de **janâba** (avant le ghusl), la majorité interdit de réciter le Coran.",
      ] },
    ],
    sources: ['Avis des quatre écoles juridiques'],
  },
  {
    id: 'intention-voix',
    q: 'Faut-il dire l’intention à voix haute ?',
    tags: ['prière', 'intention', 'niyya'],
    answer: [
      { t: 'p', text: "Non. L'intention (*niyya*) est un acte du **cœur** : savoir quelle prière on va faire et la faire pour Allah suffit. Le Prophète ﷺ n'a pas enseigné de formule d'intention à prononcer avant la prière." },
      { t: 'hadith', text: "« Les actes ne valent que par les intentions. »", ref: 'al-Bukhârî n°1, Muslim n°1907' },
    ],
    sources: ['Sahîh al-Bukhârî n°1 ; Sahîh Muslim n°1907'],
  },
  {
    id: 'oubli-rakaat',
    q: 'J’ai oublié combien de rak‘ats j’ai faites. Que faire ?',
    tags: ['prière', 'oubli', 'doute'],
    answer: [
      { t: 'p', text: "Basez-vous sur le **nombre le plus petit** dont vous êtes sûr, terminez la prière, puis faites **deux prosternations supplémentaires** (prosternation de l'oubli) avant le salam." },
      { t: 'hadith', text: "« Si l'un de vous doute dans sa prière et ne sait pas s'il a prié trois ou quatre, qu'il écarte le doute, se base sur ce dont il est certain, puis fasse deux prosternations avant le salam. »", ref: 'Rapporté par Muslim (n°571), d’après Abû Sa‘îd al-Khudrî' },
    ],
    sources: ['Sahîh Muslim n°571'],
  },
  {
    id: 'changer-prenom',
    q: 'Dois-je changer de prénom en devenant musulman ?',
    tags: ['conversion', 'prénom'],
    answer: [
      { t: 'p', text: "Non, ce n'est **pas obligatoire**. On garde son prénom, sauf s'il a un sens contraire à la foi (par exemple « serviteur de » quelqu'un d'autre qu'Allah). Certains choisissent un prénom arabe par affection, c'est un choix personnel." },
    ],
    sources: ['Avis des savants'],
  },
  {
    id: 'tatouage',
    q: 'Mes tatouages empêchent-ils mes ablutions ou ma prière ?',
    tags: ['ablutions', 'tatouage', 'conversion'],
    answer: [
      { t: 'p', text: "Non. Un tatouage est sous la peau : l'eau atteint la peau normalement, donc les ablutions et la prière sont valides. Les tatouages faits avant l'islam sont pardonnés et il n'est pas demandé de les retirer s'il y a un préjudice ou une difficulté. Se faire tatouer après être devenu musulman est déconseillé, voire interdit selon la majorité." },
    ],
    askImam: true,
    sources: ['Avis des savants contemporains ; Sahîh Muslim n°121 (l’islam efface ce qui précède)'],
  },
  {
    id: 'ramadan-sante',
    q: 'Je suis malade ou sous traitement : dois-je jeûner ?',
    tags: ['jeûne', 'ramadan', 'santé'],
    answer: [
      { t: 'p', text: "Le malade dont la santé serait mise en danger ou aggravée par le jeûne **ne jeûne pas** et rattrape plus tard ; en cas de maladie chronique sans espoir de guérison, il nourrit un pauvre pour chaque jour (*fidya*)." },
      { t: 'verse', key: '2:184' },
      { t: 'note', tone: 'warning', text: "Demandez l'avis de votre médecin (idéalement sensibilisé au Ramadan) et d'un imam : la situation de chacun est différente." },
    ],
    askImam: true,
    sources: ['Coran 2:184-185'],
  },
]
