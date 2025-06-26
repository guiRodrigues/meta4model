import { CircleIcon } from "@/components/icons/kaos-icons"
import StartNode from "@/components/nodes/start-node"
import type { ModelDefinition } from "@/types/model-types"

export const bpmnModel: ModelDefinition = {
    id: "bpmn",
    name: "BPMN",
    description: "Business Process Model and Notation - A standard for business process modeling",
    thumbnail: "/models/bpmn-placeholder.png",

    nodeTypes: {
        start: StartNode,
    },

    edgeTypes: {
    },

    defaultNodes: [
        {
            type: "start",
            label: "Start",
            category: "Events",
            diagramType: "Start Diagram",
            component: StartNode,
            icon: <CircleIcon className="h-5 w-5 text-green-500" />,
            color: "#3b82f6",
            description: "Start event in BPMN, indicating the beginning of a process.",
        },
    ],

    defaultConnections: [

    ],


}
