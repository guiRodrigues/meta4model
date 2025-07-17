import { memo } from "react";
import type { EdgeProps } from "reactflow";
import FloatingEdgeBase from "../floating-edge-base";

function AssociationFlowEdge(props: EdgeProps) {
  return (
    <FloatingEdgeBase
      {...props}
      renderEdge={({ id, edgePath, style, markerEnd }) => {
        // Create a custom marker ID for the purple arrow
        const markerId = `association-arrow-${id}`;

        return (
          <>
            <path
              id={id}
              d={edgePath}
              className="react-flow__edge-path"
              style={{ ...style, strokeDasharray: "3,3", stroke: "#374151" }} // Keep purple for this edge
              markerEnd={`url(#${markerId})`}
              strokeWidth={2}
            />
          </>
        );
      }}
    />
  );
}

export default memo(AssociationFlowEdge);