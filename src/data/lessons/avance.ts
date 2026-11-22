import { type Lesson, vf, qcm } from '../types'

export const lessonsAvance: Lesson[] = [
  {
    id: 'priere-approfondie',
    title: 'Approfondir la prière',
    level: 'intermediaire',
    category: 'priere',
    minutes: 10,
    icon: 'prayer',
    arabic: 'الصلاة',
    summary: 'Prières surérogatoires, witr, prière du vendredi, prière en groupe, prosternation de l’oubli et prière du voyageur.',
    sections: [
      {
        title: 'Les prières surérogatoires régulières (rawâtib)',
        blocks: [
          { t: 'p', text: "En plus des prières obligatoires, le Prophète ﷺ priait régulièrement des prières **surérogatoires** (sunna), avant ou après certaines prières." },
          { t: 'hadith', text: "« Celui qui prie douze rak‘ats volontaires dans la journée et la nuit, Allah lui bâtit une maison au Paradis. »", ref: 'Rapporté par Muslim (n°728), d’après Umm Habîba ; le détail (2 avant le Fajr, 4 avant le Dhohr et 2 après, 2 après le Maghrib, 2 après le ‘Ishâ) est rapporté par at-Tirmidhî (n°415)' },
          { t: 'hadith', text: "« Les deux rak‘ats [surérogatoires] de l'aube sont meilleures que ce bas-monde et ce qu'il contient. »", ref: 'Rapporté par Muslim (n°725), d’après ‘Â’isha' },
        ],
      },
      {
        title: 'Le witr',
        blocks: [
          { t: 'p', text: "Le **witr** (« impair ») est une prière d'un nombre impair de rak‘ats (1, 3, 5…) accomplie après le ‘Ishâ et avant l'aube. Elle est très fortement recommandée par la majorité des savants ; l'école hanafite la considère comme *wâjiba* (obligatoire à un degré inférieur au fard)." },
          { t: 'hadith', text: "« Faites du witr votre dernière prière de la nuit. »", ref: 'Rapporté par al-Bukhârî (n°998) et Muslim (n°751), d’après Ibn ‘Umar' },
        ],
      },
      {
        title: 'La prière du vendredi (jumu‘a)',
        blocks: [
          { t: 'p', text: "Le vendredi, à l'heure du Dhohr, les hommes musulmans adultes et résidents se rassemblent à la mosquée pour la **jumu‘a** : un sermon (khutba) suivi de **deux rak‘ats**, qui remplacent le Dhohr. Pour les femmes, elle est permise mais non obligatoire ; celles qui n'y assistent pas prient le Dhohr." },
          { t: 'verse', key: '62:9' },
        ],
      },
      {
        title: 'La prière en groupe',
        blocks: [
          { t: 'hadith', text: "« La prière en groupe surpasse la prière seul de vingt-sept degrés. »", ref: 'Rapporté par al-Bukhârî (n°645) et Muslim (n°650), d’après Ibn ‘Umar' },
          { t: 'list', items: ["On suit l'imam sans le devancer.", "Si l'on arrive en retard, on rejoint l'imam dans la position où il est, puis on complète les rak‘ats manquées après son salam.", "Une rak‘a est comptée si l'on rejoint l'imam avant qu'il ne se relève de l'inclinaison (rukû‘), selon la majorité des savants."] },
        ],
      },
      {
        title: 'La prosternation de l’oubli (sujûd as-sahw)',
        blocks: [
          { t: 'p', text: "Si l'on oublie un élément de la prière (par exemple le premier tachahhoud) ou si l'on doute du nombre de rak‘ats, on fait **deux prosternations supplémentaires** à la fin de la prière, avant ou après le salam selon les cas et les écoles." },
          { t: 'hadith', text: "« Si l'un de vous doute dans sa prière et ne sait pas s'il a prié trois ou quatre [rak‘ats], qu'il écarte le doute, se base sur ce dont il est certain, puis fasse deux prosternations avant le salam. »", ref: 'Rapporté par Muslim (n°571), d’après Abû Sa‘îd al-Khudrî' },
        ],
      },
      {
        title: 'La prière du voyageur',
        blocks: [
          { t: 'p', text: "En voyage, on peut **raccourcir** les prières de quatre rak‘ats (Dhohr, ‘Asr, ‘Ishâ) à **deux**, et selon la majorité **regrouper** le Dhohr avec le ‘Asr, et le Maghrib avec le ‘Ishâ. La distance et la durée minimales font l'objet de divergences (souvent autour de 80 km)." },
          { t: 'verse', key: '4:101' },
        ],
      },
    ],
    quiz: [
      qcm('Combien de rak‘ats surérogatoires régulières sont mentionnées dans le hadith d’Umm Habîba ?', ['Huit', 'Dix', 'Douze', 'Vingt'], 2, 'Douze rak‘ats (Muslim n°728).'),
      vf('La prière du vendredi remplace le Dhohr.', true, 'Oui, ses deux rak‘ats remplacent le Dhohr pour ceux qui y assistent.'),
      qcm('Que fait-on si l’on doute entre trois et quatre rak‘ats ?', ['On recommence', 'On se base sur le plus petit nombre et on fait la prosternation de l’oubli', 'On arrête la prière', 'Rien'], 1, 'Muslim n°571.'),
      vf('Le voyageur peut raccourcir le Maghrib à deux rak‘ats.', false, 'Seules les prières de quatre rak‘ats sont raccourcies ; le Maghrib reste à trois et le Fajr à deux.'),
    ],
    sources: ['Coran : 4:101, 62:9 (Quran.com)', 'Sahîh Muslim n°571, 650, 725, 728, 751 ; Sahîh al-Bukhârî n°645, 998 ; Jâmi‘ at-Tirmidhî n°415'],
  },

  {
    id: 'hadith-intro',
    title: 'Comprendre les hadiths',
    level: 'intermediaire',
    category: 'hadith',
    minutes: 8,
    icon: 'list',
    arabic: 'الحديث',
    summary: 'Ce qu’est un hadith, comment il est transmis et les principaux recueils.',
    sections: [
      {
        title: 'Qu’est-ce qu’un hadith ?',
        blocks: [
          { t: 'p', text: "Un **hadith** est un récit rapportant une parole, un acte, une approbation ou une description du Prophète ﷺ. L'ensemble de son enseignement s'appelle la **Sunna**, deuxième source de l'islam après le Coran." },
          { t: 'verse', key: '59:7' },
          { t: 'verse', key: '16:44', intro: 'Le Prophète ﷺ explique le Coran :' },
        ],
      },
      {
        title: 'Les deux parties d’un hadith',
        blocks: [
          { t: 'terms', items: [
            { term: 'Isnâd (la chaîne)', def: 'La liste des personnes qui ont transmis le hadith, de génération en génération, jusqu’au Prophète ﷺ.' },
            { term: 'Matn (le texte)', def: 'Le contenu du hadith lui-même.' },
          ] },
          { t: 'p', text: "Exemple : « Al-Bukhârî rapporte de al-Humaydî, qui rapporte de Sufyân, … de ‘Umar, qui a dit : j'ai entendu le Messager d'Allah ﷺ dire : *Les actes ne valent que par les intentions…* ». La première partie est l'isnâd, la dernière est le matn." },
        ],
      },
      {
        title: 'Les grands recueils',
        blocks: [
          { t: 'table', head: ['Recueil', 'Auteur (décès)', 'À savoir'], rows: [
            ['Sahîh al-Bukhârî', 'al-Bukhârî (256 H / 870)', 'Considéré comme le recueil le plus authentique après le Coran.'],
            ['Sahîh Muslim', 'Muslim (261 H / 875)', 'Deuxième recueil en authenticité.'],
            ['Sunan Abî Dâwûd', 'Abû Dâwûd (275 H)', 'Centré sur les hadiths juridiques.'],
            ['Jâmi‘ at-Tirmidhî', 'at-Tirmidhî (279 H)', 'Indique souvent le degré d’authenticité.'],
            ['Sunan an-Nasâ’î', 'an-Nasâ’î (303 H)', 'Réputé pour sa rigueur.'],
            ['Sunan Ibn Mâja', 'Ibn Mâja (273 H)', 'Complète les « six livres ».'],
          ] },
          { t: 'note', tone: 'warning', title: 'Méfiance sur Internet', text: "De nombreux « hadiths » circulent sans source ou sont faibles, voire inventés. Avant de partager un hadith, vérifiez sa référence (recueil et numéro) et son degré d'authenticité. Ce site ne cite que des hadiths avec leur référence." },
        ],
      },
    ],
    quiz: [
      qcm('Comment s’appelle la chaîne de transmetteurs d’un hadith ?', ['Le matn', 'L’isnâd', 'La sîra', 'Le tafsir'], 1, 'L’isnâd est la chaîne de transmission.'),
      qcm('Quel recueil est considéré comme le plus authentique après le Coran ?', ['Sunan Ibn Mâja', 'Sahîh al-Bukhârî', 'Muwatta', 'Musnad Ahmad'], 1, 'Sahîh al-Bukhârî.'),
      vf('Tous les hadiths qui circulent sur Internet sont authentiques.', false, 'Beaucoup sont faibles ou inventés : il faut vérifier la source.'),
    ],
    sources: ['Coran : 16:44, 59:7 (Quran.com)', 'Introduction aux sciences du hadith (muqaddima Ibn as-Salâh)'],
  },

  {
    id: 'coran-approfondir',
    title: 'Approfondir le Coran',
    level: 'intermediaire',
    category: 'coran',
    minutes: 9,
    icon: 'book',
    arabic: 'القرآن',
    summary: 'Structure, révélation, compilation et manière de le lire.',
    sections: [
      {
        title: 'La structure du Coran',
        blocks: [
          { t: 'list', items: [
            '**114 sourates** (chapitres), de longueurs très différentes.',
            '**6 236 versets** (âyât) selon la numérotation la plus répandue (dite de Kûfa).',
            '**30 parties** (juz’), pour faciliter la lecture en un mois, divisées chacune en deux **hizb**.',
            "Les sourates ne sont pas classées par ordre chronologique : la plus longue (Al-Baqara) est au début, les plus courtes à la fin, après Al-Fâtiha.",
          ] },
        ],
      },
      {
        title: 'Une révélation progressive',
        blocks: [
          { t: 'p', text: "Le Coran a été révélé sur **environ 23 ans**, selon les événements et les besoins de la communauté. On distingue :" },
          { t: 'list', items: ['Les sourates **mecquoises** (avant l’Hégire) : centrées sur la foi, l’unicité d’Allah, l’au-delà.', 'Les sourates **médinoises** (après l’Hégire) : elles ajoutent les règles de la vie sociale, familiale et juridique.'] },
          { t: 'verse', key: '17:106' },
        ],
      },
      {
        title: 'La préservation du texte',
        blocks: [
          { t: 'list', items: [
            'Du vivant du Prophète ﷺ, le Coran était mémorisé par de nombreux Compagnons et écrit sur divers supports.',
            'Abû Bakr fit rassembler les feuillets en un recueil unique après la bataille de Yamâma (où de nombreux mémorisateurs moururent).',
            '‘Uthmân fit établir des copies de référence envoyées dans les grandes villes.',
            'Aujourd’hui encore, des millions de personnes le connaissent entièrement par cœur (les huffâdh).',
          ] },
        ],
      },
      {
        title: 'Bien lire le Coran',
        blocks: [
          { t: 'list', items: ['Commencer par la formule de protection (« A‘ûdhu billâhi mina-sh-shaytâni-r-rajîm »).', 'Lire calmement, en articulant (tartîl).', 'Réfléchir au sens grâce à une traduction et un tafsir.', 'Être en état d’ablution pour toucher le mushaf (selon la majorité des savants).'] },
          { t: 'verse', key: '73:4' },
          { t: 'hadith', text: "« Celui qui récite le Coran avec aisance sera avec les nobles anges scribes ; et celui qui le récite avec difficulté, en butant, aura deux récompenses. »", ref: 'Rapporté par al-Bukhârî (n°4937) et Muslim (n°798), d’après ‘Â’isha' },
          { t: 'link', to: '/coran', label: 'Ouvrir le Coran' },
        ],
      },
    ],
    quiz: [
      qcm('Combien de sourates compte le Coran ?', ['99', '114', '120', '286'], 1, 'Le Coran compte 114 sourates.'),
      qcm('Combien de parties (juz’) compte le Coran ?', ['7', '12', '30', '60'], 2, '30 juz’, chacun divisé en deux hizb.'),
      vf('Celui qui lit le Coran avec difficulté a deux récompenses.', true, 'al-Bukhârî n°4937, Muslim n°798.'),
      qcm('Les sourates mecquoises portent surtout sur…', ['Les règles de commerce', 'La foi et l’au-delà', 'L’héritage', 'Les traités'], 1, 'Elles insistent sur la foi, l’unicité d’Allah et l’au-delà.'),
    ],
    sources: ['Coran : 17:106, 73:4 (Quran.com)', 'Sahîh al-Bukhârî n°4937 ; Sahîh Muslim n°798'],
  },

  {
    id: 'etude-coran',
    title: 'Étude approfondie du Coran (‘ulûm al-Qur’ân)',
    level: 'avance',
    category: 'coran',
    minutes: 10,
    icon: 'book',
    arabic: 'علوم القرآن',
    summary: 'Les sciences du Coran : circonstances de révélation, abrogation, lectures, inimitabilité.',
    sections: [
      {
        title: 'Qu’appelle-t-on les sciences du Coran ?',
        blocks: [
          { t: 'p', text: "Les **‘ulûm al-Qur’ân** regroupent les disciplines qui aident à comprendre le Coran correctement. Des ouvrages de référence leur sont consacrés, comme *al-Burhân* d'az-Zarkashî ou *al-Itqân* d'as-Suyûtî." },
        ],
      },
      {
        title: 'Les principales disciplines',
        blocks: [
          { t: 'terms', items: [
            { term: 'Asbâb an-nuzûl', def: 'Les circonstances de révélation : l’événement ou la question qui a accompagné la révélation d’un verset. Elles éclairent le sens, sans limiter la portée générale du verset.' },
            { term: 'Makkî et madanî', def: 'Distinguer les passages révélés avant ou après l’Hégire, pour comprendre le contexte et la progression des règles.' },
            { term: 'An-nâsikh wal-mansûkh', def: 'L’abrogation : une règle remplacée par une règle révélée plus tard (exemple étudié : la progression dans l’interdiction de l’alcool). Son étendue fait l’objet de discussions entre savants.' },
            { term: 'Al-qirâ’ât', def: 'Les lectures : différentes manières authentiques et transmises de réciter certains mots du Coran (Hafs ‘an ‘Âsim, Warsh ‘an Nâfi‘…). La lecture de Hafs est la plus répandue ; celle de Warsh est courante au Maghreb.' },
            { term: 'Al-muhkam wal-mutashâbih', def: 'Les versets clairs et les versets dont le sens est plus difficile, à comprendre à la lumière des premiers (sourate 3, verset 7).' },
            { term: 'I‘jâz', def: 'L’inimitabilité : le Coran se présente comme un texte que nul ne peut égaler (sourate 2, verset 23).' },
          ] },
          { t: 'verse', key: '3:7' },
          { t: 'verse', key: '2:23' },
        ],
      },
      {
        title: 'Le tajwîd',
        blocks: [
          { t: 'p', text: "Le **tajwîd** est l'ensemble des règles de prononciation de la récitation : points d'articulation des lettres, prolongations (madd), nasalisation (ghunna), règles du nûn sâkin et du tanwîn… Il s'apprend idéalement avec un enseignant." },
          { t: 'link', to: '/arabe', label: 'Commencer par les bases de la lecture arabe' },
        ],
      },
    ],
    quiz: [
      qcm('Que signifie « asbâb an-nuzûl » ?', ['Les lectures', 'Les circonstances de révélation', 'L’abrogation', 'Les règles de récitation'], 1, 'Ce sont les circonstances de révélation.'),
      qcm('Quelle lecture est courante au Maghreb ?', ['Hafs', 'Warsh', 'Qâlûn', 'Ad-Dûrî'], 1, 'La lecture de Warsh ‘an Nâfi‘.'),
      vf('Le tajwîd concerne les règles de prononciation de la récitation.', true, 'Oui.'),
    ],
    sources: ['Coran : 2:23, 3:7 (Quran.com)', 'az-Zarkashî, al-Burhân fî ‘ulûm al-Qur’ân ; as-Suyûtî, al-Itqân'],
  },

  {
    id: 'tafsir-intro',
    title: 'Introduction au tafsir',
    level: 'avance',
    category: 'coran',
    minutes: 8,
    icon: 'book',
    arabic: 'التفسير',
    summary: "L'exégèse du Coran : méthodes, grands commentateurs et précautions.",
    sections: [
      {
        title: 'Qu’est-ce que le tafsir ?',
        blocks: [
          { t: 'p', text: "Le **tafsir** est l'explication du sens du Coran. Il s'appuie sur des méthodes précises pour éviter de faire dire au texte ce qu'il ne dit pas." },
          { t: 'verse', key: '38:29' },
        ],
      },
      {
        title: 'Les sources du tafsir, par ordre de priorité',
        blocks: [
          { t: 'list', ordered: true, items: ['**Le Coran par le Coran** : un verset en explique un autre.', '**Le Coran par la Sunna** : les explications du Prophète ﷺ.', '**Les paroles des Compagnons**, témoins de la révélation (Ibn ‘Abbâs, Ibn Mas‘ûd…).', '**Les paroles des Successeurs** (tâbi‘ûn).', '**La langue arabe** et ses usages.'] },
        ],
      },
      {
        title: 'Les grands tafsirs',
        blocks: [
          { t: 'table', head: ['Ouvrage', 'Auteur (décès)', 'Caractéristique'], rows: [
            ['Jâmi‘ al-Bayân', 'at-Tabarî (310 H)', 'Tafsir de référence, rassemble les avis des premières générations.'],
            ['Tafsîr al-Qur’ân al-‘Azîm', 'Ibn Kathîr (774 H)', 'Très répandu, explique le Coran par le Coran et les hadiths.'],
            ['Al-Jâmi‘ li-Ahkâm al-Qur’ân', 'al-Qurtubî (671 H)', 'Accent sur les règles juridiques.'],
            ['Taysîr al-Karîm ar-Rahmân', 'as-Sa‘dî (1376 H)', 'Clair et accessible.'],
            ['At-Tafsîr al-Muyassar', 'Comité de savants (Complexe du roi Fahd)', 'Explication très simple, disponible verset par verset dans ce site.'],
          ] },
          { t: 'note', tone: 'info', title: 'Dans ce site', text: "Dans le lecteur du Coran, le bouton « Explication » affiche le tafsir al-Muyassar (en arabe) et le tafsir d'Ibn Kathir abrégé (en anglais), chargés depuis Quran.com. Aucun tafsir complet en français n'est disponible via une API vérifiée ; nous l'indiquons honnêtement plutôt que de générer un texte." },
          { t: 'note', tone: 'warning', text: "Interpréter le Coran sans connaissances est dangereux. Pour les passages difficiles, référez-vous aux tafsirs reconnus et aux savants." },
        ],
      },
    ],
    quiz: [
      qcm('Quelle est la première source du tafsir ?', ['L’opinion personnelle', 'Le Coran lui-même', 'La poésie', 'L’histoire moderne'], 1, 'Le Coran s’explique d’abord par le Coran.'),
      qcm('Qui est l’auteur du tafsir « Jâmi‘ al-Bayân » ?', ['Ibn Kathîr', 'at-Tabarî', 'al-Qurtubî', 'as-Suyûtî'], 1, 'at-Tabarî (m. 310 H).'),
    ],
    sources: ['Coran : 38:29 (Quran.com)', 'Ibn Taymiyya, Muqaddima fî usûl at-tafsîr'],
  },

  {
    id: 'sciences-hadith',
    title: 'Les sciences du hadith',
    level: 'avance',
    category: 'hadith',
    minutes: 9,
    icon: 'list',
    arabic: 'علوم الحديث',
    summary: 'Authentique, bon, faible, inventé : comment les savants évaluent un hadith.',
    sections: [
      {
        title: 'Vérifier l’information',
        blocks: [
          { t: 'p', text: "Les savants musulmans ont développé une science rigoureuse pour vérifier chaque hadith, en s'appuyant sur le principe coranique de vérification des informations." },
          { t: 'verse', key: '49:6' },
        ],
      },
      {
        title: 'Les conditions d’un hadith authentique (sahîh)',
        blocks: [
          { t: 'list', ordered: true, items: ['**Chaîne continue** : chaque transmetteur a reçu directement du précédent.', '**Transmetteurs intègres** (‘adl) : réputés honnêtes et pieux.', '**Transmetteurs précis** (dâbit) : bonne mémoire ou écrits fiables.', '**Absence d’anomalie** (shudhûdh) : pas de contradiction avec des transmetteurs plus fiables.', '**Absence de défaut caché** (‘illa).'] },
        ],
      },
      {
        title: 'Les degrés d’authenticité',
        blocks: [
          { t: 'table', head: ['Degré', 'Signification', 'Usage'], rows: [
            ['Sahîh', 'Authentique : remplit toutes les conditions.', 'Sert de preuve.'],
            ['Hasan', 'Bon : légère faiblesse dans la précision d’un transmetteur.', 'Sert de preuve.'],
            ['Da‘îf', 'Faible : une condition manque.', 'Ne sert pas à établir une règle ; usage discuté pour les mérites des actes.'],
            ['Mawdû‘', 'Inventé : attribué mensongèrement au Prophète ﷺ.', 'Interdit de le transmettre sans signaler qu’il est inventé.'],
          ] },
          { t: 'hadith', text: "« Celui qui ment sur moi délibérément, qu'il se prépare sa place en Enfer. »", ref: 'Rapporté par al-Bukhârî (n°110) et Muslim (n°3), d’après Abû Hurayra — hadith dit mutawâtir (transmis par un très grand nombre)' },
        ],
      },
      {
        title: 'Autres notions',
        blocks: [
          { t: 'terms', items: [
            { term: 'Mutawâtir', def: 'Transmis par un si grand nombre de personnes à chaque génération qu’une erreur collective est impossible.' },
            { term: 'Âhâd', def: 'Transmis par un nombre plus restreint de personnes.' },
            { term: 'Marfû‘', def: 'Attribué au Prophète ﷺ.' },
            { term: 'Mawqûf', def: 'Attribué à un Compagnon.' },
            { term: 'Al-jarh wa-t-ta‘dîl', def: 'La science de la critique et de l’évaluation des transmetteurs.' },
          ] },
        ],
      },
    ],
    quiz: [
      qcm('Comment appelle-t-on un hadith inventé ?', ['Sahîh', 'Hasan', 'Da‘îf', 'Mawdû‘'], 3, 'Mawdû‘ = inventé.'),
      vf('Un hadith hasan peut servir de preuve.', true, 'Oui, le hadith hasan sert de preuve.'),
      qcm('Combien de conditions les savants posent-ils pour qu’un hadith soit sahîh ?', ['Deux', 'Trois', 'Cinq', 'Dix'], 2, 'Cinq conditions.'),
    ],
    sources: ['Coran : 49:6 (Quran.com)', 'Ibn as-Salâh, Muqaddima ; Ibn Hajar, Nukhbat al-fikar', 'Sahîh al-Bukhârî n°110 ; Sahîh Muslim n°3'],
  },

  {
    id: 'fiqh-intro',
    title: 'Introduction au fiqh',
    level: 'avance',
    category: 'fiqh',
    minutes: 9,
    icon: 'graduation',
    arabic: 'الفقه',
    summary: 'La jurisprudence islamique : sources, méthode et les cinq statuts des actes.',
    sections: [
      {
        title: 'Qu’est-ce que le fiqh ?',
        blocks: [
          { t: 'p', text: "Le **fiqh** (« compréhension ») est la science qui déduit les règles pratiques (prière, jeûne, commerce, famille…) à partir des sources. La discipline qui étudie les méthodes de déduction s'appelle **usûl al-fiqh** (les fondements du fiqh)." },
        ],
      },
      {
        title: 'Les sources',
        blocks: [
          { t: 'list', ordered: true, items: ['**Le Coran**.', '**La Sunna**.', '**L’ijmâ‘** : le consensus des savants.', '**Le qiyâs** : le raisonnement par analogie (ex. : interdire toutes les drogues par analogie avec l’alcool, à cause de l’ivresse).'] },
          { t: 'p', text: "D'autres outils sont utilisés selon les écoles : l'intérêt général (*maslaha*), la coutume (*‘urf*), la préférence juridique (*istihsân*)…" },
          { t: 'verse', key: '4:59' },
        ],
      },
      {
        title: 'Les cinq statuts des actes',
        blocks: [
          { t: 'table', head: ['Statut', 'Sens', 'Exemple'], rows: [
            ['Fard / wâjib', 'Obligatoire : récompensé si fait, fautif si délaissé.', 'Les cinq prières'],
            ['Mustahabb / sunna', 'Recommandé : récompensé si fait, pas de faute si délaissé.', 'Les prières surérogatoires'],
            ['Mubâh', 'Permis, neutre.', 'Manger une pomme'],
            ['Makrûh', 'Déconseillé : récompensé si évité.', 'Gaspiller l’eau pendant les ablutions'],
            ['Harâm', 'Interdit : fautif si fait, récompensé si évité pour Allah.', 'Mentir, boire de l’alcool'],
          ] },
          { t: 'note', tone: 'info', text: "Dans l'école hanafite, une distinction existe entre *fard* (établi par une preuve certaine) et *wâjib* (établi par une preuve moins certaine), comme pour le witr." },
        ],
      },
      {
        title: 'Les finalités de la Loi (maqâsid)',
        blocks: [
          { t: 'p', text: "Les savants (comme ash-Shâtibî) ont montré que les règles visent à préserver cinq choses essentielles : **la religion, la vie, la raison, la descendance et les biens**." },
          { t: 'verse', key: '22:78' },
        ],
      },
    ],
    quiz: [
      qcm('Que signifie « qiyâs » ?', ['Consensus', 'Analogie', 'Coutume', 'Intérêt général'], 1, 'Le qiyâs est le raisonnement par analogie.'),
      qcm('Quel statut correspond à « recommandé » ?', ['Harâm', 'Mubâh', 'Mustahabb', 'Makrûh'], 2, 'Mustahabb (ou sunna) = recommandé.'),
      vf('Les finalités de la Loi incluent la préservation de la vie et de la raison.', true, 'Oui, parmi les cinq nécessités.'),
    ],
    sources: ['Coran : 4:59, 22:78 (Quran.com)', 'ash-Shâtibî, al-Muwâfaqât'],
  },

  {
    id: 'ecoles-juridiques',
    title: 'Les écoles juridiques',
    level: 'avance',
    category: 'fiqh',
    minutes: 9,
    icon: 'graduation',
    arabic: 'المذاهب',
    summary: 'Les quatre écoles sunnites : fondateurs, méthodes, régions et exemples de différences.',
    sections: [
      {
        title: 'Les quatre écoles sunnites',
        blocks: [
          { t: 'table', head: ['École', 'Fondateur (décès)', 'Régions principales'], rows: [
            ['Hanafite', 'Abû Hanîfa (150 H / 767)', 'Turquie, Balkans, Asie centrale, sous-continent indien'],
            ['Malikite', 'Mâlik ibn Anas (179 H / 795)', 'Maghreb, Afrique de l’Ouest, Égypte (en partie)'],
            ['Chaféite', 'Muhammad ibn Idrîs ash-Shâfi‘î (204 H / 820)', 'Égypte, Yémen, Afrique de l’Est, Asie du Sud-Est'],
            ['Hanbalite', 'Ahmad ibn Hanbal (241 H / 855)', 'Péninsule arabique'],
          ] },
          { t: 'p', text: "Ces savants se connaissaient et se respectaient : ash-Shâfi‘î fut l'élève de Mâlik, et Ahmad ibn Hanbal celui d'ash-Shâfi‘î." },
        ],
      },
      {
        title: 'Exemples de différences dans la prière',
        blocks: [
          { t: 'table', head: ['Question', 'Avis'], rows: [
            ['Position des mains debout', 'Mains posées sur la poitrine ou sous le nombril (hanafites, chaféites, hanbalites) ; bras le long du corps, avis le plus connu chez les malikites.'],
            ['Lever les mains', 'Au takbir d’ouverture pour tous ; aussi avant et après l’inclinaison chez les chaféites et hanbalites.'],
            ['La basmala dans la Fâtiha', 'Récitée à voix haute chez les chaféites ; à voix basse chez les hanafites et hanbalites ; non récitée dans les prières obligatoires selon l’avis connu des malikites.'],
            ['Le witr', 'Wâjib chez les hanafites ; sunna fortement recommandée chez les autres.'],
          ] },
          { t: 'note', tone: 'scholar', text: "Toutes ces façons de prier sont fondées sur des preuves et sont valides. Il n'y a pas lieu de reprocher à quelqu'un de prier selon une autre école reconnue." },
        ],
      },
      {
        title: 'Et les chiites ?',
        blocks: [
          { t: 'p', text: "Il existe aussi des écoles chiites (notamment l'école ja‘farite) et l'école ibadite (Oman). Ce site suit principalement les avis des quatre écoles sunnites, majoritaires dans le monde francophone, tout en signalant les divergences importantes." },
        ],
      },
    ],
    quiz: [
      qcm('Quelle école est majoritaire au Maghreb ?', ['Hanafite', 'Malikite', 'Chaféite', 'Hanbalite'], 1, 'L’école malikite.'),
      qcm('Qui fut l’élève de l’imam Mâlik ?', ['Abû Hanîfa', 'ash-Shâfi‘î', 'al-Bukhârî', 'at-Tabarî'], 1, 'ash-Shâfi‘î fut l’élève de Mâlik.'),
      vf('Prier les bras le long du corps est l’avis connu de l’école malikite.', true, 'Oui, c’est l’avis le plus connu de l’école.'),
    ],
    sources: ['Ouvrages de fiqh comparé (Ibn Rushd, Bidâyat al-mujtahid)'],
  },

  {
    id: 'histoire-approfondie',
    title: 'Histoire islamique approfondie',
    level: 'avance',
    category: 'histoire',
    minutes: 10,
    icon: 'layers',
    arabic: 'التاريخ',
    summary: 'La transmission du savoir, l’âge d’or scientifique, les défis et le monde contemporain.',
    sections: [
      {
        title: 'La formation des sciences islamiques (Ier-IVe siècles H)',
        blocks: [
          { t: 'list', items: [
            'Ier siècle H : les Compagnons et leurs élèves enseignent dans les grandes villes (Médine, La Mecque, Koufa, Bassora, Damas).',
            'IIe siècle H : naissance des écoles juridiques ; l’imam Mâlik rédige *al-Muwatta’*.',
            'IIIe siècle H : âge d’or des recueils de hadiths (al-Bukhârî, Muslim, les Sunan).',
            'IVe siècle H et après : développement du tafsir, de la théologie, de la grammaire arabe.',
          ] },
        ],
      },
      {
        title: 'L’âge d’or scientifique',
        blocks: [
          { t: 'table', head: ['Savant', 'Domaine', 'Apport'], rows: [
            ['al-Khwârizmî (IXe s.)', 'Mathématiques', 'L’algèbre (al-jabr) ; son nom a donné le mot « algorithme ».'],
            ['Ibn Sînâ / Avicenne (XIe s.)', 'Médecine, philosophie', 'Le *Canon de la médecine*, enseigné en Europe pendant des siècles.'],
            ['Ibn al-Haytham (XIe s.)', 'Optique', 'Méthode expérimentale et théorie de la vision.'],
            ['al-Idrîsî (XIIe s.)', 'Géographie', 'Cartes du monde connu.'],
            ['Ibn Khaldûn (XIVe s.)', 'Histoire, sociologie', 'La *Muqaddima*.'],
          ] },
        ],
      },
      {
        title: 'Épreuves et renouveaux',
        blocks: [
          { t: 'list', items: [
            '1258 : chute de Bagdad face aux Mongols.',
            '1492 : fin d’al-Andalus avec la prise de Grenade.',
            'XIXe-XXe siècles : colonisation de nombreux pays musulmans, puis indépendances.',
            '1924 : abolition du califat ottoman.',
            'Aujourd’hui : environ 2 milliards de musulmans, dans une grande diversité de cultures, dont des communautés importantes en Europe.',
          ] },
          { t: 'note', tone: 'info', text: "L'histoire des musulmans est une histoire humaine, faite de réussites et d'erreurs. Elle se distingue de la religion elle-même, dont les références restent le Coran et la Sunna." },
        ],
      },
    ],
    quiz: [
      qcm('Quel savant est à l’origine du mot « algorithme » ?', ['Ibn Sînâ', 'al-Khwârizmî', 'Ibn Khaldûn', 'al-Idrîsî'], 1, 'al-Khwârizmî.'),
      qcm('En quelle année Bagdad tomba-t-elle face aux Mongols ?', ['1099', '1258', '1453', '1492'], 1, '1258.'),
      qcm('Qui a rédigé al-Muwatta’ ?', ['Mâlik', 'al-Bukhârî', 'Abû Hanîfa', 'Ibn Kathîr'], 0, 'L’imam Mâlik.'),
    ],
    sources: ['Synthèse historique générale'],
  },
]
