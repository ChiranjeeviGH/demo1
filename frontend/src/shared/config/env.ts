const readEnv = (key: string, fallback = '') => {
  const value = import.meta.env[key]
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

export const env = {
  appName: readEnv('VITE_APP_NAME', 'DAALI'),
  enableDevtools: readEnv('VITE_ENABLE_DEVTOOLS', 'false') === 'true',
} as const
