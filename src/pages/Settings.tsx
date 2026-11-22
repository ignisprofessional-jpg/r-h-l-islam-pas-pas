import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp, exportData, type Theme } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { clearDataCache, TRANSLATIONS, RECITERS } from '../lib/api'
import { LEVELS } from '../data/lessons'
import { Button, Card, Note, PageHeader, SectionTitle, Toggle, cx, toast } from '../components/ui'
import { LocationForm } from '../components/Widgets'

export default function Settings() {
  useDocumentTitle('Réglages')
  const s = useApp()
  const [name, setName] = useState(s.profile.name)
  const [confirmReset, setConfirmReset] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const doExport = () => {
    const blob = new Blob([JSON.stringify(exportData(), null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `ruh-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    toast('Sauvegarde téléchargée')
  }

  const doImport = async (file: File) => {
    try {
      const json = JSON.parse(await file.text())
      if (!['ruh', 'mon-chemin-vers-islam'].includes(json?.app) || !json.data) throw new Error()
      s.importData(json.data)
      setName(json.data.profile?.name ?? '')
      toast('Progression restaurée')
    } catch {
      toast('Fichier invalide : choisissez une sauvegarde de ce site')
    }
  }

  return (
    <div className="animate-in">
      <PageHeader title="Réglages" icon="settings" subtitle="Votre profil, l’apparence, la lecture du Coran, les horaires de prière et la sauvegarde de vos données." />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <SectionTitle>Profil</SectionTitle>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              s.setProfile({ name: name.trim(), onboarded: true })
              toast('Profil enregistré')
            }}
          >
            <label className="block text-sm">
              <span className="mb-1 block font-semibold">Prénom (facultatif)</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-xl border border-line bg-bg px-3 outline-none focus:border-primary" />
            </label>
            <div>
              <p className="mb-1 text-sm font-semibold">Niveau actuel</p>
              <div className="grid grid-cols-3 gap-2">
                {LEVELS.map((l) => (
                  <button type="button" key={l.id} onClick={() => s.setProfile({ level: l.id })} className={cx('h-11 rounded-xl border text-sm font-semibold', s.profile.level === l.id ? 'border-primary bg-primary-soft text-primary' : 'border-line')}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" icon="check">
              Enregistrer
            </Button>
          </form>
        </Card>

        <Card className="p-5">
          <SectionTitle>Apparence</SectionTitle>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ['light', 'Clair'],
                ['dark', 'Sombre'],
                ['system', 'Automatique'],
              ] as [Theme, string][]
            ).map(([t, l]) => (
              <button key={t} onClick={() => s.setTheme(t)} className={cx('h-11 rounded-xl border text-sm font-semibold', s.theme === t ? 'border-primary bg-primary-soft text-primary' : 'border-line')}>
                {l}
              </button>
            ))}
          </div>
          <div className="mt-4 divide-y divide-line rounded-xl border border-line px-3">
            <Toggle label="Mode lent par défaut dans le guide de prière" checked={s.settings.slowMode} onChange={(v) => s.setSettings({ slowMode: v })} />
            <Toggle label="Afficher la translittération du Coran" checked={s.settings.showTranslit} onChange={(v) => s.setSettings({ showTranslit: v })} />
            <Toggle label="Afficher la traduction du Coran" checked={s.settings.showTranslation} onChange={(v) => s.setSettings({ showTranslation: v })} />
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>Lecture du Coran</SectionTitle>
          <label className="mb-3 block text-sm">
            <span className="mb-1 block font-semibold">Traduction</span>
            <select value={s.settings.translation} onChange={(e) => s.setSettings({ translation: Number(e.target.value) })} className="h-11 w-full rounded-xl border border-line bg-bg px-3">
              {TRANSLATIONS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-semibold">Récitateur</span>
            <select value={s.settings.reciter} onChange={(e) => s.setSettings({ reciter: Number(e.target.value) })} className="h-11 w-full rounded-xl border border-line bg-bg px-3">
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.style}
                </option>
              ))}
            </select>
          </label>
          <Button
            className="mt-4"
            variant="secondary"
            icon="refresh"
            onClick={async () => {
              await clearDataCache()
              toast('Cache des textes vidé')
            }}
          >
            Vider le cache des textes coraniques
          </Button>
        </Card>

        <Card className="p-5">
          <SectionTitle>Horaires de prière</SectionTitle>
          <LocationForm />
        </Card>
      </div>

      <SectionTitle>Mes données</SectionTitle>
      <Card className="p-5">
        <p className="text-[15px]">
          Votre progression est <strong>enregistrée automatiquement</strong> sur cet appareil. Pour la retrouver sur tous vos appareils, connectez-vous à <Link to="/compte" className="font-semibold text-primary underline">votre compte</Link>. Vous pouvez aussi télécharger une sauvegarde et la restaurer.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button icon="download" onClick={doExport}>
            Télécharger ma sauvegarde
          </Button>
          <Button variant="secondary" icon="upload" onClick={() => fileRef.current?.click()}>
            Restaurer une sauvegarde
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) doImport(f)
              e.target.value = ''
            }}
          />
        </div>
        <div className="mt-6 border-t border-line pt-4">
          {!confirmReset ? (
            <Button variant="danger" icon="trash" onClick={() => setConfirmReset(true)}>
              Effacer toute ma progression
            </Button>
          ) : (
            <div className="rounded-xl bg-danger-soft p-4">
              <p className="font-semibold text-danger">Effacer définitivement toute votre progression sur cet appareil ?</p>
              <p className="text-sm text-ink/80">Leçons, sourates, favoris, objectifs et statistiques seront supprimés (y compris dans votre compte si vous êtes connecté). Cette action ne peut pas être annulée (sauf si vous avez téléchargé une sauvegarde).</p>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="danger"
                  onClick={() => {
                    s.resetAll()
                    setName('')
                    setConfirmReset(false)
                    toast('Progression effacée')
                  }}
                >
                  Oui, tout effacer
                </Button>
                <Button variant="secondary" onClick={() => setConfirmReset(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Note tone="info" title="Sources des données">
        Texte coranique, traductions (Rachid Maach, Muhammad Hamidullah), translittération, récitations et tafsirs : API Quran.com (Quran Foundation). Recherche dans le Coran : API AlQuran.cloud. Horaires de prière et liste des noms d’Allah : API Aladhan. Calendrier hégirien : calendrier Umm al-Qura intégré au navigateur. Les hadiths sont cités avec leur référence dans les recueils reconnus.
      </Note>
    </div>
  )
}
