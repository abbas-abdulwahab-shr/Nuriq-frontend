import { Outlet, createFileRoute } from '@tanstack/react-router'
import nuricLogo from '/nuriq-logo.png'

export const Route = createFileRoute('/_authLayout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#F5F5F5]">
      <div className="flex flex-col items-center">
        <img src={nuricLogo} alt="nuric logo" className="h-[64px] w-[64px]" />
        <span className="font-extrabold text-xl text-[#000000]">NURiQ</span>
      </div>
      <div className="mt-2">
        <Outlet />
      </div>
    </div>
  )
}
