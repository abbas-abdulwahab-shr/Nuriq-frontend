import { createLazyFileRoute } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'
import { useStore } from '@tanstack/react-store'
import { useQuery } from '@tanstack/react-query'

import WorkflowCalendar from '@/components/workflow/WorkflowCalendar'
import { Loader } from '@/components/Loader'
import { getCommercialWorkflowData } from '@/services/workflowServices'

import { appStore } from '@/appStore'

export const Route = createLazyFileRoute('/_appLayout/workflow')({
  component: RouteComponent,
})

function RouteComponent() {
  const lastCreatedFormularId = useStore(
    appStore,
    (state) => state.lastCreatedFormularId,
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ['workflow', lastCreatedFormularId],
    queryFn: async () => {
      const response: any = await getCommercialWorkflowData(
        lastCreatedFormularId!,
      )
      return response.data
    },
    enabled: !!lastCreatedFormularId, // only run when ID exists
    refetchOnWindowFocus: false, // don't refetch on tab focus
  })

  const formattedWorkflowTableData = data?.timeline_data.stages.map(
    (stage: any, index: number) => {
      // Calculate startWeek and endWeek based on previous stages' durations
      let startWeek = 1
      if (index > 0) {
        // Sum durations of all previous stages
        startWeek = data.timeline_data.stages
          .slice(0, index)
          .reduce((acc: number, curr: any) => acc + curr.duration_weeks, 0)
      }
      const duration = stage.duration_weeks
      let endWeek = startWeek + duration - 1
      if (index > 0) {
        endWeek = startWeek + duration + 1
      }

      return {
        id: `stage${index + 1}`,
        name: stage.stage_name,
        color: `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')}`,
        tasks: [
          {
            id: `t${index + 1}`,
            name: stage.stage_name,
            startWeek,
            endWeek,
          },
        ],
      }
    },
  )

  const timeLineSummary = data?.timeline_data.stages.map((stage: any) => {
    return {
      label: stage.stage_name,
      description: stage.notes,
      value: `${stage.duration_weeks} weeks`,
    }
  })

  const OptimizedTimeline = data?.timeline_data.stages.map((stage: any) => {
    return {
      label: stage.stage_name,
      description: stage.notes,
      time:
        stage.duration_weeks > 1
          ? `${stage.duration_weeks - 1} weeks`
          : `6 days`,
    }
  })

  const AIRiskCallout = data?.risks.map((riskItem: any) => {
    return {
      risk: riskItem.description,
      recommendation: riskItem.recommendation,
    }
  })

  useLayoutEffect(() => {
    document.title = 'Workflow - Nuriq'
  }, [])
  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Commercialization Workflow</h1>
        {data && (
          <button className="px-4 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500">
            Export to Brief
          </button>
        )}
      </header>
      {isLoading && <Loader text="Loading workflow data..." />}

      {error && (
        <div className="text-red-500 text-xl mt-10 font-semibold">
          Error retrieving workflow data. kindly generate new workflow from the
          formula section
        </div>
      )}

      {data && (
        <div>
          <section className="flex justify-between">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xl font-semibold mb-2">
                  {data.product_name}
                </p>
                <p>
                  Estimated launch: {data.timeline_data.sequential_weeks} weeks
                  from today
                </p>
              </div>
              <button className="px-4 py-2 text-[12px] border border-[#D0D5DD] text-[#1a1a1a] rounded-full bg-transparent hover:bg-yellow-500 hover:border-yellow-500">
                Adjust timeline
              </button>
            </div>
            <div className="flex items-center gap-6">
              <p>
                {new Date()
                  .toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                  .replace(/ /g, '-')
                  .toUpperCase()}
              </p>
              <button className="px-4 py-2 text-[12px] border border-[#D0D5DD] text-[#1a1a1a] rounded-full bg-transparent hover:bg-yellow-500 hover:border-yellow-500">
                Change view
              </button>
            </div>
          </section>

          <WorkflowCalendar
            eventStages={formattedWorkflowTableData}
            TOTAL_WEEKS={data.timeline_data.sequential_weeks}
          />

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D9D9D9]">
            <div className="flex justify-between mb-6 align-start">
              <div className="flex-1 px-5">
                <p className="mb-4 text-[#6C6C6C]">Timeline Summary</p>
                {timeLineSummary.map((item: any) => (
                  <div key={item.label} className=" mb-3">
                    <div className="flex justify-between w-full">
                      <p className="text-[#1A1A1A] mb-0.5 font-semibold">
                        {item.label}
                      </p>
                      <p className="font-semibold text-[#1A1A1A] text-[13px]">
                        {item.value}
                      </p>
                    </div>
                    <p className="text-[14px] text-[#6C6C6C] max-w-[298px]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex-1.5 border-l border-[#CDD0D5] px-5">
                <p className="mb-4 text-[#6C6C6C]">Optimized Timeline</p>
                {OptimizedTimeline.map((item: any) => (
                  <div
                    key={item.label}
                    className=" mb-3 flex justify-between align-start"
                  >
                    <div>
                      <p className="text-[#1A1A1A] mb-0.5 font-semibold">
                        {item.label}
                      </p>
                      <p className="text-[14px] text-[#6C6C6C] max-w-[360px]">
                        {item.description}
                      </p>
                    </div>
                    <p className="font-semibold text-[#1A1A1A] text-[13px]">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>

              <div className=" flex-0.5 border-l border-[#CDD0D5] px-5">
                <p className="mb-4 text-[#6C6C6C]">AI Risk Callout</p>
                {AIRiskCallout.map((item: any, index: number) => (
                  <div key={index} className=" mb-3">
                    <div className="max-w-[298px]">
                      <p className="text-[#6C6C6C] mb-1 text-[14px]">
                        <strong className="text-[#1A1A1A]">⚠️ Risk:</strong>{' '}
                        {item?.risk}
                      </p>
                      <p className="text-[14px] text-[#6C6C6C]">
                        <strong className="text-[#1A1A1A]">
                          ✅ Recommendation:
                        </strong>{' '}
                        {item?.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#1A1A1A] font-semibold text-[18px] mb-3">
              Time calculation :
            </p>
            <div className="flex justify-between align-start gap-10 mb-2 text-[15px]">
              <div className="">
                <p>
                  Sequential Time (Baseline):{' '}
                  {data.timeline_data.sequential_weeks} weeks
                </p>
                <p>( stacked one after another)</p>
              </div>
              <div className="">
                <p>
                  Optimized Time (Parallelized):{' '}
                  {data.timeline_data.optimized_weeks} weeks
                </p>
                <p>
                  (AI suggestion: overlap packaging & QA with ingredient prep;
                  secure faster supplier)
                </p>
              </div>
            </div>
          </div>

          <footer className="flex align-center justify-center my-12">
            <button className="px-4 mx-auto py-2 bg-transparent text-[#1a1a1a] rounded-full border border-[#1a1a1a] hover:bg-yellow-500 hover:border-yellow-500">
              Go-to pitch brief
            </button>
          </footer>
        </div>
      )}
    </div>
  )
}
