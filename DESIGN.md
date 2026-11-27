# Rûh — direction artistique

**Le monde : une app de prière claire et chaleureuse.** Fond légèrement teinté, cartes blanches nettement délimitées (ombre douce), une grande carte vert profond pour la prochaine prière et son compte à rebours, icônes en arc (ciel de chaque prière), barre d’onglets flottante en pilule sur téléphone et iPad.

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
- Chaque bloc est une carte (`.card` : fond blanc, rayon 22 px, ombre douce ; en sombre, filet clair). Les listes sont des cartes groupées avec séparateurs (style iOS).
- Titres de section en sans-serif semi-gras, action à droite.
- Rayons : 20 px (surfaces), 14 px (lignes et champs), boutons en pilule.
- Icônes : jeu unique maison (`Icon.tsx`), trait 1,75, 18–20 px.
- Mouvement : un fondu court au changement de page, feuilles qui montent du bas sur mobile. Rien d'autre.

## Navigation
- **≥ 1024 px** : barre latérale complète (5 groupes : Accueil, Coran, Apprendre, Pratique, Suivi), repliable en rail.
- **< 1024 px (iPhone, iPad portrait)** : barre du haut avec boutons ronds (retour, recherche), barre d’onglets flottante (Accueil, Coran, Apprendre, Pratique, Plus) ; accueil sur deux colonnes à partir de 768 px.
