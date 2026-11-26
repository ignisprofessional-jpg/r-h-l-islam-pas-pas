import { Link } from 'react-router-dom'
import { LEARN_SURAHS } from '../data/learnSurahs'
import chapters from '../data/chapters.json'
import { useApp } from '../lib/store'
import { useDocumentTitle } from '../lib/hooks'
import { Badge, Card, Note, PageHeader, ProgressBar, cx } from '../components/ui'
import { Icon } from '../components/Icon'

export default function LearnSurahs() {
  useDocumentTitle('Sourates à apprendre')
  const surahs = useApp((s) => s.surahs)
  const learned = LEARN_SURAHS.filter((s) => surahs[s.id]?.learned).length
  return (
    <div className="animate-in">
      <PageHeader title="Les sourates à apprendre" arabic="الحفظ" icon="sparkle" subtitle="Un parcours progressif de dix sourates courtes, idéales pour la prière. Pour chacune : texte arabe, phonétique, traduction, audio, explication verset par verset et exercices de mémorisation.">
        <div className="flex items-center gap-3">
          <ProgressBar value={(learned / LEARN_SURAHS.length) * 100} className="max-w-sm" label="Sourates maîtrisées" />
          <span className="text-sm font-semibold">
            {learned}/{LEARN_SURAHS.length} maîtrisées
          </span>
        </div>
      </PageHeader>

      <Note tone="tip" title="Méthode conseillée">
        Une sourate à la fois, un verset à la fois. Écoutez, répétez 5 à 10 fois, puis enchaînez avec le verset précédent. Récitez ce que vous savez dans vos prières : c’est la meilleure révision.
      </Note>

      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {LEARN_SURAHS.map((s) => {
          const ch = chapters.find((c) => c.id === s.id)!
          const st = surahs[s.id]
          return (
            <li key={s.id}>
              <Link to={`/sourates/${s.id}`} className="group flex h-full gap-4 rounded-[16px] bg-surface ring-1 ring-ink/[0.06] p-4 transition-all hover:ring-gold/45">
                <span className={cx('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-medium', st?.learned ? 'bg-primary text-primary-ink' : 'bg-gold-soft text-gold')}>
                  {st?.learned ? <Icon name="check" strokeWidth={3} /> : s.order}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span>
                      <span className="block font-semibold">{s.name}</span>
                      <span className="text-sm text-muted">
                        {s.meaning} · {ch.versesCount} versets · sourate {s.id}
                      </span>
                    </span>
                    <span className="arabic shrink-0 text-2xl leading-none text-primary">{ch.nameArabic}</span>
                  </span>
                  <span className="mt-1 hidden text-sm text-ink/80 sm:block">{s.why}</span>
                  <span className="mt-2 flex gap-1.5">
                    {st?.learned ? <Badge tone="green">Maîtrisée</Badge> : st?.learning ? <Badge tone="gold">En cours</Badge> : <Badge>À apprendre</Badge>}
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
      <Card className="mt-6 p-4 text-sm text-muted">
        Envie d’aller plus loin ? Toutes les sourates du Coran sont disponibles dans le <Link to="/coran" className="font-semibold text-primary hover:underline">lecteur</Link>, et vous pouvez marquer n’importe quelle sourate comme apprise.
      </Card>
    </div>
  )
}
