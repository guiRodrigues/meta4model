import {
  ShapeComponents,
  type ShapeComponentProps,
  type ShapeProps,
  type ShapeType,
} from "./types";
import Parallelogram from "./parallelogram";
import Trapezoid from "./trapezoid";
import Hexagon from "./hexagon";
import Rectangle from "./rectangle";
import Ellipse from "./ellipse";
import RectangleTask from "./rectangle-task";

// Register all shape components
ShapeComponents.parallelogram = Parallelogram;
ShapeComponents.trapezoid = Trapezoid;
ShapeComponents.hexagon = Hexagon;
ShapeComponents.rectangle = Rectangle;
ShapeComponents.ellipse = Ellipse;
ShapeComponents.rectangleTask = RectangleTask; // Assuming RectangleTask is a variant of Rectangle

function Shape({ type, width, height, ...svgAttributes }: ShapeComponentProps) {
  const ShapeComponent = ShapeComponents[type];

  if (!ShapeComponent || !width || !height) {
    return null;
  }

  const strokeWidth = svgAttributes.strokeWidth
    ? +svgAttributes.strokeWidth
    : 0;

  // We subtract the strokeWidth to make sure the shape is not cut off
  const innerWidth = width - 2 * strokeWidth;
  const innerHeight = height - 2 * strokeWidth;

  return (
    <svg
      width={width}
      height={height}
      className="shape-svg"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      {/* This offsets the shape by the strokeWidth so that we have enough space for the stroke */}
      <g
        transform={`translate(${svgAttributes.strokeWidth ?? 0}, ${
          svgAttributes.strokeWidth ?? 0
        })`}
      >
        <ShapeComponent
          width={innerWidth}
          height={innerHeight}
          {...svgAttributes}
        />
      </g>
    </svg>
  );
}

export default Shape;
export type { ShapeProps, ShapeComponentProps, ShapeType };
export { ShapeComponents };
