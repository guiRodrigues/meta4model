import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

function useDetachNodes() {
  const { setNodes, getNodes } = useReactFlow();

  const detachNodes = useCallback(
    (ids: string[], removeParentId?: string) => {
      const allNodes = getNodes();
      const nextNodes = allNodes.map((n) => {
        if (ids.includes(n.id) && n.parentId) {
          const parentNode = allNodes.find((node) => node.id === n.parentId);

          return {
            ...n,
            position: {
              x: n.position.x + (parentNode?.position?.x ?? 0),
              y: n.position.y + (parentNode?.position?.y ?? 0),
            },
            expandParent: undefined,
            parentId: undefined,
            extent: undefined,
          };
        }
        return n;
      });

      setNodes(
        nextNodes.filter((n) => !removeParentId || n.id !== removeParentId)
      );
    },
    [setNodes, getNodes]
  );

  return detachNodes;
}

export default useDetachNodes;
