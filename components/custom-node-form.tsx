"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CustomNodeDefinition } from "@/types/kaos-types"
import { DialogFooter } from "@/components/ui/dialog"

interface CustomNodeFormProps {
  onSave: (node: CustomNodeDefinition) => void
  isCustomModel?: boolean
}

export function CustomNodeForm({ onSave, isCustomModel = false }: CustomNodeFormProps) {
  const [name, setName] = useState("")
  const [svgCode, setSvgCode] = useState("")
  const [selectedDiagramTypes, setSelectedDiagramTypes] = useState<string[]>(["goal"]) // Default to goal diagram
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [previewSvg, setPreviewSvg] = useState<string | null>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)

  // Reset form when dialog is opened
  useEffect(() => {
    if (isOpen) {
      setName("")
      setSvgCode("")
      setSelectedDiagramTypes(["goal"])
      setError(null)
      setPreviewSvg(null)
    }
  }, [isOpen])

  // Update preview when SVG code changes
  useEffect(() => {
    if (svgCode.trim()) {
      try {
        // Basic validation
        if (!svgCode.includes("<svg") || !svgCode.includes("</svg>")) {
          setPreviewSvg(null)
          return
        }

        // Ensure the SVG has proper viewBox and preserveAspectRatio attributes
        let enhancedSvgCode = svgCode

        // Parse the SVG to check for viewBox
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = svgCode
        const svgElement = tempDiv.querySelector("svg")

        if (svgElement) {
          // Add viewBox if missing
          if (!svgElement.hasAttribute("viewBox")) {
            const width = svgElement.getAttribute("width") || "100"
            const height = svgElement.getAttribute("height") || "100"
            svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`)
          }

          // Add preserveAspectRatio
          svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet")

          enhancedSvgCode = tempDiv.innerHTML
        }

        setPreviewSvg(enhancedSvgCode)
      } catch (err) {
        setPreviewSvg(null)
      }
    } else {
      setPreviewSvg(null)
    }
  }, [svgCode])

  const validateSvg = (svg: string): boolean => {
    // Basic validation
    if (!svg.includes("<svg") || !svg.includes("</svg>")) {
      setError("Invalid SVG code. Must contain <svg> tags.")
      return false
    }

    try {
      // Create a DOM parser
      const parser = new DOMParser()
      const doc = parser.parseFromString(svg, "image/svg+xml")

      // Check for parsing errors
      const parserError = doc.querySelector("parsererror")
      if (parserError) {
        setError("Invalid SVG code. Parser error.")
        return false
      }

      // Check if the root element is an SVG
      const rootElement = doc.documentElement
      if (rootElement.tagName !== "svg") {
        setError("Invalid SVG code. Root element must be <svg>.")
        return false
      }

      return true
    } catch (err) {
      setError("Invalid SVG code. Could not parse.")
      return false
    }
  }

  const handleSave = () => {
    // Reset error
    setError(null)

    // Validate inputs
    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!svgCode.trim()) {
      setError("SVG code is required")
      return
    }

    // Validate SVG
    if (!validateSvg(svgCode)) {
      return
    }

    // Enhance SVG with viewBox and preserveAspectRatio if needed
    let enhancedSvgCode = svgCode

    try {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = svgCode
      const svgElement = tempDiv.querySelector("svg")

      if (svgElement) {
        // Add viewBox if missing
        if (!svgElement.hasAttribute("viewBox")) {
          const width = svgElement.getAttribute("width") || "100"
          const height = svgElement.getAttribute("height") || "100"
          svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`)
        }

        // Add preserveAspectRatio
        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet")

        enhancedSvgCode = tempDiv.innerHTML
      }
    } catch (e) {
      console.error("Error enhancing SVG:", e)
      // Continue with original SVG if enhancement fails
    }

    // Create custom node definition
    const customNode: CustomNodeDefinition = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      svgCode: enhancedSvgCode.trim(),
      color: "#6366f1", // Default indigo color
      diagramTypes: isCustomModel ? undefined : selectedDiagramTypes, // Store array of diagram types
      createdAt: Date.now(),
    }

    // Save the custom node
    onSave(customNode)
    setIsOpen(false)
  }

  // Custom button style class for the purple buttons
  const purpleButtonClass = "bg-[#cca8f0] text-[#330a5c] hover:bg-[#bc98e0] hover:text-[#330a5c]"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-full justify-start gap-2">
          <Plus className="h-5 w-5" />
          <span>Create Custom Node</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <div className="sticky top-0 z-10 bg-white border-b">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Create Custom Node</DialogTitle>
            <DialogDescription>
              Define a custom node with your own SVG shape, color, and name. For best results, use SVG with viewBox and
              set fill/stroke to "currentColor".
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 pt-4">
          <div className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="My Custom Node"
              />
            </div>

            {/* Add diagram type selection - only for KAOS model */}
            {!isCustomModel && (
              <div className="grid grid-cols-4 gap-4">
                <Label className="text-right self-start mt-2">Diagram Types</Label>
                <div className="col-span-3 space-y-2">
                  <p className="text-xs text-gray-600 mb-3">Select which diagrams this node can be used in:</p>
                  <div className="space-y-2">
                    {[
                      { id: "goal", label: "Goal Diagram" },
                      { id: "responsibility", label: "Responsibility Diagram" },
                      { id: "object", label: "Object Diagram" },
                      { id: "operation", label: "Operation Diagram" },
                      { id: "bpmn", label: "BPMN Diagram" },
                    ].map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`diagram-${type.id}`}
                          checked={selectedDiagramTypes.includes(type.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDiagramTypes((prev) => [...prev, type.id])
                            } else {
                              setSelectedDiagramTypes((prev) => prev.filter((t) => t !== type.id))
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={`diagram-${type.id}`} className="text-sm text-gray-700">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="svg" className="text-right self-start mt-2">
                SVG Code
              </Label>
              <Textarea
                id="svg"
                value={svgCode}
                onChange={(e) => setSvgCode(e.target.value)}
                className="col-span-3 font-mono text-xs"
                placeholder='<svg width="100%" height="100%" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100" height="60" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
  </svg>'
                rows={8}
              />
            </div>

            {previewSvg && (
              <div className="grid grid-cols-4 gap-4">
                <Label className="text-right self-start mt-2">Preview</Label>
                <div
                  className="col-span-3 border rounded-md p-4 flex items-center justify-center bg-gray-50"
                  style={{ minHeight: "100px" }}
                >
                  <div
                    ref={svgContainerRef}
                    className="w-24 h-24 flex items-center justify-center svg-container"
                    style={{ color: "#6366f1" }}
                    dangerouslySetInnerHTML={{ __html: previewSvg }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-10 bg-white border-t p-4">
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className={purpleButtonClass}>
              Save Custom Node
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
