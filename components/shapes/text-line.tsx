import type { ShapeProps } from "./types";

function TextAnnotation({ width, height, ...svgAttributes }: ShapeProps) {
  // Coordenadas para as linhas, com um pequeno deslocamento para a espessura do traço
  const strokeOffset = 1;

  return (
    <g {...svgAttributes}>
      <line
        x1={strokeOffset}
        y1={0}
        x2={strokeOffset}
        y2={height}
      />
      <line
        x1={strokeOffset}
        y1={0}
        x2={width}
        y2={0}
      />
      <line
        x1={strokeOffset}
        y1={height}
        x2={width}
        y2={height}
      />
    </g>
  );
}

export default TextAnnotation;