import type { Node } from "reactflow";

export function getNodeConnectionPoints(node: Node) {
  if (!node.width || !node.height) {
    return { top: null, right: null, bottom: null, left: null, center: null };
  }

  const { x, y } = node.position; 
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

export function findBestConnectionPoints(source: Node, target: Node) {
  const sourcePoints = getNodeConnectionPoints(source);
  const targetPoints = getNodeConnectionPoints(target);

  const sourceCenter = sourcePoints.center;
  const targetCenter = targetPoints.center;

  if (!sourceCenter || !targetCenter) {
    return {
      sourcePoint: sourcePoints.bottom,
      targetPoint: targetPoints.top,
      sourcePos: "bottom" as const,
      targetPos: "top" as const,
    };
  }

  const dx = targetCenter.x - sourceCenter.x;
  const dy = targetCenter.y - sourceCenter.y;
  let sourcePoint, targetPoint, sourcePos, targetPos;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  if (angle > -45 && angle <= 45) {
    sourcePoint = sourcePoints.right;
    targetPoint = targetPoints.left;
    sourcePos = "right" as const;
    targetPos = "left" as const;
  } else if (angle > 45 && angle <= 135) {
    sourcePoint = sourcePoints.bottom;
    targetPoint = targetPoints.top;
    sourcePos = "bottom" as const;
    targetPos = "top" as const;
  } else if ((angle > 135 && angle <= 180) || (angle >= -180 && angle <= -135)) {
    sourcePoint = sourcePoints.left;
    targetPoint = targetPoints.right;
    sourcePos = "left" as const;
    targetPos = "right" as const;
  } else {
    sourcePoint = sourcePoints.top;
    targetPoint = targetPoints.bottom;
    sourcePos = "top" as const;
    targetPos = "bottom" as const;
  }

  return { sourcePoint, targetPoint, sourcePos, targetPos }
}