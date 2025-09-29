import React, { useState } from 'react'
import { DndContext, useDraggable } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'

export interface Task {
  id: string
  name: string
  startWeek: number // 1-based column index
  endWeek: number
}

export interface Stage {
  id: string
  name: string
  color: string
  tasks: Array<Task>
}

interface CalendarProps {
  eventStages: Array<Stage>
  TOTAL_WEEKS?: number
}

// const TOTAL_WEEKS = 6

export default function WorkflowTimeline({
  eventStages,
  TOTAL_WEEKS = 6,
}: CalendarProps) {
  const [stages, setStages] = useState<Array<Stage>>(eventStages)

  // Handle drop to update weeks
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const [stageId, taskId] = active.id.toString().split(':')
    const newWeek = Number(over.id)
    setStages((prev) =>
      prev.map((stage) => {
        if (stage.id !== stageId) return stage
        return {
          ...stage,
          tasks: stage.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  // Snap the block to start at newWeek but keep its duration
                  startWeek: newWeek,
                  endWeek: newWeek + (task.endWeek - task.startWeek),
                }
              : task,
          ),
        }
      }),
    )
    // TODO: PATCH to backend here
  }

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        {/* Week header */}
        <div
          className="grid"
          style={{ gridTemplateColumns: `200px repeat(${TOTAL_WEEKS}, 169px)` }}
        >
          <div className="bg-[#CDD0D5] font-semibold p-2 border border-white">
            Stages
          </div>
          {Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-50 text-center font-semibold p-2 border border-gray-300"
            >
              W{i + 1}
            </div>
          ))}
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          {stages.map((stage) => (
            <StageRow key={stage.id} stage={stage} TOTAL_WEEKS={TOTAL_WEEKS} />
          ))}
        </DndContext>
      </div>
    </div>
  )
}

function StageRow({
  stage,
  TOTAL_WEEKS,
}: {
  stage: Stage
  TOTAL_WEEKS: number
}) {
  return (
    <div
      className="grid relative border-b"
      style={{
        gridTemplateColumns: `200px repeat(${TOTAL_WEEKS}, 169px)`,
        minHeight: '52px',
      }}
    >
      <div className="p-2 font-medium border-r bg-[#CDD0D5] border-white">
        {stage.name}
      </div>

      {Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
        <DropCell key={i} id={i + 1} />
      ))}

      {stage.tasks.map((task) => (
        <TaskBlock
          key={task.id}
          task={task}
          color={stage.color}
          stageId={stage.id}
        />
      ))}
    </div>
  )
}

function DropCell({ id }: { id: number }) {
  // Acts as a drop target. Dnd-kit treats every cell with an id as valid.
  return <div id={String(id)} className="border-r border-gray-200" />
}

function TaskBlock({
  task,
  color,
  stageId,
}: {
  task: Task
  color: string
  stageId: string
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${stageId}:${task.id}`,
  })

  const style: React.CSSProperties = {
    gridColumnStart: task.startWeek + 1, // +1 to skip name column
    gridColumnEnd: task.endWeek + 1,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    backgroundColor: color,
    width: `${(task.endWeek - task.startWeek) * 168}px`,
    minHeight: '42px',
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="absolute h-10 rounded text-white flex items-center justify-start cursor-move shadow-md pl-2"
      style={style}
    >
      {task.name}
    </div>
  )
}
