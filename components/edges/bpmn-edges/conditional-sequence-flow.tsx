import { memo } from "react";
import type { EdgeProps } from "reactflow";
import FloatingEdgeBase from "../floating-edge-base";

function ConditionalSequenceFlowEdge(props: EdgeProps) {
  return (
    <FloatingEdgeBase
      {...props}
      renderEdge={({ id, edgePath, style, sourceX, sourceY, markerEnd }) => {
        // Create a custom marker ID for the purple arrow
        const markerId = `sequence-arrow-${id}`;

        const width = 22;
        const height = 12;

        // vértices do losango com base em sourceX/sourceY
        const diamondPoints = [
          `${sourceX - width / 2},${sourceY}`, // esquerda
          `${sourceX},${sourceY - height / 2}`, // topo
          `${sourceX + width / 2},${sourceY}`, // direita
          `${sourceX},${sourceY + height / 2}`, // base
        ].join(" ");

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

            <polygon
              points={diamondPoints}
              stroke="#4b5563"
              fill="white"
            />
          </>
        );
      }}
    />
  );
}

export default memo(ConditionalSequenceFlowEdge);
