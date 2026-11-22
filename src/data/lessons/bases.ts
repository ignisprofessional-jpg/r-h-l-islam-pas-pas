import { type Lesson, vf, qcm } from '../types'

export const lessonsBases: Lesson[] = [
  {
    id: 'vie-prophete',
    title: 'La vie du prophète Muhammad ﷺ',
    level: 'debutant',
    category: 'prophete',
    minutes: 12,
    icon: 'mosque',
    arabic: 'السيرة النبوية',
    summary: 'Les grandes étapes de sa vie : La Mecque, la révélation, l’Hégire, Médine.',
    sections: [
      {
        title: 'Naissance et jeunesse (vers 570)',
        blocks: [
          { t: 'p', text: "Muhammad ﷺ est né à **La Mecque**, vers l'an **570**, dans la tribu de Quraysh. Son père ‘Abdullâh est mort avant sa naissance et sa mère Âmina quand il avait environ six ans. Il est élevé par son grand-père ‘Abd al-Muttalib, puis par son oncle **Abû Tâlib**." },
          { t: 'p', text: "Jeune homme, il est berger puis commerçant. Il est connu de tous pour son honnêteté : on le surnomme **al-Amîn**, « le digne de confiance »." },
          { t: 'p', text: "Vers 25 ans, il épouse **Khadîja**, une commerçante respectée. Ils vivront un mariage d'amour et de soutien pendant environ 25 ans." },
        ],
      },
      {
        title: 'La première révélation (610)',
        blocks: [
          { t: 'p', text: "Vers l'âge de **40 ans**, il se retire souvent pour méditer dans la **grotte de Hirâ’**, près de La Mecque. C'est là que l'ange **Jibrîl** lui apparaît et lui révèle les premiers versets du Coran :" },
          { t: 'verse', key: '96:1-5' },
          { t: 'p', text: "Bouleversé, il rentre auprès de Khadîja, qui le rassure et devient la **première personne à croire** en son message." },
        ],
      },
      {
        title: 'La prédication à La Mecque (610-622)',
        blocks: [
          { t: 'list', items: [
            "Il appelle d'abord ses proches, puis publiquement, à adorer Allah seul et à abandonner les idoles.",
            "Les premiers musulmans subissent moqueries, boycotts et persécutions. Certains se réfugient en **Abyssinie** auprès d'un roi chrétien juste.",
            "Vers 619, il perd Khadîja et Abû Tâlib : c'est **l'année de la tristesse**.",
            "Il vit le **voyage nocturne** (al-Isrâ’ wal-Mi‘râj), de La Mecque à Jérusalem puis à travers les cieux, où la prière est prescrite.",
          ] },
          { t: 'verse', key: '17:1' },
        ],
      },
      {
        title: 'L’Hégire et Médine (622-632)',
        blocks: [
          { t: 'p', text: "En **622**, menacés, les musulmans émigrent vers **Yathrib**, qui deviendra **Médine**. Cette émigration, **l'Hégire** (*hijra*), marque le début du calendrier musulman." },
          { t: 'list', items: [
            "À Médine, il construit la mosquée, unit les émigrés et les habitants de Médine (les *Ansâr*), et organise la vie de la communauté.",
            "Plusieurs batailles ont lieu contre les Mecquois : **Badr** (624), **Uhud** (625), **la Tranchée** (627).",
            "En 628, le **traité de Hudaybiya** établit une trêve.",
            "En **630**, il entre à La Mecque presque sans combat et **pardonne** à ceux qui l'avaient persécuté.",
          ] },
        ],
      },
      {
        title: 'Le pèlerinage d’adieu et la mort (632)',
        blocks: [
          { t: 'p', text: "En **632**, il accomplit son unique pèlerinage et prononce le **sermon d'adieu**, rappelant l'égalité entre les humains, le respect des vies, des biens et des femmes. Quelques mois plus tard, il meurt à Médine, à environ **63 ans**." },
          { t: 'verse', key: '5:3', intro: 'Parmi les derniers versets révélés :' },
        ],
      },
      {
        title: 'Son caractère',
        blocks: [
          { t: 'p', text: "Il était doux, humble, patient, généreux, il aidait aux tâches de la maison, plaisantait sans mentir et se montrait bon envers les enfants, les pauvres et même ses ennemis." },
          { t: 'verse', key: '68:4' },
          { t: 'verse', key: '33:21' },
          { t: 'hadith', text: "Interrogée sur ce que faisait le Prophète ﷺ chez lui, ‘Â’isha répondit : « Il était au service de sa famille, et lorsque venait l'heure de la prière, il sortait pour prier. »", ref: 'Rapporté par al-Bukhârî (n°676)' },
        ],
      },
    ],
    quiz: [
      qcm('Où est né le Prophète ﷺ ?', ['À Médine', 'À La Mecque', 'À Jérusalem', 'À Damas'], 1, 'Il est né à La Mecque vers 570.'),
      qcm('Quel était son surnom avant la prophétie ?', ['As-Siddîq', 'Al-Amîn', 'Al-Fârûq', 'Asadullâh'], 1, 'Al-Amîn : le digne de confiance.'),
      qcm('Quels sont les premiers mots révélés ?', ['« Au nom d’Allah »', '« Lis ! » (Iqra’)', '« Dis : Il est Allah, Unique »', '« Louange à Allah »'], 1, 'Les premiers versets révélés sont le début de la sourate 96 : « Lis ! ».'),
      qcm('En quelle année a eu lieu l’Hégire ?', ['570', '610', '622', '632'], 2, 'L’Hégire vers Médine a eu lieu en 622 : c’est l’an 1 du calendrier musulman.'),
      vf('Khadîja fut la première personne à croire en son message.', true, 'Oui, son épouse Khadîja fut la première à croire.'),
    ],
    sources: ['Coran : 5:3, 17:1, 33:21, 68:4, 96:1-5 (Quran.com)', 'Sahîh al-Bukhârî n°676', 'Ouvrages de référence de sîra : Ibn Hishâm ; « Le Nectar cacheté » d’al-Mubârakfûrî'],
  },

  {
    id: 'histoire-islam',
    title: "Les grandes étapes de l'histoire islamique",
    level: 'intermediaire',
    category: 'histoire',
    minutes: 10,
    icon: 'layers',
    arabic: 'التاريخ الإسلامي',
    summary: 'Des califes bien-guidés à l’époque moderne : une frise pour s’y retrouver.',
    sections: [
      {
        title: 'Les quatre califes bien-guidés (632-661)',
        blocks: [
          { t: 'table', head: ['Calife', 'Période', 'Fait marquant'], rows: [
            ['Abû Bakr as-Siddîq', '632-634', 'Premier calife, rassemble les feuillets du Coran en un seul recueil.'],
            ['‘Umar ibn al-Khattâb', '634-644', 'Expansion, organisation de l’administration, instauration du calendrier hégirien.'],
            ['‘Uthmân ibn ‘Affân', '644-656', 'Diffusion de copies officielles et unifiées du Coran (le mushaf).'],
            ['‘Alî ibn Abî Tâlib', '656-661', 'Cousin et gendre du Prophète ﷺ ; période de discordes internes.'],
          ] },
        ],
      },
      {
        title: 'Les grandes dynasties',
        blocks: [
          { t: 'table', head: ['Période', 'Dynastie / région', 'À retenir'], rows: [
            ['661-750', 'Omeyyades (Damas)', 'Empire de l’Espagne à l’Asie centrale.'],
            ['750-1258', 'Abbassides (Bagdad)', 'Âge d’or des sciences : la « Maison de la sagesse », traductions, médecine, mathématiques. Compilation des grands recueils de hadiths et formation des écoles juridiques.'],
            ['711-1492', 'Al-Andalus (Espagne)', 'Cordoue, Grenade : rayonnement culturel et scientifique.'],
            ['909-1171', 'Fatimides (Égypte)', 'Fondation du Caire et d’al-Azhar.'],
            ['1250-1517', 'Mamelouks (Égypte, Syrie)', 'Arrêt de l’avancée mongole.'],
            ['1299-1922', 'Ottomans (Istanbul)', 'Empire sur trois continents pendant six siècles.'],
            ['1526-1857', 'Moghols (Inde)', 'Architecture célèbre, comme le Taj Mahal.'],
          ] },
          { t: 'note', tone: 'info', text: "L'islam s'est aussi diffusé pacifiquement par le commerce et les savants, notamment en Afrique de l'Ouest (empire du Mali, Tombouctou) et en Asie du Sud-Est (Indonésie, aujourd'hui le pays comptant le plus de musulmans)." },
        ],
      },
      {
        title: 'Les savants et la transmission',
        blocks: [
          { t: 'p', text: "Au fil des siècles, des générations de savants ont transmis le Coran, compilé les hadiths (al-Bukhârî, Muslim…), fondé les écoles juridiques (Abû Hanîfa, Mâlik, ash-Shâfi‘î, Ahmad ibn Hanbal) et développé les sciences religieuses. Le niveau avancé de ce site y revient en détail." },
          { t: 'link', to: '/cours/histoire-approfondie', label: 'Approfondir l’histoire (niveau avancé)' },
        ],
      },
    ],
    quiz: [
      qcm('Qui fut le premier calife ?', ['‘Umar', '‘Alî', 'Abû Bakr', '‘Uthmân'], 2, 'Abû Bakr as-Siddîq fut le premier calife (632-634).'),
      qcm('Quel calife a diffusé des copies unifiées du Coran ?', ['‘Uthmân', 'Abû Bakr', 'Mu‘âwiya', 'Hârûn ar-Rashîd'], 0, '‘Uthmân a diffusé le mushaf unifié.'),
      qcm('Quelle ville était la capitale des Abbassides ?', ['Damas', 'Bagdad', 'Le Caire', 'Cordoue'], 1, 'Bagdad, centre de l’âge d’or scientifique.'),
    ],
    sources: ['Synthèse historique générale (dates communément admises par les historiens)'],
  },

  {
    id: 'comportements',
    title: 'Les comportements recommandés en islam',
    level: 'debutant',
    category: 'comportement',
    minutes: 8,
    icon: 'heart',
    arabic: 'الأخلاق',
    summary: 'Le bon caractère (akhlâq) : sincérité, douceur, honnêteté, respect des autres.',
    sections: [
      {
        title: 'Le bon caractère, au cœur de la religion',
        blocks: [
          { t: 'p', text: "En islam, la relation avec Allah et la relation avec les gens vont ensemble. Le **bon caractère** (*husn al-khuluq*) est l'une des choses les plus lourdes dans la balance des actes." },
          { t: 'hadith', text: "« Rien n'est plus lourd dans la balance du croyant, le Jour de la Résurrection, que le bon caractère. »", ref: 'Rapporté par at-Tirmidhî (n°2002), qui l’a jugé authentique' },
          { t: 'hadith', text: "« Les meilleurs d'entre vous sont ceux qui ont le meilleur caractère. »", ref: 'Rapporté par al-Bukhârî (n°3559) et Muslim (n°2321)' },
        ],
      },
      {
        title: 'Des qualités à cultiver',
        blocks: [
          { t: 'list', items: [
            "**L'honnêteté** : dire la vérité, tenir ses promesses, rendre les dépôts.",
            "**La douceur** : « Allah est Doux et Il aime la douceur en toute chose » (al-Bukhârî n°6927, Muslim n°2593).",
            "**La pudeur** (*hayâ’*) : une branche de la foi.",
            "**Le respect des voisins**, quelle que soit leur religion.",
            "**Le bon langage** : « Que celui qui croit en Allah et au Jour dernier dise du bien ou se taise » (al-Bukhârî n°6018, Muslim n°47).",
            "**La justice** et **l'équité**, même envers ceux qu'on n'aime pas.",
          ] },
          { t: 'verse', key: '49:13' },
        ],
      },
      {
        title: 'Ce qu’il faut éviter',
        blocks: [
          { t: 'list', items: ['Le mensonge et la tromperie.', 'La médisance (parler de quelqu’un en son absence de façon qu’il n’aimerait pas) et la calomnie.', 'L’orgueil et le mépris des autres.', 'La colère incontrôlée : « Ne te mets pas en colère » (al-Bukhârî n°6116).'] },
          { t: 'verse', key: '49:12' },
        ],
      },
    ],
    quiz: [
      vf('Le bon caractère est l’une des choses les plus lourdes dans la balance.', true, 'Oui (at-Tirmidhî n°2002).'),
      qcm('Que dit le hadith sur la parole ?', ['Parler beaucoup', 'Dire du bien ou se taire', 'Toujours répondre', 'Ne jamais parler'], 1, '« Qu’il dise du bien ou se taise » (al-Bukhârî n°6018, Muslim n°47).'),
      qcm('Qu’est-ce que la médisance ?', ['Dire la vérité en face', 'Parler de quelqu’un en son absence d’une façon qu’il n’aimerait pas', 'Donner un conseil', 'Faire une invocation'], 1, 'La médisance (ghîba) est interdite (sourate 49, verset 12).'),
    ],
    sources: ['Coran : 49:12-13 (Quran.com)', 'Jâmi‘ at-Tirmidhî n°2002 ; Sahîh al-Bukhârî n°3559, 6018, 6116, 6927 ; Sahîh Muslim n°47, 2321, 2593'],
  },

  {
    id: 'parents',
    title: 'Le respect des parents',
    level: 'debutant',
    category: 'comportement',
    minutes: 7,
    icon: 'heart',
    arabic: 'بر الوالدين',
    summary: 'La bonté envers les parents, même lorsqu’ils ne sont pas musulmans.',
    sections: [
      {
        title: 'Juste après l’adoration d’Allah',
        blocks: [
          { t: 'p', text: "Le Coran place la bonté envers les parents juste après l'adoration d'Allah. C'est un devoir majeur et une source immense de récompense." },
          { t: 'verse', key: '17:23-24' },
          { t: 'hadith', text: "Un homme demanda : « Ô Messager d'Allah, qui mérite le plus ma bonne compagnie ? » Il répondit : « Ta mère. » « Puis qui ? » « Ta mère. » « Puis qui ? » « Ta mère. » « Puis qui ? » « Ton père. »", ref: 'Rapporté par al-Bukhârî (n°5971) et Muslim (n°2548), d’après Abû Hurayra' },
        ],
      },
      {
        title: 'Et si mes parents ne sont pas musulmans ?',
        blocks: [
          { t: 'p', text: "C'est une situation très fréquente pour ceux qui découvrent l'islam. La réponse du Coran est claire : on reste **bon, respectueux et présent** avec ses parents, même s'ils ne partagent pas notre foi. On ne leur obéit simplement pas s'ils demandent de désobéir à Allah." },
          { t: 'verse', key: '31:14-15' },
          { t: 'hadith', text: "Asmâ’ bint Abî Bakr raconte que sa mère, encore polythéiste, vint lui rendre visite. Elle demanda au Prophète ﷺ si elle devait garder le lien avec elle. Il répondit : « Oui, garde le lien avec ta mère. »", ref: 'Rapporté par al-Bukhârî (n°2620) et Muslim (n°1003)' },
          { t: 'note', tone: 'gentle', text: "Votre comportement est souvent le plus beau message : patience, aide, gentillesse. Évitez les débats tendus ; laissez le temps faire son œuvre." },
          { t: 'link', to: '/questions', label: "Lire : comment pratiquer dans une famille non musulmane ?" },
        ],
      },
      {
        title: 'Concrètement',
        blocks: [
          { t: 'list', items: ['Leur parler avec douceur, ne jamais les rabaisser ni leur dire « ouf ».', 'Les aider, les visiter, prendre de leurs nouvelles.', 'Prier pour eux (invoquer pour leur guidée et leur bien).', 'Prendre soin d’eux lorsqu’ils vieillissent.'] },
        ],
      },
    ],
    quiz: [
      vf('Il faut rompre avec ses parents s’ils ne sont pas musulmans.', false, 'Non : le Coran demande de les accompagner avec bonté (sourate 31, verset 15) et le Prophète ﷺ a dit à Asmâ’ de garder le lien avec sa mère.'),
      qcm('Dans le hadith, combien de fois le Prophète ﷺ cite-t-il la mère avant le père ?', ['Une fois', 'Deux fois', 'Trois fois', 'Quatre fois'], 2, 'Trois fois la mère, puis le père (al-Bukhârî n°5971, Muslim n°2548).'),
      vf('On n’obéit pas à ses parents s’ils demandent de désobéir à Allah, mais on reste bon envers eux.', true, 'Oui, d’après la sourate 31, verset 15.'),
    ],
    sources: ['Coran : 17:23-24, 31:14-15 (Quran.com)', 'Sahîh al-Bukhârî n°2620, 5971 ; Sahîh Muslim n°1003, 2548'],
  },

  {
    id: 'patience',
    title: 'La patience (sabr)',
    level: 'debutant',
    category: 'comportement',
    minutes: 6,
    icon: 'leaf',
    arabic: 'الصبر',
    summary: 'Tenir bon dans l’effort, face aux épreuves et face aux tentations.',
    sections: [
      {
        title: 'Trois formes de patience',
        blocks: [
          { t: 'p', text: "Le **sabr** est souvent traduit par patience, mais il signifie aussi constance et maîtrise de soi. Les savants en distinguent trois formes :" },
          { t: 'list', items: ['La patience **dans l’obéissance** : persévérer dans la prière, l’apprentissage…', 'La patience **face aux interdits** : résister à ce qui fait du mal.', 'La patience **face aux épreuves** : maladie, perte, difficultés.'] },
          { t: 'verse', key: '2:153' },
        ],
      },
      {
        title: 'Une récompense immense',
        blocks: [
          { t: 'verse', key: '2:155-157' },
          { t: 'verse', key: '39:10' },
          { t: 'hadith', text: "« La vraie patience se manifeste au premier choc. »", ref: 'Rapporté par al-Bukhârî (n°1283) et Muslim (n°926), d’après Anas' },
          { t: 'note', tone: 'gentle', text: "Être patient ne veut pas dire ne rien ressentir. Le Prophète ﷺ a pleuré à la mort de son fils Ibrâhîm. La patience, c'est garder confiance en Allah malgré la douleur." },
        ],
      },
    ],
    quiz: [
      qcm('Combien de formes de patience les savants distinguent-ils ?', ['Une', 'Deux', 'Trois', 'Quatre'], 2, 'Dans l’obéissance, face aux interdits, face aux épreuves.'),
      vf('Être patient signifie ne jamais pleurer.', false, 'Le Prophète ﷺ a lui-même pleuré ; la patience est de garder confiance en Allah.'),
    ],
    sources: ['Coran : 2:153, 2:155-157, 39:10 (Quran.com)', 'Sahîh al-Bukhârî n°1283 ; Sahîh Muslim n°926'],
  },

  {
    id: 'pardon',
    title: 'Le pardon',
    level: 'debutant',
    category: 'comportement',
    minutes: 6,
    icon: 'heart',
    arabic: 'العفو',
    summary: 'Demander pardon à Allah et pardonner aux autres.',
    sections: [
      {
        title: 'Allah aime pardonner',
        blocks: [
          { t: 'p', text: "Parmi les noms d'Allah figurent **al-Ghafûr** (le Pardonneur), **at-Tawwâb** (Celui qui accepte le repentir) et **al-‘Afuww** (Celui qui efface). Aucun péché n'est trop grand pour Son pardon lorsque l'on se repent sincèrement." },
          { t: 'verse', key: '39:53' },
          { t: 'p', text: "Le **repentir** (*tawba*) comporte : regretter, arrêter la faute, avoir l'intention sincère de ne pas recommencer, et réparer si la faute concerne quelqu'un d'autre." },
          { t: 'link', to: '/douas?cat=pardon', label: 'Les invocations pour demander pardon' },
        ],
      },
      {
        title: 'Pardonner aux autres',
        blocks: [
          { t: 'verse', key: '24:22' },
          { t: 'verse', key: '3:134' },
          { t: 'p', text: "Le Prophète ﷺ a pardonné aux Mecquois qui l'avaient chassé et combattu. Pardonner ne veut pas dire accepter l'injustice : on peut demander justice. Mais pardonner, quand on le peut, est une noblesse récompensée par Allah." },
        ],
      },
    ],
    quiz: [
      qcm('Que signifie « tawba » ?', ['La prière', 'Le repentir', 'La patience', 'L’aumône'], 1, 'La tawba est le repentir sincère.'),
      vf('Certains péchés sont trop grands pour être pardonnés à celui qui se repent sincèrement.', false, 'Allah pardonne tous les péchés à celui qui se repent (sourate 39, verset 53).'),
    ],
    sources: ['Coran : 3:134, 24:22, 39:53 (Quran.com)'],
  },

  {
    id: 'sincerite',
    title: 'La sincérité (ikhlâs)',
    level: 'debutant',
    category: 'comportement',
    minutes: 5,
    icon: 'target',
    arabic: 'الإخلاص',
    summary: "Agir pour Allah, et non pour l'image que l'on donne.",
    sections: [
      {
        title: 'Les actes valent par les intentions',
        blocks: [
          { t: 'p', text: "L'**ikhlâs** consiste à faire ses actes **pour Allah**, et non pour être vu ou admiré. C'est la condition pour qu'un acte d'adoration soit accepté." },
          { t: 'hadith', text: "« Les actes ne valent que par les intentions, et chacun n'aura que ce qu'il a eu l'intention de faire. »", ref: 'Rapporté par al-Bukhârî (n°1) et Muslim (n°1907), d’après ‘Umar ibn al-Khattâb' },
          { t: 'verse', key: '98:5' },
        ],
      },
      {
        title: 'Une bonne intention transforme le quotidien',
        blocks: [
          { t: 'p', text: "Avec une bonne intention, même les gestes ordinaires deviennent des actes récompensés : travailler pour nourrir sa famille, dormir pour être en forme pour la prière, apprendre pour mieux comprendre sa religion." },
          { t: 'note', tone: 'tip', text: "Avant de commencer une leçon ici, vous pouvez simplement penser : « J'apprends pour me rapprocher d'Allah. » L'intention se fait dans le cœur." },
        ],
      },
    ],
    quiz: [
      qcm('Quel est le premier hadith du recueil d’al-Bukhârî ?', ['« Les actes ne valent que par les intentions »', '« Souriez »', '« Priez comme vous m’avez vu prier »', '« La religion est facilité »'], 0, 'Le hadith n°1 d’al-Bukhârî porte sur les intentions.'),
      vf('L’intention doit obligatoirement être prononcée à voix haute.', false, 'L’intention se fait dans le cœur.'),
    ],
    sources: ['Coran : 98:5 (Quran.com)', 'Sahîh al-Bukhârî n°1 ; Sahîh Muslim n°1907'],
  },

  {
    id: 'gratitude',
    title: 'La gratitude (shukr)',
    level: 'debutant',
    category: 'comportement',
    minutes: 5,
    icon: 'sun',
    arabic: 'الشكر',
    summary: 'Remercier Allah et les gens : le cœur, la langue et les actes.',
    sections: [
      {
        title: 'Remercier pour recevoir davantage',
        blocks: [
          { t: 'p', text: "Le **shukr** est la reconnaissance des bienfaits d'Allah : la vie, la santé, la nourriture, la guidée… Il se vit avec le **cœur** (reconnaître), la **langue** (dire « al-hamdu lillâh ») et les **actes** (utiliser ces bienfaits dans le bien)." },
          { t: 'verse', key: '14:7' },
          { t: 'verse', key: '2:152' },
        ],
      },
      {
        title: 'Remercier les gens',
        blocks: [
          { t: 'hadith', text: "« Celui qui ne remercie pas les gens ne remercie pas Allah. »", ref: 'Rapporté par Abû Dâwûd (n°4811) et at-Tirmidhî (n°1954), qui l’a jugé authentique' },
          { t: 'p', text: "Un simple « merci », un mot gentil, une invocation : « Jazâka-llâhu khayran » (qu'Allah te récompense en bien) est une belle formule à dire à celui qui vous a rendu service." },
          { t: 'link', to: '/douas?cat=remercier', label: 'Les invocations de remerciement' },
        ],
      },
    ],
    quiz: [
      vf('Selon le Coran, la gratitude attire davantage de bienfaits.', true, '« Si vous êtes reconnaissants, très certainement J’augmenterai [Mes bienfaits] pour vous » (sourate 14, verset 7).'),
      qcm('Que signifie « Jazâka-llâhu khayran » ?', ['Bonjour', 'Qu’Allah te récompense en bien', 'Au revoir', 'Bon appétit'], 1, 'C’est une formule de remerciement.'),
    ],
    sources: ['Coran : 2:152, 14:7 (Quran.com)', 'Sunan Abî Dâwûd n°4811 ; Jâmi‘ at-Tirmidhî n°1954'],
  },
]
