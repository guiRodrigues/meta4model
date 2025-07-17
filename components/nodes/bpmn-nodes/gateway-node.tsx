"use client";

import type React from "react";

import { memo, useState, useEffect, useRef } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { NodeData } from "@/types/kaos-types";
import {
  DiamondExclusiveIcon,
  DiamondIcon,
  DiamondParallelIcon,
} from "@/components/icons/bpmn-icons";

function GatewayNode({ data, type, id }: NodeProps<NodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use our fixed node size
  const size = 70;

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
    data.label = label.trim() || "Gateway";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      data.label = label.trim() || "Gateway";
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setLabel(data.label);
    }
  };

  function renderIconByType() {
    switch (type) {
      case "exclusive":
        return (
          <DiamondExclusiveIcon
            className={`h-${size} w-${size} text-grey-500`}
          />
        );
      case "parallel":
        return (
          <DiamondParallelIcon
            className={`h-${size} w-${size} text-grey-500`}
          />
        );
      default:
        return <DiamondIcon className={`h-${size} w-${size} text-grey-500`} />;
    }
  }

  return (
    <div
      className="relative"
      onDoubleClick={handleDoubleClick}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className="pt-0 pb-0">{renderIconByType()}</div>

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-blue-500 react-flow__handle-left"
        style={{ left: -4 }} // Move handle up by 4px
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-500 react-flow__handle-right"
        style={{ right: -4 }} // Move handle down by 4px
      />

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-green-400"
        style={{ right: -4 }}
      />

      <div className="absolute inset-0 flex items-center justify-center text-center">
        {isEditing ? (
          <div className="flex justify-center mt-1">
            <input
              ref={inputRef}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-4/5 bg-white/80 text-xs font-medium outline-none border-b border-green-700 text-center text-gray-700 rounded px-1"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default memo(GatewayNode);
