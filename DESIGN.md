# Rûh — direction artistique

**Le monde : un manuscrit calme.** Papier chaud, encre vert forêt, filets dorés. La page est composée comme un beau livre : des titres en serif, du texte qui respire, des filets fins pour séparer plutôt que des boîtes. Un seul aplat vert profond par écran au maximum, réservé à ce qui compte le plus (sur l'accueil : la reprise du Coran).

## Couleurs (tokens CSS dans `src/index.css`)
| Rôle | Clair | Sombre |
|---|---|---|
| `bg` papier | `#f5f0e6` | `#0c1613` |
| `surface` | `#fcfaf5` | `#121f1a` |
| `surface-2` | `#efe8da` | `#18291f` |
| `ink` encre | `#17241d` | `#ebe4d4` |
| `muted` | `#5b6860` | `#a3b0a8` |
| `line` filet | `#e2d9c6` | `#22362d` |
| `primary` vert forêt | `#0f4c3a` | `#5bb592` |
| `deep` aplat profond | `#0d3b2e` | `#0f2a21` |
| `gold` (texte, filets) | `#8a6522` | `#d6b06a` |
| `gold-bright` (sur vert) | `#e2c487` | `#e2c487` |

Le doré n'est jamais un fond plein : filets, chiffres, petits ornements, état actif.

## Typographie
- **Newsreader** (titres, chiffres de mise en avant, italique pour les nuances) — serif éditoriale à tailles optiques.
- **Instrument Sans** (interface, texte courant) — sans-serif nette, chaleureuse.
- **Amiri** (arabe courant) et **Amiri Quran** (texte coranique), toujours en `dir="rtl"` isolé.
- Échelle : 13 · 14 · 16 (corps) · 18 · 22 · 28 · 36 · 48. Titres : graisse 500, interlettrage -0,01 em.

## Composition
- Pas de carte par défaut : sections éditoriales séparées par des filets (`SectionTitle` = titre + filet + action).
- `Card` : surface claire, filet presque invisible, aucune ombre. Pas de cartes imbriquées.
- Rayons : 20 px (surfaces), 14 px (lignes et champs), boutons en pilule.
- Icônes : jeu unique maison (`Icon.tsx`), trait 1,75, 18–20 px.
- Mouvement : un fondu court au changement de page, feuilles qui montent du bas sur mobile. Rien d'autre.

## Navigation
- **≥ 1280 px** : barre latérale complète (5 groupes : Accueil, Coran, Apprendre, Pratique, Suivi), repliable en rail.
- **768–1279 px** : rail d'icônes avec libellés ; chaque groupe ouvre un panneau avec ses pages.
- **< 768 px** : en-tête vert (barre d'état iOS) + barre inférieure à 5 onglets (Accueil, Coran, Apprendre, Pratique, Plus). L'onglet actif suit le groupe de la page.
