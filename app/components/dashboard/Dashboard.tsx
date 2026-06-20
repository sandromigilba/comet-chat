"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Toast } from '../ui/Toast'
import { ChatWindow } from './ChatWindow'
import { Sidebar } from './Sidebar'

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex h-dvh overflow-hidden bg-gradient-to-tr from-brand-light/10 via-white/50 to-brand-medium/5 p-0 dark:from-brand-deep dark:via-brand-deep/90 dark:to-brand-dark/40"
    >
      <Toast />
      <Sidebar
        open={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col pt-16 lg:pt-0">
        <ChatWindow />
      </div>
    </motion.div>
  )
}
