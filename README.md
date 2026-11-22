# Rûh — apprendre l'islam pas à pas

*Rûh* (روح) signifie « l'âme, l'esprit » en arabe.

Plateforme d'apprentissage de l'islam en français, pour débutants : Coran complet, prière pas à pas, ablutions, arabe coranique, sourates à mémoriser, invocations, dhikr, cours (piliers, foi, Prophète ﷺ, comportement, halal/haram, sciences islamiques), quiz, calendrier hégirien, questions-réponses et suivi de progression.

## Lancer le site

```powershell
npm install
npm run dev
```

Puis ouvrir http://localhost:5173. Pour une version de production : `npm run build` (fichiers dans `dist/`, à héberger sur n'importe quel hébergeur statique — prévoir la redirection de toutes les routes vers `index.html`).

## Activer les comptes (Supabase)

Sans configuration, le site fonctionne entièrement, avec une sauvegarde sur l'appareil. Pour permettre aux utilisateurs de retrouver leur progression sur tous leurs appareils :

1. Créez un projet gratuit sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, collez le contenu de [`supabase/schema.sql`](supabase/schema.sql) et cliquez sur **Run**. Cela crée la table `progress` et les règles de sécurité (RLS) : chaque compte n'accède qu'à ses propres données.
3. Dans **Project Settings > API**, copiez l'URL du projet et la clé **anon / publishable** (jamais la clé `service_role`).
4. Copiez `.env.example` en `.env.local` et renseignez :
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=…
   ```
5. Redémarrez `npm run dev`. La page **Mon compte** propose alors : connexion, création de compte, lien de connexion par e-mail et mot de passe oublié.
6. Quand le site sera en ligne : dans **Authentication > URL Configuration**, indiquez l'adresse du site (Site URL) et ajoutez `https://votre-site/compte` aux Redirect URLs, pour que les liens reçus par e-mail fonctionnent. Ajoutez les deux variables chez votre hébergeur.

Par défaut, Supabase demande de confirmer l'adresse e-mail à l'inscription (réglable dans *Authentication > Providers > Email*). Pour un vrai site public, configurez aussi un serveur d'envoi d'e-mails (SMTP), car l'envoi intégré de Supabase est limité.

**Fonctionnement de la synchronisation** : la progression reste toujours enregistrée sur l'appareil (le site marche hors ligne). Une fois connecté, chaque modification est envoyée au compte environ 1,5 s plus tard. À l'ouverture du site et à chaque retour sur l'onglet, la version la plus récente est récupérée. La première fois qu'un appareil qui a déjà une progression se connecte à un compte, les deux sont fusionnées sans perte.

## Technique

- React 19 + TypeScript + Vite, Tailwind CSS 4, React Router, Zustand, Supabase (facultatif).
- **Sauvegarde automatique** de toute la progression dans le navigateur (localStorage), avec export / import d'une sauvegarde JSON dans *Réglages*, et synchronisation avec un compte si Supabase est configuré.
- Mise en cache des textes coraniques (Cache API) pour un chargement rapide.
- Mode clair / sombre, navigation latérale (ordinateur) et barre basse + menu (mobile), recherche globale (Ctrl K).

## Sources des données religieuses

Aucun verset n'est écrit à la main ni généré :

| Donnée | Source |
| --- | --- |
| Texte arabe (uthmani, Hafs), traductions Rachid Maach et M. Hamidullah, translittération, récitations, tafsir al-Muyassar (AR) et Ibn Kathir abrégé (EN) | API Quran.com (Quran Foundation) |
| Recherche par mot dans le Coran | API AlQuran.cloud |
| Horaires de prière, liste des 99 noms (arabe + translittération) | API Aladhan |
| Calendrier hégirien | Calendrier Umm al-Qura intégré au navigateur (`Intl`) |

Les hadiths sont présentés par leur sens, avec la référence (recueil et numéro). Les formules de prière et invocations sont celles des recueils reconnus (Hisn al-Muslim), avec leur source. Les explications « simples » des 10 sourates du parcours sont des résumés pédagogiques signalés comme tels. Aucun tafsir complet en français n'étant disponible via une API vérifiée, le site l'indique au lieu d'en générer un.

## Structure

```
src/
  data/        contenus pédagogiques (cours, prière, ablutions, arabe, douas, Q&R, calendrier…)
  lib/         API, sauvegarde (store), audio, recherche, quiz, progression, dates
  components/  composants réutilisables (UI, lecteur audio, quiz, illustrations, mise en page)
  pages/       une page par rubrique
```
