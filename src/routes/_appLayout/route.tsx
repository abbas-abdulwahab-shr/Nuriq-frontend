import { Outlet, createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export const Route = createFileRoute('/_appLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="mt-[186px] ml-22 mr-[48px] bg-[#F5F5F5]">
        <Outlet />
      </main>
    </>
  )
}
