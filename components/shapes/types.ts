import type React from "react";
import type { ReactNode } from "react";

export interface ShapeProps {
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

export type ShapeType =
  | "parallelogram"
  | "trapezoid"
  | "hexagon"
  | "rectangle"
  | "ellipse"
  | "rectangleTask"
  | "textAnnotation"

export interface ShapeComponentProps extends ShapeProps {
  type: ShapeType;
}

// This will be populated in the index.tsx file
export const ShapeComponents: Record<
  ShapeType,
  React.ComponentType<ShapeProps>
> = {} as Record<ShapeType, React.ComponentType<ShapeProps>>;
