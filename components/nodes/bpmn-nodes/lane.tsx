import { memo, useState } from 'react';
import {
  Handle,
  Position,
  NodeToolbar,
  NodeProps,
  useStore,
  useReactFlow,
} from 'reactflow';
import useDetachNodes from '@/hooks/use-detach-nodes';
import { NodeData } from '@/types/kaos-types';

function Lane({ id, data }: NodeProps<NodeData>) {
  const hasParent = useStore((store) => {
    const node = store.getNodes().find((n) => n.id === id);
    return !!node?.parentId;
  });
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
      className="w-[800px] h-[170px] bg-gray-100 flex items-center "
      onDoubleClick={handleDoubleClick}
      >

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
