"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Node } from "reactflow"
import type { NodeData, EntityAttribute, TaggedValue } from "@/types/kaos-types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface NodePropertiesPanelProps {
  selectedNode: Node<NodeData> | null
  onUpdateNode: (nodeId: string, data: NodeData) => void
  onDeleteNode: (nodeId: string) => void
  onClose: () => void
}

export function NodePropertiesPanel({ selectedNode, onUpdateNode, onDeleteNode, onClose }: NodePropertiesPanelProps) {
  const [nodeData, setNodeData] = useState<NodeData>({ label: "" })
  const [newAttribute, setNewAttribute] = useState<EntityAttribute>({ name: "", type: "String" })
  const [newTaggedValue, setNewTaggedValue] = useState<TaggedValue>({ key: "", value: "" })
  const [savedStereotypes, setSavedStereotypes] = useState<string[]>(() => loadSavedStereotypes())
  const [isAddingNewStereotype, setIsAddingNewStereotype] = useState(false)
  const [newStereotypeInput, setNewStereotypeInput] = useState("")

  useEffect(() => {
    if (selectedNode) {
      // Initialize attributes array if it doesn't exist for entity nodes
      if (selectedNode.type === "entity" && !selectedNode.data.attributes) {
        selectedNode.data.attributes = []
      }
      setNodeData({ ...selectedNode.data })
    }
  }, [selectedNode])

  if (
    !selectedNode || 
    selectedNode.type === "group" || 
    selectedNode.type === "pool" || 
    selectedNode.type === "lane") 
    return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNodeData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNodeData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, nodeData)
      onClose()
    }
  }

  const handleAddAttribute = () => {
    if (newAttribute.name.trim() === "") return

    const updatedAttributes = [...(nodeData.attributes || []), { ...newAttribute }]
    setNodeData((prev) => ({ ...prev, attributes: updatedAttributes }))
    setNewAttribute({ name: "", type: "String" })
  }

  const handleRemoveAttribute = (index: number) => {
    const updatedAttributes = [...(nodeData.attributes || [])]
    updatedAttributes.splice(index, 1)
    setNodeData((prev) => ({ ...prev, attributes: updatedAttributes }))
  }

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof EntityAttribute) => {
    setNewAttribute((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleAttributeTypeChange = (value: string) => {
    setNewAttribute((prev) => ({ ...prev, type: value }))
  }

  const handleAddTaggedValue = () => {
    if (newTaggedValue.key.trim() === "" || newTaggedValue.value.trim() === "") return

    const updatedTaggedValues = [...(nodeData.taggedValues || []), { ...newTaggedValue }]
    setNodeData((prev) => ({ ...prev, taggedValues: updatedTaggedValues }))
    setNewTaggedValue({ key: "", value: "" })
  }

  const handleRemoveTaggedValue = (index: number) => {
    const updatedTaggedValues = [...(nodeData.taggedValues || [])]
    updatedTaggedValues.splice(index, 1)
    setNodeData((prev) => ({ ...prev, taggedValues: updatedTaggedValues }))
  }

  const handleTaggedValueChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof TaggedValue) => {
    setNewTaggedValue((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleDelete = () => {
    if (selectedNode) {
      onDeleteNode(selectedNode.id)
      onClose()
    }
  }

  // Load saved stereotypes from localStorage
  function loadSavedStereotypes(): string[] {
    if (typeof window === "undefined") return []

    try {
      const saved = localStorage.getItem("kaos-saved-stereotypes")
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error("Failed to load saved stereotypes:", error)
      return []
    }
  }

  // Save stereotypes to localStorage
  const saveSavedStereotypes = (stereotypes: string[]) => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem("kaos-saved-stereotypes", JSON.stringify(stereotypes))
    } catch (error) {
      console.error("Failed to save stereotypes:", error)
    }
  }

  const handleAddNewStereotype = () => {
    if (newStereotypeInput.trim() === "") return

    let newStereotype = newStereotypeInput.trim()

    // Automatically add << >> brackets if not present
    if (!newStereotype.startsWith("<<") || !newStereotype.endsWith(">>")) {
      // Remove existing brackets if partially present
      newStereotype = newStereotype.replace(/^<+|>+$/g, "")
      newStereotype = `<<${newStereotype}>>`
    }

    if (!savedStereotypes.includes(newStereotype)) {
      const updatedStereotypes = [...savedStereotypes, newStereotype]
      setSavedStereotypes(updatedStereotypes)
      saveSavedStereotypes(updatedStereotypes)
    }

    // Set the new stereotype as the current value
    setNodeData((prev) => ({ ...prev, stereotype: newStereotype }))
    setNewStereotypeInput("")
    setIsAddingNewStereotype(false)
  }

  const handleStereotypeSelect = (value: string) => {
    if (value === "add-new") {
      setIsAddingNewStereotype(true)
      return
    }

    setNodeData((prev) => ({ ...prev, stereotype: value }))
  }

  const handleRemoveSavedStereotype = (stereotypeToRemove: string) => {
    const updatedStereotypes = savedStereotypes.filter((s) => s !== stereotypeToRemove)
    setSavedStereotypes(updatedStereotypes)
    saveSavedStereotypes(updatedStereotypes)
  }

  // Determine which additional properties to show based on node type
  const renderTypeSpecificProperties = () => {
    // Only show attributes for entity nodes
    if (selectedNode.type === "entity") {
      return (
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block text-sm font-medium">Attributes</Label>
            {nodeData.attributes && nodeData.attributes.length > 0 ? (
              <div className="mb-4 space-y-2 rounded-md border p-3 bg-white/50">
                {nodeData.attributes.map((attr, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{attr.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">({attr.type})</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAttribute(index)}
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4 rounded-md border border-dashed p-3 text-center text-sm text-muted-foreground bg-muted/30">
                No attributes defined
              </div>
            )}

            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Attribute name"
                    value={newAttribute.name}
                    onChange={(e) => handleAttributeChange(e, "name")}
                    className="bg-white/50"
                  />
                </div>
                <div className="w-24">
                  <Select value={newAttribute.type} onValueChange={handleAttributeTypeChange}>
                    <SelectTrigger className="bg-white/50">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="String">String</SelectItem>
                      <SelectItem value="Int">Int</SelectItem>
                      <SelectItem value="Float">Float</SelectItem>
                      <SelectItem value="Boolean">Boolean</SelectItem>
                      <SelectItem value="Date">Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleAddAttribute}
                disabled={!newAttribute.name.trim()}
              >
                <Plus className="mr-1 h-4 w-4" /> Add Attribute
              </Button>
            </div>
          </div>
        </div>
      )
    }

    // For all other node types, return null (no additional properties)
    return null
  }

  return (
    <div className="absolute right-0 top-0 z-10 h-full w-80 border-l bg-background shadow-lg animate-fade-in">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-lg font-bold capitalize">{selectedNode.type} Properties</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label" className="text-sm font-medium">
              Label
            </Label>
            <Input
              id="label"
              name="label"
              value={nodeData.label || ""}
              onChange={handleChange}
              placeholder="Enter node label"
              className="bg-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={nodeData.description || ""}
              onChange={handleChange}
              placeholder="Enter description"
              rows={3}
              className="bg-white/50"
            />
          </div>

          {/* Stereotype Section */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Stereotype</Label>

            {!isAddingNewStereotype ? (
              <div className="space-y-2">
                <Select value={nodeData.stereotype || ""} onValueChange={handleStereotypeSelect}>
                  <SelectTrigger className="bg-white/50">
                    <SelectValue placeholder="Select or create stereotype" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedStereotypes.length > 0 && (
                      <>
                        {savedStereotypes.map((stereotype) => (
                          <SelectItem key={stereotype} value={stereotype}>
                            {stereotype}
                          </SelectItem>
                        ))}
                        <div className="border-t my-1" />
                      </>
                    )}
                    <SelectItem value="add-new" className="text-blue-600">
                      + Add new stereotype
                    </SelectItem>
                  </SelectContent>
                </Select>

                {nodeData.stereotype && (
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span className="text-sm font-medium">{nodeData.stereotype}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNodeData((prev) => ({ ...prev, stereotype: "" }))}
                      className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  value={newStereotypeInput}
                  onChange={(e) => setNewStereotypeInput(e.target.value)}
                  placeholder="Enter new stereotype (e.g., interface, controller)"
                  className="bg-white/50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddNewStereotype()
                    } else if (e.key === "Escape") {
                      setIsAddingNewStereotype(false)
                      setNewStereotypeInput("")
                    }
                  }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAddNewStereotype}
                    disabled={!newStereotypeInput.trim()}
                    className="flex-1"
                  >
                    Add Stereotype
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsAddingNewStereotype(false)
                      setNewStereotypeInput("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Saved Stereotypes Management */}
            {savedStereotypes.length > 0 && !isAddingNewStereotype && (
              <div className="mt-3">
                <Label className="text-xs text-muted-foreground mb-2 block">Saved Stereotypes</Label>
                <div className="flex flex-wrap gap-1">
                  {savedStereotypes.map((stereotype) => (
                    <div key={stereotype} className="flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1">
                      <span className="text-xs">{stereotype}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSavedStereotype(stereotype)}
                        className="h-4 w-4 p-0 text-gray-400 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tagged Values Section */}
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm font-medium">Tagged Values</Label>
              {nodeData.taggedValues && nodeData.taggedValues.length > 0 ? (
                <div className="mb-4 space-y-2 rounded-md border p-3 bg-white/50">
                  {nodeData.taggedValues.map((taggedValue, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {taggedValue.key}
                        </Badge>
                        <span className="text-sm text-gray-600">=</span>
                        <span className="text-sm font-medium">{taggedValue.value}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTaggedValue(index)}
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-4 rounded-md border border-dashed p-3 text-center text-sm text-muted-foreground bg-muted/30">
                  No tagged values defined
                </div>
              )}

              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Key"
                      value={newTaggedValue.key}
                      onChange={(e) => handleTaggedValueChange(e, "key")}
                      className="bg-white/50"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Value"
                      value={newTaggedValue.value}
                      onChange={(e) => handleTaggedValueChange(e, "value")}
                      className="bg-white/50"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleAddTaggedValue}
                  disabled={!newTaggedValue.key.trim() || !newTaggedValue.value.trim()}
                >
                  <Plus className="mr-1 h-4 w-4" /> Add Tagged Value
                </Button>
              </div>
            </div>
          </div>

          {renderTypeSpecificProperties()}

          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <Button onClick={handleSave} className="bg-gray-900 text-white hover:bg-gray-800">
              Save
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
