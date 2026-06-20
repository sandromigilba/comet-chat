"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { Auth } from './auth/Auth'
import { Dashboard } from './dashboard/Dashboard'
import { LoadingScreen } from './ui/LoadingScreen'
import { useApp } from '../hooks/useApp'

export default function AppContentClient() {
  const { dbReady, session } = useApp()

  if (!dbReady) {
    return <LoadingScreen />
  }

  const view = session ? 'dashboard' : 'auth'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="h-dvh"
      >
        {session ? <Dashboard /> : <Auth />}
      </motion.div>
    </AnimatePresence>
  )
}
