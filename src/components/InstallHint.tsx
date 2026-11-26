import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { Button } from './ui'

/** Proposition d'installer Rûh sur l'écran d'accueil (iPhone : instructions ; Android/Chrome : bouton). */
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const KEY = 'ruh-install-hint-dismissed'
const read = () => {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

let deferred: InstallPromptEvent | null = null
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as InstallPromptEvent
  })
}

const isStandalone = () =>
  typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true)

/** `navigator.standalone` n'existe que dans Safari sur iPhone/iPad : c'est là qu'il faut le menu Partager. */
const isIosSafari = () => typeof navigator !== 'undefined' && 'standalone' in navigator && !(navigator as Navigator & { standalone?: boolean }).standalone

export function InstallHint() {
  const [dismissed, setDismissed] = useState(read)
  const [canPrompt, setCanPrompt] = useState(() => !!deferred)
  const [installed, setInstalled] = useState(isStandalone)

  useEffect(() => {
    const onPrompt = () => setCanPrompt(true)
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed || dismissed) return null
  const ios = isIosSafari()
  if (!ios && !canPrompt) return null

  const close = () => {
    setDismissed(true)
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* stockage indisponible */
    }
  }

  return (
    <div className="relative mb-6 flex items-start gap-3 rounded-[18px] bg-gold-soft/50 p-4 ring-1 ring-gold/25">
      <img src="/apple-touch-icon.png" alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 text-[15px]">
        <p className="font-semibold">Installez Rûh sur votre téléphone</p>
        {ios ? (
          <p className="mt-0.5 text-ink/80">
            Touchez <Icon name="upload" size={15} className="inline align-[-2px] text-primary" /> <strong>Partager</strong> en bas de Safari, puis <strong>« Sur l’écran d’accueil »</strong>. Rûh s’ouvrira comme une vraie application, en plein écran, même hors ligne.
          </p>
        ) : (
          <>
            <p className="mt-0.5 text-ink/80">Ouvrez Rûh comme une vraie application, en plein écran, même hors ligne.</p>
            <Button
              size="sm"
              className="mt-2"
              icon="download"
              onClick={async () => {
                if (!deferred) return
                await deferred.prompt()
                const { outcome } = await deferred.userChoice
                deferred = null
                setCanPrompt(false)
                if (outcome === 'accepted') setInstalled(true)
              }}
            >
              Installer l’application
            </Button>
          </>
        )}
      </div>
      <button onClick={close} className="-m-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted active:bg-ink/[0.06]" aria-label="Masquer ce conseil">
        <Icon name="x" size={16} />
      </button>
    </div>
  )
}
