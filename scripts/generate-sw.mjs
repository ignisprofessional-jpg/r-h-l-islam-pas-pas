// Génère dist/sw.js après le build : met en cache toute l'application sur le téléphone
// pour un lancement instantané et un fonctionnement hors ligne.
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const DIST = 'dist'
const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]))

const files = walk(DIST)
  .map((f) => '/' + relative(DIST, f).split(sep).join('/'))
  .filter((f) => f !== '/sw.js' && !f.endsWith('.map'))

const hash = createHash('sha256')
for (const f of files.sort()) hash.update(f).update(readFileSync(join(DIST, f)))
const version = hash.digest('hex').slice(0, 12)

const sw = `/* Service worker de Rûh — généré par scripts/generate-sw.mjs (version ${version}) */
const VERSION = '${version}'
const APP_CACHE = 'ruh-app-' + VERSION
const FONT_CACHE = 'ruh-fonts-v1'
const PRECACHE = ${JSON.stringify(['/', ...files.filter((f) => f !== '/index.html')])}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(APP_CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('ruh-app-') && k !== APP_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // Pages de l'application : réponse immédiate depuis le cache, mise à jour en arrière-plan
  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(
      caches.open(APP_CACHE).then(async (cache) => {
        const cached = await cache.match('/')
        const network = fetch('/', { cache: 'no-store' })
          .then((res) => {
            if (res.ok) cache.put('/', res.clone())
            return res
          })
          .catch(() => cached)
        return cached || network
      }),
    )
    return
  }

  // Fichiers de l'application (JS, CSS, icônes) : cache d'abord
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(req).then((hit) => hit || fetch(req)))
    return
  }

  // Polices Google : cache d'abord (elles ne changent pas)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const hit = await cache.match(req)
        if (hit) return hit
        const res = await fetch(req)
        if (res.ok || res.type === 'opaque') cache.put(req, res.clone())
        return res
      }),
    )
  }
  // Le reste (Coran, horaires, Supabase, audio) passe directement par le réseau.
})
`
writeFileSync(join(DIST, 'sw.js'), sw)
console.log(`✓ dist/sw.js (${files.length} fichiers en cache, version ${version})`)
