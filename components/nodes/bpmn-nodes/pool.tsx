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

function Pool({ id, data }: NodeProps<NodeData>) {
  const hasParent = useStore((store) => {
    const node = store.getNodes().find((n) => n.id === id);
    return !!node?.parentId;
  });
  const { deleteElements } = useReactFlow();
  const [label, setLabel] = useState(data.label);
  const [isEditing, setIsEditing] = useState(false);

  const onDelete = () => deleteElements({ nodes: [{ id }] });
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setIsEditing(false);
        data.label = label.trim() || "Pool";
      } else if (e.key === "Escape") {
        setIsEditing(false);
        setLabel(data.label);
      }
    };



  return (
 <div 
      className="w-[800px] h-[300px] bg-gray-100 border border-black relative"
      onDoubleClick={handleDoubleClick}
    >
      <NodeToolbar isVisible>
        <button onClick={onDelete}>Delete</button>
      </NodeToolbar>

      <div 
        className="absolute top-1/2 -translate-y-1/2 left-2 transform -rotate-90 whitespace-nowrap text-xs font-medium text-gray-700"
      >
        {data.label}
      </div>

      <div className="absolute top-0 left-10 h-full w-px bg-black" />

      {isEditing && (
        <div className="w-full h-full flex items-center justify-center">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-4/5 bg-white/80 text-xs font-medium outline-none border-b border-green-700 text-center text-gray-700 rounded px-1"
          />
        </div>
      )}
    </div>
  );
}

export default memo(Pool);
