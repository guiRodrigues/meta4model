import { memo } from "react";
import type { EdgeProps } from "reactflow";
import FloatingEdgeBase from "../floating-edge-base";

function MessageFlowEdge(props: EdgeProps) {
  return (
    <FloatingEdgeBase
      {...props}
      renderEdge={({ id, edgePath, sourceX, sourceY, targetX, targetY, style, data }) => {
        const color = data?.color || "#555";
        const lineStyle = data?.lineStyle || "solid";
        const label = data?.label || "";
        const lineSvgCode = data?.lineSvgCode;
        const markerSvgCode = data?.markerSvgCode;

        let strokeDasharray = "";
        if (lineStyle === "dashed") strokeDasharray = "5,5";
        if (lineStyle === "dotted") strokeDasharray = "1,3";

        const markerId = `custom-marker-${id}`;
        const midX = (sourceX + targetX) / 2;
        const midY = (sourceY + targetY) / 2;

        return (
          <>
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
                  dangerouslySetInnerHTML={{ __html: markerSvgCode }}
                />
              </defs>
            )}
            <path
              id={id}
              d={edgePath}
              className="react-flow__edge-path"
              style={{ ...style, stroke: color, strokeDasharray }}
              markerEnd={markerSvgCode ? `url(#${markerId})` : undefined}
              strokeWidth={2}
            />
            {lineSvgCode && (
              <g dangerouslySetInnerHTML={{ __html: lineSvgCode }} />
            )}
            {label && (
              <text x={midX} y={midY} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize={12} fontWeight={500} pointerEvents="none">
                {label}
              </text>
            )}
          </>
        );
      }}
    />
  );
}

export default memo(MessageFlowEdge);
