import { Outlet } from 'react-router-dom'

import { AppShell } from '@/shared/components/layout/AppShell'

export function MainLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
