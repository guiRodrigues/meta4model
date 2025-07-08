import { memo } from "react";
import type { EdgeProps } from "reactflow";
import FloatingEdgeBase from "../floating-edge-base";

function MessageFlowEdge(props: EdgeProps) {
  return (
    <FloatingEdgeBase
      {...props}
      renderEdge={({
        id,
        edgePath,
        sourceX,
        sourceY,
        targetX,
        targetY,
        style,
        markerEnd,
      }) => {
        // Create a custom marker ID for the yellow arrow
        const markerId = `message-arrow-${id}`;

        // Calculate the midpoint of the path

        return (
          <>
            {/* Define the yellow arrow marker */}
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="15" // Standardized size
                markerHeight="15" // Standardized size
                orient="auto-start-reverse"
              >
                <path
                  d="M 0 0 L 10 5 L 0 10 Z"
                  fill="white"
                  stroke="#4b5563"
                  strokeWidth="1"
                />
              </marker>
            </defs>

            <path
              id={id}
              style={{ ...style, strokeDasharray: "3,3", stroke: "#374151" }}
              className="react-flow__edge-path"
              d={edgePath}
              markerEnd={`url(#${markerId})`}
              strokeWidth={2}
            />

            <circle
              cx={sourceX}
              cy={sourceY}
              r="3"
              fill="white"
              stroke="#4b5563"
              strokeWidth="1.5"
            />
          </>
        );
      }}
    />
  );
}

export default memo(MessageFlowEdge);
