"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useApp } from '../../hooks/useApp'
import { GlassPanel } from '../ui/GlassPanel'
import { Toast } from '../ui/Toast'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export function Auth() {
  const { authMode, setAuthMode } = useApp()
  const isLogin = authMode === 'login'

  return (
    <div className="relative flex min-h-dvh items-center justify-center p-4">
      <Toast />

      <GlassPanel strong className="w-full max-w-md p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <motion.div
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-[30px] bg-gradient-to-br from-brand-light to-brand-dark text-white shadow-md shadow-brand-medium/20"
            whileHover={{ scale: 1.05 }}
          >
            <MessageCircle className="h-6 w-6" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Comet
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-400">
            Connect and chat with friends
          </p>
        </div>

        <div className="mb-6 flex rounded-[30px] border border-brand-light/35 bg-brand-light/10 p-1">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 rounded-[30px] py-2.5 text-sm font-semibold transition-all duration-300 ${
              isLogin
                ? 'bg-white text-brand-dark shadow-sm border border-brand-light/20'
                : 'text-slate-500 hover:text-brand-deep'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 rounded-[30px] py-2.5 text-sm font-semibold transition-all duration-300 ${
              !isLogin
                ? 'bg-white text-brand-dark shadow-sm border border-brand-light/20'
                : 'text-slate-500 hover:text-brand-deep'
            }`}
          >
            Create Account
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={authMode}
            initial={{ opacity: 0, x: isLogin ? -12 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 12 : -12 }}
            transition={{ duration: 0.2 }}
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </AnimatePresence>

        <p className="mt-6 text-center text-xs font-semibold text-slate-400">
          {isLogin ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-brand-medium underline-offset-2 hover:text-brand-dark hover:underline"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-brand-medium underline-offset-2 hover:text-brand-dark hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </GlassPanel>
    </div>
  )
}
