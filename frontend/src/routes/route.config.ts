import { createElement } from 'react'
import type { RouteObject } from 'react-router-dom'

import { AboutPage } from '@/features/about'
import { HomePage } from '@/features/home'
import { ProductionsPage } from '@/features/productions'
import { SanghaPage } from '@/features/sangha'
import { MainLayout } from '@/routes/layouts'
import { ROUTES } from '@/shared/constants/routes'

export const routeConfig: RouteObject[] = [
  {
    element: createElement(MainLayout),
    children: [
      { path: ROUTES.HOME, element: createElement(HomePage) },
      { path: ROUTES.PRODUCTIONS, element: createElement(ProductionsPage) },
      { path: ROUTES.ABOUT, element: createElement(AboutPage) },
      { path: ROUTES.SANGHA, element: createElement(SanghaPage) },
    ],
  },
]
