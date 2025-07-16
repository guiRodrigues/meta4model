"use client";

import { useCallback } from "react";
import { getBezierPath, useStore, type Node } from "reactflow";
import { getEdgeParams } from "@/utils/edge-utils";

function FloatingConnectionLine({
  toX,
  toY,
  fromNode,
  fromPosition,
  toPosition,
}: any) {
  const nodes = useStore(useCallback((state) => state.nodes || [], []));
  const transform = useStore(useCallback((state) => state.transform, []));

  if (!fromNode || !transform) {
    return null;
  }

  const toAbsX = (toX - transform[0]) / transform[2];
  const toAbsY = (toY - transform[1]) / transform[2];

  const targetNode = nodes.find((node: Node) => {
    if (!node.width || !node.height || node.id === fromNode.id) {
      return false;
    }
    const { x, y } = node.position;
    const width = node.width;
    const height = node.height;
    return (
      toAbsX >= x &&
      toAbsX <= x + width &&
      toAbsY >= y &&
      toAbsY <= y + height
    );
  });

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    fromNode,
    targetNode ?? {
      id: "ghost-node",
      width: 1,
      height: 1,
      position: { x: toAbsX, y: toAbsY },
      data: {},
      type: "default",
    }
  );

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos as any,
    targetPosition: targetPos as any,
    targetX: tx,
    targetY: ty,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#9ca3af"
        strokeWidth={2}
        className="animated"
        d={edgePath}
        strokeDasharray="5,5"
      />
      <circle
        cx={tx}
        cy={ty}
        fill="#fff"
        r={3}
        stroke="#9ca3af"
        strokeWidth={1.5}
      />
    </g>
  );
}

export default FloatingConnectionLine;