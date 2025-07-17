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
import { Plus, Trash2 } from "lucide-react";

function Pool({ id, data }: NodeProps<NodeData>) {
  const { setNodes, getNode } = useReactFlow();
  const { deleteElements } = useReactFlow();
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

    // Encontra a largura máxima entre todas as lanes filhas
    const maxWidth = Math.max(...childLanes.map((lane) => lane.width || 0));

    const poolWidth =
      maxWidth > 0 ? maxWidth + 40 : currentPoolNode.width || 800;

    // Ordena as lanes pela sua posição Y para garantir a ordem correta
    const sortedLanes = [...childLanes].sort(
      (a, b) => a.position.y - b.position.y
    );

    const nodesToUpdate: { [key: string]: any } = {};
    let changesOccurred = false;

    sortedLanes.forEach((lane) => {
      const laneHeight = lane.height || 100;
      const laneWidth = lane.width || 0;
      const laneNeedsUpdate =
        lane.position.y !== currentY || laneWidth !== maxWidth;

      if (laneNeedsUpdate) {
        nodesToUpdate[lane.id] = {
          position: { x: lane.position.x, y: currentY },
          width: maxWidth,
        };
        changesOccurred = true;
      }

      currentY += laneHeight;
      totalHeight += laneHeight;
    });

    const minHeight = totalHeight > 0 ? totalHeight : 100;
    const heightChanged = currentPoolNode.height !== minHeight;
    const widthChanged = currentPoolNode.width !== poolWidth;

    if (heightChanged || widthChanged || changesOccurred) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === id) {
            return {
              ...n,
              height: minHeight,
              width: poolWidth,
              style: {
                ...n.style,
                height: `${minHeight}px`,
                width: `${poolWidth}px`,
              },
            };
          }
          if (nodesToUpdate[n.id]) {
            const { position, width } = nodesToUpdate[n.id];
            return {
              ...n,
              position,
              width,
              style: { ...n.style, width: `${width}px` },
            };
          }
          return n;
        })
      );
    }
  }, [childLanes, getNode, id, setNodes]);

  const onDelete = () => deleteElements({ nodes: [{ id }] });

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

      <NodeToolbar className="flex gap-2 p-1">
        <Button
          onClick={onDelete}
          size="sm"
          variant="destructive"
          className="h-8 px-2.5"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Excluir Pool
        </Button>
        <Button
          onClick={addLane}
          size="sm"
          variant="secondary"
          className="h-8 px-2.5 bg-gray-200 text-gray-800 hover:bg-gray-300"
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
