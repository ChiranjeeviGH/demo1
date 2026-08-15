import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/shared/contexts/AuthContext'
import { ROUTES } from '@/shared/constants/routes'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace state={{ from: location }} />
  }

  return <Outlet />
}
