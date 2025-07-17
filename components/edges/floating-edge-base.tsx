import type React from "react";
import { memo, useEffect, useState } from "react";
import {
  getBezierPath,
  useNodes,
  useReactFlow,
  type EdgeProps,
} from "reactflow";
import { getEdgeParams } from "@/utils/edge-utils";

export interface FloatingEdgeBaseProps extends EdgeProps {
  renderEdge: (params: {
    id: string;
    edgePath: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePos: "top" | "right" | "bottom" | "left";
    targetPos: "top" | "right" | "bottom" | "left";
    style?: React.CSSProperties;
    markerEnd?: string;
    data?: any;
  }) => React.ReactNode;
}

function FloatingEdgeBase(props: FloatingEdgeBaseProps) {
  const {
    id,
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    style,
    data,
    label,
    renderEdge,
  } = props;

  const nodes = useNodes();
  const { setEdges } = useReactFlow();
  const sourceNode = nodes.find((node) => node.id === source);
  const targetNode = nodes.find((node) => node.id === target);

  const [isEditing, setIsEditing] = useState(false);
  const [labelText, setLabelText] = useState(label || "");

  useEffect(() => {
    setLabelText(label || "");
  }, [label]);

  if (!sourceNode || !targetNode) {
    return null;
  }

  // Calculate edge parameters
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  const handleDoubleClick = () => {
    if (
      sourceNode?.type?.toLowerCase().includes("gateway") ||
      sourceNode?.type === "exclusive" ||
      sourceNode?.type === "parallel"
    ) {
      setIsEditing(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEdges((edges) =>
        edges.map((edge) =>
          edge.id === id ? { ...edge, label: labelText } : edge
        )
      );
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setLabelText(label || "");
    }
  };

  const handleBlur = () => {
    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === id ? { ...edge, label: labelText } : edge
      )
    );
    setIsEditing(false);
  };

  const shouldRenderLabel =
    sourceNode?.type?.toLowerCase().includes("gateway") ||
    sourceNode?.type === "exclusive" ||
    sourceNode?.type === "parallel";

  // Create a wider invisible path for easier interaction
  const interactionPath = edgePath;

  // Call the render function provided by the specific edge type
  return (
    <>
      {/* Add an invisible, wider path for easier clicking */}
      <path
        d={interactionPath}
        fill="none"
        stroke="transparent"
        strokeWidth={15}
        className="react-flow__edge-interaction"
        strokeLinecap="round"
        strokeLinejoin="round"
        onDoubleClick={handleDoubleClick}
      />

      {shouldRenderLabel && !isEditing && labelText && (
        <text>
          <textPath
            href={`#${id}`}
            style={{ fontSize: 12, fill: "#374151" }}
            startOffset="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            onDoubleClick={handleDoubleClick}
          >
            {labelText}
          </textPath>
        </text>
      )}

      {shouldRenderLabel && isEditing && (
        <foreignObject width={160} height={40} x={labelX - 80} y={labelY - 40}>
          <input
            type="text"
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="edge-label-input"
            autoFocus
          />
        </foreignObject>
      )}

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
    </>
  );
}

export default memo(FloatingEdgeBase);
