"use client"

import { useState, useEffect } from "react"
import { getBezierPath, useStore } from "reactflow"
import { getEdgeParams } from "@/utils/edge-utils"

function FloatingConnectionLine({ fromNode, toX, toY, fromPosition, toPosition }: any) {
  const [hoveredNode, setHoveredNode] = useState<any>(null)
  const [connectionPoints, setConnectionPoints] = useState<{
    sx: number
    sy: number
    tx: number
    ty: number
    sourcePos: string
    targetPos: string
  } | null>(null)

  // Fix: Get nodes from the store with proper type checking
  const nodes = useStore((state) => state.nodes) || []
  const transform = useStore((state) => state.transform)

  // Find if we're hovering over a node
  useEffect(() => {
    if (!fromNode || !transform || !nodes) return

    // Convert screen coordinates to flow coordinates
    const flowPosition = {
      x: (toX - transform[0]) / transform[2],
      y: (toY - transform[1]) / transform[2],
    }

    // Check if we're hovering over any node
    const hovered = nodes.find((node) => {
      if (!node.width || !node.height || node.id === fromNode.id) return false

      const nodeLeft = node.position.x
      const nodeRight = node.position.x + node.width
      const nodeTop = node.position.y
      const nodeBottom = node.position.y + node.height

      return (
        flowPosition.x >= nodeLeft &&
        flowPosition.x <= nodeRight &&
        flowPosition.y >= nodeTop &&
        flowPosition.y <= nodeBottom
      )
    })

    setHoveredNode(hovered || null)

    // Calculate connection points if we're hovering over a node
    if (hovered) {
      const params = getEdgeParams(fromNode, hovered)
      setConnectionPoints(params)
    } else {
      setConnectionPoints(null)
    }
  }, [toX, toY, transform, nodes, fromNode])

  if (!fromNode) {
    return null
  }

  // Create a path to the hovered node or to the cursor
  let edgePath
  let sx, sy, tx, ty

  if (hoveredNode && connectionPoints) {
    // If hovering over a node, use the calculated connection points
    sx = connectionPoints.sx
    sy = connectionPoints.sy
    tx = connectionPoints.tx
    ty = connectionPoints.ty

    // Get the bezier path using the calculated connection points
    const [path] = getBezierPath({
      sourceX: sx,
      sourceY: sy,
      sourcePosition: connectionPoints.sourcePos as any,
      targetPosition: connectionPoints.targetPos as any,
      targetX: tx,
      targetY: ty,
    })

    edgePath = path
  } else {
    // If not hovering over a node, create a path to the cursor
    const sourceAbsPos = fromNode.positionAbsolute ?? fromNode.position;
    sx = sourceAbsPos.x + (fromNode.width || 0) / 2
    sy = sourceAbsPos.y + (fromNode.height || 0)
    tx = toX
    ty = toY

    // Get the bezier path
    const [path] = getBezierPath({
      sourceX: sx,
      sourceY: sy,
      sourcePosition: fromPosition,
      targetPosition: toPosition,
      targetX: tx,
      targetY: ty,
    })

    edgePath = path
  }

  return (
    <g>
      <path fill="none" stroke="#9ca3af" strokeWidth={2} className="animated" d={edgePath} strokeDasharray="5,5" />

      {/* Cursor circle */}
      <circle cx={tx} cy={ty} fill="#fff" r={3} stroke="#9ca3af" strokeWidth={1.5} />

      {/* Enhanced highlight for hovered node */}
      {hoveredNode && (
        <>
          {/* Outer highlight rectangle */}
          <rect
            x={hoveredNode.position.x}
            y={hoveredNode.position.y}
            width={hoveredNode.width || 0}
            height={hoveredNode.height || 0}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="3,3"
            rx={4}
            ry={4}
            className="node-highlight"
          />

          {/* Connection point indicators */}
          {connectionPoints && (
            <circle
              cx={connectionPoints.tx}
              cy={connectionPoints.ty}
              r={5}
              fill="rgba(59, 130, 246, 0.5)"
              stroke="#3b82f6"
              strokeWidth={1.5}
              className="connection-point-indicator"
            />
          )}
        </>
      )}
    </g>
  )
}

export default FloatingConnectionLine