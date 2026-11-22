import type { Block } from './types'
import { qcm, vf, type QuizQ } from './types'

export type WuduPart = 'coeur' | 'bismillah' | 'mains' | 'bouche' | 'nez' | 'visage' | 'bras' | 'tete' | 'oreilles' | 'pieds'

export interface WuduStep {
  id: WuduPart
  title: string
  times: string
  status: 'obligatoire' | 'recommandé' | 'divergence'
  how: string[]
  ref?: string
}

export const WUDU_STEPS: WuduStep[] = [
  { id: 'coeur', title: "L'intention", times: 'Dans le cœur', status: 'divergence', how: ["Avant de commencer, ayez l'intention de faire les ablutions pour vous purifier et pouvoir prier.", "Elle se fait dans le cœur, sans formule à prononcer."], ref: 'al-Bukhârî n°1 ; obligatoire pour les malikites, chaféites et hanbalites, recommandée pour les hanafites' },
  { id: 'bismillah', title: 'Dire « Bismillâh »', times: '1 fois', status: 'divergence', how: ['Dites « Bismillâh » (au nom d’Allah) au début des ablutions.', 'Évitez de le prononcer à l’intérieur des toilettes ; dites-le dans votre cœur si vous y êtes.'], ref: 'Abû Dâwûd n°101, at-Tirmidhî n°25 — recommandé pour la majorité, obligatoire selon un avis hanbalite' },
  { id: 'mains', title: 'Laver les mains', times: '3 fois', status: 'recommandé', how: ["Lavez vos deux mains jusqu'aux poignets, en passant l'eau entre les doigts.", 'Commencez par la main droite.'], ref: 'Hadith de ‘Uthmân : al-Bukhârî n°159, Muslim n°226' },
  { id: 'bouche', title: 'Rincer la bouche', times: '3 fois', status: 'divergence', how: ["Prenez de l'eau dans la main droite, mettez-la dans la bouche, faites-la tourner puis recrachez."], ref: 'al-Bukhârî n°159 — recommandé pour la majorité, obligatoire pour les hanbalites' },
  { id: 'nez', title: 'Rincer le nez', times: '3 fois', status: 'divergence', how: ["Aspirez légèrement de l'eau par le nez avec la main droite (istinshâq), puis rejetez-la en vous aidant de la main gauche (istinthâr).", "Souvent, on rince la bouche et le nez avec la même poignée d'eau."], ref: 'al-Bukhârî n°159 ; Muslim n°235' },
  { id: 'visage', title: 'Laver le visage', times: '3 fois', status: 'obligatoire', how: ["Lavez tout le visage : du haut du front (naissance des cheveux) jusqu'au menton, et d'une oreille à l'autre.", "Les hommes qui ont une barbe épaisse passent les doigts mouillés à travers."], ref: 'Coran, sourate 5, verset 6' },
  { id: 'bras', title: 'Laver les bras', times: '3 fois chacun', status: 'obligatoire', how: ["Lavez le bras droit des doigts jusqu'au coude **inclus**, puis le bras gauche.", 'Retirez ou faites bouger bagues et montres pour que l’eau passe dessous.'], ref: 'Coran, sourate 5, verset 6' },
  { id: 'tete', title: 'Essuyer la tête', times: '1 fois', status: 'obligatoire', how: ["Mouillez vos mains, puis passez-les sur la tête, de l'avant vers la nuque, puis ramenez-les vers l'avant.", "On ne lave pas la tête : on l'essuie avec les mains mouillées."], ref: 'Coran, sourate 5, verset 6 ; al-Bukhârî n°185 (‘Abdullâh ibn Zayd)' },
  { id: 'oreilles', title: 'Essuyer les oreilles', times: '1 fois', status: 'recommandé', how: ["Avec les mêmes mains mouillées, passez les index à l'intérieur des oreilles et les pouces derrière les oreilles."], ref: 'an-Nasâ’î n°102 (Ibn ‘Abbâs)' },
  { id: 'pieds', title: 'Laver les pieds', times: '3 fois chacun', status: 'obligatoire', how: ["Lavez le pied droit jusqu'à la cheville **incluse**, en passant l'eau entre les orteils, puis le pied gauche.", 'N’oubliez pas les talons !'], ref: 'Coran, sourate 5, verset 6 ; « Malheur aux talons [négligés] à cause du Feu » : al-Bukhârî n°60, Muslim n°241' },
]

export const WUDU_DUA_AFTER = {
  ar: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
  tr: 'Ash-hadu an lâ ilâha illa-llâhu wahdahu lâ sharîka lah, wa ash-hadu anna Muhammadan ‘abduhu wa rasûluh',
  fr: "J'atteste qu'il n'y a de divinité qu'Allah, Seul, sans associé, et j'atteste que Muhammad est Son serviteur et Son messager.",
  ref: 'Rapporté par Muslim (n°234), d’après ‘Umar : les huit portes du Paradis sont ouvertes à celui qui la dit après des ablutions bien faites',
}

export const WUDU_DUA_AFTER_2 = {
  ar: 'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
  tr: 'Allâhumma-j‘alnî mina-t-tawwâbîn, wa-j‘alnî mina-l-mutatahhirîn',
  fr: 'Ô Allah, fais de moi l’un de ceux qui se repentent et l’un de ceux qui se purifient.',
  ref: 'Ajout rapporté par at-Tirmidhî (n°55)',
}

export const WUDU_SECTIONS: { id: string; title: string; icon: string; blocks: Block[] }[] = [
  {
    id: 'quand',
    title: 'Quand faire les ablutions ?',
    icon: 'clock',
    blocks: [
      { t: 'p', text: "Les ablutions (**woudou**) sont une purification avec de l'eau sur certaines parties du corps. Elles sont **obligatoires** pour :" },
      { t: 'list', items: ['Prier (toute prière, obligatoire ou surérogatoire).', 'Faire le tawâf autour de la Ka‘ba.', 'Toucher le mushaf (le Coran en arabe), selon la majorité des savants.'] },
      { t: 'p', text: "Elles sont **recommandées** avant de dormir, pour lire le Coran de mémoire, pour invoquer Allah, et à tout moment : le Prophète ﷺ aimait rester en état de pureté." },
      { t: 'verse', key: '5:6' },
      { t: 'hadith', text: "« La purification est la moitié de la foi. »", ref: 'Rapporté par Muslim (n°223), d’après Abû Mâlik al-Ash‘arî' },
    ],
  },
  {
    id: 'conditions',
    title: 'Les conditions nécessaires',
    icon: 'checkCircle',
    blocks: [
      { t: 'list', items: [
        "**De l'eau pure** (eau du robinet, de pluie, de source, de mer…). Une eau dont la couleur, l'odeur ou le goût a changé à cause d'une impureté ne convient pas.",
        "**Que l'eau atteigne la peau** : retirer ce qui l'empêche (vernis à ongles classique, colle, peinture épaisse). Le henné et l'encre légère qui ne forment pas de couche ne posent pas de problème.",
        "**Avoir fini** d'aller aux toilettes et s'être nettoyé (istinjâ’).",
        "**L'intention**, selon la majorité des savants.",
      ] },
      { t: 'note', tone: 'scholar', title: 'Ordre et continuité', text: "Respecter **l'ordre** des parties obligatoires est obligatoire pour les chaféites et les hanbalites. Enchaîner les étapes **sans longue interruption** (muwâlât) est obligatoire pour les malikites et les hanbalites. Faire les deux est donc la façon la plus sûre." },
    ],
  },
  {
    id: 'annule',
    title: 'Ce qui annule les ablutions',
    icon: 'alert',
    blocks: [
      { t: 'h', text: 'Ce qui les annule selon tous les savants' },
      { t: 'list', items: ["Ce qui sort des voies naturelles : urine, selles, gaz, liquide pré-séminal…", "La perte de conscience : évanouissement, ivresse, anesthésie.", "Le sommeil profond (pour la majorité ; une petite somnolence assise ne les annule pas)."] },
      { t: 'hadith', text: "À propos de celui qui doute d'avoir perdu ses ablutions pendant la prière : « Qu'il ne parte pas tant qu'il n'a pas entendu un son ou senti une odeur. »", ref: 'Rapporté par al-Bukhârî (n°137) et Muslim (n°361) — le doute ne remet pas en cause la certitude' },
      { t: 'h', text: 'Ce qui fait l’objet de divergences' },
      { t: 'table', head: ['Situation', 'Avis'], rows: [
        ['Toucher directement ses parties intimes', 'Annule pour les chaféites et hanbalites (hadith de Busra, Abû Dâwûd n°181) ; n’annule pas pour les hanafites (hadith de Talq, Abû Dâwûd n°182) ; les malikites posent des conditions.'],
        ['Toucher une personne du sexe opposé', 'Annule pour les chaféites (contact direct de peau avec un non-mahram) ; annule seulement avec désir pour les malikites et hanbalites ; n’annule pas pour les hanafites.'],
        ['Manger de la viande de chameau', 'Annule pour les hanbalites (Muslim n°360) ; n’annule pas pour la majorité.'],
        ['Le saignement abondant ou le vomissement abondant', 'Annule pour les hanafites (et les hanbalites s’il est abondant) ; n’annule pas pour les malikites et chaféites.'],
      ] },
      { t: 'note', tone: 'tip', text: "Si une situation vous inquiète souvent, suivez l'avis de votre mosquée ou de l'école la plus pratiquée autour de vous, sans vous tourmenter." },
    ],
  },
  {
    id: 'erreurs',
    title: 'Les erreurs fréquentes',
    icon: 'eyeOff',
    blocks: [
      { t: 'list', items: [
        "**Oublier les talons** ou l'arrière des chevilles.",
        "**Ne pas laver les coudes** : ils sont inclus dans le lavage des bras.",
        "**Gaspiller l'eau** : le Prophète ﷺ faisait ses ablutions avec environ un *mudd* (à peu près 0,6 litre) (al-Bukhârî n°201, Muslim n°325). Fermez le robinet entre deux gestes.",
        "**Réciter une invocation spéciale pour chaque membre** : aucune invocation authentique n'est rapportée pour chaque partie du corps ; on dit Bismillâh au début et l'attestation à la fin.",
        "**Laver plus de trois fois** : ce n'est pas recommandé.",
        "**Oublier le vernis à ongles**, qui empêche l'eau d'atteindre l'ongle.",
        "**Douter sans cesse** et recommencer : en cas de doute après avoir terminé, on ne recommence pas.",
      ] },
    ],
  },
  {
    id: 'ghusl',
    title: 'Le ghusl (grandes ablutions)',
    icon: 'drop',
    blocks: [
      { t: 'p', text: "Le **ghusl** est le lavage de **tout le corps**. Il est obligatoire dans certaines situations :" },
      { t: 'list', items: ["Après des relations intimes ou une éjaculation (état de *janâba*).", "À la fin des règles ou des lochies (saignements après l'accouchement).", "Lors de l'entrée en islam, selon certains savants (recommandé pour d'autres)."] },
      { t: 'p', text: "Il est **recommandé** le vendredi avant la prière, pour les deux Aïds et avant l'ihrâm." },
      { t: 'h', text: 'Le minimum obligatoire' },
      { t: 'p', text: "L'intention, puis faire couler l'eau sur **tout le corps**, y compris les cheveux jusqu'à leur racine (rincer la bouche et le nez est aussi obligatoire pour les hanafites et hanbalites)." },
      { t: 'h', text: 'La manière complète (sunna)' },
      { t: 'list', ordered: true, items: ["L'intention, puis « Bismillâh ».", 'Laver les mains trois fois.', 'Laver les parties intimes avec la main gauche.', 'Faire des ablutions complètes, comme pour la prière.', "Verser de l'eau trois fois sur la tête en faisant pénétrer l'eau jusqu'aux racines des cheveux.", 'Laver tout le corps, en commençant par le côté droit puis le gauche, sans oublier les plis (aisselles, nombril, arrière des genoux).'] },
      { t: 'hadith', text: "‘Â’isha a décrit le ghusl du Prophète ﷺ : il commençait par se laver les mains, puis faisait ses ablutions comme pour la prière, puis passait ses doigts mouillés dans ses cheveux jusqu'à leurs racines, puis versait de l'eau sur sa tête trois fois, puis sur tout son corps.", ref: 'Rapporté par al-Bukhârî (n°248) et Muslim (n°316)' },
      { t: 'note', tone: 'info', text: "Pour la femme, il n'est pas obligatoire de défaire ses tresses pour le ghusl de janâba, si l'eau atteint les racines (Muslim n°330)." },
    ],
  },
  {
    id: 'particulier',
    title: 'Les situations particulières',
    icon: 'info',
    blocks: [
      { t: 'h', text: "Pas d'eau ou danger pour la santé : le tayammum" },
      { t: 'p', text: "Si l'on ne trouve pas d'eau, ou si l'eau est dangereuse pour sa santé, on fait le **tayammum** (ablution sèche) : intention, frapper le sol propre (terre, pierre, sable) avec les paumes, souffler légèrement, puis passer les mains sur le visage puis sur le dos des mains." },
      { t: 'hadith', text: "Le Prophète ﷺ dit à ‘Ammâr : « Il te suffisait de faire ainsi », et il frappa le sol de ses mains, souffla dessus, puis s'en essuya le visage et les mains.", ref: 'Rapporté par al-Bukhârî (n°338) et Muslim (n°368)' },
      { t: 'h', text: 'Les chaussettes et chaussons (mash ‘alâ al-khuffayn)' },
      { t: 'p', text: "Si l'on a mis des chaussons de cuir (khuffs) — ou des chaussettes selon de nombreux savants — **après avoir fait des ablutions complètes**, on peut, lors des ablutions suivantes, passer la main mouillée sur le dessus au lieu de laver les pieds : pendant **1 jour et 1 nuit** pour le résident, **3 jours** pour le voyageur." },
      { t: 'hadith', text: "‘Alî a dit : « Le Messager d'Allah ﷺ a fixé trois jours et trois nuits pour le voyageur, et un jour et une nuit pour le résident. »", ref: 'Rapporté par Muslim (n°276)' },
      { t: 'h', text: 'Pansement ou plâtre' },
      { t: 'p', text: "Si une partie à laver est couverte par un pansement ou un plâtre qu'on ne peut pas retirer, on lave le reste et on passe la main mouillée sur le pansement." },
      { t: 'h', text: 'Incontinence ou saignements continus' },
      { t: 'p', text: "La personne qui souffre d'une incontinence permanente ou de saignements en dehors des règles (*istihâda*) fait ses ablutions **à l'entrée du temps de chaque prière** et prie normalement, même si l'écoulement continue." },
      { t: 'hadith', text: "À Fâtima bint Abî Hubaysh, qui souffrait de saignements prolongés : « … puis fais tes ablutions pour chaque prière. »", ref: 'Rapporté par al-Bukhârî (n°228)' },
      { t: 'note', tone: 'gentle', text: "L'islam n'impose pas de difficulté insurmontable : « Allah ne veut pas vous imposer de gêne » (sourate 5, verset 6)." },
    ],
  },
]

export const QUIZ_WUDU: QuizQ[] = [
  qcm('Quelle partie n’est pas obligatoire dans les ablutions selon le Coran ?', ['Le visage', 'Les bras jusqu’aux coudes', 'Rincer la bouche', 'Les pieds'], 2, 'Le Coran (5:6) cite le visage, les bras, la tête et les pieds ; rincer la bouche est recommandé pour la majorité.'),
  qcm('Combien de fois essuie-t-on la tête ?', ['1 fois', '2 fois', '3 fois', '7 fois'], 0, 'On essuie la tête une seule fois.'),
  vf('Les coudes sont inclus dans le lavage des bras.', true, 'On lave jusqu’aux coudes inclus.'),
  vf('Le gaz annule les ablutions.', true, 'Ce qui sort des voies naturelles annule les ablutions, selon tous les savants.'),
  vf('Si l’on doute d’avoir perdu ses ablutions, on doit forcément les refaire.', false, 'La certitude ne disparaît pas par le doute (al-Bukhârî n°137, Muslim n°361).'),
  qcm('Que fait-on si l’on n’a pas d’eau ?', ['On ne prie pas', 'Le tayammum', 'On attend le lendemain', 'On prie sans rien faire'], 1, 'Le tayammum (sourate 5, verset 6 ; al-Bukhârî n°338).'),
  qcm('Quelle invocation dit-on après les ablutions ?', ['Bismillâh', 'L’attestation de foi (Ash-hadu an lâ ilâha illa-llâh…)', 'Âmîn', 'Subhâna Rabbiya-l-A‘lâ'], 1, 'Muslim n°234.'),
  vf('Le vernis à ongles classique doit être retiré avant les ablutions.', true, 'Il empêche l’eau d’atteindre l’ongle.'),
  qcm('Dans quel cas le ghusl est-il obligatoire ?', ['Après avoir mangé', 'À la fin des règles', 'Après avoir dormi', 'Après avoir prié'], 1, 'À la fin des règles et des lochies, et après la janâba.'),
]
