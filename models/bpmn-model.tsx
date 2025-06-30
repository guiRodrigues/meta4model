import { CircleEndIcon, CircleIcon, CircleIntermediateIcon } from "@/components/icons/bpmn-icons"
import EndNode from "@/components/nodes/bpmn-nodes/end-node"
import IntermediateNode from "@/components/nodes/bpmn-nodes/intermediate-node"
import StartNode from "@/components/nodes/bpmn-nodes/start-node"
import type { ModelDefinition } from "@/types/model-types"

export const bpmnModel: ModelDefinition = {
    id: "bpmn",
    name: "BPMN",
    description: "Business Process Model and Notation - A standard for business process modeling",
    thumbnail: "/models/bpmn-placeholder.png",

    nodeTypes: {
        start: StartNode,
        intermediate: IntermediateNode,
        end: EndNode
    },

    edgeTypes: {
    },

    defaultNodes: [
        {
            type: "start",
            label: "Start",
            category: "Events",
            diagramType: "BPMN 2.0 Diagram",
            component: StartNode,
            icon: <CircleIcon className="h-5 w-5 text-green-500" />,
            color: "#3b82f6",
            description: "Start event in BPMN, indicating the beginning of a process.",
        },
        {
            type: "intermediate",
            label: "Intermediate",
            category: "Events",
            diagramType: "BPMN 2.0 Diagram",
            component: StartNode,
            icon: <CircleIntermediateIcon className="h-5 w-5 text-blue-500" />,
            color: "#60a5fa",
            description: "Intermediate event in BPMN, used to capture events that occur during a process.",
        },
        {
            type: "end",
            label: "End",
            category: "Events",
            diagramType: "BPMN 2.0 Diagram",
            component: EndNode,
            icon: <CircleEndIcon className="h-5 w-5 text-red-500" />,
            color: "#ef4444",
            description: "End event in BPMN, indicating the conclusion of a process.",
        },
    ],

    defaultConnections: [

    ],


}
