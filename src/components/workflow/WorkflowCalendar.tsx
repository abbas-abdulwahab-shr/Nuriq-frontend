import React, { useEffect, useRef, useState } from 'react'
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

  const gridRef = useRef<HTMLDivElement>(null)
  const [cellWidth, setCellWidth] = useState<number | null>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const observer = new ResizeObserver(() => {
      if (gridRef.current) {
        const gridWidth = gridRef.current.clientWidth - 200 // subtract name column width
        const widthPerCell = gridWidth / TOTAL_WEEKS
        setCellWidth(widthPerCell)
      }
    })

    observer.observe(gridRef.current)

    // cleanup
    return () => observer.disconnect()
  }, [TOTAL_WEEKS])

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
          ref={gridRef}
          style={{ gridTemplateColumns: `200px repeat(${TOTAL_WEEKS}, 1fr)` }}
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
            <StageRow
              key={stage.id}
              stage={stage}
              TOTAL_WEEKS={TOTAL_WEEKS}
              cellWidth={cellWidth}
            />
          ))}
        </DndContext>
      </div>
    </div>
  )
}

function StageRow({
  stage,
  TOTAL_WEEKS,
  cellWidth,
}: {
  stage: Stage
  TOTAL_WEEKS: number
  cellWidth: number | null
}) {
  return (
    <div
      className="grid relative border-b"
      style={{
        gridTemplateColumns: `200px repeat(${TOTAL_WEEKS}, 1fr)`,
        minHeight: '52px',
      }}
    >
      <div className="p-2 font-medium border-r bg-[#CDD0D5] border-white">
        {stage.name}
      </div>

      {Array.from({ length: TOTAL_WEEKS }).map((_, i) => (
        <div key={i} id={String(i + 1)} className="border-r border-gray-200" />
      ))}

      {stage.tasks.map((task) => (
        <TaskBlock
          key={task.id}
          task={task}
          color={stage.color}
          stageId={stage.id}
          cellWidth={cellWidth}
        />
      ))}
    </div>
  )
}

function TaskBlock({
  task,
  color,
  stageId,
  cellWidth,
}: {
  task: Task
  color: string
  stageId: string
  cellWidth: number | null
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
    width: `${(task.endWeek - task.startWeek) * cellWidth!}px`,
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
