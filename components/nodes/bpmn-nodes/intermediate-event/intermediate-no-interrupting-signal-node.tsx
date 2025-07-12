"use client";

import type React from "react";

import { memo, useState, useEffect, useRef } from "react";
import { Handle, NodeToolbar, Position, useReactFlow, useStore, type NodeProps } from "reactflow";
import type { NodeData } from "@/types/kaos-types";
import { CircleEndIcon, InterCircleInterruptigSignal, InterCircleInterruptingMenssage, InterCircleInterruptingTimer, InterCircleNoInterruptigSignal } from "@/components/icons/bpmn-icons";
import useDetachNodes from "@/hooks/use-detach-nodes";

function IntermediateNoInterruptingSignal({ data, type, id }: NodeProps<NodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasParent = useStore((store) => {
      const node = store.getNodes().find((n) => n.id === id);
      return !!node?.parentId;
    });
    const { deleteElements } = useReactFlow();
    const detachNodes = useDetachNodes();
  
    const onDelete = () => deleteElements({ nodes: [{ id }] });
    const onDetach = () => detachNodes([id]);
  // Use our fixed node size
  const size = 60;

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
    data.label = label.trim() || "End";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      data.label = label.trim() || "End";
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setLabel(data.label);
    }
  };

  return (
    <div
      className="relative"
      onDoubleClick={handleDoubleClick}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div className="pt-0 pb-0">
        <InterCircleNoInterruptigSignal className={`h-${size} w-${size} text-red-500`} />
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-blue-500 react-flow__handle-left"
        style={{ left: -4 }} // Move handle up by 4px
      />

      <NodeToolbar className="nodrag">
              <button onClick={onDelete}>Delete</button>
              {hasParent && <button onClick={onDetach}>Detach</button>}
            </NodeToolbar>

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
          <div
            className="text-xs font-medium text-gray-700 text-center absolute top-12 mt-1 left-1/2 transform -translate-x-1/2 break-words whitespace-normal"
            style={{ maxWidth: "160px", width: "max-content" }}
          >
            {data.label}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(IntermediateNoInterruptingSignal);
