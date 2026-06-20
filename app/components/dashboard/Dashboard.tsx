"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Toast } from '../ui/Toast'
import { ChatWindow } from './ChatWindow'
import { Sidebar } from './Sidebar'
import { SettingsPage } from './SettingsPage'
import { useApp } from '../../hooks/useApp'

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { activeView, setActiveView } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex h-dvh overflow-hidden bg-gradient-to-tr from-brand-light/10 via-white/50 to-brand-medium/5 p-4 lg:p-6 gap-4 lg:gap-6"
    >
      <Toast />
      <Sidebar
        open={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 lg:gap-6">
        {activeView === 'settings' ? (
          <SettingsPage onClose={() => setActiveView('chat')} />
        ) : (
          <ChatWindow onOpenSidebar={() => setSidebarOpen(true)} />
        )}
      </div>
    </motion.div>
  )
}
