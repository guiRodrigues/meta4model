"use client";

import type React from "react";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  Panel,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Sidebar } from "@/components/sidebar";
import type {
  NodeData,
  CustomNodeDefinition,
  CustomConnectionDefinition,
} from "@/types/kaos-types";
import { NodePropertiesPanel } from "@/components/node-properties-panel";
import { useResizeObserverErrorSuppressor } from "@/hooks/use-resize-observer-error-suppressor";
import {
  GitMerge,
  LinkIcon,
  Layers,
  Zap,
  Wrench,
  AlertOctagon,
  Undo2,
  Redo2,
} from "lucide-react";
import FloatingConnectionLine from "@/components/floating-connection-line";
import {
  prepareDiagramForExport,
  type DiagramData,
} from "@/utils/import-export-utils";
import { useDiagramContext } from "@/components/diagram-context";
import { RectangleIcon } from "@/components/icons/kaos-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QuickTipsDialog } from "@/components/quick-tips-dialog";
import type { ModelDefinition } from "@/types/model-types";
import { useUndoRedo } from "@/hooks/use-undo-redo";

interface KAOSDiagramEditorProps {
  model: ModelDefinition;
}

export default function KAOSDiagramEditor({ model }: KAOSDiagramEditorProps) {
  // Use the custom hook to suppress ResizeObserver errors
  useResizeObserverErrorSuppressor();

  return (
    <ReactFlowProvider>
      <DiagramEditor model={model} />
    </ReactFlowProvider>
  );
}

function DiagramEditor({ model }: { model: ModelDefinition }) {
  const { registerExportFunction, registerImportFunction, updateDiagramState } =
    useDiagramContext();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedEdgeType, setSelectedEdgeType] =
    useState<string>("refinement");
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [customNodes, setCustomNodes] = useState<CustomNodeDefinition[]>(() =>
    loadCustomNodes()
  );
  const [customConnections, setCustomConnections] = useState<
    CustomConnectionDefinition[]
  >(() => loadCustomConnections());
  const [validationError, setValidationError] = useState<string | null>(null);
  const [errorExiting, setErrorExiting] = useState(false);
  const [currentDiagramType, setCurrentDiagramType] = useState<string | null>(
    null
  );
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [showQuickTips, setShowQuickTips] = useState(false);
  const [isDraggingConnection, setIsDraggingConnection] = useState(false);
  const [sourceNodeId, setSourceNodeId] = useState<string | null>(null);
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Add these new state variables after the existing state declarations
  const [sourceNodeType, setSourceNodeType] = useState<string | null>(null);
  const [validTargetTypes, setValidTargetTypes] = useState<string[]>([]);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<Edge | null>(null);
  const [edgeTooltip, setEdgeTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  const { undo, redo, takeSnapshot, canUndo, canRedo } = useUndoRedo({
    maxHistorySize: 50,
    enableShortcuts: true,
  });

  // Load custom nodes from localStorage
  function loadCustomNodes(): CustomNodeDefinition[] {
    if (typeof window === "undefined") return [];

    try {
      const savedNodes = localStorage.getItem(`${model.id}-custom-nodes`);
      return savedNodes ? JSON.parse(savedNodes) : [];
    } catch (error) {
      console.error("Failed to load custom nodes:", error);
      return [];
    }
  }

  // Save custom nodes to localStorage
  const saveCustomNodes = (nodes: CustomNodeDefinition[]) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(`${model.id}-custom-nodes`, JSON.stringify(nodes));
    } catch (error) {
      console.error("Failed to save custom nodes:", error);
    }
  };

  // Load custom connections from localStorage
  function loadCustomConnections(): CustomConnectionDefinition[] {
    if (typeof window === "undefined") return [];

    try {
      const savedConnections = localStorage.getItem(
        `${model.id}-custom-connections`
      );
      return savedConnections ? JSON.parse(savedConnections) : [];
    } catch (error) {
      console.error("Failed to load custom connections:", error);
      return [];
    }
  }

  // Save custom connections to localStorage
  const saveCustomConnections = (connections: CustomConnectionDefinition[]) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(
        `${model.id}-custom-connections`,
        JSON.stringify(connections)
      );
    } catch (error) {
      console.error("Failed to save custom connections:", error);
    }
  };

  // Update diagram state in context whenever nodes or edges change
  useEffect(() => {
    updateDiagramState(nodes, edges);
  }, [nodes, edges, updateDiagramState]);

  // Use the model's node types and edge types
  const nodeTypes = useMemo(() => model?.nodeTypes || {}, [model]);
  const edgeTypes = useMemo(() => {
    // Create a base object with default edge types or empty object if model.edgeTypes is undefined
    const types = { ...(model?.edgeTypes || {}) };

    // Add custom edge types
    customConnections.forEach((conn) => {
      // Only add if we have a custom edge type component
      if (model?.edgeTypes?.custom) {
        types[conn.id] = model.edgeTypes.custom;
      }
    });

    return types;
  }, [model, customConnections]);

  // Add this function to determine the diagram type based on node type
  const getDiagramTypeForNode = useCallback(
    (nodeType: string, diagramType?: string): string => {
      // If a specific diagram type is provided, use it
      if (diagramType) return diagramType;

      // Find the diagram type that includes this node type
      const matchingDiagramType = model.diagramTypes?.find((dt) =>
        dt.nodeTypes.includes(nodeType)
      );

      return matchingDiagramType?.name || "Custom Diagram";
    },
    [model]
  );

  // Create the export function with useMemo to prevent recreation on every render
  const handleExportDiagram = useMemo(() => {
    return () =>
      prepareDiagramForExport(nodes, edges, customNodes, customConnections);
  }, [nodes, edges, customNodes, customConnections]);

  // Create the import function with useCallback
  const handleImportDiagram = useCallback(
    (data: DiagramData) => {
      // Generate new IDs for imported nodes to avoid conflicts
      const importedNodes = data.nodes.map((node) => ({
        ...node,
        id: `${node.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      }));

      // Generate new IDs for imported edges and update their source/target references
      const idMap: Record<string, string> = {};
      data.nodes.forEach((node, index) => {
        idMap[node.id] = importedNodes[index].id;
      });

      const importedEdges = data.edges.map((edge) => ({
        ...edge,
        id: `${edge.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        source: idMap[edge.source] || edge.source,
        target: idMap[edge.target] || edge.target,
      }));

      // Merge custom nodes (avoid duplicates by checking name)
      const existingNodeNames = new Set(customNodes.map((node) => node.name));
      const newCustomNodes = data.customNodes
        .filter((node) => !existingNodeNames.has(node.name))
        .map((node) => ({
          ...node,
          // Ensure SVG code is properly preserved
          svgCode: node.svgCode || "",
        }));

      if (newCustomNodes.length > 0) {
        setCustomNodes((prev) => {
          const updated = [...prev, ...newCustomNodes];
          saveCustomNodes(updated);
          return updated;
        });
      }

      // Merge custom connections (avoid duplicates by checking name)
      const existingConnectionNames = new Set(
        customConnections.map((conn) => conn.name)
      );
      const newCustomConnections = data.customConnections.filter(
        (conn) => !existingConnectionNames.has(conn.name)
      );

      if (newCustomConnections.length > 0) {
        setCustomConnections((prev) => {
          const updated = [...prev, ...newCustomConnections];
          saveCustomConnections(updated);
          return updated;
        });
      }

      // Add imported nodes and edges to existing ones
      setNodes((prev) => [...prev, ...importedNodes]);
      setEdges((prev) => [...prev, ...importedEdges]);

      // Determine diagram type if not already set
      if (!currentDiagramType && importedNodes.length > 0) {
        // Find the first non-custom node to determine diagram type
        const firstStandardNode = importedNodes.find(
          (node) => node.type !== "custom"
        );
        if (firstStandardNode) {
          setCurrentDiagramType(getDiagramTypeForNode(firstStandardNode.type));
        }
      }

      // Fit view to show all nodes
      setTimeout(() => {
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ padding: 0.2 });
        }
      }, 100);
    },
    [
      getDiagramTypeForNode,
      reactFlowInstance,
      setNodes,
      setEdges,
      customNodes,
      customConnections,
      currentDiagramType,
    ]
  );

  // Register the export and import functions with the context only once
  useEffect(() => {
    const exportFn = () =>
      prepareDiagramForExport(nodes, edges, customNodes, customConnections);
    registerExportFunction(exportFn);
    registerImportFunction(handleImportDiagram);
  }, [
    registerExportFunction,
    registerImportFunction,
    handleImportDiagram,
    nodes,
    edges,
    customNodes,
    customConnections,
  ]);

  // Show quick tips on first visit
  useEffect(() => {
    // Check if this is a new user session
    const hasSeenQuickTips =
      typeof window !== "undefined"
        ? localStorage.getItem("meta4model-quick-tips-seen")
        : null;

    if (!hasSeenQuickTips) {
      // Show the quick tips after a short delay to allow the UI to render
      const timer = setTimeout(() => {
        setShowQuickTips(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this only runs once when component mounts

  // Add the reset canvas function
  const handleResetCanvas = useCallback(() => {
    setIsResetDialogOpen(true);
  }, []);

  // Add the confirm reset function
  const confirmResetCanvas = useCallback(() => {
    // Take snapshot before making changes
    takeSnapshot();

    setNodes([]);
    setEdges([]);
    setCurrentDiagramType(null);
    setIsResetDialogOpen(false);
  }, [takeSnapshot, setNodes, setEdges]);

  // Add the delete node function
  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      // Take snapshot before making changes
      takeSnapshot();

      // Remove the node
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));

      // Remove any edges connected to this node
      setEdges((edges) =>
        edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );

      // If there are no more nodes, reset the diagram type
      const remainingNodes = nodes.filter((node) => node.id !== nodeId);
      if (remainingNodes.length === 0) {
        setCurrentDiagramType(null);
      }
    },
    [takeSnapshot, setNodes, setEdges, nodes]
  );

  // Add this function to handle edge deletion (after the handleDeleteNode function)
  const handleDeleteEdge = useCallback(
    (edgeId: string) => {
      // Take snapshot before making changes
      takeSnapshot();

      setEdges((edges) => edges.filter((edge) => edge.id !== edgeId));
      setSelectedEdge(null);
      setHoveredEdge(null);
    },
    [takeSnapshot, setEdges]
  );

  // Toggle edge deletion mode
  // Handle saving a new custom node
  const handleSaveCustomNode = useCallback((node: CustomNodeDefinition) => {
    setCustomNodes((prev) => {
      const updated = [...prev, node];
      saveCustomNodes(updated);
      return updated;
    });
  }, []);

  // Handle deleting a custom node
  const handleDeleteCustomNode = useCallback((nodeId: string) => {
    setCustomNodes((prev) => {
      const updated = prev.filter((node) => node.id !== nodeId);
      saveCustomNodes(updated);
      return updated;
    });
  }, []);

  // Handle saving a new custom connection
  const handleSaveCustomConnection = useCallback(
    (connection: CustomConnectionDefinition) => {
      setCustomConnections((prev) => {
        const updated = [...prev, connection];
        saveCustomConnections(updated);
        return updated;
      });
    },
    []
  );

  // Handle deleting a custom connection
  const handleDeleteCustomConnection = useCallback(
    (connectionId: string) => {
      setCustomConnections((prev) => {
        const updated = prev.filter(
          (connection) => connection.id !== connectionId
        );
        saveCustomConnections(updated);
        return updated;
      });

      // If the deleted connection is currently selected, reset to default
      if (selectedEdgeType === connectionId) {
        setSelectedEdgeType("refinement");
      }
    },
    [selectedEdgeType]
  );

  const handleQuickTipsClose = useCallback((open: boolean) => {
    setShowQuickTips(open);

    // If dialog is being closed, mark as seen
    if (!open && typeof window !== "undefined") {
      localStorage.setItem("meta4model-quick-tips-seen", "true");
    }
  }, []);

  // Helper function to check if a node is a custom node with a specific ID
  const isCustomNodeWithId = useCallback(
    (node: Node<NodeData>, customNodeId: string): boolean => {
      if (node.type !== "custom") return false;

      // Check if the node has customNodeId in its data
      if (node.data?.customNodeId === customNodeId) return true;

      // Check if the node has svgCode that matches a custom node definition
      const matchingCustomNode = customNodes.find(
        (cn) => cn.id === customNodeId
      );
      if (
        matchingCustomNode &&
        node.data?.svgCode === matchingCustomNode.svgCode
      )
        return true;

      // Check if the node ID contains the custom node ID
      if (node.id.includes(customNodeId)) return true;

      return false;
    },
    [customNodes]
  );

  // Handle connections between nodes with validation
  const onConnect = useCallback(
    (params: Connection | Edge) => {
      // Take snapshot before making changes
      takeSnapshot();

      // Use the model's validation rules if available
      const validateConnectionFn = model.validationRules?.validateConnection;

      if (validateConnectionFn) {
        // Validate the connection based on the selected edge type
        const validationResult = validateConnectionFn(
          params as Connection,
          nodes,
          selectedEdgeType,
          customConnections,
          customNodes
        );

        if (!validationResult.valid) {
          // Show validation error
          setValidationError(validationResult.message || "Invalid connection");
          return; // Don't create the connection
        }
      }

      // Add the selected edge type to the connection
      const edge: Edge = { ...params, type: selectedEdgeType };

      // Add custom connection data if it's a custom connection
      const customConnection = customConnections.find(
        (conn) => conn.id === selectedEdgeType
      );
      if (customConnection) {
        edge.data = {
          lineSvgCode: customConnection.lineSvgCode,
          markerSvgCode: customConnection.markerSvgCode,
          color: customConnection.color,
          lineStyle: customConnection.lineStyle,
          label: customConnection.label,
        };
      }

      setEdges((eds) => addEdge(edge, eds));
    },
    [
      takeSnapshot,
      setEdges,
      selectedEdgeType,
      customConnections,
      customNodes,
      nodes,
      model,
    ]
  );

  // Handle dropping nodes from the sidebar
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Modify the onDrop function to handle the diagram type parameter
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const name = event.dataTransfer.getData("application/nodeName");
      const diagramType = event.dataTransfer.getData("application/diagramType");
      const customNodeId = event.dataTransfer.getData(
        "application/customNodeId"
      );

      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // Take snapshot before making changes
      takeSnapshot();

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Handle custom node
      if (type === "custom" && customNodeId) {
        const customNodeDef = customNodes.find(
          (node) => node.id === customNodeId
        );
        if (customNodeDef) {
          // If this is the first node, set the diagram type based on the custom node's diagram types
          if (
            nodes.length === 0 &&
            customNodeDef.diagramTypes &&
            customNodeDef.diagramTypes.length > 0
          ) {
            const diagramTypeMap: Record<string, string> = {
              goal: "Goal Diagram",
              responsibility: "Responsibility Diagram",
              object: "Object Diagram",
              operation: "Operation Diagram",
              bpmn: "BPMN Diagram",
            };
            // Use the first diagram type as the default
            setCurrentDiagramType(
              diagramTypeMap[customNodeDef.diagramTypes[0]]
            );
          }

          const newNode: Node = {
            id: `${type}-${Date.now()}`,
            type,
            position,
            data: {
              label: customNodeDef.name,
              svgCode: customNodeDef.svgCode,
              nodeColor: customNodeDef.color,
              customNodeId: customNodeId, // Store the custom node ID
              isNew: true,
              diagramTypes: customNodeDef.diagramTypes, // Store the array of diagram types
            },
          };
          setNodes((nds) => nds.concat(newNode));
          return;
        }
      }

      // If this is the first node, set the diagram type based on the node type and diagram type
      if (nodes.length === 0) {
        setCurrentDiagramType(getDiagramTypeForNode(type, diagramType));
      }

      // Add the node with the diagram type
      const newNode: Node<NodeData> = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: name || type,
          isNew: true,
          diagramType: diagramType || null,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [
      takeSnapshot,
      reactFlowInstance,
      setNodes,
      customNodes,
      nodes.length,
      getDiagramTypeForNode,
    ]
  );

  // Modify the handleAddNode function to handle the diagram type
  const handleAddNode = useCallback(
    (type: string, label: string, customNodeId?: string) => {
      if (!reactFlowInstance) return;

      // Take snapshot before making changes
      takeSnapshot();

      // Get the center of the viewport
      const { x, y, zoom } = reactFlowInstance.getViewport();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate a position near the center of the viewport
      const position = reactFlowInstance.screenToFlowPosition({
        x: centerX,
        y: centerY,
      });

      // Add a small random offset to prevent nodes from stacking exactly on top of each other
      position.x += Math.random() * 100 - 50;
      position.y += Math.random() * 100 - 50;

      // Handle custom node
      if (type === "custom" && customNodeId) {
        const customNodeDef = customNodes.find(
          (node) => node.id === customNodeId
        );
        if (customNodeDef) {
          // If this is the first node, set the diagram type based on the custom node's diagram types
          if (
            nodes.length === 0 &&
            customNodeDef.diagramTypes &&
            customNodeDef.diagramTypes.length > 0
          ) {
            const diagramTypeMap: Record<string, string> = {
              goal: "Goal Diagram",
              responsibility: "Responsibility Diagram",
              object: "Object Diagram",
              operation: "Operation Diagram",
              bpmn: "BPMN Diagram",
            };
            // Use the first diagram type as the default
            setCurrentDiagramType(
              diagramTypeMap[customNodeDef.diagramTypes[0]]
            );
          }

          const newNode: Node = {
            id: `${type}-${Date.now()}`,
            type,
            position,
            data: {
              label: customNodeDef.name,
              svgCode: customNodeDef.svgCode,
              nodeColor: customNodeDef.color,
              customNodeId: customNodeId, // Store the custom node ID
              isNew: true,
              diagramTypes: customNodeDef.diagramTypes, // Store the array of diagram types
            },
          };
          setNodes((nds) => nds.concat(newNode));
          return;
        }
      }

      // Determine the diagram type based on the current diagram type
      let nodeDiagramType = currentDiagramType;

      // If this is the first node, set the diagram type based on the node type
      if (nodes.length === 0) {
        nodeDiagramType = getDiagramTypeForNode(type);
        setCurrentDiagramType(nodeDiagramType);
      }

      // Add the node with the diagram type
      const newNode: Node<NodeData> = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: label || type,
          isNew: true,
          diagramType: nodeDiagramType,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [
      takeSnapshot,
      reactFlowInstance,
      setNodes,
      customNodes,
      nodes.length,
      currentDiagramType,
      getDiagramTypeForNode,
    ]
  );

  // Handle node selection
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as Node<NodeData>);
    setSelectedEdge(null);
  }, []);

  // Add this function to handle edge selection (after the onNodeClick function)
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    setSelectedEdge(edge);
    // Clear node selection when selecting an edge
    setSelectedNode(null);
  }, []);

  // Add this function to handle edge mouse over
  const onEdgeMouseEnter = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      setHoveredEdge(edge);
    },
    []
  );

  // Add this function to handle edge mouse leave
  const onEdgeMouseLeave = useCallback(() => {
    setHoveredEdge(null);
    setEdgeTooltip(null);
  }, []);

  // Handle node deselection
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Add keyboard event handler for deleting edges (after the onPaneClick function)
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    // No longer handling edge deletion
  }, []);

  // Update node data
  const updateNodeData = useCallback(
    (nodeId: string, data: NodeData) => {
      // Take snapshot before making changes
      takeSnapshot();

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...data,
              },
            };
          }
          return node;
        })
      );
    },
    [takeSnapshot, setNodes]
  );

  // Debounce the fitView call to avoid ResizeObserver issues
  const onInit = useCallback((instance: any) => {
    setReactFlowInstance(instance);
    // Delay the fitView call to avoid ResizeObserver issues
    setTimeout(() => {
      instance.fitView({ padding: 0.2 });
    }, 500); // Increased from 200ms to 500ms for more stability
  }, []);

  // Add this to ensure we're handling resize events properly
  useEffect(() => {
    // Add a significant delay before initial rendering to allow the DOM to stabilize
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500); // Increased from 200ms to 500ms for more stability

    return () => clearTimeout(timer);
  }, []);

  // Add useEffect for keyboard events (after other useEffects)
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  // Add useEffect to clean up edge deletion mode when component unmounts

  // Clear validation error after timeout
  useEffect(() => {
    if (validationError) {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }

      validationTimeoutRef.current = setTimeout(() => {
        // Start the exit animation
        setErrorExiting(true);

        // After animation completes, clear the error
        setTimeout(() => {
          setValidationError(null);
          setErrorExiting(false);
        }, 300); // Match this to the animation duration
      }, 6000); // Show error for 6 seconds
    }

    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, [validationError]);

  // Helper function to get the appropriate icon for the selected edge type
  const getConnectionIcon = useCallback(() => {
    // Check if it's a custom connection
    const customConnection = customConnections.find(
      (conn) => conn.id === selectedEdgeType
    );
    if (customConnection) {
      let strokeDasharray = "";
      if (customConnection.lineStyle === "dashed") strokeDasharray = "5,5";
      if (customConnection.lineStyle === "dotted") strokeDasharray = "1,3";

      return (
        <svg width="16" height="16" viewBox="0 0 24 20" className="mr-0">
          <line
            x1="2"
            y1="10"
            x2="22"
            y2="10"
            stroke={customConnection.color}
            strokeWidth="2"
            strokeDasharray={strokeDasharray}
          />
        </svg>
      );
    }

    // Find the connection in the model's default connections (with null check)
    const defaultConnection = model?.defaultConnections?.find(
      (conn) => conn.type === selectedEdgeType
    );
    if (defaultConnection && defaultConnection.icon) {
      return defaultConnection.icon;
    }

    // Return the appropriate icon for standard connection types
    switch (selectedEdgeType) {
      case "conflict":
        return <Zap className="h-4 w-4 text-red-500" />;
      case "refinement":
        return <GitMerge className="h-4 w-4 text-yellow-500" />;
      case "responsibility":
        return <GitMerge className="h-4 w-4 text-red-500" />;
      case "operationalization":
        return <Wrench className="h-4 w-4 text-blue-500" />;
      case "link":
        return <LinkIcon className="h-4 w-4 text-green-500" />;
      case "aggregation":
        return <Layers className="h-4 w-4 text-purple-500" />;
      default:
        return <GitMerge className="h-4 w-4 text-gray-500" />;
    }
  }, [selectedEdgeType, customConnections, model]);

  // Add this function inside the DiagramEditor component
  const onConnectStart = useCallback(
    (_, { nodeId, handleType }) => {
      // Store the source node ID when starting a connection
      if (nodeId) {
        console.log(
          `Connection started from node ${nodeId}, handle type: ${handleType}`
        );
        setIsDraggingConnection(true);
        setSourceNodeId(nodeId);

        // Find the source node to get its type
        const sourceNode = nodes.find((node) => node.id === nodeId);
        if (sourceNode) {
          setSourceNodeType(sourceNode.type);

          // Determine valid target types based on the selected edge type and source node type
          let validTypes: string[] = [];

          // Check if it's a custom connection with target constraints
          const customConnection = customConnections.find(
            (conn) => conn.id === selectedEdgeType
          );
          if (
            customConnection &&
            customConnection.possibleTargetTypes &&
            customConnection.possibleTargetTypes.length > 0
          ) {
            // For custom connections, use the defined possible target types
            validTypes = customConnection.possibleTargetTypes;
          } else {
            // For built-in connections, use the validation rules
            switch (selectedEdgeType) {
              case "conflict":
                // Conflict can only connect to goals
                if (sourceNode.type === "goal") {
                  validTypes = ["goal"];
                }
                break;
              case "refinement":
                // Add other validation rules as needed
                validTypes = [
                  "goal",
                  "requirement",
                  "expectation",
                  "domainProperty",
                  "obstacle",
                ];
                break;
              // Add cases for other connection types
              default:
                // Default to allowing all node types
                validTypes = [
                  "goal",
                  "requirement",
                  "expectation",
                  "domainProperty",
                  "obstacle",
                  "agent",
                  "entity",
                  "operation",
                  "custom",
                ];
            }
          }

          setValidTargetTypes(validTypes);

          // Apply classes to potential target nodes
          nodes.forEach((node) => {
            if (node.id !== nodeId) {
              // Skip the source node
              const nodeElement = document.querySelector(
                `[data-id="${node.id}"]`
              );
              if (nodeElement) {
                // Get the handle element
                const handleElement = nodeElement.querySelector(
                  ".react-flow__handle-top"
                );
                if (handleElement) {
                  // Check if this node type is a valid target
                  let isValidTarget = false;

                  // Check for standard node types
                  if (validTypes.includes(node.type)) {
                    isValidTarget = true;
                  }

                  // Special handling for custom nodes
                  if (node.type === "custom") {
                    // Check if any of the valid types is a custom node ID that matches this node
                    for (const type of validTypes) {
                      if (type.startsWith("custom-")) {
                        const customNodeId = type;
                        if (isCustomNodeWithId(node, customNodeId)) {
                          isValidTarget = true;
                          break;
                        }
                      }
                    }
                  }

                  // Apply the appropriate class
                  if (isValidTarget) {
                    handleElement.classList.add("react-flow__handle-valid");
                    handleElement.classList.remove(
                      "react-flow__handle-invalid"
                    );
                  } else {
                    handleElement.classList.add("react-flow__handle-invalid");
                    handleElement.classList.remove("react-flow__handle-valid");
                  }
                }
              }
            }
          });
        }

        // Add a class to the source node
        const sourceNodeElement = document.querySelector(
          `[data-id="${nodeId}"]`
        );
        if (sourceNodeElement) {
          sourceNodeElement.classList.add("source-node");
        }

        // Add a class to the ReactFlow container
        const rfWrapper = document.querySelector(".react-flow");
        if (rfWrapper) {
          rfWrapper.classList.add("dragging");
        }
      }
    },
    [nodes, selectedEdgeType, customConnections, isCustomNodeWithId]
  );

  // Define onConnectEnd without sourceNodeId in the dependency array
  const onConnectEnd = useCallback(
    (event) => {
      // Reset the dragging state
      setIsDraggingConnection(false);
      setSourceNodeType(null);
      setValidTargetTypes([]);

      // Clean up handle classes
      document.querySelectorAll(".react-flow__handle-top").forEach((handle) => {
        handle.classList.remove("react-flow__handle-valid");
        handle.classList.remove("react-flow__handle-invalid");
      });

      // Get the current sourceNodeId from the DOM instead of from state
      const sourceNodeElementDom = document.querySelector(".source-node");
      const currentSourceNodeId =
        sourceNodeElementDom?.getAttribute("data-id") || null;

      // Remove the class from the source node
      if (sourceNodeElementDom) {
        sourceNodeElementDom.classList.remove("source-node");
      }

      // Clear the source node ID
      setSourceNodeId(null);

      // Remove the class from the ReactFlow container
      const rfWrapper = document.querySelector(".react-flow");
      if (rfWrapper) {
        rfWrapper.classList.remove("dragging");
      }

      if (!event || !event.target) return;

      const targetElement = document.elementFromPoint(
        event.clientX,
        event.clientY
      );
      if (!targetElement) return;

      // Find the node element that contains the target element
      const nodeElement = targetElement.closest(".react-flow__node");
      if (!nodeElement) return;

      const targetNodeId = nodeElement.getAttribute("data-id");
      if (!targetNodeId) return;

      // Find the source node ID from the event
      const sourceNodeElement = event.target.closest(".react-flow__node");
      if (!sourceNodeElement) return;

      const sourceNodeId = sourceNodeElement.getAttribute("data-id");
      if (!sourceNodeId || sourceNodeId === targetNodeId) return;

      // Find the source and target nodes
      const sourceNode = nodes.find((node) => node.id === sourceNodeId);
      const targetNode = nodes.find((node) => node.id === targetNodeId);

      if (!sourceNode || !targetNode) return;

      // Create a connection between the source and target nodes
      const newEdge = {
        id: `edge-${sourceNodeId}-${targetNodeId}-${Date.now()}`,
        source: sourceNodeId,
        target: targetNodeId,
        type: selectedEdgeType,
      };

      // Add custom connection data if it's a custom connection
      const customConnection = customConnections.find(
        (conn) => conn.id === selectedEdgeType
      );
      if (customConnection) {
        newEdge.data = {
          lineSvgCode: customConnection.lineSvgCode,
          markerSvgCode: customConnection.markerSvgCode,
          color: customConnection.color,
          lineStyle: customConnection.lineStyle,
          label: customConnection.label,
        };
      }

      // Use the model's validation rules if available
      const validateConnectionFn = model.validationRules?.validateConnection;

      if (validateConnectionFn) {
        // Validate the connection
        const validationResult = validateConnectionFn(
          { source: sourceNodeId, target: targetNodeId },
          nodes,
          selectedEdgeType,
          customConnections,
          customNodes
        );

        if (validationResult.valid) {
          setEdges((eds) => [...eds, newEdge]);
        } else {
          // Show validation error
          setValidationError(validationResult.message || "Invalid connection");
        }
      } else {
        // If no validation rules, just add the edge
        setEdges((eds) => [...eds, newEdge]);
      }
    },
    [
      nodes,
      selectedEdgeType,
      customConnections,
      customNodes,
      setEdges,
      model,
      setValidationError,
    ]
  );

  const handleEdgeTypeSelect = (edgeType: string) => {
    setSelectedEdgeType(edgeType);
  };

  const handleResetCanvasClick = () => {
    handleResetCanvas();
  };

  // Helper function to get the diagram type description
  const getDiagramTypeDescription = (type: string | null): string => {
    if (!type) return "";

    const diagramType = model.diagramTypes?.find((dt) => dt.name === type);
    if (diagramType) {
      return diagramType.description;
    }

    switch (type) {
      case "Goal Diagram":
        return "Model system goals, requirements, and obstacles";
      case "Responsibility Diagram":
        return "Show agent responsibilities for requirements";
      case "Object Diagram":
        return "Model entities and their relationships";
      case "Operation Diagram":
        return "Show operations that implement requirements";
      case "Custom Diagram":
        return "Custom diagram with user-defined elements";
      case "BPMN Diagram":
        return "Business Process Model and Notation diagram";
      default:
        return "";
    }
  };

  // Helper function to get the connection type description
  const getConnectionTypeDescription = (type: string): string => {
    const customConnection = customConnections.find((conn) => conn.id === type);
    if (customConnection?.description) return customConnection.description;

    const defaultConnection = model?.defaultConnections?.find(
      (conn) => conn.type === type
    );
    if (defaultConnection?.description) return defaultConnection.description;

    switch (type) {
      case "conflict":
        return "Indicates conflicting goals";
      case "responsibility":
        return "Shows agent responsibility";
      case "operationalization":
        return "Implements requirements";
      case "link":
        return "General relationship";
      case "aggregation":
        return "Groups related elements";
      default:
        return customConnection ? "Custom connection type" : "";
    }
  };

  const onNodeDragStart = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  const onSelectionDragStart = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar
        model={model}
        onEdgeTypeSelect={handleEdgeTypeSelect}
        selectedEdgeType={selectedEdgeType}
        customNodes={customNodes}
        customConnections={customConnections}
        onSaveCustomNode={handleSaveCustomNode}
        onDeleteCustomNode={handleDeleteCustomNode}
        onSaveCustomConnection={handleSaveCustomConnection}
        onDeleteCustomConnection={handleDeleteCustomConnection}
        onAddNode={handleAddNode}
        onExportDiagram={handleExportDiagram}
        onImportDiagram={handleImportDiagram}
        currentDiagramType={currentDiagramType}
        onResetCanvas={handleResetCanvasClick}
      />
      <div className="relative flex-1" ref={reactFlowWrapper}>
        {isReady ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            snapToGrid={false}
            defaultEdgeOptions={{ type: selectedEdgeType }}
            minZoom={0.5}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            className="bg-[#f9f9f7]"
            connectionLineComponent={FloatingConnectionLine}
            connectionLineType={ConnectionLineType.Bezier}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            connectionMode="loose"
            proOptions={{ hideAttribution: true }}
            onEdgeClick={onEdgeClick}
            onEdgeMouseEnter={onEdgeMouseEnter}
            onEdgeMouseLeave={onEdgeMouseLeave}
            onNodeDragStart={onNodeDragStart}
            onSelectionDragStart={onSelectionDragStart}
          >
            <Controls className="bg-white border shadow-sm rounded-lg m-4">
              <div className="flex flex-col gap-1 p-1">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="h-4 w-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Redo (Ctrl+Shift+Z)"
                >
                  <Redo2 className="h-4 w-4" />
                </button>
              </div>
            </Controls>
            <MiniMap
              className="bg-white border shadow-sm rounded-lg m-4"
              style={{ border: "1px solid #e2e8f0" }}
              nodeStrokeColor={(n) => {
                if (n.selected) return "#3b82f6";
                return "#ddd";
              }}
              nodeColor={(n) => {
                if (n.type === "goal") return "#dbeafe";
                if (n.type === "obstacle") return "#ffedd5";
                if (n.type === "domainProperty") return "#dbeafe";
                if (n.type === "expectation") return "#fef9c3";
                if (n.type === "requirement") return "#dbeafe";
                if (n.type === "agent") return "#fef9c3";
                if (n.type === "entity") return "#fef9c3";
                if (n.type === "operation") return "#f3e8ff";
                return "#f9fafb";
              }}
            />
            {/* Keep the dots background with increased visibility */}
            <Background variant="dots" gap={12} size={1} color="#94a3b8" />

            {/* Single panel for both error message and diagram type info */}
            <Panel
              position="top-right"
              className="flex flex-row gap-2 items-start"
            >
              {/* Error message on the left */}
              {validationError && (
                <div
                  className={`rounded-md bg-red-50 p-4 shadow-sm border border-red-200 w-[280px] ${
                    errorExiting
                      ? "error-message-exit"
                      : "error-message-animation"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 text-red-500 flex items-center justify-center">
                      <AlertOctagon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-red-800">
                        Relationship linking error
                      </h4>
                      <p className="text-xs text-red-700 mt-0.5">
                        {validationError}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Diagram Type Panel - Fixed width */}
              <div className="rounded-md bg-white p-3 shadow-sm border border-gray-100 w-[220px]">
                <div className="flex flex-col gap-3">
                  {/* Diagram Type Section */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-50 flex-shrink-0">
                      {currentDiagramType === "Goal Diagram" && (
                        <GitMerge className="h-4 w-4 text-blue-500" />
                      )}
                      {currentDiagramType === "Responsibility Diagram" && (
                        <GitMerge className="h-4 w-4 text-red-500" />
                      )}
                      {currentDiagramType === "Object Diagram" && (
                        <RectangleIcon className="h-4 w-4 text-yellow-500" />
                      )}
                      {currentDiagramType === "Operation Diagram" && (
                        <Wrench className="h-4 w-4 text-purple-500" />
                      )}
                      {currentDiagramType === "Custom Diagram" && (
                        <Layers className="h-4 w-4 text-gray-500" />
                      )}
                      {currentDiagramType === "BPMN Diagram" && (
                        <Layers className="h-4 w-4 text-green-500" />
                      )}
                      {/* Fallback icon for no diagram type */}
                      {!currentDiagramType && (
                        <Layers className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs font-medium capitalize whitespace-nowrap">
                      {currentDiagramType || "No Diagram"}
                    </span>
                  </div>

                  {/* Connection Type Section */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-50 flex-shrink-0">
                      {getConnectionIcon()}
                    </div>
                    <span className="text-xs font-medium capitalize whitespace-nowrap">
                      {(customConnections.find(
                        (conn) => conn.id === selectedEdgeType
                      )?.name ||
                        model?.defaultConnections?.find(
                          (conn) => conn.type === selectedEdgeType
                        )?.label ||
                        selectedEdgeType) + " Connector"}
                    </span>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Edge Deletion Mode Toggle Button */}

            {/* Edge Deletion Mode Indicator */}

            {/* Selected Edge Panel */}

            {/* Edge Tooltip */}
            {edgeTooltip && (
              <div
                className="edge-tooltip"
                style={{
                  left: edgeTooltip.x + 10,
                  top: edgeTooltip.y + 10,
                }}
              >
                {edgeTooltip.text}
              </div>
            )}

            <AlertDialog
              open={isResetDialogOpen}
              onOpenChange={setIsResetDialogOpen}
            >
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Canvas</AlertDialogTitle>
                  <AlertDialogDescription className="mb-6">
                    This will remove all nodes and connections from the canvas.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={confirmResetCanvas}
                    className="bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    Reset Canvas
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ReactFlow>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading editor...</p>
            </div>
          </div>
        )}
        <NodePropertiesPanel
          selectedNode={selectedNode}
          onUpdateNode={updateNodeData}
          onDeleteNode={handleDeleteNode}
          onClose={() => setSelectedNode(null)}
        />
        {/* Quick Tips Dialog */}
        <QuickTipsDialog
          open={showQuickTips}
          onOpenChange={handleQuickTipsClose}
        />
      </div>
    </div>
  );
}
