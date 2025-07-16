import { memo } from "react";
import type { EdgeProps } from "reactflow";
import FloatingEdgeBase from "../floating-edge-base";

function SequenceFlowEdge(props: EdgeProps) {
  return (
    <FloatingEdgeBase
      {...props}
      renderEdge={({ id, edgePath, style, markerEnd }) => {
        // Create a custom marker ID for the purple arrow
        const markerId = `sequence-arrow-${id}`;

        return (
          <>
            {/* Define the purple arrow marker */}
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="15" // Standardized size
                markerHeight="15" // Standardized size
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4b5563" />
              </marker>
            </defs>

            <path
              id={id}
              d={edgePath}
              className="react-flow__edge-path"
              style={{ ...style, stroke: "#374151" }} // Keep purple for this edge
              markerEnd={`url(#${markerId})`}
              strokeWidth={2}
            />
          </>
        );
      }}
    />
  );
}

export default memo(SequenceFlowEdge);