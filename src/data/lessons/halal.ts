import { type Lesson, vf, qcm } from '../types'

export const lessonsHalal: Lesson[] = [
  {
    id: 'halal-principes',
    title: 'Halal et haram : les principes',
    level: 'debutant',
    category: 'halal',
    minutes: 7,
    icon: 'leaf',
    arabic: 'الحلال والحرام',
    summary: "Ce que signifient halal et haram, et la règle de base : tout est permis sauf ce qui est interdit.",
    sections: [
      {
        title: 'Des mots simples',
        blocks: [
          { t: 'terms', items: [
            { term: 'Halâl', def: 'Ce qui est permis, licite.' },
            { term: 'Harâm', def: 'Ce qui est interdit par Allah.' },
            { term: 'Makrûh', def: 'Ce qui est déconseillé, sans être interdit.' },
            { term: 'Mushtabah', def: 'Ce qui est douteux, dont le statut n’est pas clair.' },
          ] },
          { t: 'p', text: "Ces notions concernent toute la vie (argent, paroles, relations), mais ce module se concentre sur **l'alimentation**." },
        ],
      },
      {
        title: 'La règle de base : la permission',
        blocks: [
          { t: 'p', text: "Pour les aliments et les choses de la vie courante, les savants posent un principe important : **à l'origine, tout est permis**, sauf ce qu'un texte a interdit. La liste des interdits est donc courte et précise." },
          { t: 'verse', key: '2:168' },
          { t: 'hadith', text: "« Le licite est clair et l'illicite est clair, et entre les deux il y a des choses ambiguës que beaucoup de gens ne connaissent pas. Celui qui se préserve des choses ambiguës protège sa religion et son honneur… »", ref: 'Rapporté par al-Bukhârî (n°52) et Muslim (n°1599), d’après an-Nu‘mân ibn Bashîr' },
        ],
      },
      {
        title: 'Pas de culpabilité inutile',
        blocks: [
          { t: 'note', tone: 'gentle', text: "Vous découvrez ces règles : il est normal de ne pas tout appliquer du jour au lendemain. Ce qui a été fait **avant de savoir** n'est pas reproché. Avancez progressivement et sereinement." },
          { t: 'verse', key: '2:286' },
        ],
      },
    ],
    quiz: [
      qcm('Que signifie « halâl » ?', ['Interdit', 'Permis', 'Déconseillé', 'Obligatoire'], 1, 'Halâl signifie permis, licite.'),
      vf('À l’origine, les aliments sont permis sauf ce qui a été interdit par un texte.', true, 'C’est un principe reconnu par les savants.'),
      qcm('Que faire face à une chose douteuse ?', ['La consommer sans réfléchir', 'S’en préserver si possible', 'Se culpabiliser', 'Arrêter de manger'], 1, 'Le hadith encourage à se préserver des choses ambiguës (al-Bukhârî n°52).'),
    ],
    sources: ['Coran : 2:168, 2:286 (Quran.com)', 'Sahîh al-Bukhârî n°52 ; Sahîh Muslim n°1599'],
  },

  {
    id: 'porc-alcool',
    title: 'Le porc et l’alcool',
    level: 'debutant',
    category: 'halal',
    minutes: 7,
    icon: 'alert',
    arabic: 'الخنزير والخمر',
    summary: 'Les deux interdits alimentaires les plus connus, leurs textes et leurs nuances pratiques.',
    sections: [
      {
        title: 'Le porc',
        blocks: [
          { t: 'p', text: "La viande de porc et ses dérivés sont interdits par plusieurs versets du Coran. Le même verset cite aussi la bête morte (non abattue), le sang qui coule et ce qui est sacrifié pour autre qu'Allah." },
          { t: 'verse', key: '2:173' },
          { t: 'h', text: 'Les dérivés à surveiller' },
          { t: 'list', items: [
            '**La gélatine** (bonbons, desserts, gélules) : souvent d’origine porcine. Les savants divergent lorsque la matière a été totalement transformée (*istihâla*) ; beaucoup recommandent d’éviter la gélatine porcine et de choisir une gélatine bovine halal, de poisson ou végétale (agar-agar, pectine).',
            '**Le saindoux** et certaines graisses animales non précisées.',
            '**Les additifs** : certains (comme E120, E441, E542…) peuvent être d’origine animale ; vérifier si besoin.',
          ] },
        ],
      },
      {
        title: 'L’alcool',
        blocks: [
          { t: 'p', text: "Les boissons enivrantes (*khamr*) sont interdites. L'interdiction a été révélée progressivement, puis de façon définitive :" },
          { t: 'verse', key: '5:90-91' },
          { t: 'hadith', text: "« Tout ce qui enivre est khamr, et tout khamr est interdit. »", ref: 'Rapporté par Muslim (n°2003), d’après Ibn ‘Umar' },
          { t: 'hadith', text: "« Ce qui enivre en grande quantité, sa petite quantité est interdite. »", ref: 'Rapporté par Abû Dâwûd (n°3681) et at-Tirmidhî (n°1865)' },
          { t: 'note', tone: 'scholar', title: 'Les nuances', text: "Pour l'alcool utilisé en **cuisine** (vin dans une sauce), la majorité des savants le déconseillent ou l'interdisent, même si une partie s'évapore. Pour l'**alcool technique** non issu du vin (désinfectant, parfum, médicaments), beaucoup de savants contemporains l'autorisent à l'usage externe ou lorsqu'il est présent en infime quantité non enivrante. Pour un cas précis, demandez à un imam." },
        ],
      },
    ],
    quiz: [
      vf('La gélatine porcine pose question pour un musulman.', true, 'Oui : beaucoup de savants recommandent de l’éviter et d’utiliser des alternatives.'),
      qcm('Que dit le hadith sur les boissons enivrantes ?', ['Seule l’ivresse est interdite', 'Tout ce qui enivre est khamr et tout khamr est interdit', 'Seul le vin est interdit', 'L’alcool est permis le soir'], 1, 'Muslim n°2003.'),
      qcm('Dans quelle sourate se trouve l’interdiction définitive de l’alcool ?', ['Sourate 2', 'Sourate 5 (Al-Mâ’ida)', 'Sourate 112', 'Sourate 36'], 1, 'Sourate 5, versets 90-91.'),
    ],
    sources: ['Coran : 2:173, 5:90-91 (Quran.com)', 'Sahîh Muslim n°2003 ; Sunan Abî Dâwûd n°3681 ; Jâmi‘ at-Tirmidhî n°1865'],
  },

  {
    id: 'viande',
    title: 'Les règles concernant la viande',
    level: 'intermediaire',
    category: 'halal',
    minutes: 9,
    icon: 'leaf',
    arabic: 'الذبائح',
    summary: "L'abattage rituel, la viande des Gens du Livre, les produits de la mer, et les avis des écoles.",
    sections: [
      {
        title: 'L’abattage rituel (dhabîha)',
        blocks: [
          { t: 'p', text: "Pour qu'un animal terrestre permis (bœuf, mouton, poulet…) soit halal, il doit être abattu selon des règles précises :" },
          { t: 'list', items: [
            "L'abatteur est **musulman** ou fait partie des **Gens du Livre** (juifs, chrétiens).",
            "On **tranche la gorge** (trachée, œsophage et veines jugulaires) avec un instrument tranchant, pour une saignée complète.",
            "On **prononce le nom d'Allah** (« Bismillâh, Allâhu akbar »).",
            "On traite l'animal avec bienveillance (couteau bien aiguisé, ne pas l'abattre devant les autres).",
          ] },
          { t: 'verse', key: '6:121' },
          { t: 'hadith', text: "« Allah a prescrit la bienfaisance en toute chose… Lorsque vous abattez, abattez de la meilleure manière : que l'un de vous aiguise sa lame et épargne la souffrance à sa bête. »", ref: 'Rapporté par Muslim (n°1955), d’après Shaddâd ibn Aws' },
        ],
      },
      {
        title: 'Les avis des écoles sur la mention du nom d’Allah',
        blocks: [
          { t: 'table', head: ['École', 'Avis sur la mention du nom d’Allah (tasmiya)'], rows: [
            ['Hanafite', 'Obligatoire ; l’oubli est excusé, l’omission volontaire rend la viande illicite.'],
            ['Malikite', 'Obligatoire ; l’oubli est excusé, l’omission volontaire rend la viande illicite.'],
            ['Chaféite', 'Fortement recommandée (sunna) ; la viande reste licite si elle est oubliée.'],
            ['Hanbalite', 'Obligatoire ; l’oubli est excusé selon l’avis le plus connu de l’école.'],
          ] },
          { t: 'note', tone: 'scholar', text: "Ces divergences expliquent pourquoi certains musulmans ne mangent que de la viande certifiée halal, tandis que d'autres sont plus souples. Les deux attitudes s'appuient sur des avis de savants reconnus." },
        ],
      },
      {
        title: 'La viande des Gens du Livre',
        blocks: [
          { t: 'verse', key: '5:5' },
          { t: 'p', text: "Ce verset autorise la nourriture des juifs et des chrétiens. Aujourd'hui, la question est de savoir si l'abattage industriel moderne (étourdissement, abattage mécanique, absence de mention du nom de Dieu) correspond encore à ce que le verset autorise. **Les avis divergent** : beaucoup de savants recommandent la viande halal certifiée ou cachère, d'autres acceptent la viande d'un pays de tradition chrétienne. Dans le doute, la prudence consiste à privilégier une viande halal de confiance." },
        ],
      },
      {
        title: 'Poissons et produits de la mer',
        blocks: [
          { t: 'verse', key: '5:96' },
          { t: 'hadith', text: "À propos de la mer : « Son eau est pure et ses bêtes mortes sont licites. »", ref: 'Rapporté par Abû Dâwûd (n°83), at-Tirmidhî (n°69), an-Nasâ’î (n°59)' },
          { t: 'p', text: "Pour la **majorité des savants** (malikites, chaféites, hanbalites), tous les animaux marins sont permis sans abattage. L'école **hanafite** ne permet en principe que les poissons ; le statut de la crevette y fait débat entre ses savants." },
          { t: 'note', tone: 'tip', title: 'Astuce pratique', text: "Au restaurant ou à la cantine, le poisson et les plats végétariens sont souvent une solution simple quand on n'est pas sûr de la viande." },
        ],
      },
    ],
    quiz: [
      vf('Pour la majorité des savants, le poisson n’a pas besoin d’être abattu rituellement.', true, '« Ses bêtes mortes sont licites » (Abû Dâwûd n°83, at-Tirmidhî n°69).'),
      qcm('Quelle école considère la mention du nom d’Allah comme une sunna (non obligatoire) ?', ['Hanafite', 'Malikite', 'Chaféite', 'Hanbalite'], 2, 'L’école chaféite la considère comme fortement recommandée.'),
      qcm('Quel verset autorise la nourriture des Gens du Livre ?', ['2:255', '5:5', '112:1', '96:1'], 1, 'Sourate 5, verset 5.'),
    ],
    sources: ['Coran : 5:5, 5:96, 6:121 (Quran.com)', 'Sahîh Muslim n°1955 ; Sunan Abî Dâwûd n°83 ; Jâmi‘ at-Tirmidhî n°69'],
  },

  {
    id: 'necessite',
    title: 'Les situations de nécessité et de contrainte',
    level: 'intermediaire',
    category: 'halal',
    minutes: 6,
    icon: 'info',
    arabic: 'الضرورة',
    summary: "Quand la vie ou la santé est en jeu, l'interdit peut être levé.",
    sections: [
      {
        title: 'La nécessité rend permis l’interdit',
        blocks: [
          { t: 'p', text: "L'islam est une religion de miséricorde. En cas de **nécessité réelle** (danger pour la vie, faim extrême sans autre solution), ce qui est normalement interdit devient permis, **dans la limite du besoin**." },
          { t: 'verse', key: '2:173', intro: 'La fin du verset sur les interdits alimentaires le précise :' },
          { t: 'verse', key: '6:119' },
          { t: 'p', text: "Les savants en ont tiré des règles célèbres : « **La nécessité rend licite l'interdit** » et « **la nécessité s'estime à sa juste mesure** »." },
        ],
      },
      {
        title: 'Exemples',
        blocks: [
          { t: 'list', items: [
            "Une personne perdue sans autre nourriture peut manger ce qui est disponible pour survivre.",
            "Un médicament indispensable sans alternative halal peut être utilisé, selon l'avis de nombreux savants et organismes de fatwa.",
            "Une personne contrainte par la force (menace réelle) n'est pas fautive.",
          ] },
          { t: 'verse', key: '16:106', intro: 'Le Coran excuse celui qui agit sous la contrainte, tant que son cœur reste ferme dans la foi :' },
          { t: 'note', tone: 'warning', text: "La nécessité doit être réelle, pas une simple commodité. En cas de doute (traitement médical, situation précise), consultez un imam ou une personne qualifiée." },
        ],
      },
    ],
    quiz: [
      vf('En cas de danger réel pour la vie, l’interdit alimentaire peut être levé dans la limite du besoin.', true, 'Sourate 2, verset 173 ; sourate 6, verset 119.'),
      vf('Une simple envie suffit à constituer une nécessité.', false, 'La nécessité doit être réelle, et s’estime à sa juste mesure.'),
    ],
    sources: ['Coran : 2:173, 6:119, 16:106 (Quran.com)', 'Maximes juridiques (qawâ‘id fiqhiyya) classiques'],
  },

  {
    id: 'famille-non-musulmane',
    title: 'Manger dans une famille non musulmane',
    level: 'debutant',
    category: 'halal',
    minutes: 8,
    icon: 'heart',
    arabic: 'الأسرة',
    summary: "Conseils concrets et bienveillants pour partager les repas tout en respectant ses convictions.",
    sections: [
      {
        title: 'Garder le lien avant tout',
        blocks: [
          { t: 'p', text: "Partager les repas en famille est précieux. L'islam demande de **garder de bonnes relations** avec ses parents et ses proches, même s'ils ne sont pas musulmans." },
          { t: 'verse', key: '31:15' },
          { t: 'verse', key: '60:8' },
        ],
      },
      {
        title: 'Conseils pratiques',
        blocks: [
          { t: 'list', items: [
            "**Expliquer simplement et calmement**, sans faire la leçon : « Je ne mange pas de porc et je ne bois pas d’alcool. »",
            "**Proposer des solutions** : apporter un plat, cuisiner ensemble, suggérer du poisson, des œufs ou un plat végétarien.",
            "**Accepter ce qui est permis** : légumes, pâtes, poisson, desserts sans alcool ni gélatine porcine.",
            "**Pour la viande non halal**, se référer aux avis présentés dans le cours sur la viande, et privilégier le poisson ou les plats végétariens en cas de doute.",
            "**Éviter de juger** la nourriture ou les habitudes des autres : on peut refuser poliment et remercier.",
            "**Ustensiles** : la plupart des savants considèrent qu'une vaisselle lavée peut être utilisée, même si elle a servi pour du porc (d'après le hadith d'Abû Tha‘laba al-Khushanî, al-Bukhârî n°5496, Muslim n°1930).",
          ] },
          { t: 'note', tone: 'gentle', title: 'Pas de culpabilité', text: "Si un jour vous avez mangé quelque chose par erreur ou par ignorance, ce n'est pas un péché. Allah ne reproche pas l'oubli et l'erreur involontaire." },
          { t: 'verse', key: '2:286' },
        ],
      },
      {
        title: 'Les fêtes familiales',
        blocks: [
          { t: 'p', text: "Lors des fêtes (Noël, anniversaires), vous pouvez être présent, partager un moment chaleureux et un repas permis, et offrir votre bienveillance. La question de la participation aux célébrations religieuses d'autres croyances fait l'objet d'avis différents ; un imam pourra vous conseiller selon votre situation." },
          { t: 'link', to: '/questions', label: 'Voir la question détaillée dans l’espace Questions' },
        ],
      },
    ],
    quiz: [
      vf('Il est conseillé de couper les liens familiaux pour éviter les repas non halal.', false, 'Non : on garde de bonnes relations et on trouve des solutions (sourate 31, verset 15 ; sourate 60, verset 8).'),
      vf('Manger un aliment interdit par erreur ou ignorance n’est pas un péché.', true, 'Allah ne reproche pas l’erreur involontaire (sourate 2, verset 286).'),
      qcm('Quelle solution simple peut-on proposer en famille ?', ['Refuser de venir', 'Apporter un plat ou proposer du poisson', 'Critiquer le repas', 'Ne rien dire et souffrir'], 1, 'Proposer des solutions concrètes, avec gentillesse.'),
    ],
    sources: ['Coran : 2:286, 31:15, 60:8 (Quran.com)', 'Sahîh al-Bukhârî n°5496 ; Sahîh Muslim n°1930'],
  },

  {
    id: 'divergences',
    title: 'Comprendre les différences d’avis juridiques',
    level: 'intermediaire',
    category: 'halal',
    minutes: 7,
    icon: 'graduation',
    arabic: 'الاختلاف',
    summary: "Pourquoi les savants ne sont pas toujours d'accord, et comment vivre ces différences sereinement.",
    sections: [
      {
        title: 'Pourquoi des divergences ?',
        blocks: [
          { t: 'p', text: "Sur les fondements (l'unicité d'Allah, les cinq prières, l'interdiction du porc…), les savants sont d'accord. Sur certains **détails**, ils peuvent diverger, pour plusieurs raisons :" },
          { t: 'list', items: ['Un hadith est parvenu à un savant mais pas à un autre.', 'Ils n’évaluent pas de la même façon l’authenticité d’un hadith.', 'Un mot arabe peut avoir plusieurs sens.', 'Les situations nouvelles (industrie, médecine) demandent un raisonnement (ijtihâd).'] },
        ],
      },
      {
        title: 'Une richesse, pas un problème',
        blocks: [
          { t: 'p', text: "Les quatre grandes écoles sunnites (hanafite, malikite, chaféite, hanbalite) se respectent mutuellement. Un débutant peut suivre l'avis d'un savant ou d'une école de confiance, sans juger ceux qui suivent un autre avis reconnu." },
          { t: 'note', tone: 'tip', title: 'Comment faire concrètement ?', text: "Suivez l'avis de l'imam de votre mosquée ou de l'école la plus répandue dans votre région. Pour une situation personnelle, posez votre question directement à une personne qualifiée." },
          { t: 'link', to: '/cours/ecoles-juridiques', label: 'Découvrir les écoles juridiques (niveau avancé)' },
        ],
      },
    ],
    quiz: [
      vf('Les savants divergent sur l’obligation des cinq prières.', false, 'Non : les fondements font l’objet d’un consensus ; les divergences portent sur des détails.'),
      qcm('Combien y a-t-il de grandes écoles juridiques sunnites ?', ['Deux', 'Trois', 'Quatre', 'Sept'], 2, 'Hanafite, malikite, chaféite et hanbalite.'),
    ],
    sources: ['Synthèse des principes de la science du fiqh'],
  },
]
