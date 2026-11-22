import { type Lesson, vf, qcm } from '../types'

export const lessonsFoi: Lesson[] = [
  {
    id: 'qui-est-allah',
    title: 'Qui est Allah ?',
    level: 'debutant',
    category: 'foi',
    minutes: 8,
    icon: 'sparkle',
    arabic: 'الله',
    summary: "Le Dieu unique selon l'islam : Créateur, Miséricordieux, proche de ceux qui L'invoquent.",
    sections: [
      {
        title: 'Le Créateur unique',
        blocks: [
          { t: 'p', text: "Pour les musulmans, **Allah** est le Créateur des cieux, de la terre et de tout ce qui existe. Il est **unique** : Il n'a ni associé, ni parent, ni enfant. Il ne ressemble à rien de ce que nous connaissons." },
          { t: 'verse', key: '42:11' },
          { t: 'p', text: "Croire en Allah comprend trois aspects que les savants expliquent souvent ainsi :" },
          { t: 'list', items: [
            "**Il est le seul Seigneur** (*rubûbiyya*) : Il crée, fait vivre, pourvoit et gère l'univers.",
            "**Il est le seul à mériter l'adoration** (*ulûhiyya*) : la prière, l'invocation, la confiance totale Lui sont réservées.",
            "**Il a les plus beaux noms et attributs** (*asmâ’ wa sifât*) : on Le décrit comme Il S'est décrit, sans Le comparer à Sa création.",
          ] },
        ],
      },
      {
        title: 'Un Dieu miséricordieux et proche',
        blocks: [
          { t: 'p', text: "Chaque sourate du Coran sauf une commence par « Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux ». La miséricorde est au cœur de la relation avec Allah." },
          { t: 'verse', key: '2:186', intro: 'Allah est proche de celui qui L’invoque :' },
          { t: 'hadith', text: "« Lorsqu'Allah créa la création, Il écrivit dans un livre qui se trouve auprès de Lui au-dessus du Trône : Ma miséricorde l'emporte sur Ma colère. »", ref: 'Rapporté par al-Bukhârî (n°7404) et Muslim (n°2751), d’après Abû Hurayra' },
        ],
      },
      {
        title: 'Le Verset du Trône',
        blocks: [
          { t: 'p', text: "L'un des versets les plus importants du Coran décrit la grandeur d'Allah : c'est **Âyat al-Kursî**, le Verset du Trône. Beaucoup de musulmans l'apprennent par cœur et le récitent après chaque prière et avant de dormir." },
          { t: 'verse', key: '2:255' },
        ],
      },
      {
        title: 'Connaître Allah par Ses noms',
        blocks: [
          { t: 'p', text: "Allah S'est fait connaître par des noms : le Miséricordieux, le Pardonneur, le Juste, le Doux… Les connaître aide à L'aimer et à L'invoquer." },
          { t: 'verse', key: '7:180' },
          { t: 'link', to: '/bases/noms-allah', label: "Découvrir les 99 noms d'Allah" },
        ],
      },
    ],
    quiz: [
      qcm('Que signifie le tawhîd ar-rubûbiyya ?', ['Allah est le seul Seigneur qui crée et gère tout', 'Allah a des enfants', 'Il faut prier cinq fois', 'La foi en les anges'], 0, 'La rubûbiyya : Allah seul crée, fait vivre, pourvoit et gère.'),
      vf('Selon le Coran, rien n’est semblable à Allah.', true, '« Rien ne Lui est semblable » (sourate 42, verset 11).'),
      qcm('Comment s’appelle le verset 255 de la sourate Al-Baqara ?', ['Le verset de la lumière', 'Le verset du Trône (Âyat al-Kursî)', 'Le verset de la dette', 'La Fâtiha'], 1, 'C’est Âyat al-Kursî, le Verset du Trône.'),
      vf('D’après un hadith, la miséricorde d’Allah l’emporte sur Sa colère.', true, 'Oui (al-Bukhârî n°7404, Muslim n°2751).'),
    ],
    sources: ['Coran : 2:186, 2:255, 7:180, 42:11 (Quran.com)', 'Sahîh al-Bukhârî n°7404 ; Sahîh Muslim n°2751'],
  },

  {
    id: 'anges',
    title: 'Les anges',
    level: 'debutant',
    category: 'foi',
    minutes: 6,
    icon: 'sparkle',
    arabic: 'الملائكة',
    summary: 'Qui sont les anges, leurs noms connus et leurs missions.',
    sections: [
      {
        title: 'Des créatures de lumière',
        blocks: [
          { t: 'p', text: "Les anges (*malâ’ika*) sont des créatures invisibles créées par Allah à partir de **lumière**. Ils ne mangent pas, ne boivent pas et **obéissent toujours** à Allah." },
          { t: 'hadith', text: "« Les anges ont été créés de lumière, les djinns d'un feu sans fumée, et Adam de ce qui vous a été décrit. »", ref: 'Rapporté par Muslim (n°2996), d’après ‘Â’isha' },
          { t: 'verse', key: '66:6', intro: 'Ils ne désobéissent pas :' },
        ],
      },
      {
        title: 'Les anges connus par leur nom ou leur mission',
        blocks: [
          { t: 'table', head: ['Ange', 'Mission'], rows: [
            ['Jibrîl (Gabriel)', 'Transmettre la révélation aux prophètes.'],
            ['Mîkâ’îl (Michel)', 'Chargé de la pluie et de la subsistance, selon les explications des savants.'],
            ['Isrâfîl', 'Souffler dans la Trompe annonçant la fin du monde et la résurrection.'],
            ['L’ange de la mort', 'Reprendre les âmes au moment fixé (sourate 32, verset 11).'],
            ['Les nobles scribes', 'Enregistrer les actes de chaque personne (sourate 82, versets 10-12).'],
            ['Mâlik', 'Gardien de l’Enfer (sourate 43, verset 77).'],
            ['Munkar et Nakîr', 'Interroger le défunt dans sa tombe (hadith rapporté par at-Tirmidhî n°1071).'],
          ] },
          { t: 'verse', key: '82:10-12' },
        ],
      },
      {
        title: 'Ce que cela change dans ma vie',
        blocks: [
          { t: 'list', items: [
            'Savoir que nos actes sont écrits encourage à faire le bien et à se surveiller avec douceur.',
            'Les anges invoquent le pardon pour les croyants et assistent aux assemblées de rappel d’Allah.',
            "Croire aux anges, c'est croire à l'invisible (*al-ghayb*), une qualité des croyants citée au début de la sourate Al-Baqara.",
          ] },
          { t: 'verse', key: '2:3' },
        ],
      },
    ],
    quiz: [
      qcm('De quoi les anges ont-ils été créés ?', ['De feu', 'D’argile', 'De lumière', 'D’eau'], 2, 'Les anges ont été créés de lumière (Muslim n°2996).'),
      qcm('Quel ange transmettait la révélation ?', ['Isrâfîl', 'Jibrîl', 'Mâlik', 'Mîkâ’îl'], 1, 'Jibrîl (Gabriel) transmettait la révélation aux prophètes.'),
      vf('Les anges peuvent désobéir à Allah.', false, 'Non : « ils ne désobéissent jamais à Allah » (sourate 66, verset 6).'),
    ],
    sources: ['Coran : 2:3, 66:6, 82:10-12 (Quran.com)', 'Sahîh Muslim n°2996 ; Jâmi‘ at-Tirmidhî n°1071'],
  },

  {
    id: 'livres',
    title: 'Les livres révélés',
    level: 'debutant',
    category: 'foi',
    minutes: 6,
    icon: 'book',
    arabic: 'الكتب',
    summary: 'La Torah, les Psaumes, l’Évangile, les Feuillets et le Coran.',
    sections: [
      {
        title: 'Un même message à travers l’histoire',
        blocks: [
          { t: 'p', text: "Les musulmans croient qu'Allah a révélé des **livres** à plusieurs messagers pour guider l'humanité. Tous appelaient à adorer Allah seul et à faire le bien." },
          { t: 'table', head: ['Livre', 'Messager'], rows: [
            ['Les Feuillets (Suhuf)', 'Ibrâhîm (Abraham) et Mûsâ (Moïse) — sourate 87, versets 18-19'],
            ['La Torah (Tawrât)', 'Mûsâ (Moïse)'],
            ['Les Psaumes (Zabûr)', 'Dâwûd (David) — sourate 17, verset 55'],
            ['L’Évangile (Injîl)', '‘Îsâ (Jésus)'],
            ['Le Coran', 'Muhammad ﷺ'],
          ] },
          { t: 'verse', key: '3:3-4' },
        ],
      },
      {
        title: 'Le Coran, dernier livre',
        blocks: [
          { t: 'p', text: "Le **Coran** est la dernière révélation. Les musulmans croient qu'il est la Parole d'Allah, révélée en arabe, et qu'il est **préservé** dans sa langue d'origine jusqu'à la fin des temps." },
          { t: 'verse', key: '15:9' },
          { t: 'note', tone: 'info', title: 'Et les livres précédents ?', text: "Les musulmans croient aux livres précédents tels qu'ils ont été révélés à l'origine. Ils considèrent que les textes actuels ont pu subir des modifications au fil du temps, et que le Coran vient confirmer et compléter ce message." },
          { t: 'note', tone: 'tip', title: 'Traduction ≠ Coran', text: "Une traduction du Coran est une **explication du sens** dans une autre langue, rédigée par un être humain. Seul le texte arabe est considéré comme le Coran lui-même. C'est pourquoi ce site affiche toujours le texte arabe à côté de la traduction, avec le nom du traducteur." },
        ],
      },
    ],
    quiz: [
      qcm('À quel prophète la Torah a-t-elle été révélée ?', ['Dâwûd', 'Mûsâ (Moïse)', '‘Îsâ', 'Ibrâhîm'], 1, 'La Torah a été révélée à Moïse.'),
      qcm('Les Psaumes (Zabûr) ont été donnés à…', ['Dâwûd (David)', 'Nûh (Noé)', 'Yûsuf', 'Sulaymân'], 0, 'Le Zabûr a été donné à David (sourate 17, verset 55).'),
      vf('Une traduction du Coran est considérée comme le Coran lui-même.', false, 'Non : seul le texte arabe est le Coran ; la traduction en explique le sens.'),
    ],
    sources: ['Coran : 3:3-4, 15:9, 17:55, 87:18-19 (Quran.com)'],
  },

  {
    id: 'prophetes',
    title: 'Les prophètes et messagers',
    level: 'debutant',
    category: 'foi',
    minutes: 8,
    icon: 'mosque',
    arabic: 'الأنبياء والرسل',
    summary: "D'Adam à Muhammad ﷺ : une chaîne de prophètes porteurs du même message.",
    sections: [
      {
        title: 'Pourquoi des prophètes ?',
        blocks: [
          { t: 'p', text: "Allah a choisi des hommes parmi les humains pour transmettre Son message et montrer par leur exemple comment vivre. Chaque peuple a reçu un messager." },
          { t: 'verse', key: '16:36' },
          { t: 'terms', items: [
            { term: 'Nabî (prophète)', def: 'Celui qui reçoit une révélation d’Allah.' },
            { term: 'Rasûl (messager)', def: 'Un prophète chargé en plus de transmettre un message, souvent une législation, à un peuple.' },
          ] },
        ],
      },
      {
        title: 'Les prophètes cités dans le Coran',
        blocks: [
          { t: 'p', text: "Le Coran cite **25 prophètes** par leur nom. Beaucoup sont aussi connus dans la Bible :" },
          { t: 'table', head: ['Nom arabe', 'Nom français'], rows: [
            ['Âdam', 'Adam'], ['Idrîs', 'Hénoch (selon beaucoup)'], ['Nûh', 'Noé'], ['Hûd', '—'], ['Sâlih', '—'], ['Ibrâhîm', 'Abraham'], ['Lût', 'Loth'], ['Ismâ‘îl', 'Ismaël'], ['Ishâq', 'Isaac'], ['Ya‘qûb', 'Jacob'], ['Yûsuf', 'Joseph'], ['Ayyûb', 'Job'], ['Shu‘ayb', '—'], ['Mûsâ', 'Moïse'], ['Hârûn', 'Aaron'], ['Dhû al-Kifl', '—'], ['Dâwûd', 'David'], ['Sulaymân', 'Salomon'], ['Ilyâs', 'Élie'], ['Al-Yasa‘', 'Élisée'], ['Yûnus', 'Jonas'], ['Zakariyyâ', 'Zacharie'], ['Yahyâ', 'Jean-Baptiste'], ['‘Îsâ', 'Jésus'], ['Muhammad ﷺ', 'Muhammad'],
          ] },
          { t: 'verse', key: '4:163-164' },
        ],
      },
      {
        title: 'Jésus (‘Îsâ) en islam',
        blocks: [
          { t: 'p', text: "Jésus est un grand prophète en islam, né miraculeusement de **Marie** (Maryam), sans père. Une sourate entière porte le nom de Marie. Les musulmans l'aiment et le respectent, mais le considèrent comme un prophète et un serviteur d'Allah, non comme Dieu ou fils de Dieu." },
          { t: 'verse', key: '19:30', intro: 'Les paroles de Jésus bébé, rapportées dans le Coran :' },
        ],
      },
      {
        title: 'Muhammad ﷺ, le sceau des prophètes',
        blocks: [
          { t: 'p', text: "Muhammad ﷺ est le dernier prophète, envoyé à toute l'humanité comme une miséricorde. Après lui, il n'y a plus de prophète." },
          { t: 'verse', key: '21:107' },
          { t: 'link', to: '/cours/vie-prophete', label: 'Découvrir la vie du Prophète ﷺ' },
        ],
      },
    ],
    quiz: [
      qcm('Combien de prophètes sont cités par leur nom dans le Coran ?', ['12', '25', '40', '124 000'], 1, 'Le Coran cite 25 prophètes par leur nom.'),
      qcm('Quel est le nom arabe d’Abraham ?', ['Mûsâ', 'Ibrâhîm', 'Yûsuf', 'Nûh'], 1, 'Abraham se dit Ibrâhîm en arabe.'),
      vf('En islam, Jésus est un prophète respecté.', true, 'Oui : ‘Îsâ est un grand prophète, né miraculeusement de Marie.'),
      vf('Un nouveau prophète viendra après Muhammad ﷺ.', false, 'Non : il est le « sceau des prophètes » (sourate 33, verset 40).'),
    ],
    sources: ['Coran : 4:163-164, 16:36, 19:30, 21:107 (Quran.com)'],
  },

  {
    id: 'jour-dernier',
    title: 'Le Jour dernier',
    level: 'debutant',
    category: 'foi',
    minutes: 7,
    icon: 'sun',
    arabic: 'اليوم الآخر',
    summary: 'La mort, la tombe, la résurrection, le jugement, le Paradis et l’Enfer.',
    sections: [
      {
        title: 'La vie continue après la mort',
        blocks: [
          { t: 'p', text: "Les musulmans croient que la vie sur terre est un passage. Après la mort, chacun sera **ressuscité** et **jugé** sur ses actes par Allah, avec justice et miséricorde." },
          { t: 'verse', key: '3:185' },
        ],
      },
      {
        title: 'Les grandes étapes',
        blocks: [
          { t: 'list', ordered: true, items: [
            '**La mort** et la vie dans la tombe (*barzakh*), une période d’attente.',
            '**La fin du monde** annoncée par la Trompe.',
            '**La résurrection** de tous les êtres humains.',
            '**Le rassemblement** et **la reddition des comptes** : chacun reçoit le livre de ses actes.',
            '**La balance** (*mîzân*) qui pèse les actes.',
            '**Le Paradis** (*al-Janna*) ou **l’Enfer** (*an-Nâr*).',
          ] },
          { t: 'verse', key: '99:7-8', intro: 'Rien ne sera oublié :' },
        ],
      },
      {
        title: 'Entre espoir et crainte',
        blocks: [
          { t: 'p', text: "Croire au Jour dernier donne du sens à la vie : chaque bonne action compte, même la plus petite. Le croyant vit entre **l'espoir** en la miséricorde d'Allah et **la crainte** de Lui désobéir — sans jamais désespérer." },
          { t: 'verse', key: '39:53' },
        ],
      },
    ],
    quiz: [
      qcm('Comment s’appelle la vie dans la tombe en attendant la résurrection ?', ['Le barzakh', 'Le mîzân', 'La Janna', 'Le sirât'], 0, 'Le barzakh est la période entre la mort et la résurrection.'),
      vf('Selon le Coran, même le bien du poids d’un atome sera vu.', true, 'Oui (sourate 99, versets 7-8).'),
      vf('Il faut désespérer de la miséricorde d’Allah si l’on a beaucoup péché.', false, 'Non : « Ne désespérez pas de la miséricorde d’Allah » (sourate 39, verset 53).'),
    ],
    sources: ['Coran : 3:185, 39:53, 99:7-8 (Quran.com)'],
  },

  {
    id: 'destin',
    title: 'Le destin (al-qadar)',
    level: 'intermediaire',
    category: 'foi',
    minutes: 7,
    icon: 'compass',
    arabic: 'القدر',
    summary: 'Comprendre la croyance au destin sans tomber dans le fatalisme.',
    sections: [
      {
        title: 'Tout est connu et écrit par Allah',
        blocks: [
          { t: 'p', text: "Croire au **qadar**, c'est croire qu'Allah connaît tout, que tout a été écrit, que rien n'arrive sans Sa volonté et qu'Il a créé toute chose. Les savants résument cela en quatre degrés :" },
          { t: 'list', ordered: true, items: ['**La science** d’Allah, qui englobe tout.', '**L’écriture** de toute chose dans la Table préservée.', '**La volonté** d’Allah : rien n’arrive sans qu’Il le veuille.', '**La création** : Allah est le Créateur de toute chose.'] },
          { t: 'verse', key: '54:49' },
        ],
      },
      {
        title: 'Et ma liberté ?',
        blocks: [
          { t: 'p', text: "L'humain a reçu une **volonté** et une **capacité de choisir**. Il est responsable de ses actes, et c'est pour cela qu'il sera jugé. Le destin n'est pas une excuse pour ne rien faire." },
          { t: 'hadith', text: "Un homme demanda : « Dois-je laisser ma chamelle libre et placer ma confiance en Allah, ou l'attacher et placer ma confiance en Allah ? » Le Prophète ﷺ répondit : « Attache-la et place ta confiance en Allah. »", ref: 'Rapporté par at-Tirmidhî (n°2517), qui l’a jugé bon (hasan)' },
          { t: 'verse', key: '13:11' },
        ],
      },
      {
        title: 'Une source de paix',
        blocks: [
          { t: 'p', text: "Croire au destin aide à rester serein face aux épreuves et humble face aux réussites. Le croyant agit de son mieux, puis s'en remet à Allah." },
          { t: 'verse', key: '57:22-23' },
          { t: 'hadith', text: "« Étonnante est l'affaire du croyant : tout est bien pour lui. S'il lui arrive un bonheur, il remercie, et c'est un bien pour lui. S'il lui arrive un malheur, il patiente, et c'est un bien pour lui. »", ref: 'Rapporté par Muslim (n°2999), d’après Suhayb' },
        ],
      },
    ],
    quiz: [
      vf('Croire au destin signifie qu’il ne sert à rien de faire des efforts.', false, '« Attache-la et place ta confiance en Allah » (at-Tirmidhî n°2517) : on agit, puis on s’en remet à Allah.'),
      qcm('Combien de degrés du qadar les savants citent-ils généralement ?', ['Deux', 'Trois', 'Quatre', 'Six'], 2, 'Science, écriture, volonté et création.'),
      vf('L’humain est responsable de ses choix.', true, 'Oui, c’est pour cela qu’il sera jugé.'),
    ],
    sources: ['Coran : 13:11, 54:49, 57:22-23 (Quran.com)', 'Jâmi‘ at-Tirmidhî n°2517 ; Sahîh Muslim n°2999'],
  },
]
