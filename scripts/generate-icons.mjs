// Génère les icônes de l'application (écran d'accueil iPhone/Android) à partir d'un SVG.
// Usage : node scripts/generate-icons.mjs
import sharp from 'sharp'

const star = (scale) => `
  <g transform="translate(256 256) scale(${scale}) translate(-256 -256)" fill="none" stroke="#E2C27D" stroke-width="16" stroke-linejoin="round">
    <path d="M256 92l45 108 108 45-108 45-45 108-45-108-108-45 108-45z"/>
    <path d="M256 150l26 63 63 26-63 26-26 63-26-63-63-26 63-26z" stroke-width="10" opacity=".55"/>
    <circle cx="256" cy="245" r="34" fill="#E2C27D" stroke="none"/>
  </g>`

const bg = `
  <defs>
    <radialGradient id="g" cx="50%" cy="35%" r="75%">
      <stop offset="0" stop-color="#17664E"/>
      <stop offset="1" stop-color="#0B3A2C"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>`

const full = (s) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${bg}${star(s)}</svg>`

const out = [
  ['public/icons/icon-192.png', 192, full(1)],
  ['public/icons/icon-512.png', 512, full(1)],
  ['public/icons/maskable-512.png', 512, full(0.78)], // zone sûre Android (80 %)
  ['public/apple-touch-icon.png', 180, full(0.92)], // iOS arrondit lui-même les coins
]
for (const [file, size, svg] of out) {
  await sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toFile(file)
  console.log('✓', file)
}
