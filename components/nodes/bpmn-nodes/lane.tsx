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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function Lane({ id, data, selected }: NodeProps<NodeData>) {
  const { setNodes } = useReactFlow();
  const node = useStore((store) => store.getNodes().find((n) => n.id === id));
  const width = node?.width ?? 760;
  const height = node?.height ?? 100;

  const hasParent = !!node?.parentId;
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();
  const [label, setLabel] = useState(data.label);
  const [isEditing, setIsEditing] = useState(false);

  const onResize = (event: React.SyntheticEvent | any, params: any) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            width: params.width,
            height: params.height,
            data: {
              ...n.data,
              width: params.width,
              height: params.height,
            },
          };
        }
        return n;
      })
    );
  };

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
      <NodeResizer
        isVisible={selected} // Use selected from props
        minWidth={300}
        minHeight={100}
        onResize={onResize} // handler onResize
      />
      <NodeToolbar>
        <Button
          onClick={onDelete}
          size="sm"
          variant="destructive"
          className="h-8 px-2.5"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Excluir Lane
        </Button>
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
