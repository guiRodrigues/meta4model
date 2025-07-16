import type { Node } from "reactflow"
import { findBestConnectionPoints } from "./node-connection-utils"
import { getAbsoluteNodePosition } from "./node-parent-utils"

// Calculate the position where the edge should start/end based on the node's position and dimensions
export function getEdgeParams(source: Node, target: Node, nodes: Node[]) {
  // Se nodes for fornecido, calcula a posição absoluta
  let sourceAbs = source.position;
  let targetAbs = target.position;
  if (nodes) {
    sourceAbs = getAbsoluteNodePosition(source, nodes);
    targetAbs = getAbsoluteNodePosition(target, nodes);
  }

  // Get the best connection points
  const {
    sourcePoint,
    targetPoint,
    sourcePos: bestSourcePos,
    targetPos: bestTargetPos,
  } = findBestConnectionPoints(
    { ...source, position: sourceAbs },
    { ...target, position: targetAbs },
    nodes
  );

  // If we have valid connection points, use them
  if (sourcePoint && targetPoint) {
    return {
      sx: sourcePoint.x,
      sy: sourcePoint.y,
      tx: targetPoint.x,
      ty: targetPoint.y,
      sourcePos: bestSourcePos,
      targetPos: bestTargetPos,
    }
  }

  // Fallback to the old method if connection points are not available
  const sourceWidth = source.width || 150
  const sourceHeight = source.height || 80
  const targetWidth = target.width || 150
  const targetHeight = target.height || 80

  // Get node center coordinates
  const sourceX = sourceAbs.x + sourceWidth / 2
  const sourceY = sourceAbs.y + sourceHeight / 2
  const targetX = targetAbs.x + targetWidth / 2
  const targetY = targetAbs.y + targetHeight / 2

  // Calculate the direction from source to target
  const dx = targetX - sourceX
  const dy = targetY - sourceY

  // Determine the best positions for the edge to connect to the nodes
  let sourcePos: "top" | "right" | "bottom" | "left"
  let targetPos: "top" | "right" | "bottom" | "left"

  // Determine connection points based on the angle between nodes
  if (Math.abs(dy) > Math.abs(dx)) {
    // Vertical connection
    sourcePos = dy > 0 ? "bottom" : "top"
    targetPos = dy > 0 ? "top" : "bottom"
  } else {
    // Horizontal connection
    sourcePos = dx > 0 ? "right" : "left"
    targetPos = dx > 0 ? "left" : "right"
  }

  // Calculate edge start and end points based on the positions
  let sx: number, sy: number, tx: number, ty: number

  // Source point
  if (sourcePos === "top") {
    sx = sourceX
    sy = sourceAbs.y
  } else if (sourcePos === "right") {
    sx = sourceAbs.x + sourceWidth
    sy = sourceY
  } else if (sourcePos === "bottom") {
    sx = sourceX
    sy = sourceAbs.y + sourceHeight
  } else {
    // left
    sx = sourceAbs.x
    sy = sourceY
  }

  // Target point
  if (targetPos === "top") {
    tx = targetX
    ty = targetAbs.y
  } else if (targetPos === "right") {
    tx = targetAbs.x + targetWidth
    ty = targetY
  } else if (targetPos === "bottom") {
    tx = targetX
    ty = targetAbs.y + targetHeight
  } else {
    // left
    tx = targetAbs.x
    ty = targetY
  }

  return { sx, sy, tx, ty, sourcePos, targetPos }
}
