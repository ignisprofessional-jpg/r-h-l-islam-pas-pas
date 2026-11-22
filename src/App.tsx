import { Component, lazy as reactLazy, Suspense, useEffect, type ComponentType, type ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Loader, ErrorState } from './components/ui'

// Chaque page est chargée à la demande, puis toutes sont préchargées dès que le téléphone est libre :
// la navigation devient instantanée (comme une vraie app).
const loaders: (() => Promise<unknown>)[] = []
const lazy = <T extends ComponentType>(load: () => Promise<{ default: T }>) => {
  loaders.push(load)
  return reactLazy(load)
}
function usePrefetchPages() {
  useEffect(() => {
    const run = () => loaders.forEach((l, i) => setTimeout(() => l().catch(() => undefined), i * 40))
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    if (w.requestIdleCallback) w.requestIdleCallback(run, { timeout: 2500 })
    else setTimeout(run, 1200)
  }, [])
}

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Parcours = lazy(() => import('./pages/Parcours'))
const QuranIndex = lazy(() => import('./pages/QuranIndex'))
const SurahReader = lazy(() => import('./pages/SurahReader'))
const LearnSurahs = lazy(() => import('./pages/LearnSurahs'))
const LearnSurah = lazy(() => import('./pages/LearnSurah'))
const Prayer = lazy(() => import('./pages/Prayer'))
const PrayerGuide = lazy(() => import('./pages/PrayerGuide'))
const PrayerDetail = lazy(() => import('./pages/PrayerDetail'))
const Wudu = lazy(() => import('./pages/Wudu'))
const Arabic = lazy(() => import('./pages/Arabic'))
const Pillars = lazy(() => import('./pages/Pillars'))
const Basics = lazy(() => import('./pages/Basics'))
const Names = lazy(() => import('./pages/Names'))
const LessonPage = lazy(() => import('./pages/LessonPage'))
const Duas = lazy(() => import('./pages/Duas'))
const Dhikr = lazy(() => import('./pages/Dhikr'))
const Halal = lazy(() => import('./pages/Halal'))
const Quizzes = lazy(() => import('./pages/Quizzes'))
const QuizRun = lazy(() => import('./pages/QuizRun'))
const Calendar = lazy(() => import('./pages/Calendar'))
const QAPage = lazy(() => import('./pages/QAPage'))
const ProgressPage = lazy(() => import('./pages/ProgressPage'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Settings = lazy(() => import('./pages/Settings'))
const Account = lazy(() => import('./pages/Account'))
const NotFound = lazy(() => import('./pages/NotFound'))

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error)
      return (
        <div className="mx-auto max-w-xl py-16">
          <ErrorState
            message="Une erreur inattendue est survenue sur cette page. Vos progrès sont conservés. Rechargez la page pour continuer."
            onRetry={() => {
              this.setState({ error: null })
              location.reload()
            }}
          />
        </div>
      )
    return this.props.children
  }
}

export default function App() {
  usePrefetchPages()
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            {[
              ['/', Dashboard],
              ['/parcours', Parcours],
              ['/coran', QuranIndex],
              ['/coran/:id', SurahReader],
              ['/sourates', LearnSurahs],
              ['/sourates/:id', LearnSurah],
              ['/priere', Prayer],
              ['/priere/guide', PrayerGuide],
              ['/priere/:id', PrayerDetail],
              ['/ablutions', Wudu],
              ['/arabe', Arabic],
              ['/piliers', Pillars],
              ['/bases', Basics],
              ['/bases/noms-allah', Names],
              ['/cours/:id', LessonPage],
              ['/douas', Duas],
              ['/dhikr', Dhikr],
              ['/halal', Halal],
              ['/quiz', Quizzes],
              ['/quiz/:id', QuizRun],
              ['/calendrier', Calendar],
              ['/questions', QAPage],
              ['/progression', ProgressPage],
              ['/favoris', Favorites],
              ['/reglages', Settings],
              ['/compte', Account],
              ['*', NotFound],
            ].map(([path, Page]) => {
              const P = Page as React.ComponentType
              return (
                <Route
                  key={path as string}
                  path={path as string}
                  element={
                    <Suspense fallback={<Loader />}>
                      <P />
                    </Suspense>
                  }
                />
              )
            })}
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
