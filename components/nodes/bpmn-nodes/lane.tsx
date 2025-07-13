import { memo, useState } from "react";
import {
  NodeToolbar,
  NodeProps,
  useStore,
  useReactFlow,
  NodeResizer,
} from "reactflow";
import useDetachNodes from "@/hooks/use-detach-nodes";
import { NodeData } from "@/types/kaos-types";

function Lane({ id, data }: NodeProps<NodeData>) {
  const node = useStore((store) => store.getNodes().find((n) => n.id === id));
  const width = node?.width ?? 760;
  const height = node?.height ?? 100;

  const hasParent = !!node?.parentId;
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();
  const [label, setLabel] = useState(data.label);
  const [isEditing, setIsEditing] = useState(false);

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      data.label = label.trim() || "Start";
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setLabel(data.label);
    }
  };

  return (
    <div
      className="bg-gray-100 flex items-center stroke-gray-300 border border-black relative"
      style={{
        width: width,
        height: height,
      }}
      onDoubleClick={handleDoubleClick}
    >
      <NodeResizer handleClassName="opacity-0" lineClassName="opacity-0"/>
      <NodeToolbar>
        <button onClick={onDelete}>Delete</button>
      </NodeToolbar>
      {isEditing ? (
        <div className="flex justify-center mt-1">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-4/5 bg-white/80 text-xs font-medium outline-none border-b border-green-700 text-center text-gray-700 rounded px-1"
          />
        </div>
      ) : (
        <div>
          <div
            className="transform -rotate-90 text-xs font-medium text-gray-700 text-center break-words whitespace-normal"
            style={{ maxWidth: "80px", width: "max-content" }}
          >
            {data.label}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(Lane);
