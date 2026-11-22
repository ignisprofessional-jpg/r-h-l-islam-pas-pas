import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { quizById } from '../lib/quizzes'
import { useApp } from '../lib/store'
import { useAsync, useDocumentTitle } from '../lib/hooks'
import { Button, ErrorState, Loader, PageHeader } from '../components/ui'
import { Quiz } from '../components/Quiz'
import NotFound from './NotFound'

export default function QuizRun() {
  const { id = '' } = useParams()
  const def = quizById(id)
  useDocumentTitle(def ? `Quiz : ${def.title}` : 'Quiz')
  const translation = useApp((s) => s.settings.translation)
  const [round, setRound] = useState(0)
  const { data, error, loading, retry } = useAsync(async () => (def ? def.build(translation) : []), [id, round])
  if (!def) return <NotFound />
  return (
    <div className="animate-in">
      <PageHeader title={def.title} subtitle={def.text} icon={def.icon} back={{ to: '/quiz', label: 'Tous les quiz' }} />
      <div className="mx-auto max-w-2xl">
        {loading && <Loader label="Préparation des questions…" />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {data && <Quiz key={round} id={def.id} questions={data} title={def.title} shuffleQuestions={false} arabicOptions={def.arabicOptions} />}
        <div className="mt-3 flex justify-center">
          <Button variant="ghost" icon="shuffle" onClick={() => setRound((r) => r + 1)}>
            Nouvelle série de questions
          </Button>
        </div>
      </div>
    </div>
  )
}
