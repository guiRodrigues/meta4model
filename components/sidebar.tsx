"use client"

import { useMemo } from "react"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Trash2, RotateCcw } from "lucide-react"
import { CustomNodeForm } from "@/components/custom-node-form"
import type { CustomNodeDefinition, CustomConnectionDefinition } from "@/types/kaos-types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CustomConnectionForm } from "@/components/custom-connection-form"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { DiagramData } from "@/utils/import-export-utils"
import { HelpCircle } from "lucide-react"
import { QuickTipsDialog } from "@/components/quick-tips-dialog"
import type { ModelDefinition } from "@/types/model-types"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { CircleIcon, CircleIntermediateIcon, CircleEndIcon } from "@/components/icons/bpmn-icons"

interface SidebarProps {
  model: ModelDefinition
  onEdgeTypeSelect: (type: string) => void
  selectedEdgeType: string
  customNodes: CustomNodeDefinition[]
  customConnections: CustomConnectionDefinition[]
  onSaveCustomNode: (node: CustomNodeDefinition) => void
  onDeleteCustomNode: (nodeId: string) => void
  onSaveCustomConnection: (connection: CustomConnectionDefinition) => void
  onDeleteCustomConnection: (connectionId: string) => void
  onAddNode: (type: string, label: string, customNodeId?: string) => void
  onExportDiagram: () => DiagramData
  onImportDiagram: (data: DiagramData) => void
  currentDiagramType: string | null
  onResetCanvas: () => void
}

export function Sidebar({
  model,
  onEdgeTypeSelect,
  selectedEdgeType,
  customNodes,
  customConnections,
  onSaveCustomNode,
  onDeleteCustomNode,
  onSaveCustomConnection,
  onDeleteCustomConnection,
  onAddNode,
  onExportDiagram,
  onImportDiagram,
  currentDiagramType,
  onResetCanvas,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState("nodes")
  const [isQuickTipsOpen, setIsQuickTipsOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Check if we're using a custom model
  const isCustomModel = model?.id === "custom-model"

  const onDragStart = useCallback(
    (
      event: React.DragEvent<HTMLButtonElement>,
      nodeType: string,
      nodeName: string,
      diagramType: string,
      customNodeId?: string,
    ) => {
      setIsDragging(true)
      event.dataTransfer.setData("application/reactflow", nodeType)
      event.dataTransfer.setData("application/nodeName", nodeName)
      event.dataTransfer.setData("application/diagramType", diagramType)
      if (customNodeId) {
        event.dataTransfer.setData("application/customNodeId", customNodeId)
      }
      event.dataTransfer.effectAllowed = "move"
    },
    [],
  )

  const onDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Helper function to render line style preview
  const renderLineStylePreview = useCallback((style: "solid" | "dashed" | "dotted", color: string) => {
    let strokeDasharray = ""
    if (style === "dashed") strokeDasharray = "5,5"
    if (style === "dotted") strokeDasharray = "1,3"

    return (
      <svg width="24" height="20" viewBox="0 0 24 20" className="mr-2 flex-shrink-0">
        <line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="2" strokeDasharray={strokeDasharray} />
      </svg>
    )
  }, [])

  // Add a function to check if a node should be disabled based on the current diagram type
  const isNodeDisabled = useCallback(
    (nodeType: string, nodeDiagramType: string, customNodeId?: string): boolean => {
      // If no diagram type is selected yet, allow all nodes
      if (!currentDiagramType) return false

      // Special case for BPMN: always allow standard BPMN nodes regardless of custom nodes
      if (model.id === "bpmn" && currentDiagramType === "BPMN Diagram") {
        // If it's a standard BPMN node (not custom), always allow it
        if (nodeType !== "custom") {
          return false;
        }
      }

      // If the current diagram type doesn't match the node's diagram type, disable it
      if (currentDiagramType !== nodeDiagramType) return true

      // If it's a custom node, check its diagram types
      if (nodeType === "custom" && customNodeId) {
        const customNode = customNodes.find((node) => node.id === customNodeId)
        if (customNode && customNode.diagramTypes) {
          // Map the custom node's diagram types to the current diagram type
          const diagramTypeMap: Record<string, string> = {
            goal: "Goal Diagram",
            responsibility: "Responsibility Diagram",
            object: "Object Diagram",
            operation: "Operation Diagram",
            bpmn: "BPMN Diagram",
          };

          const nodeSupportsCurrentDiagram = customNode.diagramTypes.some(
            (type) => diagramTypeMap[type] === currentDiagramType,
          )

          // If none of the custom node's diagram types match the current diagram type, disable it
          return !nodeSupportsCurrentDiagram
        }
      }

      return false
    },
    [currentDiagramType, customNodes, model.id],
  )

  // Helper function to get a readable name for a node type
  const getReadableNodeTypeName = useCallback(
    (nodeType: string): string => {
      // Check if it's a custom node type
      if (nodeType.startsWith("custom-")) {
        // Extract the ID - handle both formats that might appear
        let customNodeId = nodeType

        // If it has format "custom-custom-{id}" (double prefix)
        if (nodeType.startsWith("custom-custom-")) {
          customNodeId = nodeType.substring(14) // Remove 'custom-custom-' prefix
        }
        // If it has format "custom-{id}" (single prefix)
        else if (nodeType.startsWith("custom-")) {
          customNodeId = nodeType.substring(7) // Remove 'custom-' prefix
        }

        // Try to find the custom node by ID or by checking if the ID is contained in the node's ID
        const customNode = customNodes.find(
          (node) =>
            node.id === customNodeId ||
            node.id === `custom-${customNodeId}` ||
            // Also check if the node ID contains the customNodeId (for timestamp-based IDs)
            (typeof node.id === "string" && node.id.includes(customNodeId)),
        )

        if (customNode) {
          return `Custom: ${customNode.name}`
        }

        // If we can't find the node, try to extract a timestamp if present
        // This is a fallback for nodes that might have been deleted
        const match = nodeType.match(/custom-(\d+)/)
        if (match && match[1]) {
          return "Custom Node"
        }
      }

      // Standard node types - look in the model's default nodes
      if (model && Array.isArray(model.defaultNodes)) {
        const modelNode = model.defaultNodes.find((node) => node.type === nodeType)
        if (modelNode) {
          return modelNode.label
        }
      }

      // Fallback to standard node types
      const nodeTypeMap: Record<string, string> = {
        goal: "Goal",
        requirement: "Requirement",
        expectation: "Expectation",
        domainProperty: "Domain Property",
        obstacle: "Obstacle",
        agent: "Agent",
        entity: "Entity",
        operation: "Operation",
        custom: "Custom Node",
      }

      return nodeTypeMap[nodeType] || nodeType
    },
    [customNodes, model],
  )

  // Add this helper function inside the Sidebar component
  const getConnectionConstraints = useCallback(
    (connectionId: string) => {
      const connection = customConnections.find((conn) => conn.id === connectionId)
      if (!connection) return null

      const hasSourceConstraints = connection.possibleSourceTypes && connection.possibleSourceTypes.length > 0
      const hasTargetConstraints = connection.possibleTargetTypes && connection.possibleTargetTypes.length > 0

      if (!hasSourceConstraints && !hasTargetConstraints) return null

      return (
        <div className="mt-1 text-xs text-muted-foreground">
          {hasSourceConstraints && (
            <div className="flex items-start gap-1">
              <span className="font-medium whitespace-nowrap">From:</span>
              <span className="truncate">
                {connection.possibleSourceTypes?.map((type) => getReadableNodeTypeName(type)).join(", ")}
              </span>
            </div>
          )}
          {hasTargetConstraints && (
            <div className="flex items-start gap-1">
              <span className="font-medium whitespace-nowrap">To:</span>
              <span className="truncate">
                {connection.possibleTargetTypes?.map((type) => getReadableNodeTypeName(type)).join(", ")}
              </span>
            </div>
          )}
        </div>
      )
    },
    [customConnections, getReadableNodeTypeName, model?.defaultNodes],
  )

  // Group nodes by diagram type
  const nodesByDiagramType = useMemo(() => {
    // Group all nodes by diagram type
    const result: Record<string, Array<any>> = {}

    // Check if model and defaultNodes exist before processing
    if (model && Array.isArray(model.defaultNodes)) {
      // Process all nodes regardless of current diagram type
      model.defaultNodes.forEach((node) => {
        const category = node.category || "Other"
        if (!result[category]) {
          result[category] = []
        }

        // Check if this node type is already in this category
        const existingNodeIndex = result[category].findIndex((n) => n.type === node.type)
        if (existingNodeIndex === -1) {
          // If not found, add it
          result[category].push(node)
        }
      })
    }

    return result
  }, [model])

  return (
    <div className="w-72 border-r bg-white z-10 flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        {/* Improved tab navigation to look more like a proper toggle */}
        <div className="px-4 pt-4 mb-4">
          <div className="flex p-1 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveTab("nodes")}
              className={`flex-1 text-sm py-2.5 px-4 rounded-md transition-all ${
                activeTab === "nodes"
                  ? "bg-white text-gray-900 font-medium shadow-sm"
                  : "bg-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Nodes
            </button>
            <button
              onClick={() => setActiveTab("connections")}
              className={`flex-1 text-sm py-2.5 px-4 rounded-md transition-all ${
                activeTab === "connections"
                  ? "bg-white text-gray-900 font-medium shadow-sm"
                  : "bg-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Connections
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <TabsContent value="nodes" className="flex-1 mt-0 overflow-hidden">
            <ScrollArea className="h-full" type="auto">
              <div className="space-y-6 p-4">
                {/* Custom Nodes Section - Moved to the top */}
                <div className="space-y-4">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Custom Nodes</h3>

                  <CustomNodeForm onSave={onSaveCustomNode} isCustomModel={isCustomModel} />

                  {customNodes.length > 0 ? (
                    <div className="space-y-2 mt-4">
                      {customNodes.map((node) => {
                        // Map the custom node's diagram types to the full diagram type names
                        const diagramTypeMap: Record<string, string> = {
                          goal: "Goal Diagram",
                          responsibility: "Responsibility Diagram",
                          object: "Object Diagram",
                          operation: "Operation Diagram",
                          bpmn: "BPMN Diagram",
                        }

                        // Check if this node is compatible with the current diagram
                        let isCompatible = true
                        if (currentDiagramType && node.diagramTypes && node.diagramTypes.length > 0) {
                          isCompatible = node.diagramTypes.some((type) => diagramTypeMap[type] === currentDiagramType)
                        }

                        return (
                          <div key={node.id} className="flex items-center">
                            <Button
                              variant="outline"
                              className={`flex flex-1 justify-start items-center px-4 py-2.5 h-auto bg-white/90 hover:bg-white/100 transition-colors ${
                                !isCompatible ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              draggable={isCompatible}
                              onDragStart={(event) =>
                                isCompatible &&
                                onDragStart(event, "custom", node.name, currentDiagramType || "", node.id)
                              }
                              onDragEnd={onDragEnd}
                              onClick={() => isCompatible && onAddNode("custom", node.name, node.id)}
                              disabled={!isCompatible}
                            >
                              <div
                                className="h-6 w-6 flex items-center justify-center mr-3.5 flex-shrink-0"
                                style={{ color: node.color }}
                                dangerouslySetInnerHTML={{ __html: node.svgCode }}
                              />
                              <div className="flex flex-col min-w-0 flex-1 items-start">
                                <span className="font-medium text-sm text-gray-800 text-left">{node.name}</span>
                                {node.diagramTypes && node.diagramTypes.length > 0 && (
                                  <span className="text-xs text-gray-500 mt-0.5 text-left">
                                    {node.diagramTypes
                                      .map((type) => {
                                        const typeNames = {
                                          goal: "Goal",
                                          responsibility: "Responsibility",
                                          object: "Object",
                                          operation: "Operation",
                                          bpmn: "BPMN",
                                        }
                                        return typeNames[type] || type
                                      })
                                      .join(", ")}
                                  </span>
                                )}
                              </div>
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 ml-1 text-muted-foreground hover:text-destructive"
                                    onClick={() => onDeleteCustomNode(node.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete custom node</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground mt-4 p-3 border border-dashed rounded-md bg-muted/30">
                      No custom nodes yet
                    </div>
                  )}
                </div>

                {/* Model Nodes Section - Grouped by diagram type */}
                <div className="space-y-6 pt-2 border-t">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-6">
                    {model.name} Nodes
                  </h3>

                  {/* Renderização condicional: gaveta de Events estilizada só para BPMN */}
                  {model.id === 'bpmn' ? (
                    <>
                      <div className="space-y-2 pb-2">
                        <Accordion type="single" collapsible className="w-full bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                          <AccordionItem value="events-group">
                            <AccordionTrigger className="text-sm px-4 py-3 hover:bg-gray-100 transition-colors rounded-t-lg">
                              Events
                            </AccordionTrigger>
                            <AccordionContent className="px-2 pb-3 pt-1">
                              <Accordion type="multiple" className="w-full">
                                {/* Subgaveta Start Events */}
                                <AccordionItem value="start-events">
                                  <AccordionTrigger className="text-sm px-3 py-2 hover:bg-gray-100 transition-colors rounded-md">
                                    <CircleIcon className="h-5 w-5 text-green-500 mr-3 align-middle" />
                                    Start Events
                                  </AccordionTrigger>
                                  <AccordionContent className="px-2 pb-2">
                                    <div className="space-y-2">
                                      {model.defaultNodes.filter(node => node.category === "Events" && node.type.startsWith("start")).map(node => (
                                        <Button
                                          key={node.type}
                                          variant="outline"
                                          className={`flex w-full justify-start gap-2 bg-white/90 hover:bg-white/100 transition-colors px-3 py-2 rounded-md ${
                                            isNodeDisabled(node.type, node.diagramType || "", undefined)
                                              ? "opacity-50 cursor-not-allowed"
                                              : ""
                                          }`}
                                          draggable={!isNodeDisabled(node.type, node.diagramType || "", undefined)}
                                          onDragStart={event =>
                                            !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                                            onDragStart(event, node.type, node.label, node.diagramType || "")
                                          }
                                          onDragEnd={onDragEnd}
                                          onClick={() =>
                                            !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                                            onAddNode(node.type, node.label)
                                          }
                                          disabled={isNodeDisabled(node.type, node.diagramType || "", undefined)}
                                        >
                                          {typeof node.icon === "string" ? (
                                            <div className="h-5 w-5 mr-2" dangerouslySetInnerHTML={{ __html: node.icon }} />
                                          ) : (
                                            node.icon
                                          )}
                                          <span>{node.label}</span>
                                        </Button>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                                <div className="border-t my-1" />
                                {/* Subgaveta Intermediate Events */}
                                <AccordionItem value="intermediate-events">
                                  <AccordionTrigger className="text-sm px-3 py-2 hover:bg-gray-100 transition-colors rounded-md">
                                    <CircleIntermediateIcon className="h-5 w-5 text-blue-500 mr-3 align-middle" />
                                    Intermediate Events
                                  </AccordionTrigger>
                                  <AccordionContent className="px-2 pb-2">
                                    <div className="space-y-2">
                                      {model.defaultNodes.filter(node => node.category === "Events" && node.type.startsWith("intermediate")).map(node => (
                                        <Button
                                          key={node.type}
                                          variant="outline"
                                          className={`flex w-full justify-start gap-2 bg-white/90 hover:bg-white/100 transition-colors px-3 py-2 rounded-md ${
                                            isNodeDisabled(node.type, node.diagramType || "", undefined)
                                              ? "opacity-50 cursor-not-allowed"
                                              : ""
                                          }`}
                                          draggable={!isNodeDisabled(node.type, node.diagramType || "", undefined)}
                                          onDragStart={event =>
                                            !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                                            onDragStart(event, node.type, node.label, node.diagramType || "")
                                          }
                                          onDragEnd={onDragEnd}
                                          onClick={() =>
                                            !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                                            onAddNode(node.type, node.label)
                                          }
                                          disabled={isNodeDisabled(node.type, node.diagramType || "", undefined)}
                                        >
                                          {typeof node.icon === "string" ? (
                                            <div className="h-5 w-5 mr-2" dangerouslySetInnerHTML={{ __html: node.icon }} />
                                          ) : (
                                            node.icon
                                          )}
                                          <span>{node.label}</span>
                                        </Button>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                                <div className="border-t my-1" />
                                {/* Subgaveta End Events */}
                                <AccordionItem value="end-events">
                                  <AccordionTrigger className="text-sm px-3 py-2 hover:bg-gray-100 transition-colors rounded-md">
                                    <CircleEndIcon className="h-5 w-5 text-red-500 mr-3 align-middle" />
                                    End Events
                                  </AccordionTrigger>
                                  <AccordionContent className="px-2 pb-2">
                                    <div className="space-y-2">
                                      {model.defaultNodes.filter(node => node.category === "Events" && node.type.startsWith("end")).map(node => (
                                        <Button
                                          key={node.type}
                                          variant="outline"
                                          className={`flex w-full justify-start gap-2 bg-white/90 hover:bg-white/100 transition-colors px-3 py-2 rounded-md ${
                                            isNodeDisabled(node.type, node.diagramType || "", undefined)
                                              ? "opacity-50 cursor-not-allowed"
                                              : ""
                                          }`}
                                          draggable={!isNodeDisabled(node.type, node.diagramType || "", undefined)}
                                          onDragStart={event =>
                                            !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                                            onDragStart(event, node.type, node.label, node.diagramType || "")
                                          }
                                          onDragEnd={onDragEnd}
                                          onClick={() =>
                                            !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                                            onAddNode(node.type, node.label)
                                          }
                                          disabled={isNodeDisabled(node.type, node.diagramType || "", undefined)}
                                        >
                                          {typeof node.icon === "string" ? (
                                            <div className="h-5 w-5 mr-2" dangerouslySetInnerHTML={{ __html: node.icon }} />
                                          ) : (
                                            node.icon
                                          )}
                                          <span>{node.label}</span>
                                        </Button>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                      {/* Outros grupos estilizados como Accordions */}
                      {Object.entries(nodesByDiagramType).filter(([category]) => category !== "Events").map(([category, nodes]) => (
                        <Accordion key={category} type="single" collapsible className="w-full pb-2 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                          <AccordionItem value={category}>
                            <AccordionTrigger className="text-sm px-4 py-3 hover:bg-gray-100 transition-colors rounded-t-lg">{category}</AccordionTrigger>
                            <AccordionContent className="px-2 pb-3 pt-1">
                              <div className="space-y-2">
                                {nodes.map((node) => (
                                  <Button
                                    key={`${category}-${node.type}`}
                                    variant="outline"
                                    className={`flex w-full justify-start gap-2 bg-white/90 hover:bg-white/100 transition-colors px-3 py-2 rounded-md ${
                                      isNodeDisabled(node.type, node.diagramType || "", undefined)
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                    draggable={!isNodeDisabled(node.type, node.diagramType || "", undefined)}
                                    onDragStart={(event) =>
                                      !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                                      onDragStart(event, node.type, node.label, node.diagramType || "")
                                    }
                                    onDragEnd={onDragEnd}
                                    onClick={() =>
                                      !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                                      onAddNode(node.type, node.label)
                                    }
                                    disabled={isNodeDisabled(node.type, node.diagramType || "", undefined)}
                                  >
                                    {typeof node.icon === "string" ? (
                                      <div className="h-5 w-5 mr-2" dangerouslySetInnerHTML={{ __html: node.icon }} />
                                    ) : (
                                      node.icon
                                    )}
                                    <span>{node.label}</span>
                                  </Button>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </>
                  ) : (
                    // Para outros modelos, renderizar todos os grupos como listas simples
                    Object.entries(nodesByDiagramType).map(([category, nodes]) => (
                      <div key={category} className="space-y-2 pb-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold">{category}</h4>
                          <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                        </div>
                        {nodes.map((node) => (
                          <Button
                            key={`${category}-${node.type}`}
                            variant="outline"
                            className={`flex w-full justify-start gap-2 bg-white/90 hover:bg-white/100 transition-colors ${
                              isNodeDisabled(node.type, node.diagramType || "", undefined)
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            draggable={!isNodeDisabled(node.type, node.diagramType || "", undefined)}
                            onDragStart={(event) =>
                              !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                              onDragStart(event, node.type, node.label, node.diagramType || "")
                            }
                            onDragEnd={onDragEnd}
                            onClick={() =>
                              !isNodeDisabled(node.type, node.diagramType || "", undefined) &&
                              onAddNode(node.type, node.label)
                            }
                            disabled={isNodeDisabled(node.type, node.diagramType || "", undefined)}
                          >
                            {typeof node.icon === "string" ? (
                              <div className="h-5 w-5 mr-2" dangerouslySetInnerHTML={{ __html: node.icon }} />
                            ) : (
                              node.icon
                            )}
                            <span>{node.label}</span>
                          </Button>
                        ))}
                      </div>
                    ))
                  )}

                  {/* Reset Canvas Button */}
                  <div className="space-y-2 pb-2 mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">Canvas Actions</h4>
                      <div className="h-px flex-1 bg-gray-200 mx-2"></div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex w-full justify-center items-center gap-2 bg-gray-100 border-gray-200 text-gray-800 hover:bg-red-200 hover:text-red-800 hover:border-red-300 transition-colors"
                      onClick={onResetCanvas}
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Reset Canvas</span>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="connections" className="flex-1 mt-0 overflow-hidden">
            <ScrollArea className="h-full" type="auto">
              <div className="space-y-6 p-4">
                {/* Custom Connections Section - Moved to the top */}
                <div className="space-y-4">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Custom Connections
                  </h3>

                  <CustomConnectionForm
                    onSave={onSaveCustomConnection}
                    customNodes={customNodes}
                    isCustomModel={isCustomModel}
                  />

                  {customConnections.length > 0 ? (
                    <div className="space-y-4 mt-4">
                      {customConnections.map((connection) => (
                        <div key={connection.id} className="rounded-md border overflow-hidden">
                          {/* Connection header with name and delete button */}
                          <div
                            className={`flex items-center justify-between p-3 border-b transition-colors ${
                              selectedEdgeType === connection.id
                                ? "bg-gray-50 border-gray-100"
                                : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-start gap-2 min-w-0 flex-1">
                              <button
                                className="flex items-start gap-2 min-w-0 flex-1 text-left group transition-colors"
                                onClick={() => onEdgeTypeSelect(connection.id)}
                              >
                                {renderLineStylePreview(connection.lineStyle, connection.color)}
                                <div className="flex flex-col min-w-0 flex-1">
                                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                                    <span className="font-medium text-sm break-all text-gray-800 group-hover:text-gray-900">
                                      {connection.name}
                                    </span>

                                    {/* Selected indicator tag */}
                                    {selectedEdgeType === connection.id && (
                                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[#d7e5bc] text-[#5a7052] flex-shrink-0">
                                        Selected
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 flex-shrink-0 ml-1"
                                    onClick={() => onDeleteCustomConnection(connection.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete custom connection</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          {/* Connection constraints and description */}
                          <div className="p-3 bg-white">
                            {/* Description */}
                            {connection.description && (
                              <div className="mb-3">
                                <div className="text-xs font-medium text-gray-500 mb-1.5">Description:</div>
                                <div className="text-xs text-gray-600 break-words">{connection.description}</div>
                              </div>
                            )}

                            {/* Divider between Description and From */}
                            {connection.description &&
                              connection.possibleSourceTypes &&
                              connection.possibleSourceTypes.length > 0 && (
                                <div className="h-px my-3 bg-gray-100"></div>
                              )}

                            {/* From constraints */}
                            {connection.possibleSourceTypes && connection.possibleSourceTypes.length > 0 && (
                              <div className="mb-3">
                                <div className="text-xs font-medium text-gray-500 mb-1.5">From:</div>
                                <div className="flex flex-wrap gap-1.5">
                                  {connection.possibleSourceTypes.map((type, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-gray-100"
                                    >
                                      {getReadableNodeTypeName(type)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Divider between From and To */}
                            {connection.possibleSourceTypes &&
                              connection.possibleSourceTypes.length > 0 &&
                              connection.possibleTargetTypes &&
                              connection.possibleTargetTypes.length > 0 && (
                                <div className="h-px my-3 bg-gray-100"></div>
                              )}

                            {/* To constraints */}
                            {connection.possibleTargetTypes && connection.possibleTargetTypes.length > 0 && (
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1.5">To:</div>
                                <div className="flex flex-wrap gap-1.5">
                                  {connection.possibleTargetTypes.map((type, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-gray-100"
                                    >
                                      {getReadableNodeTypeName(type)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground mt-4 p-3 border border-dashed rounded-md bg-muted/30">
                      No custom connections yet
                    </div>
                  )}
                </div>

                {/* Standard Connections Section - Now after Custom Connections */}
                <div className="space-y-3 pt-2 border-t mt-6">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-6">
                    {model.name} Connections
                  </h3>

                  {model.defaultConnections && model.defaultConnections.length > 0 ? (
                    model.defaultConnections.map((connection) => (
                      <Button
                        key={connection.type}
                        variant="outline"
                        className={`flex w-full justify-start gap-2 transition-colors ${
                          selectedEdgeType === connection.type
                            ? "bg-white border-gray-200"
                            : "bg-white/90 hover:bg-gray-50"
                        }`}
                        onClick={() => onEdgeTypeSelect(connection.type)}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          {typeof connection.icon === "string" ? (
                            <div className="h-5 w-5" dangerouslySetInnerHTML={{ __html: connection.icon }} />
                          ) : (
                            connection.icon
                          )}
                          <span>{connection.label}</span>
                        </div>
                        {selectedEdgeType === connection.type && (
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[#d7e5bc] text-[#5a7052]">
                            Selected
                          </span>
                        )}
                      </Button>
                    ))
                  ) : (
                    <div className="text-center text-sm text-muted-foreground p-3 border border-dashed rounded-md bg-muted/30">
                      No default connections available
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>

      <div className="p-4 border-t bg-muted/20">
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setIsQuickTipsOpen(true)}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Quick Tips</span>
        </Button>
      </div>

      <QuickTipsDialog open={isQuickTipsOpen} onOpenChange={setIsQuickTipsOpen} />
    </div>
  )
}
