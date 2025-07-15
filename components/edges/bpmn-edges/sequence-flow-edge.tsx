import { memo } from "react";
import type { EdgeProps } from "reactflow";
import FloatingEdgeBase from "../floating-edge-base";

function SequenceFlowEdge(props: EdgeProps) {
  return (
    <FloatingEdgeBase
      {...props}
      renderEdge={({ id, edgePath, sourceX, sourceY, targetX, targetY, style, data }) => {
        // Use data from the edge if available, otherwise use defaults
        const color = data?.color || "#555";
        const lineStyle = data?.lineStyle || "solid";
        const label = data?.label || "";
        const lineSvgCode = data?.lineSvgCode;
        const markerSvgCode = data?.markerSvgCode;

        // Determine stroke dash array based on line style
        let strokeDasharray = "";
        if (lineStyle === "dashed") strokeDasharray = "5,5";
        if (lineStyle === "dotted") strokeDasharray = "1,3";

        // Create a custom marker ID for the arrow
        const markerId = `custom-marker-${id}`;

        // Calculate the midpoint of the path for placing decorations
        const midX = (sourceX + targetX) / 2;
        const midY = (sourceY + targetY) / 2;

        return (
          <>
            {/* Define the marker if markerSvgCode is provided */}
            {markerSvgCode && (
              <defs>
                <marker
                  id={markerId}
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="15"
                  markerHeight="15"
                  orient="auto"
                >
                  <g style={{ color }} dangerouslySetInnerHTML={{ __html: markerSvgCode }} />
                </marker>
              </defs>
            )}

            {/* The edge path */}
            <path
              id={id}
              style={{
                ...style,
                stroke: color,
                strokeDasharray,
              }}
              className="react-flow__edge-path"
              d={edgePath}
              markerEnd={markerSvgCode ? `url(#${markerId})` : undefined}
              strokeWidth={2}
            />

            {/* Line decoration in the middle if provided */}
            {lineSvgCode && (
              <foreignObject width="20" height="20" x={midX - 10} y={midY - 10}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color,
                  }}
                  dangerouslySetInnerHTML={{ __html: lineSvgCode }}
                />
              </foreignObject>
            )}

            {/* Label text */}
            {label && (
              <text
                x={midX}
                y={midY - 10}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={color}
                fontSize="12"
                fontFamily="sans-serif"
                className="react-flow__edge-text"
              >
                {label}
              </text>
            )}
          </>
        );
      }}
    />
  );
}

export default memo(SequenceFlowEdge);
