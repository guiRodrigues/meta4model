import { generateRoundedRectPath } from "@/utils/shape-utils";
import { ShapeProps } from "./types";

function RectangleTask({ width, height, ...svgAttributes }: ShapeProps) {
  // Use a small radius for slightly rounded corners
  const radius = 12;
  const rectanglePath = generateRoundedRectPath(width, height, radius);

  return <path d={rectanglePath} {...svgAttributes} />;
}

export default RectangleTask;
