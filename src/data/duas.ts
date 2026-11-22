/**
 * Invocations authentiques, issues des recueils de hadiths reconnus (références indiquées) ou du Coran.
 * Les invocations coraniques (champ `quran`) sont chargées en direct depuis Quran.com, avec récitation audio.
 * Recueil de référence pour la sélection : « Hisn al-Muslim » (La citadelle du musulman) de Sa‘îd al-Qahtânî,
 * dont chaque invocation renvoie à sa source.
 */

export interface Dua {
  id: string
  cat: DuaCat
  title: string
  ar?: string
  tr?: string
  fr?: string
  quran?: string
  ref: string
  when?: string
  count?: string
}

export type DuaCat = 'matin' | 'soir' | 'coucher' | 'reveil' | 'avant-manger' | 'apres-manger' | 'pardon' | 'aide' | 'difficulte' | 'examen' | 'remercier' | 'apres-priere'

export const DUA_CATS: { id: DuaCat; label: string; icon: string }[] = [
  { id: 'matin', label: 'Le matin', icon: 'sun' },
  { id: 'soir', label: 'Le soir', icon: 'moon' },
  { id: 'coucher', label: 'Avant de dormir', icon: 'moon' },
  { id: 'reveil', label: 'Au réveil', icon: 'sun' },
  { id: 'avant-manger', label: 'Avant de manger', icon: 'leaf' },
  { id: 'apres-manger', label: 'Après avoir mangé', icon: 'leaf' },
  { id: 'pardon', label: 'Demander pardon', icon: 'heart' },
  { id: 'aide', label: "Demander de l'aide", icon: 'hands' },
  { id: 'difficulte', label: 'En période de difficulté', icon: 'compass' },
  { id: 'examen', label: 'Avant un examen', icon: 'graduation' },
  { id: 'remercier', label: 'Pour remercier Allah', icon: 'sparkle' },
  { id: 'apres-priere', label: 'Après la prière', icon: 'prayer' },
]

const ASBAHNA_MULK = 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ'
const AMSAYNA_MULK = 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ'

const SAYYID_ISTIGHFAR = {
  ar: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
  tr: 'Allâhumma anta Rabbî lâ ilâha illâ ant, khalaqtanî wa ana ‘abduk, wa ana ‘alâ ‘ahdika wa wa‘dika ma-stata‘t, a‘ûdhu bika min sharri mâ sana‘t, abû’u laka bi-ni‘matika ‘alayya, wa abû’u laka bi-dhanbî fa-ghfir lî, fa-innahu lâ yaghfiru-dh-dhunûba illâ ant',
  fr: "Ô Allah, Tu es mon Seigneur, il n'y a de divinité que Toi. Tu m'as créé et je suis Ton serviteur. Je respecte mon engagement envers Toi autant que je le peux. Je cherche refuge auprès de Toi contre le mal que j'ai commis. Je reconnais Tes bienfaits envers moi et je reconnais mes péchés : pardonne-moi, car nul ne pardonne les péchés en dehors de Toi.",
}

const BISMILLAH_LA_YADURR = {
  ar: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ',
  tr: 'Bismi-llâhi-lladhî lâ yadurru ma‘a-smihi shay’un fi-l-ardi wa lâ fi-s-samâ’, wa huwa-s-Samî‘u-l-‘Alîm',
  fr: "Au nom d'Allah, avec le nom duquel rien ne peut nuire, ni sur terre ni dans le ciel, et Il est Celui qui entend tout et sait tout.",
  ref: 'Rapporté par Abû Dâwûd (n°5088) et at-Tirmidhî (n°3388), qui l’a jugé bon et authentique',
  count: '3 fois',
}

export const DUAS: Dua[] = [
  /* ---------- Matin ---------- */
  { id: 'matin-mulk', cat: 'matin', title: 'Nous voici au matin', ar: ASBAHNA_MULK, tr: "Asbahnâ wa asbaha-l-mulku lillâh, wa-l-hamdu lillâh, lâ ilâha illa-llâhu wahdahu lâ sharîka lah, lahu-l-mulku wa lahu-l-hamdu wa huwa ‘alâ kulli shay’in qadîr. Rabbi as’aluka khayra mâ fî hâdha-l-yawmi wa khayra mâ ba‘dah, wa a‘ûdhu bika min sharri mâ fî hâdha-l-yawmi wa sharri mâ ba‘dah. Rabbi a‘ûdhu bika mina-l-kasali wa sû’i-l-kibar. Rabbi a‘ûdhu bika min ‘adhâbin fi-n-nâri wa ‘adhâbin fi-l-qabr.", fr: "Nous voici au matin et la royauté appartient à Allah. Louange à Allah. Il n'y a de divinité qu'Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose. Seigneur, je Te demande le bien de ce jour et le bien de ce qui le suit, et je cherche refuge auprès de Toi contre le mal de ce jour et le mal de ce qui le suit. Seigneur, je cherche refuge auprès de Toi contre la paresse et les maux de la vieillesse. Seigneur, je cherche refuge auprès de Toi contre un châtiment dans le Feu et un châtiment dans la tombe.", ref: 'Rapporté par Muslim (n°2723), d’après Ibn Mas‘ûd', when: 'Après le Fajr' },
  { id: 'matin-bika', cat: 'matin', title: 'Par Toi nous entrons dans le matin', ar: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ', tr: 'Allâhumma bika asbahnâ, wa bika amsaynâ, wa bika nahyâ, wa bika namûtu, wa ilayka-n-nushûr', fr: "Ô Allah, c'est par Toi que nous entrons dans le matin et par Toi que nous entrons dans le soir, par Toi que nous vivons et par Toi que nous mourons, et c'est vers Toi que sera la résurrection.", ref: 'Rapporté par at-Tirmidhî (n°3391) et Abû Dâwûd (n°5068)' },
  { id: 'matin-bismillah', cat: 'matin', title: 'La protection par le nom d’Allah', ...BISMILLAH_LA_YADURR, when: 'Matin et soir' },
  { id: 'matin-sayyid', cat: 'matin', title: 'La meilleure demande de pardon (sayyid al-istighfâr)', ...SAYYID_ISTIGHFAR, ref: "Rapporté par al-Bukhârî (n°6306), d’après Shaddâd ibn Aws : celui qui la dit le matin avec conviction et meurt ce jour-là fait partie des gens du Paradis, de même pour le soir", when: 'Matin et soir' },
  { id: 'matin-quls', cat: 'matin', title: 'Les trois dernières sourates', quran: '112:1-4', ref: 'Al-Ikhlâs, Al-Falaq et An-Nâs, 3 fois matin et soir : Abû Dâwûd (n°5082), at-Tirmidhî (n°3575). Les deux autres se trouvent dans la rubrique Sourates.', count: '3 fois chacune' },

  /* ---------- Soir ---------- */
  { id: 'soir-mulk', cat: 'soir', title: 'Nous voici au soir', ar: AMSAYNA_MULK, tr: "Amsaynâ wa amsa-l-mulku lillâh, wa-l-hamdu lillâh, lâ ilâha illa-llâhu wahdahu lâ sharîka lah, lahu-l-mulku wa lahu-l-hamdu wa huwa ‘alâ kulli shay’in qadîr. Rabbi as’aluka khayra mâ fî hâdhihi-l-laylati wa khayra mâ ba‘dahâ, wa a‘ûdhu bika min sharri mâ fî hâdhihi-l-laylati wa sharri mâ ba‘dahâ. Rabbi a‘ûdhu bika mina-l-kasali wa sû’i-l-kibar. Rabbi a‘ûdhu bika min ‘adhâbin fi-n-nâri wa ‘adhâbin fi-l-qabr.", fr: "Nous voici au soir et la royauté appartient à Allah. Louange à Allah. Il n'y a de divinité qu'Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose. Seigneur, je Te demande le bien de cette nuit et le bien de ce qui la suit, et je cherche refuge auprès de Toi contre le mal de cette nuit et le mal de ce qui la suit. Seigneur, je cherche refuge auprès de Toi contre la paresse et les maux de la vieillesse. Seigneur, je cherche refuge auprès de Toi contre un châtiment dans le Feu et un châtiment dans la tombe.", ref: 'Rapporté par Muslim (n°2723), d’après Ibn Mas‘ûd', when: 'Après le ‘Asr ou le Maghrib' },
  { id: 'soir-bika', cat: 'soir', title: 'Par Toi nous entrons dans le soir', ar: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ', tr: 'Allâhumma bika amsaynâ, wa bika asbahnâ, wa bika nahyâ, wa bika namûtu, wa ilayka-l-masîr', fr: "Ô Allah, c'est par Toi que nous entrons dans le soir et par Toi que nous entrons dans le matin, par Toi que nous vivons et par Toi que nous mourons, et c'est vers Toi qu'est le retour.", ref: 'Rapporté par at-Tirmidhî (n°3391)' },
  { id: 'soir-kalimat', cat: 'soir', title: 'Protection par les paroles parfaites d’Allah', ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', tr: 'A‘ûdhu bi-kalimâti-llâhi-t-tâmmâti min sharri mâ khalaq', fr: "Je cherche refuge auprès des paroles parfaites d'Allah contre le mal de ce qu'Il a créé.", ref: 'Rapporté par Muslim (n°2709), d’après Abû Hurayra', count: '3 fois' },
  { id: 'soir-bismillah', cat: 'soir', title: 'La protection par le nom d’Allah', ...BISMILLAH_LA_YADURR, when: 'Matin et soir' },

  /* ---------- Coucher ---------- */
  { id: 'coucher-bismika', cat: 'coucher', title: 'En ton nom je meurs et je vis', ar: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', tr: 'Bi-smika-llâhumma amûtu wa ahyâ', fr: 'C’est en Ton nom, ô Allah, que je meurs et que je vis.', ref: 'Rapporté par al-Bukhârî (n°6324), d’après Hudhayfa' },
  { id: 'coucher-kursi', cat: 'coucher', title: 'Le Verset du Trône', quran: '2:255', ref: "Celui qui le récite en se couchant reste sous la protection d'Allah jusqu'au matin : al-Bukhârî (n°2311), d’après Abû Hurayra" },
  { id: 'coucher-quls', cat: 'coucher', title: 'Les trois sourates protectrices', quran: '113:1-5', ref: "Le Prophète ﷺ joignait ses mains, soufflait dedans, récitait Al-Ikhlâs, Al-Falaq et An-Nâs, puis passait ses mains sur son corps, trois fois : al-Bukhârî (n°5017), d’après ‘Â’isha", count: '3 fois' },
  { id: 'coucher-tasbih', cat: 'coucher', title: 'Le tasbîh avant de dormir', ar: 'سُبْحَانَ اللَّهِ (٣٣) — الْحَمْدُ لِلَّهِ (٣٣) — اللَّهُ أَكْبَرُ (٣٤)', tr: 'Subhâna-llâh (33 fois), al-hamdu lillâh (33 fois), Allâhu akbar (34 fois)', fr: 'Gloire à Allah, louange à Allah, Allah est le plus grand.', ref: 'Enseigné à ‘Alî et Fâtima : al-Bukhârî (n°3705), Muslim (n°2727)' },
  { id: 'coucher-qini', cat: 'coucher', title: 'Protège-moi de Ton châtiment', ar: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ', tr: 'Allâhumma qinî ‘adhâbaka yawma tab‘athu ‘ibâdak', fr: 'Ô Allah, préserve-moi de Ton châtiment le Jour où Tu ressusciteras Tes serviteurs.', ref: 'Rapporté par Abû Dâwûd (n°5045) et at-Tirmidhî (n°3398)', count: '3 fois' },

  /* ---------- Réveil ---------- */
  { id: 'reveil-ahyana', cat: 'reveil', title: 'Louange à Celui qui nous a redonné la vie', ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', tr: 'Al-hamdu lillâhi-lladhî ahyânâ ba‘da mâ amâtanâ wa ilayhi-n-nushûr', fr: 'Louange à Allah qui nous a redonné la vie après nous avoir fait mourir, et c’est vers Lui que sera la résurrection.', ref: 'Rapporté par al-Bukhârî (n°6312), d’après Hudhayfa' },

  /* ---------- Avant de manger ---------- */
  { id: 'manger-bismillah', cat: 'avant-manger', title: 'Avant de manger', ar: 'بِسْمِ اللَّهِ', tr: 'Bismi-llâh', fr: 'Au nom d’Allah.', ref: "« Mon enfant, dis Bismillâh, mange de ta main droite et mange de ce qui est devant toi » : al-Bukhârî (n°5376), Muslim (n°2022)" },
  { id: 'manger-oubli', cat: 'avant-manger', title: 'Si l’on a oublié au début', ar: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ', tr: 'Bismi-llâhi awwalahu wa âkhirah', fr: 'Au nom d’Allah, au début et à la fin.', ref: 'Rapporté par Abû Dâwûd (n°3767) et at-Tirmidhî (n°1858)' },

  /* ---------- Après avoir mangé ---------- */
  { id: 'apres-manger-atamani', cat: 'apres-manger', title: 'Louange à Celui qui m’a nourri', ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ', tr: 'Al-hamdu lillâhi-lladhî at‘amanî hâdhâ wa razaqanîhi min ghayri hawlin minnî wa lâ quwwa', fr: "Louange à Allah qui m'a nourri de ceci et me l'a accordé, sans force ni puissance de ma part.", ref: 'Rapporté par Abû Dâwûd (n°4023), at-Tirmidhî (n°3458) et Ibn Mâja (n°3285)' },
  { id: 'apres-manger-hamd', cat: 'apres-manger', title: 'Simplement : al-hamdu lillâh', ar: 'الْحَمْدُ لِلَّهِ', tr: 'Al-hamdu lillâh', fr: 'Louange à Allah.', ref: "« Allah agrée le serviteur qui mange une bouchée et L'en loue, ou qui boit une gorgée et L'en loue » : Muslim (n°2734)" },

  /* ---------- Pardon ---------- */
  { id: 'pardon-sayyid', cat: 'pardon', title: 'La meilleure demande de pardon', ...SAYYID_ISTIGHFAR, ref: 'Rapporté par al-Bukhârî (n°6306), d’après Shaddâd ibn Aws' },
  { id: 'pardon-astaghfirullah', cat: 'pardon', title: 'Je demande pardon à Allah', ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', tr: 'Astaghfiru-llâha wa atûbu ilayh', fr: 'Je demande pardon à Allah et je me repens à Lui.', ref: "« Par Allah, je demande pardon à Allah et je me repens à Lui plus de soixante-dix fois par jour » : al-Bukhârî (n°6307)" },
  { id: 'pardon-tub', cat: 'pardon', title: 'Pardonne-moi et accepte mon repentir', ar: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ', tr: 'Rabbi-ghfir lî wa tub ‘alayya, innaka anta-t-Tawwâbu-r-Rahîm', fr: 'Seigneur, pardonne-moi et accepte mon repentir, Tu es Celui qui accepte le repentir, le Très Miséricordieux.', ref: "Ibn ‘Umar comptait que le Prophète ﷺ la disait cent fois en une seule assise : Abû Dâwûd (n°1516), at-Tirmidhî (n°3434)" },
  { id: 'pardon-adam', cat: 'pardon', title: 'L’invocation d’Adam et Ève', quran: '7:23', ref: 'Coran, sourate 7 (Al-A‘râf), verset 23' },
  { id: 'pardon-afw', cat: 'pardon', title: 'Tu aimes pardonner', ar: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي', tr: 'Allâhumma innaka ‘Afuwwun tuhibbu-l-‘afwa fa‘fu ‘annî', fr: 'Ô Allah, Tu es Celui qui efface les fautes, Tu aimes effacer, alors efface mes fautes.', ref: 'Enseignée à ‘Â’isha pour la Nuit du Destin : at-Tirmidhî (n°3513), Ibn Mâja (n°3850)' },

  /* ---------- Aide ---------- */
  { id: 'aide-hayy', cat: 'aide', title: 'Ô Vivant, ô Subsistant', ar: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ', tr: 'Yâ Hayyu yâ Qayyûm, bi-rahmatika astaghîth', fr: "Ô Vivant, ô Celui qui subsiste par Lui-même, c'est par Ta miséricorde que j'implore secours.", ref: 'Rapporté par at-Tirmidhî (n°3524)' },
  { id: 'aide-hawla', cat: 'aide', title: 'Il n’y a de force qu’en Allah', ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', tr: 'Lâ hawla wa lâ quwwata illâ billâh', fr: "Il n'y a de changement ni de force que par Allah.", ref: "« Un trésor parmi les trésors du Paradis » : al-Bukhârî (n°6384), Muslim (n°2704)" },
  { id: 'aide-musa', cat: 'aide', title: 'L’invocation de Moïse', quran: '20:25-28', ref: 'Coran, sourate 20 (Tâ-Hâ), versets 25 à 28' },
  { id: 'aide-hamm', cat: 'aide', title: 'Contre le souci et la tristesse', ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ', tr: 'Allâhumma innî a‘ûdhu bika mina-l-hammi wa-l-hazan, wa-l-‘ajzi wa-l-kasal, wa-l-bukhli wa-l-jubn, wa dala‘i-d-dayni wa ghalabati-r-rijâl', fr: "Ô Allah, je cherche refuge auprès de Toi contre le souci et la tristesse, l'incapacité et la paresse, l'avarice et la lâcheté, le poids des dettes et la domination des hommes.", ref: 'Rapporté par al-Bukhârî (n°6369), d’après Anas' },

  /* ---------- Difficulté ---------- */
  { id: 'diff-karb', cat: 'difficulte', title: 'L’invocation de l’angoisse', ar: 'لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ', tr: 'Lâ ilâha illa-llâhu-l-‘Adhîmu-l-Halîm, lâ ilâha illa-llâhu Rabbu-l-‘arshi-l-‘adhîm, lâ ilâha illa-llâhu Rabbu-s-samâwâti wa Rabbu-l-ardi wa Rabbu-l-‘arshi-l-karîm', fr: "Il n'y a de divinité qu'Allah, le Très Grand, le Longanime. Il n'y a de divinité qu'Allah, Seigneur du Trône immense. Il n'y a de divinité qu'Allah, Seigneur des cieux, Seigneur de la terre et Seigneur du noble Trône.", ref: 'Rapporté par al-Bukhârî (n°6346) et Muslim (n°2730), d’après Ibn ‘Abbâs' },
  { id: 'diff-yunus', cat: 'difficulte', title: "L'invocation de Jonas (Yûnus)", quran: '21:87', ref: "Coran, sourate 21, verset 87. « Aucun musulman ne l'invoque pour quelque chose sans qu'Allah ne l'exauce » : at-Tirmidhî (n°3505)" },
  { id: 'diff-hasbuna', cat: 'difficulte', title: 'Allah nous suffit', ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', tr: 'Hasbuna-llâhu wa ni‘ma-l-wakîl', fr: 'Allah nous suffit, et quel excellent Garant !', ref: "Coran, sourate 3, verset 173 ; dite par Abraham jeté dans le feu et par le Prophète ﷺ : al-Bukhârî (n°4563)" },
  { id: 'diff-musiba', cat: 'difficulte', title: 'Lors d’une épreuve ou d’une perte', ar: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا', tr: 'Innâ lillâhi wa innâ ilayhi râji‘ûn, Allâhumma’jurnî fî musîbatî wa akhlif lî khayran minhâ', fr: "Nous appartenons à Allah et c'est vers Lui que nous retournerons. Ô Allah, récompense-moi pour mon épreuve et remplace-la-moi par meilleur.", ref: 'Rapporté par Muslim (n°918), d’après Umm Salama' },
  { id: 'diff-rahmataka', cat: 'difficulte', title: 'Ne me laisse pas à moi-même', ar: 'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَهَ إِلَّا أَنْتَ', tr: 'Allâhumma rahmataka arjû fa-lâ takilnî ilâ nafsî tarfata ‘ayn, wa aslih lî sha’nî kullah, lâ ilâha illâ ant', fr: "Ô Allah, c'est Ta miséricorde que j'espère : ne me laisse pas à moi-même, ne serait-ce qu'un clin d'œil, et améliore toutes mes affaires. Il n'y a de divinité que Toi.", ref: 'Rapporté par Abû Dâwûd (n°5090), d’après Abû Bakra' },

  /* ---------- Examen ---------- */
  { id: 'examen-zidni', cat: 'examen', title: 'Seigneur, accrois mon savoir', quran: '20:114', ref: 'Coran, sourate 20, verset 114 (fin du verset : « Rabbi zidnî ‘ilmâ »)' },
  { id: 'examen-sahl', cat: 'examen', title: 'Rien n’est facile sauf ce que Tu rends facile', ar: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا', tr: 'Allâhumma lâ sahla illâ mâ ja‘altahu sahlâ, wa anta taj‘alu-l-hazna idhâ shi’ta sahlâ', fr: "Ô Allah, rien n'est facile sauf ce que Tu rends facile, et Tu rends, si Tu le veux, la difficulté facile.", ref: 'Rapporté par Ibn Hibbân (n°974) et Ibn as-Sunnî (n°351) ; jugé authentique par plusieurs spécialistes du hadith' },
  { id: 'examen-infa', cat: 'examen', title: 'Fais-moi profiter de ce que j’apprends', ar: 'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْمًا', tr: 'Allâhumma-nfa‘nî bimâ ‘allamtanî, wa ‘allimnî mâ yanfa‘unî, wa zidnî ‘ilmâ', fr: "Ô Allah, fais-moi profiter de ce que Tu m'as enseigné, enseigne-moi ce qui m'est utile et accrois mon savoir.", ref: 'Rapporté par at-Tirmidhî (n°3599) et Ibn Mâja (n°251)' },
  { id: 'examen-musa', cat: 'examen', title: 'Ouvre-moi ma poitrine', quran: '20:25-28', ref: 'Coran, sourate 20, versets 25 à 28' },

  /* ---------- Remercier ---------- */
  { id: 'merci-ainni', cat: 'remercier', title: 'Aide-moi à Te remercier', ar: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ', tr: 'Allâhumma a‘innî ‘alâ dhikrika wa shukrika wa husni ‘ibâdatik', fr: "Ô Allah, aide-moi à me souvenir de Toi, à Te remercier et à bien T'adorer.", ref: "Conseillée par le Prophète ﷺ à Mu‘âdh, à dire après chaque prière : Abû Dâwûd (n°1522), an-Nasâ’î (n°1303)" },
  { id: 'merci-awzini', cat: 'remercier', title: 'Inspire-moi la gratitude', quran: '27:19', ref: 'Coran, sourate 27, verset 19 (invocation de Salomon)' },
  { id: 'merci-nima', cat: 'remercier', title: 'Lorsqu’une bonne nouvelle arrive', ar: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ', tr: 'Al-hamdu lillâhi-lladhî bi-ni‘matihi tatimmu-s-sâlihât', fr: "Louange à Allah, par la grâce de qui s'accomplissent les bonnes choses.", ref: 'Rapporté par Ibn Mâja (n°3803), d’après ‘Â’isha' },
  { id: 'merci-jazak', cat: 'remercier', title: 'Remercier quelqu’un', ar: 'جَزَاكَ اللَّهُ خَيْرًا', tr: 'Jazâka-llâhu khayrâ', fr: 'Qu’Allah te récompense en bien.', ref: "« Celui à qui l'on fait du bien et qui dit à son bienfaiteur Jazâka-llâhu khayrâ a pleinement fait son éloge » : at-Tirmidhî (n°2035)" },

  /* ---------- Après la prière ---------- */
  { id: 'priere-salam', cat: 'apres-priere', title: 'Demande de pardon et salutation', ar: 'أَسْتَغْفِرُ اللَّهَ (٣)، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ', tr: 'Astaghfiru-llâh (3 fois). Allâhumma anta-s-Salâmu wa minka-s-salâm, tabârakta yâ Dha-l-jalâli wa-l-ikrâm', fr: "Je demande pardon à Allah (3 fois). Ô Allah, Tu es la Paix et de Toi vient la paix. Béni sois-Tu, ô Plein de majesté et de générosité.", ref: 'Rapporté par Muslim (n°591), d’après Thawbân', when: 'Juste après le salam' },
  { id: 'priere-tasbih', cat: 'apres-priere', title: 'Le tasbîh : 33 / 33 / 33 + 1', ar: 'سُبْحَانَ اللَّهِ (٣٣)، الْحَمْدُ لِلَّهِ (٣٣)، اللَّهُ أَكْبَرُ (٣٣)، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', tr: 'Subhâna-llâh (33), al-hamdu lillâh (33), Allâhu akbar (33), puis : Lâ ilâha illa-llâhu wahdahu lâ sharîka lah, lahu-l-mulku wa lahu-l-hamdu wa huwa ‘alâ kulli shay’in qadîr', fr: "Gloire à Allah, louange à Allah, Allah est le plus grand ; puis : Il n'y a de divinité qu'Allah, Seul, sans associé ; à Lui la royauté, à Lui la louange, et Il est capable de toute chose.", ref: "Ses péchés sont pardonnés, fussent-ils comme l'écume de la mer : Muslim (n°597), d’après Abû Hurayra" },
  { id: 'priere-mani', cat: 'apres-priere', title: 'Nul ne peut retenir ce que Tu donnes', ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ', tr: 'Lâ ilâha illa-llâhu wahdahu lâ sharîka lah, lahu-l-mulku wa lahu-l-hamdu wa huwa ‘alâ kulli shay’in qadîr. Allâhumma lâ mâni‘a limâ a‘tayt, wa lâ mu‘tiya limâ mana‘t, wa lâ yanfa‘u dha-l-jaddi minka-l-jadd', fr: "Il n'y a de divinité qu'Allah, Seul, sans associé ; à Lui la royauté, à Lui la louange, et Il est capable de toute chose. Ô Allah, nul ne peut retenir ce que Tu donnes, nul ne peut donner ce que Tu retiens, et la fortune du fortuné ne lui sert à rien face à Toi.", ref: 'Rapporté par al-Bukhârî (n°844) et Muslim (n°593), d’après al-Mughîra ibn Shu‘ba' },
  { id: 'priere-kursi', cat: 'apres-priere', title: 'Le Verset du Trône après chaque prière', quran: '2:255', ref: "Rapporté par an-Nasâ’î dans as-Sunan al-Kubrâ (n°9928), jugé authentique par plusieurs savants du hadith" },
  { id: 'priere-ainni', cat: 'apres-priere', title: 'Aide-moi à me souvenir de Toi', ar: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ', tr: 'Allâhumma a‘innî ‘alâ dhikrika wa shukrika wa husni ‘ibâdatik', fr: "Ô Allah, aide-moi à me souvenir de Toi, à Te remercier et à bien T'adorer.", ref: 'Abû Dâwûd (n°1522), an-Nasâ’î (n°1303)' },
]

export const duaById = (id: string) => DUAS.find((d) => d.id === id)
