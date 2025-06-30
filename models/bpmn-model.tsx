import {
  CircleEndIcon,
  CircleIcon,
  CircleIntermediateIcon,
  DiamondExclusiveIcon,
  DiamondIcon,
  DiamondParallelIcon,
} from "@/components/icons/bpmn-icons";
import { RectangleIcon } from "@/components/icons/kaos-icons";
import EndNode from "@/components/nodes/bpmn-nodes/end-node";
import GatewayNode from "@/components/nodes/bpmn-nodes/gateway-node";
import IntermediateNode from "@/components/nodes/bpmn-nodes/intermediate-node";
import StartNode from "@/components/nodes/bpmn-nodes/start-node";
import TaskNode from "@/components/nodes/bpmn-nodes/task-node";
import type { ModelDefinition } from "@/types/model-types";

export const bpmnModel: ModelDefinition = {
  id: "bpmn",
  name: "BPMN",
  description:
    "Business Process Model and Notation - A standard for business process modeling",
  thumbnail: "/models/bpmn-placeholder.png",

  nodeTypes: {
    start: StartNode,
    intermediate: IntermediateNode,
    end: EndNode,
    gateway: GatewayNode,
    exclusive: GatewayNode,
    parallel: GatewayNode,
    task: TaskNode,
  },

  edgeTypes: {},

  defaultNodes: [
    {
      type: "start",
      label: "Start",
      category: "Events",
      diagramType: "BPMN 2.0 Diagram",
      component: StartNode,
      icon: <CircleIcon className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "intermediate",
      label: "Intermediate",
      category: "Events",
      diagramType: "BPMN 2.0 Diagram",
      component: StartNode,
      icon: <CircleIntermediateIcon className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
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
    {
      type: "gateway",
      label: "Gateway",
      category: "Gateways",
      diagramType: "BPMN 2.0 Diagram",
      component: GatewayNode,
      icon: <DiamondIcon className="h-5 w-5 text-gray-500" />,
      color: "#9ca3af",
      description:
        "Gateway in BPMN, used to control the flow of the process based on conditions.",
    },
    {
      type: "exclusive",
      label: "Exclusive Gateway",
      category: "Gateways",
      diagramType: "BPMN 2.0 Diagram",
      component: GatewayNode,
      icon: <DiamondExclusiveIcon className="h-5 w-5 text-gray-500" />,
      color: "#ef4444",
      description:
        "Exclusive gateway in BPMN, used to control the flow of the process based on conditions.",
    },
    {
      type: "parallel",
      label: "Parallel Gateway",
      category: "Gateways",
      diagramType: "BPMN 2.0 Diagram",
      component: GatewayNode,
      icon: <DiamondParallelIcon className="h-5 w-5 text-gray-500" />,
      color: "#ef4444",
      description:
        "Parallel gateway in BPMN, used to split or join multiple paths in a process.",
    },
    {
      type: "task",
      label: "Task",
      category: "Task",
      diagramType: "BPMN 2.0 Diagram",
      component: TaskNode,
      icon: <RectangleIcon className="h-5 w-5 text-gray-500" />,
      color: "gray",
      description: "Task in BPMN, representing a unit of work in the process.",
    },
  ],

  defaultConnections: [],
};
