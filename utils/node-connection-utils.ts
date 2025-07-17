import type { Node } from "reactflow";

// Get all valid connection points for a node
export function getNodeConnectionPoints(node: Node) {
  if (!node.width || !node.height)
    return { top: null, right: null, bottom: null, left: null, center: null };
  

  if (!node.positionAbsolute) {
    return { top: null, right: null, bottom: null, left: null, center: null };
  }

  
  const { x, y } = node.positionAbsolute;
  const width = node.width;
  const height = node.height;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  return {
    top: { x: centerX, y },
    right: { x: x + width, y: centerY },
    bottom: { x: centerX, y: y + height },
    left: { x, y: centerY },
    center: { x: centerX, y: centerY },
  };
}

// Find the best connection point based on the source and target positions
export function findBestConnectionPoints(source: Node, target: Node) {
  const sourcePoints = getNodeConnectionPoints(source);
  const targetPoints = getNodeConnectionPoints(target);

  // Get center points
  const sourceCenter = sourcePoints.center;
  const targetCenter = targetPoints.center;

  if (!sourceCenter || !targetCenter) {
    // Default to top/bottom for KAOS diagrams if centers aren't available
    return {
      sourcePoint: sourcePoints.bottom,
      targetPoint: targetPoints.top,
      sourcePos: "bottom" as const,
      targetPos: "top" as const,
    };
  }

  // Calculate direction from source to target
  const dx = targetCenter.x - sourceCenter.x;
  const dy = targetCenter.y - sourceCenter.y;

  // Determine best connection points based on the direction
  let sourcePoint, targetPoint, sourcePos, targetPos;

  // Calculate the angle between nodes to determine the best connection points
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Determine connection points based on angle
  if (angle > -45 && angle <= 45) {
    // Target is to the right of source
    sourcePoint = sourcePoints.right;
    targetPoint = targetPoints.left;
    sourcePos = "right" as const;
    targetPos = "left" as const;
  } else if (angle > 45 && angle <= 135) {
    // Target is below source
    sourcePoint = sourcePoints.bottom;
    targetPoint = targetPoints.top;
    sourcePos = "bottom" as const;
    targetPos = "top" as const;
  } else if (
    (angle > 135 && angle <= 180) ||
    (angle >= -180 && angle <= -135)
  ) {
    // Target is to the left of source
    sourcePoint = sourcePoints.left;
    targetPoint = targetPoints.right;
    sourcePos = "left" as const;
    targetPos = "right" as const;
  } else {
    // Target is above source
    sourcePoint = sourcePoints.top;
    targetPoint = targetPoints.bottom;
    sourcePos = "top" as const;
    targetPos = "bottom" as const;
  }

  return {
    sourcePoint,
    targetPoint,
    sourcePos,
    targetPos,
  };
}