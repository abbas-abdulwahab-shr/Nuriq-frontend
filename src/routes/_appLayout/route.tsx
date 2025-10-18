import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { appStore } from '@/appStore'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export const Route = createFileRoute('/_appLayout')({
  beforeLoad: () => {
    const { isAuthenticated } = appStore.state

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="mt-[186px] ml-22 mr-[48px]">
        <Outlet />
      </main>
    </>
  )
}
