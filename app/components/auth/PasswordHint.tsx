import { isPasswordValid } from '../../utils/validation'

interface PasswordHintProps {
  password: string
  show: boolean
}

export function PasswordHint({ password, show }: PasswordHintProps) {
  if (!show || !password) return null

  const valid = isPasswordValid(password)

  return (
    <p
      className={`text-xs ml-3 transition-colors duration-200 font-medium ${
        valid ? 'text-emerald-600' : 'text-rose-500'
      }`}
    >
      {valid
        ? 'Password meets requirements'
        : 'Password must contain at least one letter and one number'}
    </p>
  )
}
