import AssociationEdge from "@/components/edges/bpmn-edges/association-edge";
import SequenceFlowEdge from "@/components/edges/bpmn-edges/sequence-flow-edge";
import MessageFlowEdge from "@/components/edges/bpmn-edges/message-flow-edge";
import CustomNode from "@/components/nodes/custom-node";
import CustomEdge from "@/components/edges/custom-edge";
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
  CircleEndTerminateIcon,
  CircleEndErrorIcon,
  CircleEndEscalationIcon,
  CircleEndCancelIcon,
  CircleEndCompensationIcon,
  CircleEndSignalIcon,
  CircleEndMessageIcon,
  CircleEndMultipleIcon,
  DiamondExclusiveIcon,
  DiamondIcon,
  DiamondInclusiveIcon,
  DiamondComplexIcon,
  DiamondEventBasedIcon,
  DiamondParallelIcon,
  InterCircleCancel,
  InterCircleCompensation,
  InterCircleError,
  InterCircleInterruptigSignal,
  InterCircleInterruptingConditional,
  InterCircleInterruptingEscalation,
  InterCircleInterruptingMenssage,
  InterCircleInterruptingMultiple,
  InterCircleInterruptingParallelMultiple,
  InterCircleInterruptingTimer,
  InterCircleLink,
  InterCircleNoInterruptigSignal,
  InterCircleNoInterruptingConditional,
  InterCircleNoInterruptingEscalation,
  InterCircleNoInterruptingMenssage,
  InterCircleNoInterruptingMultiple,
  InterCircleNoInterruptingParallelMultiple,
  InterCircleNoInterruptingTimer,
  InterCircleThrowCompensation,
  InterCircleThrowLink,
  InterCircleThrowMenssage,
  InterCircleThrowMultiple,
  InterCircleThrowParallelMultiple,
  InterCircleThrowSignal,
} from "@/components/icons/bpmn-icons";
import { RectangleIcon } from "@/components/icons/kaos-icons";
import EndNode from "@/components/nodes/bpmn-nodes/end-node";
import EndEventNode from "@/components/nodes/bpmn-nodes/end-event/end-node";
import EndTerminateEventNode from "@/components/nodes/bpmn-nodes/end-event/end-terminate-node";
import EndErrorEventNode from "@/components/nodes/bpmn-nodes/end-event/end-error-node";
import EndEscalationEventNode from "@/components/nodes/bpmn-nodes/end-event/end-escalation-node";
import EndCancelEventNode from "@/components/nodes/bpmn-nodes/end-event/end-cancel-node";
import EndCompensationEventNode from "@/components/nodes/bpmn-nodes/end-event/end-compensation-node";
import EndSignalEventNode from "@/components/nodes/bpmn-nodes/end-event/end-signal-node";
import EndMessageEventNode from "@/components/nodes/bpmn-nodes/end-event/end-message-node";
import EndMultipleEventNode from "@/components/nodes/bpmn-nodes/end-event/end-multiple-node";
import GatewayNode from "@/components/nodes/bpmn-nodes/gateway-node";
import GatewayInclusiveNode from "@/components/nodes/bpmn-nodes/gateway/gateway-inclusive-node";
import GatewayParallelNode from "@/components/nodes/bpmn-nodes/gateway/gateway-parallel-node";
import GatewayComplexNode from "@/components/nodes/bpmn-nodes/gateway/gateway-complex-node";
import GatewayEventBasedNode from "@/components/nodes/bpmn-nodes/gateway/gateway-event-based-node";
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
  Diamond,
  File,
  FileIcon,
  Link,
  MessageSquare,
  RectangleEllipsis,
  RectangleHorizontal,
  Slash,
  TextIcon,
} from "lucide-react";
import startNoInterruptingTimerNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-timer-node.";
import startInterruptingSignal from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-signal-node";
import startNoInterruptingSignalNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-signal-node";
import startInterruptingMultipleNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-multiple-node";
import startNoInterruptingMultipleNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-multiple-node";
import startInterruptingParallelNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-parallel-node";
import startInterruptingEscalationNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-escalation-node";
import startNoInterruptingEscalationNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-escalation-node";
import startInterruptingErrorNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-error-node";
import startNoInterruptingErroNode from "@/components/nodes/bpmn-nodes/start-event/start-no-interrupting-erro-node";
import startInterruptingCompensationNode from "@/components/nodes/bpmn-nodes/start-event/start-interrupting-compensation-node";
import intermediateInterruptingMenssageNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-menssage-node";
import intermediateNoInterruptingMenssageNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-no-interrupting-menssage-node";
import conditionalSequenceFlowEdge from "@/components/edges/bpmn-edges/conditional-sequence-flow";
import defaultSequenceFlowEdge from "@/components/edges/bpmn-edges/default-sequence-flow-edge";
import directionalAssociationEdge from "@/components/edges/bpmn-edges/directional-association-edge";
import biDirectionalAssociationEdge from "@/components/edges/bpmn-edges/bi-directional-association-edge";
import initiatingMessageFlowEdge from "@/components/edges/bpmn-edges/initiating-message-flow.edge";
import nonInitiatingMessageFlowEdge from "@/components/edges/bpmn-edges/non-initiating-message-flow-edge";
import dataAssociationEdge from "@/components/edges/bpmn-edges/data-association-edge";
import lane from "@/components/nodes/bpmn-nodes/lane";
import pool from "@/components/nodes/bpmn-nodes/pool";
import intermediateThrowMenssageNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-throw-menssage-node";
import intermediateInterruptingTimerNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-timer-node";
import intermediateNoInterruptingTimerNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-no-interrupting-timer-node";
import intermediateInterruptingConditionalNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-conditional-node";
import intermediateNoInterruptingConditionalNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-no-interrupting-conditional-node";
import intermediateInterruptingSignalNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-signal-node";
import intermediateNoInterruptingSignalNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-no-interrupting-signal-node";
import intermediateThrowSignalNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-throw-signal-node";
import intermediateInterruptingMultipleNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-multiple-node";
import intermediateNoInterruptingMultipleNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-no-interrupting-multiple-node";import intermediatThrowMultipleNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-throw-multiple-node";
import intermediateThrowMultipleNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-throw-multiple-node";
import intermediateInterruptingParalleNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-Paralle-node";
import intermediateNoInterruptingParalleNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-no-interrupting-Paralle-node";
import intermediateThrowParalleNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-throw-paralle-node";
import intermediateInterruptingEscalationNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-escalation-node";
import intermediateNoInterruptingEscalationNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-no-interrupting-escalation-node";
import intermediateThrowEscalationNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-throw-escalation-node";
import intermediateInterruptingErrorNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-interrupting-error-node";
import intermediateThrowCompensationNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-throw-compensation-node";
import intermediateCompensationNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-compensation-node";
import intermediateLinkNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-link-node";
import intermediateThrowLinkNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-throw-link-node";
import intermediateCancelNode from "@/components/nodes/bpmn-nodes/intermediate-event/intermediate-cancel-node";
import dataNode from "@/components/nodes/bpmn-nodes/data-node";
import textAnnotation from "@/components/nodes/text-annotation";


export const bpmnModel: ModelDefinition = {
  id: "bpmn",
  name: "BPMN",
  description:
    "Business Process Model and Notation - A standard for business process modeling",
  thumbnail: "/models/bpmn-placeholder.png",

  nodeTypes: {
    pool: pool,
    lane: lane,
    start: StartNode,
    intermediate: IntermediateNode,
    end: EndNode,
    endEvent: EndEventNode,
    endTerminate: EndTerminateEventNode,
    endError: EndErrorEventNode,
    endEscalation: EndEscalationEventNode,
    custom: CustomNode,
    endCancel: EndCancelEventNode,
    endCompensation: EndCompensationEventNode,
    endSignal: EndSignalEventNode,
    endMessage: EndMessageEventNode,
    endMultiple: EndMultipleEventNode,
    gateway: GatewayNode,
    gatewayInclusive: GatewayInclusiveNode,
    gatewayParallel: GatewayParallelNode,
    gatewayComplex: GatewayComplexNode,
    gatewayEventBased: GatewayEventBasedNode,
    exclusive: GatewayNode,
    parallel: GatewayNode,
    startNonInterruptingMessage: startNoInterruptingMsg, 
    task: TaskNode,
    data: dataNode,
    textAnnotation: textAnnotation,
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
    intermediateThrowMenssage: intermediateThrowMenssageNode,
    intermediateInterruptingTimer: intermediateInterruptingTimerNode,
    intermediateNoInterruptingTimer: intermediateNoInterruptingTimerNode,
    intermediateInterruptingConditional: intermediateInterruptingConditionalNode,
    intermediateNoInterruptingConditional: intermediateNoInterruptingConditionalNode,
    intermediateInterruptingSignal: intermediateInterruptingSignalNode,
    intermediateNoInterruptingSignal: intermediateNoInterruptingSignalNode,
    intermediateThrowSignal: intermediateThrowSignalNode,
    intermediateInterruptingMultiple: intermediateInterruptingMultipleNode,
    intermediateNoInterruptingMultiple: intermediateNoInterruptingMultipleNode,
    custom: CustomNode,
    intermediateThrowMultiple: intermediateThrowMultipleNode, // Assuming this is the same as interrupting conditional
    intermediateInterruptingParalle: intermediateInterruptingParalleNode, // Assuming this is the same as interrupting conditional
    intermediateNoInterruptingParalle: intermediateNoInterruptingParalleNode, // Assuming this is the same as interrupting conditional
    intermediateThrowParalle: intermediateThrowParalleNode, // Assuming this is the same as interrupting conditional
    intermediateInterruptingEscalation: intermediateInterruptingEscalationNode, // Assuming this is the same as interrupting conditional
    intermediateNoInterruptingEscalation: intermediateNoInterruptingEscalationNode,
    intermediateThrowEscalation: intermediateThrowEscalationNode,
    intermediateInterruptingError: intermediateInterruptingErrorNode, // Assuming this is the same as interrupting conditional
    intermediateThrowCompensation: intermediateThrowCompensationNode, // Assuming this is the same as interrupting conditional
    intermediateCompensation: intermediateCompensationNode, // Assuming this is the same as interrupting conditional
    intermediateLink: intermediateLinkNode, // Assuming this is the same as interrupting conditional
    intermediateThrowLink: intermediateThrowLinkNode, // Assuming this is the same as interrupting conditional
    intermediateCancel: intermediateCancelNode, // Assuming this is the same as interrupting conditional
  },

  edgeTypes: {
    sequence: SequenceFlowEdge,
    conditionalSequence: conditionalSequenceFlowEdge,
    defaultSequence: defaultSequenceFlowEdge,
    association: AssociationEdge,
    custom: CustomEdge,
    directionalAssociation: directionalAssociationEdge,
    biDirectionalAssociation: biDirectionalAssociationEdge,
    dataAssociation: dataAssociationEdge,
    message: MessageFlowEdge,
    initiatingMessageFlow: initiatingMessageFlowEdge,
    nonInitiatingMessageFlow: nonInitiatingMessageFlowEdge
  },

  defaultNodes: [
    {
      type: "pool",
      label: "Pool",
      category: "Swinlanes",
      diagramType: "BPMN Diagram",
      component: pool,
      icon: <RectangleEllipsis className="h-5 w-5 text-gray-500" />,
      color: "#9ca3af",
      description:
        "Pool in BPMN, representing a participant in a process, typically an organization or entity.",
    },
    {
      type: "lane",
      label: "Lane",
      category: "Swinlanes",
      diagramType: "BPMN Diagram",
      component: lane,
      icon: <RectangleHorizontal className="h-5 w-5 text-gray-500" />,
      color: "#9ca3af",
      description:
        "Lane in BPMN, used to organize and categorize activities within a process.",
    },
    {
      type: "start",
      label: "Start",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: StartNode,
      icon: <CircleIcon className="h-5 w-5 text-green-500 mr-4" />,
      color: "#3b82f6",
      description:
        "Start event in BPMN, indicating the beginning of a process.",
    },
    {
      type: "startInterruptingError",
      label: "intereme Error",
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
      component: startInterruptingCompensationNode,
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
      label: "No Interrupting Menssage",
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
      label: "Interrupting Menssage",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateNoInterruptingMenssageNode,
      icon: <InterCircleNoInterruptingMenssage className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateThrowMenssage",
      label: "Throw Menssage",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateThrowMenssageNode,
      icon: <InterCircleThrowMenssage className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateInterruptingTimer",
      label: "Interrupting Timer",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingTimerNode,
      icon: <InterCircleInterruptingTimer className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateNoInterruptingTimer",
      label: "No Interrupting Timer",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateNoInterruptingTimerNode,
      icon: <InterCircleNoInterruptingTimer className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
     {
      type: "intermediateInterruptingConditional",
      label: "Interrupting Conditional",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingConditionalNode,
      icon: <InterCircleInterruptingConditional className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateNoInterruptingConditional",
      label: "No Interrupting Conditional",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingConditionalNode,
      icon: <InterCircleNoInterruptingConditional className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateInterruptingSignal",
      label: "Interrupting Signal",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingSignalNode,
      icon: <InterCircleInterruptigSignal className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateNoInterruptingSignal",
      label: "No Interrupting Signal",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateNoInterruptingSignalNode,
      icon: <InterCircleNoInterruptigSignal className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateThrowSignal",
      label: "Throw Signal",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateThrowSignalNode,
      icon: <InterCircleThrowSignal className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateInterruptingMultiple",
      label: "Interrupting Multiple",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingMultipleNode,
      icon: <InterCircleInterruptingMultiple className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateNoInterruptingMultiple",
      label: "No Interrupting Multiple",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateNoInterruptingMultipleNode,
      icon: <InterCircleNoInterruptingMultiple className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
     {
      type: "intermediateThrowMultiple",
      label: "Throw Multiple",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateThrowMultipleNode,
      icon: <InterCircleThrowMultiple className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateInterruptingParalle",
      label: "Interrupting Parallel",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingParalleNode,
      icon: <InterCircleInterruptingParallelMultiple className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateNoInterruptingParalle",
      label: "No Interrupting Parallel",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateNoInterruptingParalleNode,
      icon: <InterCircleNoInterruptingParallelMultiple className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateThrowParalle",
      label: "Throw Parallel",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateThrowParalleNode,
      icon: <InterCircleThrowParallelMultiple className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateInterruptingEscalation",
      label: "Interrupting Escalation",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingEscalationNode,
      icon: <InterCircleInterruptingEscalation className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateNoInterruptingEscalation",
      label: "No Interrupting Escalation",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateNoInterruptingEscalationNode,
      icon: <InterCircleNoInterruptingEscalation className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateThrowEscalation",
      label: "Throw Escalation",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediatThrowMultipleNode,
      icon: <InterCircleThrowMenssage className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateInterruptingError",
      label: "Error",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateInterruptingErrorNode,
      icon: < InterCircleError className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateThrowCompensation",
      label: "Throw Compensation",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateThrowCompensationNode,
      icon: < InterCircleThrowCompensation className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateCompensation",
      label: "Compensation",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateCompensationNode,
      icon: < InterCircleCompensation className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateLink",
      label: "Link",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateLinkNode,
      icon: < InterCircleLink className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateThrowLink",
      label: "Throw Link",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateThrowLinkNode,
      icon: < InterCircleThrowLink className="h-5 w-5 text-blue-500" />,
      color: "#60a5fa",
      description:
        "Intermediate event in BPMN, used to capture events that occur during a process.",
    },
    {
      type: "intermediateCancel",
      label: "Cancel",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: intermediateCancelNode,
      icon: <InterCircleCancel className="h-5 w-5 text-blue-500" />,
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
      icon: <CircleEndIcon className="h-5 w-5 text-red-500 mr-2" />,
      color: "#ef4444",
      description: "End event in BPMN, indicating the conclusion of a process.",
    },
    {
      type: "endEvent",
      label: "End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndEventNode,
      icon: <CircleEndIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Basic end event in BPMN, indicating the conclusion of a process.",
    },
    {
      type: "endTerminate",
      label: "Terminate End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndTerminateEventNode,
      icon: <CircleEndTerminateIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Terminate end event in BPMN, immediately ending all process instances.",
    },
    {
      type: "endError",
      label: "Error End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndErrorEventNode,
      icon: <CircleEndErrorIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Error end event in BPMN, indicating the process ended due to an error.",
    },
    {
      type: "endEscalation",
      label: "Escalation End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndEscalationEventNode,
      icon: <CircleEndEscalationIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Escalation end event in BPMN, triggering an escalation.",
    },
    {
      type: "endCancel",
      label: "Cancel End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndCancelEventNode,
      icon: <CircleEndCancelIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Cancel end event in BPMN, canceling a transaction.",
    },
    {
      type: "endCompensation",
      label: "Compensation End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndCompensationEventNode,
      icon: <CircleEndCompensationIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Compensation end event in BPMN, triggering compensation activities.",
    },
    {
      type: "endSignal",
      label: "Signal End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndSignalEventNode,
      icon: <CircleEndSignalIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Signal end event in BPMN, broadcasting a signal when the process ends.",
    },
    {
      type: "endMessage",
      label: "Message End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndMessageEventNode,
      icon: <CircleEndMessageIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Message end event in BPMN, sending a message when the process ends.",
    },
    {
      type: "endMultiple",
      label: "Multiple End Event",
      category: "Events",
      diagramType: "BPMN Diagram",
      component: EndMultipleEventNode,
      icon: <CircleEndMultipleIcon className="h-5 w-5 text-red-500" />,
      color: "#ef4444",
      description: "Multiple end event in BPMN, triggering multiple outcomes.",
    },
    {
      type: "gateway",
      label: "Gateway",
      category: "Gateways",
      diagramType: "BPMN Diagram",
      component: GatewayNode,
      icon: <DiamondIcon className="h-5 w-5 text-yellow-500" />,
      color: "#eab308",
      description:
        "Gateway in BPMN, used to control the flow of the process based on conditions.",
    },
    
    {
      type: "exclusive",
      label: "Exclusive Gateway",
      category: "Gateways",
      diagramType: "BPMN Diagram",
      component: GatewayNode,
      icon: <DiamondExclusiveIcon className="h-5 w-5 text-yellow-500" />,
      color: "#eab308",
      description:
        "Exclusive gateway in BPMN, used to control the flow of the process based on conditions.",
    },
    {
      type: "parallel",
      label: "Parallel Gateway",
      category: "Gateways",
      diagramType: "BPMN Diagram",
      component: GatewayNode,
      icon: <DiamondParallelIcon className="h-5 w-5 text-yellow-500" />,
      color: "#eab308",
      description:
        "Parallel gateway in BPMN, used to split or join multiple paths in a process.",
    },
    {
      type: "gatewayInclusive",
      label: "Inclusive Gateway (OR)",
      category: "Gateways",
      diagramType: "BPMN Diagram",
      component: GatewayInclusiveNode,
      icon: <DiamondInclusiveIcon className="h-5 w-5 text-yellow-500" />,
      color: "#eab308",
      description:
        "Inclusive gateway (OR) in BPMN, allows one or more paths to be taken.",
    },
    {
      type: "gatewayParallel",
      label: "Parallel Gateway (AND)",
      category: "Gateways",
      diagramType: "BPMN Diagram",
      component: GatewayParallelNode,
      icon: <DiamondParallelIcon className="h-5 w-5 text-yellow-500" />,
      color: "#eab308",
      description:
        "Parallel gateway (AND) in BPMN, splits flow into parallel paths or synchronizes them.",
    },
    {
      type: "gatewayComplex",
      label: "Complex Gateway",
      category: "Gateways",
      diagramType: "BPMN Diagram",
      component: GatewayComplexNode,
      icon: <DiamondComplexIcon className="h-5 w-5 text-yellow-500" />,
      color: "#eab308",
      description:
        "Complex gateway in BPMN, handles complex routing logic.",
    },
    {
      type: "gatewayEventBased",
      label: "Event-Based Gateway",
      category: "Gateways",
      diagramType: "BPMN Diagram",
      component: GatewayEventBasedNode,
      icon: <DiamondEventBasedIcon className="h-5 w-5 text-yellow-500" />,
      color: "#eab308",
      description:
        "Event-based gateway in BPMN, waits for events to determine the flow.",
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
    {
      type: "data",
      label: "Data",
      category: "Data",
      diagramType: "BPMN Diagram",
      component: dataNode,
      icon: <FileIcon className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Data object in BPMN, representing data used or produced by the process.",
    },
    {
      type: "textAnnotation",
      label: "Text Annotation",
      category: "Artifacts",
      diagramType: "BPMN Diagram",
      component: textAnnotation,
      icon: <TextIcon className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Text annotation in BPMN, used to add comments or explanations to the diagram.",
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
      type: "conditionalSequence",
      label: "Conditional Sequence Flow",
      component: conditionalSequenceFlowEdge,
      icon: <Diamond className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Conditional sequence flow in BPMN, representing a flow that occurs based on a condition.",
    },
    {
      type: "defaultSequence",
      label: "Default Sequence Flow",
      component: defaultSequenceFlowEdge,
      icon: <Slash className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Default sequence flow in BPMN, representing the flow of control between elements in a process.",
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
      type: "directionalAssociation",
      label: "Directional Association",
      component: directionalAssociationEdge,
      icon: <Link className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Directional association in BPMN, representing a relationship between elements in a process.",
    },
    {
      type: "biDirectionalAssociation",
      label: "Bi-Directional Association",
      component: biDirectionalAssociationEdge,
      icon: <Link className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Bi-directional association in BPMN, representing a relationship between elements in a process.",
    },
    {
      type: "dataAssociation",
      label: "Data Association",
      component: dataAssociationEdge,
      icon: <File className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Data association in BPMN, representing the flow of data between elements in a process.",
    },
    {
      type: "message",
      label: "Message Flow",
      component: MessageFlowEdge,
      icon: <MessageSquare className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Message flow in BPMN, representing the flow of messages between processes.",
    },
    {
      type: "initiatingMessageFlow",
      label: "Initiating Message Flow",
      component: initiatingMessageFlowEdge,
      icon: <MessageSquare className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Initiating message flow in BPMN, representing the flow of messages between processes.",
    },
    {
      type: "nonInitiatingMessageFlow",
      label: "Non-Initiating Message Flow",
      component: nonInitiatingMessageFlowEdge,
      icon: <MessageSquare className="h-5 w-5 text-gray-500" />,
      color: "#a855f7",
      description:
        "Non-initiating message flow in BPMN, representing the flow of messages between processes.",
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
        "endEvent",
        "endTerminate",
        "endError",
        "endEscalation",
        "endCancel",
        "endCompensation",
        "endSignal",
        "endMessage",
        "endMultiple",
        "gateway",
        "gatewayInclusive",
        "gatewayParallel",
        "gatewayComplex",
        "gatewayEventBased",
        "exclusive",
        "parallel",
        "task",
        "data",
        "textAnnotation",
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
        "startInterruptingCompensation",
        "intermediateInterruptingMenssage",
        "intermediateNoInterruptingMenssage",
        "pool",
        "lane",
        "intermediateThrowMenssage",
        "intermediateInterruptingTimer",
        "intermediateNoInterruptingTimer",
        "intermediateInterruptingConditional",
        "intermediateNoInterruptingConditional",
        "intermediateInterruptingSignal",
        "intermediateNoInterruptingSignal",
        "intermediateThrowSignal",
        "intermediateThrowMultiple",
        "intermediateInterruptingMultiple",
        "intermediateNoInterruptingMultiple",
        "intermediateInterruptingParalle",
        "intermediateNoInterruptingParalle",
        "intermediateThrowParalle",
        "intermediateInterruptingEscalation",
        "intermediateNoInterruptingEscalation",
        "intermediateThrowEscalation",
        "intermediateInterruptingError",
        "intermediateThrowCompensation",
        "intermediateCompensation",
        "intermediateLink",
        "intermediateThrowLink",
        "intermediateCancel",
        "custom",
      ],
    },
  ],
};
