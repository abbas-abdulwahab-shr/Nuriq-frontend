import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/workflow')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-[40px] font-semibold">
        workflow page under development
      </p>
    </div>
  )
}
