import type { ShapeProps } from "./types";
import { generateRoundedRectPath } from "@/utils/shape-utils";

function Rectangle({ width, height, ...svgAttributes }: ShapeProps) {
  // Use a small radius for slightly rounded corners
  const radius = 2;
  const rectanglePath = generateRoundedRectPath(width, height, radius);

  return <path d={rectanglePath} {...svgAttributes} />;
}

export default Rectangle;
