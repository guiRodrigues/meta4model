import { CircleIcon, CircleTimeIcon } from "@/components/icons/bpmn-icons"
import StartNode from "@/components/nodes/bpmn-nodes/start-node"
import type { ModelDefinition } from "@/types/model-types"

export const bpmnModel: ModelDefinition = {
    id: "bpmn",
    name: "BPMN",
    description: "Business Process Model and Notation - A standard for business process modeling",
    thumbnail: "/models/bpmn-placeholder.png",

    nodeTypes: {
        start: StartNode,
        time: StartNode
    },

    edgeTypes: {
    },

    defaultNodes: [
        {
            type: "start",
            label: "Start",
            category: "Start Events",
            diagramType: "Start Diagram",
            component: StartNode,
            icon: <CircleIcon className="h-5 w-5 text-green-500" />,
            color: "#3b82f6",
            description: "Start event in BPMN, indicating the beginning of a process.",
        },
        {
            type: "time",
            label: "Time",
            category: "Start Events",
            diagramType: "Time Diagram",
            component: StartNode,
            icon: <CircleTimeIcon className="h-5 w-5 text-green-500" />,
            color: "#3b82f6",
            description: "Time event in BPMN, indicating a specific time condition in a process.",
        }
    ],

    defaultConnections: [

    ],


}
