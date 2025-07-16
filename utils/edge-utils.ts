import type { Node } from "reactflow";
import { findBestConnectionPoints } from "./node-connection-utils";

export function getEdgeParams(source: Node, target: Node) {
  const {
    sourcePoint,
    targetPoint,
    sourcePos,
    targetPos,
  } = findBestConnectionPoints(source, target);

  if (sourcePoint && targetPoint) {
    return {
      sx: sourcePoint.x,
      sy: sourcePoint.y,
      tx: targetPoint.x,
      ty: targetPoint.y,
      sourcePos: sourcePos,
      targetPos: targetPos,
    };
  }

  return {
    sx: source.position.x,
    sy: source.position.y,
    tx: target.position.x,
    ty: target.position.y,
    sourcePos: "bottom" as const,
    targetPos: "top" as const,
  };
}