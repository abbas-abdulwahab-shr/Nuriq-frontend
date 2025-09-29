import { createLazyFileRoute } from '@tanstack/react-router'

import type { Stage } from '@/components/workflow/WorkflowCalendar'
import WorkflowCalendar from '@/components/workflow/WorkflowCalendar'

export const Route = createLazyFileRoute('/_appLayout/workflow')({
  component: RouteComponent,
})

const initialStages: Array<Stage> = [
  {
    id: 'stage1',
    name: 'Product',
    color: '#60A5FA',
    tasks: [{ id: 't1', name: 'Market Study', startWeek: 1, endWeek: 3 }],
  },
  {
    id: 'stage2',
    name: 'Ideation Development',
    color: '#34D399',
    tasks: [
      { id: 't2', name: 'Ideation Development', startWeek: 2, endWeek: 4 },
    ],
  },
  {
    id: 'stage3',
    name: 'Packaging',
    color: '#34D399',
    tasks: [{ id: 't3', name: 'Packaging', startWeek: 3, endWeek: 4 }],
  },
  {
    id: 'stage4',
    name: 'Ingredient',
    color: '#E63F67',
    tasks: [{ id: 't4', name: 'Ingredient', startWeek: 3, endWeek: 5 }],
  },
  {
    id: 'stage5',
    name: 'Production timeline',
    color: '#49536E',
    tasks: [
      { id: 't2', name: 'Production timeline', startWeek: 5, endWeek: 7 },
    ],
  },
  {
    id: 'stage6',
    name: 'Delivery',
    color: '#49536E',
    tasks: [{ id: 't5', name: 'Delivery ', startWeek: 6, endWeek: 7 }],
  },
  {
    id: 'stage7',
    name: 'Launch',
    color: '#207153',
    tasks: [{ id: 't6', name: 'Launch', startWeek: 5, endWeek: 7 }],
  },
]

const timeLineSummary = [
  {
    label: 'Ingredient lead time:',
    description: '10 days (import, high risk of delay)',
    value: '1 week',
  },
  {
    label: 'Production:',
    description: 'Co-manufacturing slot: Week 4 available',
    value: '2 weeks',
  },
  {
    label: 'Packaging:',
    description: 'Labels & bottles ready in stock',
    value: '2 weeks',
  },
  {
    label: 'QA:',
    description: 'Shelf-stability testing → 1 week',
    value: '1 week',
  },
  {
    label: 'Distribution setup:',
    description: 'Fulfillment setup: 1 week',
    value: '1 week',
  },
]

const OptimizedTimeline = [
  {
    label: 'Ingredient lead time',
    description: 'Switch to domestic supplier → 4-day delivery, but +15% cost.',
    time: '6 Days',
  },
  {
    label: 'Parallelize Packaging & QA:',
    description:
      'Start label printing and packaging prep in Week 2, while waiting for Sea Moss.',
    time: '1 Weeks',
  },
  {
    label: 'Co-Manufacturing:',
    description:
      'Secondary co-manufacturer offers earlier slot at slightly higher cost.',
    time: '2 Weeks',
  },
  {
    label: 'Distribution Setup Overlap:',
    description: 'Run distribution prep in parallel with QA.',
    time: '1 Week',
  },
]

const AIRiskCallout = [
  {
    risk: 'Import delays on Sea Moss (10 days)',
    recommendation: 'Use domestic supplier (faster, and slightly higher cost)',
  },
  {
    risk: 'Packaging bottleneck if done post-production',
    recommendation: 'Start digital print runs during ingredient lead time',
  },
  {
    risk: 'Single co-manufacturer dependency',
    recommendation: 'Book earlier slot with secondary co-manufacturer',
  },
]

function RouteComponent() {
  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Commercialization Workflow</h1>
        <button className="px-4 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500">
          Export to Brief
        </button>
      </header>
      <section className="flex justify-between">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xl font-semibold mb-2">
              Sparkling Sea Moss Tonic
            </p>
            <p>Estimated launch: 6-7 weeks from today</p>
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
      <WorkflowCalendar eventStages={initialStages} TOTAL_WEEKS={6} />
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D9D9D9]">
        <div className="flex justify-between mb-6 align-start">
          <div className="flex-1 px-5">
            <p className="mb-4 text-[#6C6C6C]">Timeline Summary</p>
            {timeLineSummary.map((item) => (
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
            {OptimizedTimeline.map((item) => (
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
            {AIRiskCallout.map((item, index) => (
              <div key={index} className=" mb-3">
                <div className="max-w-[298px]">
                  <p className="text-[#6C6C6C] mb-1 text-[14px]">
                    <strong className="text-[#1A1A1A]">⚠️ Risk:</strong>{' '}
                    {item.risk}
                  </p>
                  <p className="text-[14px] text-[#6C6C6C]">
                    <strong className="text-[#1A1A1A]">
                      ✅ Recommendation:
                    </strong>{' '}
                    {item.recommendation}
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
            <p>Sequential Time (Baseline): 7 weeks</p>
            <p>
              (Lead time + Production + QA + Distribution, stacked one after
              another)
            </p>
          </div>
          <div className="">
            <p>Optimized Time (Parallelized): 5 weeks</p>
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
  )
}
