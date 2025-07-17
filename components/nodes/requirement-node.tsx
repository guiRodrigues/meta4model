"use client";

import type React from "react";

import { memo, useState, useEffect, useRef } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { NodeData } from "@/types/kaos-types";
import Shape from "@/components/shapes";
import { useFixedNodeSize } from "@/hooks/use-fixed-node-size";

// Add this helper function before the component
const renderStereotypeAndTaggedValues = (data: NodeData) => {
  const hasStereotype = data.stereotype && data.stereotype.trim();
  const hasTaggedValues = data.taggedValues && data.taggedValues.length > 0;

  if (!hasStereotype && !hasTaggedValues) return null;

  return (
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
      {hasStereotype && (
        <div className="text-xs text-gray-500 bg-white/80 px-2 py-0.5 rounded border whitespace-nowrap">
          {data.stereotype}
        </div>
      )}
      {hasTaggedValues && (
        <div className="flex flex-wrap gap-1 justify-center max-w-48">
          {data.taggedValues.slice(0, 3).map((tv, index) => (
            <div
              key={index}
              className="text-xs text-gray-500 bg-white/80 px-1.5 py-0.5 rounded border whitespace-nowrap"
            >
              {tv.key}={tv.value}
            </div>
          ))}
          {data.taggedValues.length > 3 && (
            <div className="text-xs text-gray-500 bg-white/80 px-1.5 py-0.5 rounded border">
              +{data.taggedValues.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function RequirementNode({ data, selected, id }: NodeProps<NodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  // Use our fixed node size hook with significantly increased padding
  const nodeWidth = useFixedNodeSize(data.label, {
    extraWidthForMetadata: data.status ? 40 : 0,
    padding: 100, // Significantly increased padding from 60 to 100 for more horizontal space
    minWidth: 180, // Increased minimum width to ensure enough space for text
  });

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Enable editing when the node is newly created
  useEffect(() => {
    if (mounted && data.isNew) {
      // Small delay to avoid ResizeObserver issues
      const timer = setTimeout(() => {
        setIsEditing(true);
        // Remove the isNew flag after initial render
        data.isNew = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data, mounted]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (label.trim() !== data.label) {
      data.label = label.trim() || "Requirement";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      data.label = label.trim() || "Requirement";
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setLabel(data.label);
    }
  };

  return (
    <div
      className="relative"
      onDoubleClick={handleDoubleClick}
      style={{ width: `${nodeWidth}px`, height: "80px" }}
    >
      {/* Standard rectangular selection outline */}
      {selected && (
        <div className="absolute -inset-2 rounded-md border-2 border-blue-500 border-dashed pointer-events-none" />
      )}

      {/* Add margin for connection edges */}
      <div className="pt-4 pb-6">
        <Shape
          type="parallelogram"
          width={nodeWidth}
          height={60}
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth={4}
        />
      </div>

      {renderStereotypeAndTaggedValues(data)}

      {/* Standard top target and bottom source handles with increased margin */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 react-flow__handle-top"
        style={{ top: -4 }} // Move handle up by 4px
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 react-flow__handle-bottom"
        style={{ bottom: -4 }} // Move handle down by 4px
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {isEditing ? (
          <input
            ref={inputRef}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-4/5 bg-transparent text-sm font-bold outline-none border-b border-blue-500 text-center text-gray-600"
          />
        ) : (
          <div className="px-12 text-sm font-bold text-center max-w-full flex flex-col justify-center h-full">
            {/* Increased padding from px-8 to px-12 */}
            <div className="text-gray-600 whitespace-nowrap">{data.label}</div>
            {/* Changed break-words to whitespace-nowrap to prevent text breaking */}
            {data.status && (
              <div className="mt-1 text-xs text-gray-500">
                Status:{" "}
                <span className="font-medium capitalize">{data.status}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(RequirementNode);
