import AssociationEdge from "@/components/edges/bpmn-edges/association-edge";
import MessageFlowEdge from "@/components/edges/bpmn-edges/message-flow.edge";
import SequenceFlowEdge from "@/components/edges/bpmn-edges/sequence-flow-edge";
import {
  CircleEndIcon,
  CircleIcon,
  CircleIntermediateIcon,
  CircleInterruptingCompensation,
  CircleInterruptingConditional,
  CircleInterruptingError,
  CircleInterruptingEscalation,
  CircleInterruptingMultiple,
  CircleInterruptingParallelMultiple,
  CircleInterruptingSignal,
  CircleInterruptingTime,
  CircleNoInterruptingConditional,
  CircleNoInterruptingError,
  CircleNoInterruptingEscalation,
  CircleNoInterruptingMultiple,
  CircleNoInterruptingSignal,
  CircleNoInterruptingTime,
  CircleNoninterruptingMessage,
  DiamondExclusiveIcon,
  DiamondIcon,
  DiamondParallelIcon,
  InterCircleInterruptingMenssage,
  InterCircleNoInterruptingMenssage,
} from "@/components/icons/bpmn-icons";
import { RectangleIcon } from "@/components/icons/kaos-icons";
import EndNode from "@/components/nodes/bpmn-nodes/end-node";
import GatewayNode from "@/components/nodes/bpmn-nodes/gateway-node";
import IntermediateNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-node";
import startNoInterruptingConditionalNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-conditional-node";
import startInterruptingConditionalNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-conditional-node";
import startInterruptingTimerNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-timer-node";
import startNoInterruptingMsg from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-msg";
import StartNode from "@/components/nodes/bpmn-nodes/start-event/start-node";
import TaskNode from "@/components/nodes/bpmn-nodes/task-node";
import type { ModelDefinition } from "@/types/model-types";
import { validateConnection } from "@/utils/connection-validation";
import {
  ArrowRight,
  GitCommitIcon,
  Layers,
  Link,
  MessageSquare,
  Star,
} from "lucide-react";
import { start } from "repl";
import startNoInterruptingTimerNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-timer-node.";
import startInterruptingSignal from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-signal-node";
import startNoInterruptingSignalNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-signal-node";
import startInterruptingMultipleNoed from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-multiple-node";
import startInterruptingMultipleNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-multiple-node";
import startNoInterruptingMultipleNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-multiple-node";
import startInterruptingParallelNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-parallel-node";
import startInterruptingEscalationNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-escalation-node";
import startNoInterruptingEscalationNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-escalation-node";
import startInterruptingErrorNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-error-node";
import startNoInterruptingErroNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-erro-node";
import startInterruptionCompensationNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-compensation-node";
import startInterruptingCompensationNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-compensation-node";
import intermediateInterruptingMenssageNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-menssage-node";
import intermediateNoInterruptingMenssageNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-no-interrupting-menssage-node";

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
    startNonInterruptingMessage: startNoInterruptingMsg, 
    task: TaskNode,
    startInterruptingTimer: startInterruptingTimerNode,
    startNoInterruptingTimer: startNoInterruptingTimerNode, 
    startInterruptingConditional: startInterruptingConditionalNode, 
    startNoInterruptingConditional: startNoInterruptingConditionalNode, 
    startInterruptingSignal: startInterruptingSignal, 
    startNoInterruptingSignal: startNoInterruptingSignalNode, 
    startInterruptingMultiple: startInterruptingMultipleNode,
    startNoInterruptingMultiple: startNoInterruptingMultipleNode,
    startInterruptingParallel: startInterruptingParallelNode,
    startInterruptingEscalation: startInterruptingEscalationNode, 
    startNoInterruptingEscalation: startNoInterruptingEscalationNode, 
    startInterruptingError: startInterruptingErrorNode, // Assuming this is the same as interrupting conditional
    startNoInterruptingError: startNoInterruptingErroNode, // Assuming this is the
    startInterruptingCompensation: startInterruptingCompensationNode, // Assuming this is the same as interrupting conditional
    intermediateInterruptingMenssage: intermediateInterruptingMenssageNode,
    intermediateNoInterruptingMenssage: intermediateNoInterruptingMenssageNode,
    
  },

  edgeTypes: {
    sequence: SequenceFlowEdge,
    association: AssociationEdge,
    message: MessageFlowEdge,
  },

  defaultNodes: [
    {
      type: "start",
      label: "Start",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: StartNode,
      icon: <CircleIcon className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingError",
      label: "Interrupting Error",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startInterruptingErrorNode,
      icon: <CircleInterruptingError className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startNoInterruptingError",
      label: "No Interrupting Error",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startNoInterruptingErroNode,
      icon: <CircleNoInterruptingError className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingEscalation",
      label: "Interrupting Escalation",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startInterruptingEscalationNode,
      icon: <CircleInterruptingEscalation className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startNoInterruptingEscalation",
      label: "No Interrupting Escalation",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startNoInterruptingConditionalNode,
      icon: <CircleNoInterruptingEscalation className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingTimer",
      label: "Interrupting Time",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startInterruptingTimerNode,
      icon: <CircleInterruptingTime className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startNoInterruptingTimer",
      label: "No Interrupting Timer",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startNoInterruptingTimerNode,
      icon: <CircleNoInterruptingTime className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingConditional",
      label: "Interrupting Conditional",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startInterruptingConditionalNode,
      icon: <CircleInterruptingConditional className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startNoInterruptingConditional",
      label: "No Interrupting Conditional",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startNoInterruptingConditionalNode,
      icon: <CircleNoInterruptingConditional className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startNonInterruptingMessage",
      label: "No Interrupting Message",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startNoInterruptingMsg,
      icon: <CircleNoninterruptingMessage className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingSignal",
      label: "Interrupting Signal",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startInterruptingSignal,
      icon: <CircleInterruptingSignal className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startNoInterruptingSignal",
      label: "No Interrupting Signal",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startNoInterruptingSignalNode,
      icon: <CircleNoInterruptingSignal className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingMultiple",
      label: "Interrupting Multiple",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startInterruptingMultipleNode,
      icon: <CircleInterruptingMultiple className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startNoInterruptingMultiple",
      label: "No Interrupting Multiple",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startNoInterruptingMultipleNode,
      icon: <CircleNoInterruptingMultiple className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingCompensation",
      label: "Interrupting Compensation",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startNoInterruptingConditionalNode,
      icon: <CircleInterruptingCompensation className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingParallel",
      label: "Interrupting Parallel",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: startInterruptingParallelNode,
      icon: <CircleInterruptingParallelMultiple className="h-5 w-5 text-green-500" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "intermediate",
      label: "Intermediate",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: StartNode,
      icon: <CircleIntermediateIcon className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateInterruptingMenssage",
      label: "Interrupting Menssage",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingMenssageNode,
      icon: <InterCircleInterruptingMenssage className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
    type: "intermediateNoInterruptingMenssage",
      label: "No Interrupting Menssage",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateNoInterruptingMenssageNode,
      icon: <InterCircleNoInterruptingMenssage className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "end",
      label: "End",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndNode,
      icon: <CircleEndIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "End event in BPMN, indicating the conclusion of a process.",
    },
    {
      type: "gateway",
      label: "Gateway",
      category: "Gateways",
      diagramType: "BPMN Diagram",
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
      diagramType: "BPMN Diagram",
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
      diagramType: "BPMN Diagram",
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
      diagramType: "BPMN Diagram",
      component: TaskNode,
      icon: <RectangleIcon className="h-5 w-5 text-gray-500" />,
      color: "gray",
      description: "Task in BPMN, representing a unit of work in the process.",
    },
  ],

  defaultConnections: [
    {
      type: "sequence",
      label: "Sequence Flow",
      component: SequenceFlowEdge,
      icon: <ArrowRight className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Sequence flow in BPMN, representing the flow of control between elements in a process.",
    },
    {
      type: "association",
      label: "Association",
      component: AssociationEdge,
      icon: <Link className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Association in BPMN, representing a relationship between elements in a process.",
    },
    {
      type: "message",
      label: "Message Flow",
      component: MessageFlowEdge,
      icon: <MessageSquare className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Message flow in BPMN, representing the flow of messages between participants in a process.",
    },
  ],

  validationRules: {
    validateConnection,
  },

  diagramTypes: [
    {
      id: "bpmn-diagram",
      name: "BPMN Diagram",
      description:
        "A diagram representing business processes using BPMN notation.",
      nodeTypes: [
        "start",
        "intermediate",
        "end",
        "gateway",
        "exclusive",
        "parallel",
        "task",
        "startNonInterruptingMessage",
        "startInterruptingTimer",
        "startInterruptingConditional",
        "startNoInterruptingConditional",
        "startNoInterruptingTimer",  
        "startInterruptingSignal",
        "startNoInterruptingSignal",
        "startInterruptingMultiple",
        "startNoInterruptingMultiple",
        "startInterruptingParallel",
        "startInterruptingEscalation",
        "startNoInterruptingEscalation",
        "startInterruptingError",
        "startNoInterruptingError",
        "startInterruptionCompensation",
        "intermediateInterruptingMenssage",
        "intermediateNoInterruptingMenssage",
      ],
    },
  ],
};
