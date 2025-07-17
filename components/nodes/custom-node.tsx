"use client"

import { memo, useState, useEffect, useRef } from "react"
import { Handle, Position } from "reactflow"

function CustomNode({ data, selected, id }) {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(data?.label || "Custom Node")
  const inputRef = useRef(null)

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (label.trim() !== data.label) {
      data.label = label.trim() || "Custom Node"
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false)
      data.label = label.trim() || "Custom Node"
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setLabel(data.label)
    }
  }

  return (
    <div className="relative min-w-[150px] min-h-[50px]" onDoubleClick={handleDoubleClick}>
      {/* Selection outline */}
      {selected && (
        <div
          className="absolute -inset-2 rounded-md border-2 border-dashed pointer-events-none"
          style={{ borderColor: data.nodeColor || "#6366f1" }}
        />
      )}

      <Handle
        type="target"
        position={Position.Top}
        className="react-flow__handle-top"
        style={{ background: data.nodeColor || "#6366f1" }}
      />

      {/* SVG container */}
      <div className="flex flex-col items-center">
        {/* SVG na parte superior */}
        <div className="w-full relative">
          {data.svgCode ? (
            <div
              className="w-full h-full"
              style={{ color: data.nodeColor || "#6366f1" }}
              dangerouslySetInnerHTML={{ __html: data.svgCode }}
            />
          ) : (
            <div
              className="w-full h-full border rounded-md p-2"
              style={{
                backgroundColor: data.nodeColor || "#ffffff",
                borderColor: selected ? data.nodeColor || "#6366f1" : "#e2e8f0",
                borderWidth: selected ? "2px" : "1px",
              }}
            />
          )}
        </div>

        {/* Texto abaixo do SVG */}
        <div className="mt-2 w-full">
          {isEditing ? (
            <input
              ref={inputRef}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full bg-white/80 text-sm font-medium outline-none border-b text-center rounded px-2 py-1 text-gray-600"
              style={{ borderColor: data.nodeColor || "#6366f1" }}
            />
          ) : (
            <div className="text-sm font-medium text-center px-2">
              <div className="break-words text-gray-600">{data.label || "Custom Node"}</div>
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="react-flow__handle-bottom"
        style={{ background: data.nodeColor || "#6366f1" }}
      />
    </div>
  )
}

export default memo(CustomNode)
