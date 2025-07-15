import { useCallback } from 'react';
import { NodeDragHandler, useReactFlow, type Node } from 'reactflow';

import { sortNodes, getNodePositionInsideParent } from '../utils/node-parent-utils';

export function useNodeDragHandlers() {
  const { getIntersectingNodes, getNodes, setNodes } = useReactFlow();

  const onNodeDragStop: NodeDragHandler = useCallback(
    (_, node) => {
      if ((node.type === 'pool') && !node.parentId) {
        return;
      }

      if ((node.type === 'lane') && !node.parentId) {
        return;
      }

      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === 'pool' || n.type === 'lane'
      );
      const groupNode = intersections[0];

      if (intersections.length && node.parentId !== groupNode?.id) {
        const nextNodes: Node[] = getNodes()
          .map((n) => {
            if (n.id === groupNode.id) {
              return {
                ...n,
                className: '',
              };
            } else if (n.id === node.id) {
              const position = getNodePositionInsideParent(n, groupNode) ?? {
                x: 0,
                y: 0,
              };

              return {
                ...n,
                position,
                parentId: groupNode.id,
                extent: 'parent',
              } as Node;
            }

            return n;
          })
          .sort(sortNodes);

        setNodes(nextNodes);
      } else if (!intersections.length && node.parentId) {
        // Se não houver interseção e o node tinha parentId, removê-lo
        const nextNodes: Node[] = getNodes()
          .map((n) => {
            if (n.id === node.id) {
              return {
                ...n,
                parentId: undefined,
                extent: undefined,
              } as Node;
            }
            return n;
          })
          .sort(sortNodes);
        setNodes(nextNodes);
      }
    },
    [getIntersectingNodes, getNodes, setNodes]
  );

  const onNodeDrag: NodeDragHandler = useCallback(
    (_, node) => {
      if ((node.type === 'pool' || node.type === 'lane') && !node.parentId) {
        return;
      }

      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === 'pool' || n.type === 'lane'
      );
      const groupClassName =
        intersections.length && node.parentId !== intersections[0]?.id
          ? 'active'
          : '';
      console.log(groupClassName);
      setNodes((nds) => {
        return nds.map((n) => {
          if (n.type === 'pool' || n.type === 'lane') {
            return {
              ...n,
              className: groupClassName,
            };
          } else if (n.id === node.id) {
            return {
              ...n,
              position: node.position,
            };
          }

          return { ...n };
        });
      });
    },
    [getIntersectingNodes, setNodes]
  );

  return {
    onNodeDragStop,
    onNodeDrag,
  };
}
