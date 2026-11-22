import { type Lesson, vf, qcm, memo } from '../types'

export const lessonsDebutant: Lesson[] = [
  {
    id: 'decouvrir-islam',
    title: "Qu'est-ce que l'islam ?",
    level: 'debutant',
    category: 'decouvrir',
    minutes: 8,
    icon: 'compass',
    arabic: 'الإسلام',
    summary: "Le sens du mot « islam », ce que croient les musulmans et comment avancer sans se presser.",
    sections: [
      {
        title: 'Le sens du mot « islam »',
        blocks: [
          { t: 'p', text: "Le mot arabe **islâm** vient d'une racine qui exprime à la fois la **soumission** et la **paix** (*salâm*). L'islam, c'est se remettre volontairement à Dieu — appelé **Allah** en arabe — en confiance et en paix." },
          { t: 'p', text: "Celui ou celle qui suit l'islam est appelé **musulman** (*muslim*, au féminin *muslima*), c'est-à-dire « celui qui se remet à Dieu »." },
          { t: 'note', tone: 'info', title: 'Allah, un nom et non un « autre dieu »', text: "« Allah » est simplement le mot arabe pour Dieu. Les chrétiens arabophones l'utilisent aussi. Pour les musulmans, c'est le Dieu unique, Créateur de toute chose." },
        ],
      },
      {
        title: 'Le cœur de la foi : un Dieu unique',
        blocks: [
          { t: 'p', text: "Le message central de l'islam est le **tawhîd** : l'unicité de Dieu. Allah est unique, Il n'a ni associé, ni enfant, ni égal. Rien ne Lui ressemble." },
          { t: 'verse', key: '112:1-4', intro: 'La sourate Al-Ikhlâs (« le culte pur ») résume cette croyance :' },
          { t: 'p', text: "Les musulmans croient que Dieu a envoyé des **prophètes** à l'humanité — Adam, Noé, Abraham, Moïse, Jésus et d'autres — et que le dernier d'entre eux est **Muhammad** ﷺ, qui a reçu le **Coran**." },
        ],
      },
      {
        title: 'Islam, îmân et ihsân : trois niveaux',
        blocks: [
          { t: 'p', text: "Un célèbre hadith (parole rapportée du Prophète ﷺ), appelé « hadith de Jibrîl », présente la religion en trois niveaux :" },
          { t: 'list', items: [
            "**L'islam** : les actes visibles — les cinq piliers (attestation de foi, prière, aumône, jeûne, pèlerinage).",
            "**L'îmân** (la foi) : ce que l'on croit dans son cœur — les six piliers de la foi.",
            "**L'ihsân** (l'excellence) : « adorer Allah comme si tu Le voyais ; car si tu ne Le vois pas, Lui te voit ».",
          ] },
          { t: 'hadith', text: "L'ange Jibrîl (Gabriel), apparu sous la forme d'un homme, interrogea le Prophète ﷺ sur l'islam, la foi, l'excellence et l'Heure. Le Prophète ﷺ expliqua ensuite : « C'était Jibrîl, venu vous enseigner votre religion. »", ref: 'Rapporté par Muslim (n°8), d’après ‘Umar ibn al-Khattâb' },
        ],
      },
      {
        title: 'Les sources de l’islam',
        blocks: [
          { t: 'list', items: [
            "**Le Coran** : la Parole d'Allah, révélée en arabe au Prophète ﷺ sur environ 23 ans.",
            "**La Sunna** : l'enseignement et l'exemple du Prophète ﷺ (ses paroles, ses actes, ses approbations), transmis par les **hadiths**.",
          ] },
          { t: 'p', text: "Les savants ont ensuite expliqué ces sources : c'est ce qu'on appelle le **fiqh** (la compréhension des règles pratiques). Vous découvrirez cela progressivement dans le niveau avancé." },
        ],
      },
      {
        title: 'Avancer à son rythme',
        blocks: [
          { t: 'p', text: "On ne devient pas savant en un jour, et personne ne vous le demande. L'islam encourage la facilité et la progression." },
          { t: 'verse', key: '2:286', intro: 'Allah dit dans le Coran :' },
          { t: 'hadith', text: "« Facilitez, ne rendez pas les choses difficiles ; annoncez de bonnes nouvelles, ne faites pas fuir. »", ref: 'Rapporté par al-Bukhârî (n°69) et Muslim (n°1734)' },
          { t: 'note', tone: 'gentle', text: "Chaque petit pas compte : apprendre une lettre, une formule, une sourate courte. Ce site sauvegarde vos progrès pour que vous puissiez reprendre là où vous en étiez, sans pression." },
        ],
      },
    ],
    quiz: [
      qcm('Que signifie le mot « islam » ?', ['Guerre sainte', 'Soumission à Dieu, dans la paix', 'Tradition arabe', 'Prière'], 1, "Islam vient d'une racine qui exprime la soumission volontaire à Dieu et la paix (salâm)."),
      vf('« Allah » est le mot arabe qui désigne Dieu.', true, "Oui : c'est le mot arabe pour Dieu, utilisé aussi par les chrétiens arabophones."),
      qcm('Comment s’appelle la croyance en l’unicité de Dieu ?', ['Le tawhîd', 'La zakât', 'Le hajj', 'La sîra'], 0, "Le tawhîd est l'unicité d'Allah : le cœur du message de l'islam."),
      qcm('Quels sont les trois niveaux de la religion dans le hadith de Jibrîl ?', ['Coran, Sunna, fiqh', 'Islam, îmân, ihsân', 'Prière, jeûne, aumône', 'Mecque, Médine, Jérusalem'], 1, "Le hadith de Jibrîl (Muslim n°8) présente l'islam, l'îmân et l'ihsân."),
      vf('Le Coran demande au croyant de porter plus qu’il ne peut supporter.', false, "Au contraire : « Allah n'impose à aucune âme une charge supérieure à sa capacité » (sourate 2, verset 286)."),
    ],
    sources: ['Coran : sourates 2 et 112 (texte et traduction chargés depuis Quran.com)', 'Sahîh Muslim n°8 ; Sahîh al-Bukhârî n°69'],
  },

  {
    id: 'shahada',
    title: 'Comprendre la shahada',
    level: 'debutant',
    category: 'piliers',
    minutes: 9,
    icon: 'sparkle',
    arabic: 'الشهادة',
    summary: "L'attestation de foi : ses mots, son sens, ses conditions et comment on la prononce.",
    sections: [
      {
        title: 'Les mots de la shahada',
        blocks: [
          { t: 'p', text: "La **shahada** (« témoignage ») est le premier pilier de l'islam. C'est la phrase par laquelle on atteste sa foi :" },
          { t: 'arabic', ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', tr: 'Ash-hadu an lâ ilâha illa-llâh, wa ash-hadu anna Muhammadan rasûlu-llâh', fr: "J'atteste qu'il n'y a de divinité [digne d'être adorée] qu'Allah, et j'atteste que Muhammad est le Messager d'Allah." },
        ],
      },
      {
        title: 'Première partie : « lâ ilâha illa-llâh »',
        blocks: [
          { t: 'p', text: "Cette phrase contient une **négation** et une **affirmation** :" },
          { t: 'list', items: [
            "**Lâ ilâha** — « il n'y a pas de divinité » : on rejette toute adoration adressée à autre que Dieu (idoles, personnes, argent divinisé…).",
            "**illa-llâh** — « sauf Allah » : on réserve l'adoration à Allah seul.",
          ] },
          { t: 'verse', key: '47:19', intro: 'Le Coran demande de connaître ce sens :' },
        ],
      },
      {
        title: 'Seconde partie : « Muhammad rasûlu-llâh »',
        blocks: [
          { t: 'p', text: "Attester que Muhammad ﷺ est le Messager d'Allah, c'est croire qu'il a transmis fidèlement le message, suivre son exemple, croire ce qu'il a annoncé et adorer Allah de la manière qu'il a enseignée." },
          { t: 'verse', key: '33:40', intro: 'Il est le dernier des prophètes :' },
          { t: 'note', tone: 'info', title: 'Le symbole ﷺ', text: "Après le nom du Prophète, les musulmans disent « sallâ-llâhu ‘alayhi wa sallam » : « qu'Allah prie sur lui et le salue ». Le symbole ﷺ en est l'abréviation." },
        ],
      },
      {
        title: 'Les conditions de la shahada',
        blocks: [
          { t: 'p', text: "Les savants expliquent que la shahada n'est pas une formule magique : elle doit être accompagnée de conditions dans le cœur. Ils en citent généralement sept (certains en ajoutent une huitième) :" },
          { t: 'list', ordered: true, items: [
            "**La connaissance** de son sens.",
            "**La certitude**, sans doute.",
            "**L'acceptation** de ce qu'elle implique.",
            "**La soumission** (mettre en pratique progressivement).",
            "**La sincérité** (pour Allah, pas pour plaire aux gens).",
            "**La véracité** (le cœur confirme ce que dit la langue).",
            "**L'amour** d'Allah, de Son Messager et de ce message.",
          ] },
          { t: 'note', tone: 'gentle', text: "Ces conditions ne demandent pas d'être parfait. Elles décrivent une foi sincère qui grandit. Personne ne connaît tout le jour où il prononce la shahada." },
        ],
      },
      {
        title: 'Comment devient-on musulman ?',
        blocks: [
          { t: 'p', text: "Pour entrer en islam, il suffit de prononcer la shahada **avec conviction**. Aucun baptême, aucun certificat et aucun intermédiaire ne sont exigés par la religion." },
          { t: 'list', items: [
            "Il est recommandé de la prononcer devant des témoins (par exemple à la mosquée), notamment pour faciliter certaines démarches (mariage, pèlerinage), mais ce n'est pas une condition de validité de la foi.",
            "Il est enseigné de faire ensuite un **ghusl** (grande ablution, voir la rubrique Ablutions). Les savants divergent : obligatoire pour certains (école hanbalite notamment), recommandé pour d'autres.",
            "On commence ensuite à apprendre la prière, pas à pas.",
          ] },
          { t: 'hadith', text: "Qays ibn ‘Âsim raconte qu'en embrassant l'islam, le Prophète ﷺ lui ordonna de se laver avec de l'eau et des feuilles de jujubier.", ref: 'Rapporté par Abû Dâwûd (n°355) et at-Tirmidhî (n°605), qui l’a jugé bon (hasan)' },
          { t: 'verse', key: '2:256', intro: 'La foi ne peut être imposée :' },
        ],
      },
    ],
    quiz: [
      memo('Complétez : « Ash-hadu an lâ ilâha illa-… »', ['llâh', 'Muhammad', 'rasûl', 'islâm'], 0, '« Ash-hadu an lâ ilâha illa-llâh » : j’atteste qu’il n’y a de divinité qu’Allah.'),
      qcm('Que signifie « rasûl » ?', ['Ange', 'Messager', 'Livre', 'Prière'], 1, 'Rasûl signifie messager : Muhammad ﷺ est le Messager d’Allah.'),
      vf('Il faut obligatoirement un certificat officiel pour devenir musulman.', false, "Non : la shahada prononcée avec conviction suffit. Les témoins sont recommandés, sans être une condition de la foi."),
      qcm('Combien de parties contient la shahada ?', ['Une', 'Deux', 'Trois', 'Cinq'], 1, "Deux : l'unicité d'Allah et le fait que Muhammad ﷺ est Son Messager."),
      vf('La sincérité fait partie des conditions de la shahada.', true, "Oui, la sincérité (ikhlâs) est l'une des conditions enseignées par les savants."),
    ],
    sources: ['Coran : 2:256, 33:40, 47:19 (Quran.com)', 'Sunan Abî Dâwûd n°355 ; Jâmi‘ at-Tirmidhî n°605'],
  },

  {
    id: 'piliers-intro',
    title: "Les cinq piliers de l'islam",
    level: 'debutant',
    category: 'piliers',
    minutes: 6,
    icon: 'columns',
    arabic: 'أركان الإسلام',
    summary: "Vue d'ensemble des cinq actes fondamentaux qui structurent la vie du musulman.",
    sections: [
      {
        title: "Une maison bâtie sur cinq piliers",
        blocks: [
          { t: 'p', text: "Le Prophète ﷺ a comparé l'islam à un édifice reposant sur cinq piliers. Ce sont les actes de base que tout musulman cherche à accomplir." },
          { t: 'hadith', text: "« L'islam est bâti sur cinq : l'attestation qu'il n'y a de divinité qu'Allah et que Muhammad est le Messager d'Allah, l'accomplissement de la prière, l'acquittement de la zakât, le pèlerinage à la Maison et le jeûne du Ramadan. »", ref: 'Rapporté par al-Bukhârî (n°8) et Muslim (n°16), d’après Ibn ‘Umar' },
        ],
      },
      {
        title: 'Les cinq piliers en un coup d’œil',
        blocks: [
          { t: 'table', head: ['Pilier', 'En arabe', 'En résumé'], rows: [
            ['1. L’attestation de foi', 'Shahâda', 'Croire et dire qu’il n’y a de divinité qu’Allah et que Muhammad ﷺ est Son Messager.'],
            ['2. La prière', 'Salât', 'Cinq prières par jour, à des moments précis.'],
            ['3. L’aumône obligatoire', 'Zakât', 'Donner chaque année une petite part de ses biens (2,5 %) si l’on dépasse un seuil.'],
            ['4. Le jeûne du Ramadan', 'Siyâm / Sawm', 'S’abstenir de manger, boire et de relations intimes de l’aube au coucher du soleil pendant le mois de Ramadan.'],
            ['5. Le pèlerinage', 'Hajj', 'Se rendre à La Mecque une fois dans sa vie, si on en a la capacité physique et financière.'],
          ] },
          { t: 'note', tone: 'tip', title: 'Par où commencer ?', text: "Après la shahada, la priorité est la **prière**. Commencez par les ablutions, puis apprenez la prière étape par étape avec le mode « Je découvre la prière »." },
          { t: 'link', to: '/priere', label: 'Apprendre la prière', text: 'Le guide pas à pas, avec les gestes et les paroles.' },
        ],
      },
      {
        title: 'Chaque pilier en détail',
        blocks: [
          { t: 'p', text: "Chaque pilier a son propre cours dans cette rubrique : son sens, son importance, ses conditions et sa façon de faire." },
          { t: 'link', to: '/cours/shahada', label: 'La shahada' },
          { t: 'link', to: '/cours/pilier-salat', label: 'La prière (salât)' },
          { t: 'link', to: '/cours/pilier-zakat', label: 'L’aumône (zakât)' },
          { t: 'link', to: '/cours/pilier-siyam', label: 'Le jeûne du Ramadan' },
          { t: 'link', to: '/cours/pilier-hajj', label: 'Le pèlerinage (hajj)' },
        ],
      },
    ],
    quiz: [
      qcm('Combien y a-t-il de piliers de l’islam ?', ['Trois', 'Cinq', 'Six', 'Sept'], 1, 'Il y a cinq piliers de l’islam (al-Bukhârî n°8, Muslim n°16).'),
      qcm('Quel pilier se fait cinq fois par jour ?', ['La zakât', 'Le hajj', 'La salât', 'Le jeûne'], 2, 'La salât (prière) est accomplie cinq fois par jour.'),
      vf('Le pèlerinage est obligatoire chaque année.', false, 'Il est obligatoire une fois dans la vie, pour celui qui en a la capacité.'),
      qcm('Que signifie « zakât » ?', ['Le jeûne', 'L’aumône obligatoire', 'Le pèlerinage', 'L’ablution'], 1, 'La zakât est l’aumône obligatoire, qui purifie les biens.'),
    ],
    sources: ['Sahîh al-Bukhârî n°8 ; Sahîh Muslim n°16'],
  },

  {
    id: 'pilier-salat',
    title: 'Le pilier de la prière (salât)',
    level: 'debutant',
    category: 'piliers',
    minutes: 8,
    icon: 'prayer',
    arabic: 'الصلاة',
    summary: "Pourquoi les musulmans prient, l'importance de la prière et ses grandes lignes.",
    sections: [
      {
        title: 'Un lien direct avec Allah',
        blocks: [
          { t: 'p', text: "La **salât** est la prière rituelle : un moment de rencontre avec Allah, cinq fois par jour. On s'y tient debout, on s'incline, on se prosterne, on récite le Coran et on invoque." },
          { t: 'verse', key: '20:14', intro: 'Allah dit à Moïse :' },
          { t: 'p', text: "La prière rythme la journée et rappelle régulièrement au croyant l'essentiel. Elle apaise, elle purifie et elle éloigne des mauvaises actions." },
          { t: 'verse', key: '29:45' },
        ],
      },
      {
        title: 'Son importance',
        blocks: [
          { t: 'list', items: [
            "C'est le **deuxième pilier** de l'islam et le premier acte d'adoration après la shahada.",
            "Elle a été prescrite directement lors du voyage nocturne du Prophète ﷺ (al-Isrâ' wal-Mi‘râj).",
            "Elle est prescrite à des **heures déterminées**.",
          ] },
          { t: 'verse', key: '4:103' },
          { t: 'hadith', text: "« Priez comme vous m'avez vu prier. »", ref: 'Rapporté par al-Bukhârî (n°631), d’après Mâlik ibn al-Huwayrith' },
        ],
      },
      {
        title: 'Qui doit prier ?',
        blocks: [
          { t: 'p', text: "La prière est obligatoire pour tout musulman **pubère** et **sain d'esprit**. Elle n'est pas due par la femme pendant ses règles ou ses lochies (saignements après l'accouchement), et elle n'a pas à rattraper ces prières." },
          { t: 'p', text: "Le malade prie selon sa capacité : debout, sinon assis, sinon allongé. La prière s'adapte, mais elle reste." },
          { t: 'hadith', text: "« Prie debout ; si tu ne peux pas, alors assis ; et si tu ne peux pas, alors sur le côté. »", ref: 'Rapporté par al-Bukhârî (n°1117), d’après ‘Imrân ibn Husayn' },
        ],
      },
      {
        title: 'Pour aller plus loin',
        blocks: [
          { t: 'p', text: "Le cours complet, avec les ablutions, les horaires, les conditions, les gestes et les paroles, se trouve dans la rubrique Prière." },
          { t: 'link', to: '/priere', label: 'Ouvrir le cours complet sur la prière' },
          { t: 'note', tone: 'gentle', text: "Si vous ne connaissez pas encore les paroles en arabe, commencez quand même : apprendre fait partie du chemin. Consultez la question « Que faire si je ne connais pas encore toutes les sourates ? » dans l'espace Questions." },
        ],
      },
    ],
    quiz: [
      qcm('Combien de prières obligatoires y a-t-il par jour ?', ['Trois', 'Quatre', 'Cinq', 'Sept'], 2, 'Il y a cinq prières obligatoires : Fajr, Dhohr, ‘Asr, Maghrib et ‘Ishâ.'),
      vf('Le malade qui ne peut pas se tenir debout peut prier assis.', true, 'Oui, d’après le hadith rapporté par al-Bukhârî (n°1117).'),
      vf('La femme doit rattraper les prières manquées pendant ses règles.', false, 'Non : la prière n’est pas due pendant les règles et ne se rattrape pas.'),
      qcm('Quelle parole du Prophète ﷺ concerne la manière de prier ?', ['« Priez comme vous m’avez vu prier »', '« La religion est facilité »', '« Les actes ne valent que par les intentions »', '« Souriez »'], 0, '« Priez comme vous m’avez vu prier » (al-Bukhârî n°631).'),
    ],
    sources: ['Coran : 4:103, 20:14, 29:45 (Quran.com)', 'Sahîh al-Bukhârî n°631 et n°1117'],
  },

  {
    id: 'pilier-zakat',
    title: "Le pilier de l'aumône (zakât)",
    level: 'debutant',
    category: 'piliers',
    minutes: 8,
    icon: 'heart',
    arabic: 'الزكاة',
    summary: "La zakât : purifier ses biens et aider les plus démunis. Seuil, taux et bénéficiaires.",
    sections: [
      {
        title: 'Purifier ses biens',
        blocks: [
          { t: 'p', text: "Le mot **zakât** évoque la **purification** et la **croissance**. C'est une part de ses biens que le musulman donne chaque année aux personnes qui y ont droit. Ce n'est pas une faveur : c'est un droit des pauvres sur la richesse." },
          { t: 'verse', key: '9:103' },
          { t: 'verse', key: '2:43', intro: 'Elle est souvent citée avec la prière :' },
        ],
      },
      {
        title: 'Qui doit la payer ?',
        blocks: [
          { t: 'p', text: "La zakât sur l'argent est due par le musulman qui possède, pendant **une année lunaire complète** (le *hawl*), un montant au moins égal au **nisâb** (seuil minimum)." },
          { t: 'list', items: [
            "**Le nisâb** : la valeur de **85 g d'or** (référence la plus utilisée aujourd'hui) ou de 595 g d'argent selon d'autres avis.",
            "**Le taux** : **2,5 %** de l'épargne concernée.",
            "Elle concerne l'épargne, l'or et l'argent, les marchandises commerciales, et selon des règles propres, les récoltes et le bétail.",
          ] },
          { t: 'note', tone: 'info', title: 'Exemple simple', text: "Si vous avez gardé 10 000 € d'économies pendant une année lunaire entière et que ce montant dépasse le nisâb, la zakât est de 10 000 × 2,5 % = 250 €." },
          { t: 'note', tone: 'scholar', text: "Les détails (bijoux portés, dettes, placements, salaires épargnés…) font l'objet de divergences entre les écoles juridiques. Pour un calcul précis, rapprochez-vous d'un imam ou d'un organisme de confiance." },
        ],
      },
      {
        title: 'À qui la donner ?',
        blocks: [
          { t: 'p', text: "Le Coran cite précisément huit catégories de bénéficiaires :" },
          { t: 'verse', key: '9:60' },
          { t: 'list', items: ['Les pauvres et les nécessiteux', 'Ceux qui la collectent', 'Ceux dont on veut rapprocher les cœurs', "L'affranchissement des captifs", 'Les personnes endettées', "Dans le sentier d'Allah", 'Le voyageur en difficulté'] },
        ],
      },
      {
        title: 'La zakât al-fitr',
        blocks: [
          { t: 'p', text: "À la fin du Ramadan, chaque musulman (y compris les enfants, payée par le responsable du foyer) donne la **zakât al-fitr** : l'équivalent d'un *sâ‘* (environ 2,5 à 3 kg) de nourriture de base. Elle doit être versée **avant la prière de l'Aïd**." },
          { t: 'hadith', text: "Le Messager d'Allah ﷺ a prescrit la zakât al-fitr : un sâ‘ de dattes ou un sâ‘ d'orge, pour chaque musulman, libre ou esclave, homme ou femme, petit ou grand, et a ordonné qu'elle soit donnée avant que les gens ne sortent pour la prière.", ref: 'Rapporté par al-Bukhârî (n°1503) et Muslim (n°984), d’après Ibn ‘Umar' },
          { t: 'note', tone: 'scholar', text: "Les écoles malikite, chaféite et hanbalite demandent de la donner en nourriture ; l'école hanafite autorise de la verser en argent. Beaucoup de mosquées annoncent un montant indicatif chaque année." },
        ],
      },
      {
        title: "L'aumône volontaire (sadaqa)",
        blocks: [
          { t: 'p', text: "En plus de la zakât, le musulman est encouragé à donner librement : c'est la **sadaqa**. Elle peut être un don, un service, ou même un sourire." },
          { t: 'hadith', text: "« Ton sourire à ton frère est une aumône. »", ref: 'Rapporté par at-Tirmidhî (n°1956), qui l’a jugé bon (hasan)' },
        ],
      },
    ],
    quiz: [
      qcm('Quel est le taux de la zakât sur l’épargne ?', ['1 %', '2,5 %', '10 %', '20 %'], 1, 'Le taux est de 2,5 % de l’épargne qui atteint le nisâb pendant une année lunaire.'),
      qcm('Que signifie « nisâb » ?', ['Le taux', 'Le seuil minimum de richesse', 'Le mois du jeûne', 'Le bénéficiaire'], 1, 'Le nisâb est le seuil minimum à partir duquel la zakât est due.'),
      vf('La zakât al-fitr se donne avant la prière de l’Aïd al-Fitr.', true, 'Oui, d’après le hadith d’Ibn ‘Umar (al-Bukhârî n°1503).'),
      qcm('Combien de catégories de bénéficiaires le Coran cite-t-il ?', ['Trois', 'Cinq', 'Huit', 'Douze'], 2, 'Huit catégories sont citées dans la sourate 9, verset 60.'),
      vf('Un sourire peut être une aumône (sadaqa).', true, 'Oui, d’après le hadith rapporté par at-Tirmidhî (n°1956).'),
    ],
    sources: ['Coran : 2:43, 9:60, 9:103 (Quran.com)', 'Sahîh al-Bukhârî n°1503 ; Sahîh Muslim n°984 ; Jâmi‘ at-Tirmidhî n°1956'],
  },

  {
    id: 'pilier-siyam',
    title: 'Le jeûne du Ramadan',
    level: 'debutant',
    category: 'piliers',
    minutes: 10,
    icon: 'moon',
    arabic: 'الصيام',
    summary: "Le sens du jeûne, ses règles, qui en est dispensé et ce qui l'annule.",
    sections: [
      {
        title: 'Un mois pour se rapprocher d’Allah',
        blocks: [
          { t: 'p', text: "Le **Ramadan** est le neuvième mois du calendrier musulman (lunaire). Pendant tout ce mois, les musulmans **jeûnent de l'aube au coucher du soleil**. C'est aussi le mois où le Coran a commencé à être révélé." },
          { t: 'verse', key: '2:183', intro: 'Le jeûne est prescrit pour atteindre la piété (taqwâ) :' },
          { t: 'verse', key: '2:185' },
        ],
      },
      {
        title: 'Ce que l’on fait concrètement',
        blocks: [
          { t: 'list', items: [
            "**L'intention** (niyya) : décider dans son cœur de jeûner. Il n'est pas nécessaire de la prononcer à voix haute.",
            "**Le suhûr** : un repas avant l'aube, fortement recommandé.",
            "**L'abstinence** : de l'aube (heure du Fajr) jusqu'au coucher du soleil (heure du Maghrib), on ne mange pas, on ne boit pas et on n'a pas de relations intimes.",
            "**L'iftâr** : on rompt le jeûne dès le coucher du soleil, traditionnellement avec des dattes ou de l'eau.",
          ] },
          { t: 'hadith', text: "« Prenez le repas de l'aube (suhûr), car il y a dans le suhûr une bénédiction. »", ref: 'Rapporté par al-Bukhârî (n°1923) et Muslim (n°1095), d’après Anas' },
          { t: 'p', text: "Le jeûne concerne aussi le comportement : éviter le mensonge, les disputes et les paroles blessantes." },
        ],
      },
      {
        title: 'Qui est dispensé ?',
        blocks: [
          { t: 'p', text: "Le jeûne est obligatoire pour le musulman pubère, sain d'esprit, en bonne santé et résident. Sont dispensés :" },
          { t: 'list', items: [
            "**Le malade** et **le voyageur** : ils rattrapent les jours plus tard.",
            "**La femme pendant ses règles ou ses lochies** : elle ne jeûne pas et rattrape les jours après le Ramadan.",
            "**La femme enceinte ou qui allaite**, si elle craint pour elle ou pour l'enfant : rattrapage (et selon certains avis, compensation en nourriture).",
            "**La personne âgée ou malade chronique** qui ne peut pas jeûner : elle nourrit un pauvre pour chaque jour (*fidya*).",
          ] },
          { t: 'verse', key: '2:184' },
          { t: 'note', tone: 'warning', title: 'Santé', text: "Si vous avez un traitement médical (diabète, etc.), demandez l'avis d'un médecin et d'un imam. L'islam ne demande pas de mettre sa santé en danger." },
        ],
      },
      {
        title: 'Ce qui annule le jeûne',
        blocks: [
          { t: 'list', items: [
            'Manger ou boire **volontairement**.',
            'Avoir des relations intimes pendant la journée (ce qui entraîne en plus une expiation, la *kaffâra*).',
            "Vomir volontairement, et l'apparition des règles ou des lochies.",
          ] },
          { t: 'hadith', text: "« Celui qui oublie qu'il jeûne et mange ou boit, qu'il complète son jeûne : c'est Allah qui l'a nourri et abreuvé. »", ref: 'Rapporté par al-Bukhârî (n°1933) et Muslim (n°1155), d’après Abû Hurayra' },
          { t: 'note', tone: 'info', text: "Se brosser les dents (sans avaler), se doucher, sentir un parfum ou avaler sa salive n'annulent pas le jeûne." },
        ],
      },
      {
        title: 'Les moments forts du mois',
        blocks: [
          { t: 'list', items: [
            "**Les prières de tarâwîh** : prières surérogatoires la nuit, souvent à la mosquée.",
            "**Laylat al-Qadr** (la Nuit du Destin) : une nuit meilleure que mille mois, à rechercher dans les dix dernières nuits.",
            "**La zakât al-fitr**, puis **l'Aïd al-Fitr**, la fête de la rupture du jeûne.",
          ] },
          { t: 'verse', key: '97:1-5' },
          { t: 'link', to: '/calendrier', label: 'Voir les dates du prochain Ramadan' },
        ],
      },
    ],
    quiz: [
      qcm('Le jeûne commence à…', ['Minuit', 'L’aube (Fajr)', 'Le lever du soleil', 'Midi'], 1, "Le jeûne commence à l'aube (heure du Fajr) et se termine au coucher du soleil."),
      vf('Manger par oubli annule le jeûne.', false, 'Non : celui qui mange par oubli complète son jeûne (al-Bukhârî n°1933, Muslim n°1155).'),
      qcm('Comment s’appelle le repas avant l’aube ?', ['Iftâr', 'Suhûr', 'Tarâwîh', 'Fidya'], 1, 'Le suhûr est le repas pris avant l’aube ; il est béni.'),
      vf('Le voyageur peut ne pas jeûner et rattraper plus tard.', true, 'Oui, d’après la sourate 2, verset 184.'),
      qcm('Quel mois du calendrier hégirien est le Ramadan ?', ['Le 1er', 'Le 7e', 'Le 9e', 'Le 12e'], 2, 'Ramadan est le 9e mois du calendrier hégirien.'),
    ],
    sources: ['Coran : 2:183-185, 97 (Quran.com)', 'Sahîh al-Bukhârî n°1923, 1933 ; Sahîh Muslim n°1095, 1155'],
  },

  {
    id: 'pilier-hajj',
    title: 'Le pèlerinage à La Mecque (hajj)',
    level: 'debutant',
    category: 'piliers',
    minutes: 9,
    icon: 'mosque',
    arabic: 'الحج',
    summary: "Le hajj : qui doit le faire, ses grandes étapes et la différence avec la ‘umra.",
    sections: [
      {
        title: 'Un voyage une fois dans la vie',
        blocks: [
          { t: 'p', text: "Le **hajj** est le pèlerinage à La Mecque, en Arabie saoudite, qui a lieu chaque année pendant le mois de **Dhou al-Hijja** (12e mois). Il est obligatoire **une fois dans la vie** pour le musulman adulte qui en a la **capacité** physique et financière." },
          { t: 'verse', key: '3:97' },
          { t: 'p', text: "Il rappelle l'histoire du prophète **Ibrâhîm** (Abraham), de son épouse **Hâjar** et de leur fils **Ismâ‘îl**, et rassemble des millions de musulmans de toutes origines, habillés simplement, égaux devant Allah." },
        ],
      },
      {
        title: 'Les grandes étapes',
        blocks: [
          { t: 'list', ordered: true, items: [
            "**L'ihrâm** : l'état de sacralisation. On formule l'intention et on porte une tenue simple (deux pièces de tissu blanc non cousues pour les hommes).",
            "**Le tawâf** : faire sept tours autour de la **Ka‘ba**.",
            "**Le sa‘y** : sept parcours entre les collines de Safâ et Marwa, en souvenir de Hâjar cherchant de l'eau.",
            "**Mina** (8 Dhou al-Hijja) : séjour et prières.",
            "**‘Arafat** (9 Dhou al-Hijja) : le moment le plus important ; on invoque Allah jusqu'au coucher du soleil.",
            "**Muzdalifa** : nuit à la belle étoile.",
            "**La lapidation** des stèles à Mina, **le sacrifice**, puis le rasage ou la coupe des cheveux (10 Dhou al-Hijja, jour de l'Aïd al-Adha).",
            "**Le tawâf al-ifâda**, puis les derniers jours à Mina et le tawâf d'adieu.",
          ] },
          { t: 'hadith', text: "« Le hajj, c'est ‘Arafat. »", ref: 'Rapporté par at-Tirmidhî (n°889), an-Nasâ’î (n°3016) et Ibn Mâja (n°3015)' },
        ],
      },
      {
        title: 'La ‘umra, le « petit pèlerinage »',
        blocks: [
          { t: 'p', text: "La **‘umra** peut être accomplie à tout moment de l'année. Elle comprend l'ihrâm, le tawâf, le sa‘y et le rasage ou la coupe des cheveux. Elle est très recommandée (obligatoire une fois selon certains savants), mais ne remplace pas le hajj." },
        ],
      },
      {
        title: 'Si l’on ne peut pas y aller',
        blocks: [
          { t: 'p', text: "Celui qui n'a pas les moyens n'est pas concerné par l'obligation. Il peut vivre ces jours bénis chez lui : les **dix premiers jours de Dhou al-Hijja** sont parmi les meilleurs de l'année, et le **jeûne du jour de ‘Arafat** est fortement recommandé pour ceux qui ne font pas le hajj." },
          { t: 'hadith', text: "Interrogé sur le jeûne du jour de ‘Arafat, le Prophète ﷺ répondit : « Il expie l'année passée et l'année à venir. »", ref: 'Rapporté par Muslim (n°1162), d’après Abû Qatâda' },
          { t: 'link', to: '/calendrier', label: 'Voir le calendrier des jours importants' },
        ],
      },
    ],
    quiz: [
      vf('Le hajj est obligatoire pour tous, même sans moyens.', false, 'Il est obligatoire une fois dans la vie pour celui qui en a la capacité (sourate 3, verset 97).'),
      qcm('Quel est le moment le plus important du hajj ?', ['Le tawâf', 'La station à ‘Arafat', 'Le sa‘y', 'Le rasage'], 1, '« Le hajj, c’est ‘Arafat » (at-Tirmidhî n°889).'),
      qcm('Combien de tours fait-on autour de la Ka‘ba lors du tawâf ?', ['Trois', 'Cinq', 'Sept', 'Neuf'], 2, 'Le tawâf comporte sept tours.'),
      qcm('Pendant quel mois a lieu le hajj ?', ['Ramadan', 'Mouharram', 'Dhou al-Hijja', 'Rajab'], 2, 'Le hajj a lieu pendant le mois de Dhou al-Hijja.'),
      vf('La ‘umra peut être accomplie à n’importe quel moment de l’année.', true, 'Oui, contrairement au hajj qui a des dates fixes.'),
    ],
    sources: ['Coran : 3:97 (Quran.com)', 'Jâmi‘ at-Tirmidhî n°889 ; Sahîh Muslim n°1162'],
  },

  {
    id: 'iman-six-piliers',
    title: 'Les six piliers de la foi (îmân)',
    level: 'debutant',
    category: 'foi',
    minutes: 8,
    icon: 'star',
    arabic: 'أركان الإيمان',
    summary: "Ce que croit le musulman dans son cœur : Allah, les anges, les livres, les prophètes, le Jour dernier et le destin.",
    sections: [
      {
        title: 'Croire avec le cœur',
        blocks: [
          { t: 'p', text: "Si les cinq piliers de l'islam sont des **actes**, les six piliers de la foi sont des **croyances**. Ils sont cités dans le hadith de Jibrîl." },
          { t: 'hadith', text: "Jibrîl demanda : « Informe-moi sur la foi (îmân). » Le Prophète ﷺ répondit : « C'est que tu croies en Allah, en Ses anges, en Ses livres, en Ses messagers, au Jour dernier, et que tu croies au destin, dans son bien comme dans son mal. »", ref: 'Rapporté par Muslim (n°8)' },
          { t: 'verse', key: '2:285', intro: 'Le Coran les mentionne également :' },
        ],
      },
      {
        title: 'Les six piliers',
        blocks: [
          { t: 'table', head: ['Pilier', 'Ce que cela signifie'], rows: [
            ['1. Allah', 'Croire en Son existence, Son unicité, Ses noms et attributs.'],
            ['2. Les anges', 'Des créatures de lumière qui obéissent à Allah (Jibrîl, Mîkâ’îl…).'],
            ['3. Les livres', 'La Torah, les Psaumes, l’Évangile (dans leur version originelle), les Feuillets et le Coran.'],
            ['4. Les messagers', 'Des hommes choisis pour transmettre le message, d’Adam à Muhammad ﷺ.'],
            ['5. Le Jour dernier', 'La résurrection, le jugement, le Paradis et l’Enfer.'],
            ['6. Le destin (qadar)', 'Allah sait et a décrété toute chose ; l’humain reste responsable de ses choix.'],
          ] },
          { t: 'p', text: "Chacun de ces piliers a son propre cours dans la rubrique **Bases de l'islam**." },
          { t: 'link', to: '/bases', label: "Ouvrir les cours sur les bases de la foi" },
        ],
      },
      {
        title: 'La foi augmente et diminue',
        blocks: [
          { t: 'p', text: "Pour la majorité des savants, la foi **augmente** par les bonnes actions et le rappel d'Allah, et **diminue** par les péchés et l'oubli. C'est normal d'avoir des hauts et des bas : l'important est de revenir." },
          { t: 'verse', key: '8:2' },
          { t: 'note', tone: 'gentle', text: "Les doutes et les questions font partie du chemin de beaucoup de croyants. N'hésitez pas à les poser à une personne de confiance et savante." },
        ],
      },
    ],
    quiz: [
      qcm('Combien y a-t-il de piliers de la foi ?', ['Quatre', 'Cinq', 'Six', 'Sept'], 2, 'Il y a six piliers de la foi (Muslim n°8).'),
      qcm('Lequel de ces éléments est un pilier de la foi ?', ['Le jeûne', 'Les anges', 'La zakât', 'Le hajj'], 1, 'La croyance aux anges est un pilier de la foi ; les autres sont des piliers de l’islam.'),
      vf('Croire au destin signifie que l’humain n’est responsable de rien.', false, 'Non : Allah sait et décrète tout, mais l’humain reste responsable de ses choix.'),
      memo('Complétez : la foi, c’est croire en Allah, Ses anges, Ses livres, Ses messagers, au Jour dernier et au…', ['destin', 'jeûne', 'pèlerinage', 'prière'], 0, 'Le sixième pilier est la croyance au destin (qadar).'),
    ],
    sources: ['Sahîh Muslim n°8', 'Coran : 2:285, 8:2 (Quran.com)'],
  },
]
