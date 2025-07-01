"use client";

import type React from "react";

import { memo, useState, useEffect, useRef } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { NodeData } from "@/types/kaos-types";
import { useFixedNodeSize } from "@/hooks/use-fixed-node-size";
import Shape from "@/components/shapes";

function TaskNode({ data, type, id }: NodeProps<NodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  const nodeHeight = 80;

  // Use our fixed node size hook with significantly increased padding
  const nodeWidth = useFixedNodeSize(data.label, {
    extraWidthForMetadata: data.priority ? 40 : 0,
    padding: 30,
    minWidth: 150,
  });

  useEffect(() => {
    if (data.isNew) {
      const timer = setTimeout(() => {
        setIsEditing(true);
        data.isNew = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    data.label = label.trim() || "Task";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      data.label = label.trim() || "Task";
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setLabel(data.label);
    }
  };

  return (
    <div
      className="relative"
      onDoubleClick={handleDoubleClick}
      style={{ width: `${nodeWidth}px`, height: `${nodeHeight}px` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Shape
          type="rectangleTask"
          width={nodeWidth}
          height={nodeHeight}
          fill={data.fillColor || "#f3f4f6"}
          stroke="#6b7280"
          strokeWidth={2}
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-green-400"
        style={{ right: -4 }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {isEditing ? (
          <input
            ref={inputRef}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-4/5 bg-white/80 text-sm font-medium outline-none border-b border-blue-500 text-center text-gray-600 rounded px-1"
          />
        ) : (
          <div className="px-12 text-sm font-medium text-center max-w-full flex flex-col justify-center h-full break-words whitespace-normal">
            <div className="break-words text-gray-600">{data.label}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(TaskNode);
