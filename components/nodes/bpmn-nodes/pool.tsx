import { memo, useState, useEffect } from "react";
import {
  NodeToolbar,
  NodeProps,
  useStore,
  useReactFlow,
  NodeResizer,
} from "reactflow";
import { NodeData } from "@/types/kaos-types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function Pool({ id, data }: NodeProps<NodeData>) {
  const { setNodes, getNode } = useReactFlow();
  const node = useStore((store) => store.getNodes().find((n) => n.id === id));
  const childLanes = useStore((s) =>
    s.getNodes().filter((n) => n.parentId === id && n.type === "lane")
  );

  const [label, setLabel] = useState(data.label);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentPoolNode = getNode(id);
    if (!currentPoolNode) return;

    let totalHeight = 0;
    let currentY = 0;

    // Ordenar as lanes pela sua posição Y para garantir a ordem correta
    const sortedLanes = [...childLanes].sort(
      (a, b) => a.position.y - b.position.y
    );

    const nodesToUpdate = new Map();
    let positionChanged = false;

    sortedLanes.forEach((lane) => {
      const laneHeight = lane.height || 100;
      if (lane.position.y !== currentY) {
        nodesToUpdate.set(lane.id, {
          ...lane,
          position: { ...lane.position, y: currentY },
        });
        positionChanged = true;
      }
      currentY += laneHeight;
      totalHeight += laneHeight;
    });

    const minHeight = totalHeight > 0 ? totalHeight : 100;
    const heightChanged = currentPoolNode.height !== minHeight;

    if (heightChanged || positionChanged) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === id) {
            return {
              ...n,
              height: minHeight,
              style: { ...n.style, height: `${minHeight}px` },
            };
          }
          if (nodesToUpdate.has(n.id)) {
            return nodesToUpdate.get(n.id);
          }
          return n;
        })
      );
    }
  }, [childLanes, getNode, getNode, id, setNodes]);

  const onDelete = () => {
    const nodesToRemove = [id, ...childLanes.map((lane) => lane.id)];
    setNodes((nds) => nds.filter((n) => !nodesToRemove.includes(n.id)));
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false);
      if (e.key === "Enter") {
        data.label = label.trim() || "Pool";
      } else {
        setLabel(data.label);
      }
    }
  };

  const addLane = () => {
    const currentPoolNode = getNode(id);
    if (!currentPoolNode) return;

    const poolWidth = currentPoolNode.width || 800;

    const newLaneYPosition = childLanes.reduce(
      (acc, lane) => acc + (lane.height || 100),
      0
    );

    const newLane = {
      id: `lane-${Date.now()}`,
      type: "lane",
      data: { label: "Lane" },
      position: { x: 40, y: newLaneYPosition },
      parentId: id,
      extent: "parent" as const,
      width: poolWidth - 40,
      height: 100,
    };

    setNodes((nds) => [...nds, newLane]);
  };

  return (
    <div
      className="bg-gray-100 border border-black relative flex"
      style={{
        width: node?.width ?? 800,
        height: node?.height ?? 170,
      }}
      onDoubleClick={handleDoubleClick}
    >
      <NodeResizer handleClassName="opacity-0" lineClassName="opacity-0" />

      <NodeToolbar>
        <Button
          onClick={onDelete}
          size="sm"
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Excluir Pool
        </Button>
        <Button
          onClick={addLane}
          size="sm"
          className="bg-slate-800 text-white hover:bg-slate-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Lane
        </Button>
      </NodeToolbar>

      <div className="absolute top-0 left-0 h-full w-10 border-r border-black flex items-center justify-center">
        <div className="transform -rotate-90 whitespace-nowrap text-xs font-medium text-gray-700">
          {isEditing ? (
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setIsEditing(false)}
              className="w-full bg-transparent text-xs font-medium outline-none border-b border-green-700 text-center text-gray-700 rounded px-1"
              autoFocus
            />
          ) : (
            data.label
          )}
        </div>
      </div>

      <div className="w-full h-full relative" style={{ left: "40px" }}></div>
    </div>
  );
}

export default memo(Pool);
