import { memo } from "react";
import type { EdgeProps } from "reactflow";
import FloatingEdgeBase from "@/components/edges/floating-edge-base";

function SequenceFlowEdge(props: EdgeProps) {
  return (
    <FloatingEdgeBase
      {...props}
      renderEdge={({ id, edgePath }) => {
        const markerId = `sequence-arrow-${id}`;

        return (
          <>
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#374151" />
              </marker>
            </defs>
            <path
              id={id}
              d={edgePath} // Usando o caminho correto
              className="react-flow__edge-path"
              style={{ stroke: "#374151" }}
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