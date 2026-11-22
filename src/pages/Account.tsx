import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cloudEnabled } from '../lib/supabase'
import { auth, useSync, type SyncStatus } from '../lib/sync'
import { useDocumentTitle } from '../lib/hooks'
import { relativeFr } from '../lib/dates'
import { Button, Card, Note, PageHeader, Tabs, cx, toast } from '../components/ui'
import { Icon } from '../components/Icon'

export const STATUS_LABEL: Record<SyncStatus, { text: string; tone: string; icon: string }> = {
  off: { text: 'Sur cet appareil uniquement', tone: 'text-muted', icon: 'info' },
  'signed-out': { text: 'Non connecté · sauvegarde sur cet appareil', tone: 'text-muted', icon: 'user' },
  syncing: { text: 'Synchronisation…', tone: 'text-gold', icon: 'refresh' },
  synced: { text: 'Synchronisé avec votre compte', tone: 'text-primary', icon: 'checkCircle' },
  offline: { text: 'Hors ligne · synchronisation au retour du réseau', tone: 'text-gold', icon: 'alert' },
  error: { text: 'Erreur de synchronisation', tone: 'text-danger', icon: 'alert' },
}

const inputCls = 'h-12 w-full rounded-xl border border-line bg-bg px-3 text-[16px] outline-none focus:border-primary'

function AuthForms() {
  const [mode, setMode] = useState<'login' | 'signup' | 'magic' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    try {
      if (mode === 'login') {
        await auth.signIn(email.trim(), password)
        toast('Connexion réussie')
      } else if (mode === 'signup') {
        const r = await auth.signUp(email.trim(), password)
        if (r.data.session) toast('Compte créé, bienvenue !')
        else setMsg({ ok: true, text: 'Compte créé. Ouvrez l’e-mail de confirmation que nous venons de vous envoyer, puis revenez vous connecter.' })
      } else if (mode === 'magic') {
        await auth.magicLink(email.trim())
        setMsg({ ok: true, text: 'Un lien de connexion vous a été envoyé par e-mail. Ouvrez-le sur cet appareil.' })
      } else {
        await auth.resetPassword(email.trim())
        setMsg({ ok: true, text: 'Si un compte existe avec cette adresse, un e-mail de réinitialisation vient d’être envoyé.' })
      }
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : 'Erreur' })
    } finally {
      setBusy(false)
    }
  }

  const needsPassword = mode === 'login' || mode === 'signup'
  return (
    <Card className="p-5 sm:p-6">
      <Tabs
        className="mb-5"
        value={mode === 'reset' ? 'login' : mode}
        onChange={(m) => {
          setMode(m)
          setMsg(null)
        }}
        tabs={[
          { id: 'login', label: 'Se connecter', icon: 'user' },
          { id: 'signup', label: 'Créer un compte', icon: 'plus' },
          { id: 'magic', label: 'Lien par e-mail', icon: 'sparkle' },
        ]}
      />
      {mode === 'reset' && <p className="mb-3 text-sm text-muted">Indiquez votre adresse : vous recevrez un lien pour choisir un nouveau mot de passe.</p>}
      {mode === 'magic' && <p className="mb-3 text-sm text-muted">Pas de mot de passe à retenir : recevez un lien de connexion par e-mail.</p>}
      <form onSubmit={submit} className="space-y-3">
        <label className="block text-sm">
          <span className="mb-1 block font-semibold">Adresse e-mail</span>
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </label>
        {needsPassword && (
          <label className="block text-sm">
            <span className="mb-1 block font-semibold">Mot de passe {mode === 'signup' && <span className="font-normal text-muted">(6 caractères minimum)</span>}</span>
            <input type="password" required minLength={6} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
          </label>
        )}
        {msg && <p className={cx('rounded-xl p-3 text-sm', msg.ok ? 'bg-primary-soft text-ink' : 'bg-danger-soft text-danger')} role="status">{msg.text}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={busy} icon={busy ? undefined : 'arrowRight'}>
          {busy ? 'Un instant…' : { login: 'Se connecter', signup: 'Créer mon compte', magic: 'Recevoir le lien', reset: 'Recevoir le lien de réinitialisation' }[mode]}
        </Button>
      </form>
      {mode === 'login' && (
        <button onClick={() => setMode('reset')} className="mt-3 text-sm font-semibold text-primary hover:underline">
          Mot de passe oublié ?
        </button>
      )}
      {mode === 'reset' && (
        <button onClick={() => setMode('login')} className="mt-3 text-sm font-semibold text-primary hover:underline">
          Retour à la connexion
        </button>
      )}
    </Card>
  )
}

function NewPassword() {
  const [pw, setPw] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  return (
    <Card className="mb-5 p-5">
      <p className="font-display text-2xl font-semibold">Choisir un nouveau mot de passe</p>
      <form
        className="mt-3 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault()
          setBusy(true)
          setErr('')
          try {
            await auth.updatePassword(pw)
            toast('Mot de passe modifié')
          } catch (x) {
            setErr(x instanceof Error ? x.message : 'Erreur')
          } finally {
            setBusy(false)
          }
        }}
      >
        <input type="password" required minLength={6} autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} className={inputCls} aria-label="Nouveau mot de passe" />
        {err && <p className="text-sm text-danger">{err}</p>}
        <Button type="submit" disabled={busy} icon="check">
          Enregistrer
        </Button>
      </form>
    </Card>
  )
}

function SignedIn() {
  const { email, status, lastSync, error } = useSync()
  const [confirm, setConfirm] = useState<'out' | 'delete' | null>(null)
  const [busy, setBusy] = useState(false)
  const st = STATUS_LABEL[status]
  return (
    <div className="space-y-5">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-ink">
            <Icon name="user" size={26} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted">Connecté avec</p>
            <p className="truncate text-lg font-semibold">{email}</p>
            <p className={cx('mt-1 flex items-center gap-1.5 text-sm font-semibold', st.tone)}>
              <Icon name={st.icon} size={15} className={status === 'syncing' ? 'animate-spin' : ''} /> {st.text}
              {lastSync && status === 'synced' && <span className="font-normal text-muted">· {relativeFr(lastSync)}</span>}
            </p>
            {error && <p className="mt-1 text-xs text-danger">{error}</p>}
          </div>
          <Button variant="secondary" icon="refresh" disabled={status === 'syncing'} onClick={() => auth.syncNow().then(() => toast('Progression synchronisée'))}>
            Synchroniser
          </Button>
        </div>
        <p className="mt-4 text-[15px] text-ink/85">
          Votre progression (leçons, sourates, quiz, invocations, favoris, objectifs, calendrier, réglages) est enregistrée sur cet appareil <strong>et</strong> dans votre compte. Connectez-vous avec la même adresse sur un autre téléphone ou ordinateur pour la retrouver.
        </p>
      </Card>

      <Card className="p-5">
        {confirm === null && (
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" icon="arrowLeft" onClick={() => setConfirm('out')}>
              Se déconnecter
            </Button>
            <Button variant="danger" icon="trash" onClick={() => setConfirm('delete')}>
              Supprimer mes données en ligne
            </Button>
          </div>
        )}
        {confirm === 'out' && (
          <div>
            <p className="font-semibold">Que faire de la progression sur cet appareil ?</p>
            <p className="text-sm text-muted">Dans les deux cas, elle reste en sécurité dans votre compte.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button disabled={busy} onClick={async () => { setBusy(true); await auth.signOut(false); setBusy(false); toast('Déconnecté') }}>
                La garder ici
              </Button>
              <Button variant="secondary" disabled={busy} onClick={async () => { setBusy(true); await auth.signOut(true); setBusy(false); toast('Déconnecté, appareil vidé') }}>
                L’effacer de cet appareil
              </Button>
              <Button variant="ghost" onClick={() => setConfirm(null)}>
                Annuler
              </Button>
            </div>
          </div>
        )}
        {confirm === 'delete' && (
          <div className="rounded-xl bg-danger-soft p-4">
            <p className="font-semibold text-danger">Supprimer définitivement la progression enregistrée dans votre compte ?</p>
            <p className="text-sm text-ink/80">La copie présente sur cet appareil est conservée, et vous serez déconnecté. Cette suppression en ligne ne peut pas être annulée.</p>
            <div className="mt-3 flex gap-2">
              <Button
                variant="danger"
                disabled={busy}
                onClick={async () => {
                  setBusy(true)
                  try {
                    await auth.deleteCloudDataAndSignOut()
                    toast('Données en ligne supprimées')
                  } catch (e) {
                    toast(e instanceof Error ? e.message : 'Erreur')
                  } finally {
                    setBusy(false)
                    setConfirm(null)
                  }
                }}
              >
                Oui, supprimer
              </Button>
              <Button variant="secondary" onClick={() => setConfirm(null)}>
                Annuler
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default function Account() {
  useDocumentTitle('Mon compte')
  const { userId, recovery } = useSync()
  return (
    <div className="animate-in">
      <PageHeader title="Mon compte" icon="user" subtitle="Un compte gratuit permet de retrouver votre progression sur tous vos appareils. Il reste facultatif : sans compte, tout est enregistré sur cet appareil." />
      {!cloudEnabled ? (
        <>
          <Note tone="info" title="Les comptes en ligne ne sont pas encore activés sur ce site">
            Votre progression est enregistrée sur cet appareil. Pour activer les comptes, la personne qui gère le site doit relier un projet Supabase (voir le fichier README, section « Activer les comptes »). En attendant, vous pouvez transférer votre progression grâce à la sauvegarde dans les <Link to="/reglages" className="font-semibold text-primary underline">Réglages</Link>.
          </Note>
        </>
      ) : (
        <div className="mx-auto max-w-2xl">
          {recovery && userId && <NewPassword />}
          {userId ? <SignedIn /> : <AuthForms />}
          {!userId && (
            <Note tone="gentle" title="Votre progression actuelle n’est pas perdue">
              À la première connexion, la progression déjà enregistrée sur cet appareil est fusionnée avec celle de votre compte : rien n’est effacé.
            </Note>
          )}
          <p className="mt-4 text-xs text-muted">
            Comptes et stockage : Supabase. Seuls votre e-mail et votre progression d’apprentissage sont enregistrés ; chaque compte n’a accès qu’à ses propres données.
          </p>
        </div>
      )}
    </div>
  )
}
