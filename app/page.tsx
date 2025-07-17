"use client"

import { useRouter } from "next/navigation"
import { useModelContext } from "@/contexts/model-context"
import { kaosModel } from "@/models/kaos-model"
import { customModel } from "@/models/custom-model" // Import the custom model
import { InfoIcon, ArrowRight } from "lucide-react"
import Link from "next/link"
import { bpmnModel } from "@/models/bpmn-model"

export default function ModelSelectionPage() {
  const router = useRouter()
  const { setSelectedModel } = useModelContext()

  // Documentation link - assuming this is the same as in the header
  const documentationLink = "https://www.objectiver.com/fileadmin/download/documents/KaosTutorial.pdf"

  const handleSelectModel = (model: any) => {
    console.log("Selected model:", model.id) // Add logging
    setSelectedModel(model)
    router.push("/editor")
  }

  // Update the availableModels array to only include KAOS and custom model
  const availableModels = [
    {
      ...kaosModel,
      color: "bg-[#e5d4f7]",
      textColor: "text-[#330a5c]",
      buttonColor: "bg-[#141b2a] text-[#e5d4f7]",
      borderColor: "border-purple-200",
      documentationUrl: documentationLink,
      description: kaosModel.description.endsWith(".") ? kaosModel.description : `${kaosModel.description}.`,
    },
    {
      ...bpmnModel,
      color: "bg-[#d0ebff]",
      textColor: "text-[#0c4a6e]",
      buttonColor: "bg-[#0c4a6e] text-white",
      borderColor: "border-blue-200",
      documentationUrl: "#",
      description: bpmnModel.description.endsWith(".") ? bpmnModel.description : `${bpmnModel.description}.`,
    },
    {
      ...customModel,
      color: "bg-gray-50",
      textColor: "text-gray-700",
      buttonColor: "text-[#f9fafb]", // Changed text color for Custom Model button
      borderColor: "border-dashed border-gray-400 border-2",
      documentationUrl: "#",
      description: "Start by creating your own diagram from scratch, an empty canvas.",
    },
  ]

  // Empty coming soon models
  const comingSoonModels = []

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/95 relative overflow-hidden flex items-center justify-center">
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h1 className="text-5xl font-bold mb-8 text-[#374151]">
              Welcome to <span className="bg-[#ffe4d3] px-2 py-1 rounded-sm">Meta4Model</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A tool created at the{" "}
              <Link
                href="https://www.quixada.ufc.br/"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Universidade Federal do Ceará, Quixadá Campus
              </Link>
              , that helps you express your ideas while creating diagrams. You can start by choosing a modeling
              framework or begin with an empty canvas. Whenever you need to, you can add your own custom nodes and
              relationships and explore the extensions developed by our community.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-1xl">
              {/* Available models */}
              {availableModels.map((model) => (
                <div
                  key={model.id}
                  className={`rounded-lg overflow-hidden ${model.color} border ${model.borderColor} max-w-xs shadow-sm h-[320px] flex flex-col`}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-none">
                      <h2 className={`text-3xl font-bold mb-2 ${model.textColor}`}>{model.name}</h2>
                      <p className={`${model.textColor} opacity-80 mb-2 text-sm`}>{model.description}</p>

                      {/* More Info link below description - smaller size */}
                      {model.id !== "custom" ? (
                        <Link
                          href={model.documentationUrl || "#"}
                          className={`inline-flex items-center gap-1 text-xs ${model.textColor} font-medium hover:underline mb-2`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <InfoIcon className="h-3 w-3" />
                          <span>More info</span>
                        </Link>
                      ) : (
                        <div className="flex items-center h-5 mb-2">
                          {/* Empty spacer with same height as the More Info link */}
                        </div>
                      )}
                    </div>

                    <div className="flex-grow min-h-[20px] max-h-[40px]"></div>

                    {/* Simple wave pattern - different for custom model */}
                    <div className="w-full h-12 mb-4 flex-none">
                      {model.id === "custom" ? (
                        <svg viewBox="0 0 200 30" className="w-full h-full text-gray-300 opacity-80">
                          <path
                            d="M0,15 Q20,5 40,15 T80,15 T120,15 T160,15 T200,15"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="6,4"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 200 30" className={`w-full h-full ${model.textColor} opacity-30`}>
                          <path
                            d="M0,15 Q20,5 40,15 T80,15 T120,15 T160,15 T200,15"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Full-width Select button - same background color for both */}
                    <button
                      onClick={() => handleSelectModel(model)}
                      className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 ${model.id === "custom" ? "bg-gray-900 text-[#f9fafb]" : "bg-[#141b2a] text-[#e5d4f7]"
                        } font-medium transition-transform hover:scale-[1.02] flex-none`}
                    >
                      <span>{model.id === "custom" ? "Start from Scratch" : `Start with ${model.name}`}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
