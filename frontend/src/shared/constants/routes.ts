export const ROUTES = {
  HOME: '/',
  PRODUCTIONS: '/productions',
  ABOUT: '/about',
  SANGHA: '/sangha',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

export const NAV_LINKS = [
  { label: 'HOME', to: ROUTES.HOME },
  { label: 'PRODUCTIONS', to: ROUTES.PRODUCTIONS },
  { label: 'ABOUT', to: ROUTES.ABOUT },
  { label: "DAALI'S ABHIMANI SANGHA", to: ROUTES.SANGHA },
] as const
