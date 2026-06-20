import { Suspense } from 'react'
import AppContentClient from './components/AppContentClient'
import { LoadingScreen } from './components/ui/LoadingScreen'

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppContentClient />
    </Suspense>
  )
}
