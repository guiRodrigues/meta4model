import { memo } from "react";
import type { EdgeProps } from "reactflow";
import FloatingEdgeBase from "../floating-edge-base";
import { Mail } from "lucide-react";

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
        const midX = (sourceX + targetX) / 2;
        const midY = (sourceY + targetY) / 2;

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
                  d="M 0 0 L 10 5 L 0 10 z"
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
              strokeWidth="0.5"
            />

            <g transform={`translate(${midX - 8}, ${midY - 6})`}>
              <rect
                x="0"
                y="0"
                width="16"
                height="12"
                fill="white"
                stroke="#4b5563"
                strokeWidth="1.2"
                rx="2"
              />
              <path
                d="M 0 0 L 8 6 L 16 0"
                stroke="#4b5563"
                strokeWidth="1.2"
                fill="none"
              />
            </g>
          </>
        );
      }}
    />
  );
}

export default memo(MessageFlowEdge);
