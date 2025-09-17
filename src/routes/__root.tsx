import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Sidebar />
      <main className="mt-[186px] ml-22 mr-[48px] bg-[#F5F5F5]">
        <Outlet />
      </main>
      <TanstackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})
