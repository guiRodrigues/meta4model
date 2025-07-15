import type React from "react"
import { memo } from "react"
import { getBezierPath, useNodes, type EdgeProps } from "reactflow"
import { getEdgeParams } from "@/utils/edge-utils"

export interface FloatingEdgeBaseProps extends EdgeProps {
  renderEdge: (params: {
    id: string
    edgePath: string
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    sourcePos: "top" | "right" | "bottom" | "left"
    targetPos: "top" | "right" | "bottom" | "left"
    style?: React.CSSProperties
    markerEnd?: string
    data?: any
  }) => React.ReactNode
}

function FloatingEdgeBase({ id, source, target, style, markerEnd, renderEdge, data }: FloatingEdgeBaseProps) {
  // Get all nodes to find our source and target
  const nodes = useNodes()
  const sourceNode = nodes.find((node) => node.id === source)
  const targetNode = nodes.find((node) => node.id === target)

  if (!sourceNode || !targetNode) {
    return null
  }

  // Calculate edge parameters
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode)

  // Get the bezier path
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  })

  // Create a wider invisible path for easier interaction
  const interactionPath = edgePath

  // Call the render function provided by the specific edge type
  return (
    <>
      {renderEdge({
        id,
        edgePath,
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
        sourcePos,
        targetPos,
        style,
        markerEnd,
        data,
      })}
      {/* Add an invisible, wider path for easier clicking (on top) */}
      <path
        d={interactionPath}
        className="react-flow__edge-interaction"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          fill: "none",
          stroke: "transparent",
          strokeWidth: 16,
          cursor: "pointer",
          pointerEvents: "stroke",
        }}
      />
    </>
  )
}

export default memo(FloatingEdgeBase)
