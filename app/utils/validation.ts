const PASSWORD_RULE = /(?=.*[A-Za-z])(?=.*\d)/

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase()
}

export function isPasswordValid(password: string): boolean {
  return PASSWORD_RULE.test(password)
}

export function isUsernameValid(username: string): boolean {
  const normalized = normalizeUsername(username)
  return normalized.length >= 2 && /^[a-z0-9_]+$/.test(normalized)
}
