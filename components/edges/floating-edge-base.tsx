import { memo } from "react";
import type { EdgeProps } from "reactflow";
import { getBezierPath } from "reactflow";

export interface FloatingEdgeBaseProps extends EdgeProps {
  renderEdge: (params: {
    id: string;
    edgePath: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    style?: React.CSSProperties;
    markerEnd?: string;
    data?: any;
  }) => React.ReactNode;
}

function FloatingEdgeBase(props: FloatingEdgeBaseProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    style,
    data,
    renderEdge,
  } = props;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        className="react-flow__edge-interaction"
      />
      {renderEdge({
        id,
        edgePath,
        sourceX,
        sourceY,
        targetX,
        targetY,
        style,
        markerEnd,
        data,
      })}
    </>
  );
}

export default memo(FloatingEdgeBase);