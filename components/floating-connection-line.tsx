"use client";

import { useState, useEffect } from "react";
import { getBezierPath, Node, useStore } from "reactflow";
import { getEdgeParams } from "@/utils/edge-utils";
import { getAbsoluteNodePosition } from "@/utils/node-parent-utils";

function FloatingConnectionLine({
  fromNode,
  toX,
  toY,
  fromPosition,
  toPosition,
}: any) {
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [connectionPoints, setConnectionPoints] = useState<{
    sx: number;
    sy: number;
    tx: number;
    ty: number;
    sourcePos: string;
    targetPos: string;
  } | null>(null);

  // Fix: Get nodes from the store with proper type checking
  const nodes = useStore((state) => state.nodes) || [];
  const transform = useStore((state) => state.transform);

  if (!fromNode || !fromNode.position) {
    return null;
  }

  const fromNodeAbsPos = getAbsoluteNodePosition(fromNode, nodes);

  const toAbsX = (toX - transform[0]) / transform[2];
  const toAbsY = (toY - transform[1]) / transform[2];

  const targetNode = nodes.find((node: Node) => {
    if (!node.width || !node.height || node.id === fromNode.id) {
      return false;
    }

    // Calcula a posição absoluta do nó alvo potencial
    const nodeAbsPos = getAbsoluteNodePosition(node, nodes);

    return (
      toAbsX >= nodeAbsPos.x &&
      toAbsX <= nodeAbsPos.x + node.width &&
      toAbsY >= nodeAbsPos.y &&
      toAbsY <= nodeAbsPos.y + node.height
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
    },
    nodes
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
      {/* Opcional: Efeito de highlight no nó alvo */}
      {targetNode && (
        <rect
          x={getAbsoluteNodePosition(targetNode, nodes).x}
          y={getAbsoluteNodePosition(targetNode, nodes).y}
          width={targetNode.width || 0}
          height={targetNode.height || 0}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={1}
          strokeDasharray="3,3"
          rx={4}
          ry={4}
          className="node-highlight"
        />
      )}
    </g>
  );
}

export default FloatingConnectionLine;
