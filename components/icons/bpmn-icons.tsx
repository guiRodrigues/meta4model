export function CircleIcon({ className}: { className?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r= "7"
        fill="#dcfce7"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export function ClockIcon({ className, strokeColor = "currentColor" }: { className?: string, strokeColor?: string;}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke= {strokeColor}
        strokeWidth="0.7"
        fill="none"
      />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="10"
        stroke= {strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="12"
        x2="13"
        y2="14"
        stroke= {strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PolygonIcon({ className, strokeColor = 'currentColor'}: { className?: string, strokeColor?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Reduce size by 30%: scale 0.7 and center with translate */}
      <g transform="translate(3.6 3.6) scale(0.7)">
        <polygon
          points="12,7 16.76,10.46 14.94,16.04 9.06,16.04 7.24,10.46"
          stroke= {strokeColor}
          strokeWidth="1"
          fill="none"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function CompensationIcon({ className, strokeColor = 'currentColo' }: { className?: string, strokeColor?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Reduz tamanho em 30% (scale 0.7) e centraliza com translate */}
      <g transform="translate(3.6 3.6) scale(0.7)">
        {/* Primeiro triângulo (seta apontando à esquerda) */}
        <polygon
          points="8,12 12,8 12,16"
          stroke= {strokeColor}
          strokeWidth="1"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Segundo triângulo (seta apontando à esquerda) */}
        <polygon
          points="12,12 16,8 16,16"
          stroke= {strokeColor}
          strokeWidth="1"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

export function DocumentIcon({ className, strokeColor = "currentColor" }: { className?: string, strokeColor?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Reduz tamanho em 30% (scale 0.7) e centraliza com translate */}
      <g transform="translate(6 6 ) scale(0.5)">
        {/* Contorno do “documento” */}
        <rect
          x="7"
          y="7"
          width="10"
          height="10"
          rx="1"
          stroke= {strokeColor}
          strokeWidth="1"
          fill="none"
        />

        {/* Linhas internas */}
        <line
          x1="9"
          y1="10"
          x2="15"
          y2="10"
          stroke= {strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="13"
          x2="15"
          y2="13"
          stroke= {strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="16"
          x2="15"
          y2="16"
          stroke= {strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}


export function PlusIcon({ className, strokeColor = 'currentColor'}: { className?: string, strokeColor?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Linha vertical do “+” */}
      <line
        x1="12"
        y1="9"
        x2="12"
        y2="15"
        stroke= {strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Linha horizontal do “+” */}
      <line
        x1="9"
        y1="12"
        x2="15"
        y2="12"
        stroke= {strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className , strokeColor = 'currentColor'}: { className?: string, strokeColor?: string}) {
    return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Reduz tamanho em 30% (scale 0.7) e centraliza com translate */}
      <g transform="translate(3.6 3.6) scale(0.7)">
        <path
          d="M12 7 L7 15 L12 11 L17 15 L12 7 Z"
          stroke= {strokeColor}
          strokeWidth="1"
          fill="none"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function InterArrowRight({ className, strokeColor = 'currentColor'}: { className?: string, strokeColor?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(3.6, 3.6) scale(0.7)">
        <path
          d="M10 8L14 12L10 16"
          stroke= {strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function IconX({ className, strokeColor = 'currentColor' }: { className?: string, strokeColor?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(3.6, 3.6) scale(0.7)">
        <path
          d="M8 8L16 16M16 8L8 16"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}


export function DashedCircleIcon({ className, r = 6}: { className?: string, r?: number }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r= {r}
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 1"
        fill="#dcfce7"
      />
    </svg>
  )
}

export function ErrorIcon({ className, strokeColor = 'currentColor' }: { className?: string, strokeColor?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Reduz tamanho em 30% (scale 0.7) e centraliza com translate */}
      <g transform="translate(3.6 3.6) scale(0.7)">
        <path
          d="M8 16 V8 L16 16 V8"
          stroke= {strokeColor}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}


export function SignalIcon({ className, strokeColor = "currentColor"}: { className?: string, strokeColor?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Reduz tamanho em 30% (scale 0.7) e centraliza com translate */}
      <g transform="translate(3.6 3.6) scale(0.7)">
        <polygon
          points="12,7 16,15 8,15"
          stroke= {strokeColor}
          strokeWidth="1"
          fill="none"
        />
      </g>
    </svg>
  )
}


export function EnvelopeIcon({
  className,
  strokeColor = "currentColor",
}: {
  className?: string;
  strokeColor?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* (24 – 24 × 0.8) / 2 = 2.4 ⇒ corrige a posição */}
      <g transform="translate(2.4 2.4) scale(0.8)">
        <rect
          x="8"
          y="9"
          width="8"
          height="6"
          stroke={strokeColor}
          strokeWidth="0.7"
          fill="none"
        />
        <path
          d="M8 9 L12 12 L16 9"
          stroke={strokeColor}
          strokeWidth="0.7"
          fill="none"
        />
      </g>
    </svg>
  );
}


export function CircleIntermediateIcon({ className, strokeColor = "#60a5fa"}: { className?: string, r?: number, strokeColor?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r= "6"
        fill="#dbeafe"
        stroke={strokeColor}
        strokeWidth="0.5"
      />
      <circle cx="12" cy="12" r="5" stroke={strokeColor} strokeWidth="0.5" />
    </svg>
  );
}

export function DashedIntermediateCircleIcon({ className, r = 6, strokeWidth = 0.5, strokeColor = "#60a5fa"}: { className?: string, r?: number, strokeWidth?: number, strokeColor?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r= {r}
        stroke={strokeColor}
        strokeWidth= {strokeWidth}
        strokeDasharray="3 1"
        fill="#dbeafe"
      />
      <circle cx="12" cy="12" r="5" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="3 1"/>
    </svg>
  )
}

export function CircleNoninterruptingMessage({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    <DashedCircleIcon/>
    <EnvelopeIcon/>
    </svg>
  );
}

export function CircleInterruptingConditional({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    <CircleIcon/>
    <DocumentIcon/>
    </svg>
  );
}

export function CircleNoInterruptingConditional({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    <DashedCircleIcon/>
    <DocumentIcon/>
    </svg>
  );
}

export function CircleInterruptingTime({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    <CircleIcon/>
    <CircleIcon className="w-5 h-5"/>
    <ClockIcon/>
    </svg>
  );
}

export function CircleNoInterruptingTime({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <DashedCircleIcon/>
    <ClockIcon/>
    </svg>
  );
}

export function CircleInterruptingSignal({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <CircleIcon/>
    <SignalIcon/>
    </svg>
  );
}

export function CircleNoInterruptingSignal({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <DashedCircleIcon/> 
    <SignalIcon/>
    </svg>
  );
}


export function CircleInterruptingMultiple({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <CircleIcon/>
    <PolygonIcon/>
    </svg>
  );
}

export function CircleNoInterruptingMultiple({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <DashedCircleIcon/>
    <PolygonIcon/>
    </svg>
  );
}

export function CircleInterruptingParallelMultiple({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <CircleIcon/>
    <PlusIcon/>
    </svg>
  );
}

export function CircleNoInterruptingParallelMultiple({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <DashedCircleIcon/>
    <PlusIcon/>
    </svg>
  );
}

export function CircleInterruptingEscalation({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <CircleIcon/>
    <ArrowIcon/>
    </svg>
  );
}

export function CircleNoInterruptingEscalation({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <DashedCircleIcon/>
    <ArrowIcon/>
    </svg>
  );
}

export function CircleInterruptingError({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <CircleIcon/>
    <ErrorIcon/>
    </svg>
  );
}

export function CircleNoInterruptingError({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
    <DashedCircleIcon/>
    <ErrorIcon/>
    </svg>
  );
}

export function CircleInterruptingCompensation({ className }: { className?: string }) {
   return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    <CircleIcon/>
    <CompensationIcon/>
    </svg>
  )
}

export function CircleEndIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="6"
        fill="#fee2e2"
        stroke="#ef4444"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12,3 21,12 12,21 3,12"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function DiamondExclusiveIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12,3 21,12 12,21 3,12"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <line x1="9" y1="9" x2="15" y2="15" stroke="#b45309" strokeWidth="2" />
      <line x1="15" y1="9" x2="9" y2="15" stroke="#b45309" strokeWidth="2" />
    </svg>
  );
}

export function DiamondParallelIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12,3 21,12 12,21 3,12"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <line x1="12" y1="8" x2="12" y2="16" stroke="#b45309" strokeWidth="2" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="#b45309" strokeWidth="2" />
    </svg>
  );
}

export function InterCircleInterruptingMenssage ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DashedIntermediateCircleIcon/>
      {/* <DashedIntermediateCircleIcon r = {5} strokeWidth = {0.5}/> */}
      <EnvelopeIcon strokeColor="#60a5fa"/>
    
    </svg>
  );
}

export function InterCircleNoInterruptingMenssage ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <EnvelopeIcon strokeColor="#60a5fa"/>
    </svg>
  );
}

export function InterCircleThrowMenssage ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <EnvelopeIcon strokeColor="#000000"/>
    
    </svg>
  );
}

export function InterCircleInterruptingTimer ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <ClockIcon strokeColor="#60a5fa" />
    </svg>
  );
}

export function InterCircleNoInterruptingTimer ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DashedIntermediateCircleIcon/>
      <ClockIcon strokeColor="#60a5fa" />
    </svg>
  );
}

export function InterCircleInterruptingConditional ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <DocumentIcon strokeColor="#60a5fa" />
    </svg>
  );
}

export function InterCircleNoInterruptingConditional ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DashedIntermediateCircleIcon/>
      <DocumentIcon strokeColor="#60a5fa" />
    </svg>
  );
}
  export function InterCircleInterruptigSignal ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <SignalIcon strokeColor="#60a5fa" />
    </svg>
  );
}

 export function InterCircleNoInterruptigSignal ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DashedIntermediateCircleIcon/>
      <SignalIcon strokeColor="#60a5fa" />
    </svg>
  );
}

 export function InterCircleThrowSignal ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <SignalIcon strokeColor="#000000" />
    </svg>
  );
}

export function InterCircleInterruptingMultiple ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <PolygonIcon strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleNoInterruptingMultiple ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DashedIntermediateCircleIcon/>
      <PolygonIcon strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleThrowMultiple ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <PolygonIcon strokeColor ="#000000"/>
    </svg>
  );
}

export function InterCircleInterruptingParallelMultiple ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <PlusIcon strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleNoInterruptingParallelMultiple ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DashedIntermediateCircleIcon/>
      <PlusIcon strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleThrowParallelMultiple ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <PlusIcon strokeColor ="#000000"/>
    </svg>
  );
}

export function InterCircleInterruptingEscalation ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <ArrowIcon strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleNoInterruptingEscalation ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <DashedIntermediateCircleIcon/>
      <ArrowIcon strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleThrowEscalation ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <ArrowIcon strokeColor ="#000000"/>
    </svg>
  );
}

export function InterCircleError ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <ErrorIcon strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleCompensation ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <CompensationIcon strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleThrowCompensation ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <CompensationIcon strokeColor ="#000000"/>
    </svg>
  );
}

export function InterCircleLink ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <InterArrowRight strokeColor ="#60a5fa"/>
    </svg>
  );
}

export function InterCircleThrowLink ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <InterArrowRight strokeColor ="#000000"/>
    </svg>
  );
}

export function InterCircleCancel  ({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleIntermediateIcon/>
      <IconX strokeColor ="#60a5fa"/>
    </svg>
  );
}

// End Event Icons
export function CircleEndTerminateIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleEndIcon />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="#ef4444"
      />
    </svg>
  );
}

export function CircleEndErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleEndIcon />
      <ErrorIcon strokeColor="#ef4444" />
    </svg>
  );
}

export function CircleEndEscalationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleEndIcon />
      <ArrowIcon strokeColor="#ef4444" />
    </svg>
  );
}

export function CircleEndCancelIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleEndIcon />
      <IconX strokeColor="#ef4444" />
    </svg>
  );
}

export function CircleEndCompensationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleEndIcon />
      <CompensationIcon strokeColor="#ef4444" />
    </svg>
  );
}

export function CircleEndSignalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleEndIcon />
      <SignalIcon strokeColor="#ef4444" />
    </svg>
  );
}

export function CircleEndMessageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleEndIcon />
      <EnvelopeIcon strokeColor="#ef4444" />
    </svg>
  );
}

export function CircleEndMultipleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CircleEndIcon />
      <PolygonIcon strokeColor="#ef4444" />
    </svg>
  );
}

// Gateway Icons
export function DiamondInclusiveIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12,3 21,12 12,21 3,12"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="#b45309"
        strokeWidth="2"
      />
    </svg>
  );
}

export function DiamondComplexIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12,3 21,12 12,21 3,12"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <polygon
        points="12,8 14,10 12,12 10,10"
        fill="#b45309"
      />
      <polygon
        points="12,12 14,14 12,16 10,14"
        fill="#b45309"
      />
    </svg>
  );
}

export function DiamondEventBasedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12,3 21,12 12,21 3,12"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        fill="none"
        stroke="#b45309"
        strokeWidth="1"
      />
      <polygon
        points="12,9 13.5,11.5 12,14 10.5,11.5"
        fill="#b45309"
      />
    </svg>
  );
}

export function FileIcon({
  className,
  strokeColor = "currentColor",
  fillColor = "#fafafa",
}: {
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CollectionMarker = ({ color = "currentColor" }) => (
  <g stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M10 16v3" />
    <path d="M12 16v3" />
    <path d="M14 16v3" />
  </g>
);

const DataInputArrow = ({ color = "currentColor" }) => (
  <path
    d="M8 10h5V8l4 4-4 4v-2H8v-2z"
    fill={color}
  />
);

const DataOutputArrow = ({ color = "currentColor" }) => (
  <path
    d="M8 10h5V8l4 4-4 4v-2H8v-2z"
    stroke={color}
    strokeWidth="1.5"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export function DataObjectCollectionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <FileIcon strokeColor={props.stroke} fillColor={props.fill?.toString()} />
      <CollectionMarker color={props.stroke} />
    </svg>
  );
}

export function DataInputIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <FileIcon strokeColor={props.stroke} fillColor={props.fill?.toString()} />
      <DataInputArrow color={props.stroke} />
    </svg>
  );
}

export function DataInputCollectionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <FileIcon strokeColor={props.stroke} fillColor={props.fill?.toString()} />
      <DataInputArrow color={props.stroke} />
      <CollectionMarker color={props.stroke} />
    </svg>
  );
}

export function DataOutputIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <FileIcon strokeColor={props.stroke} fillColor={props.fill?.toString()} />
      <DataOutputArrow color={props.stroke} />
    </svg>
  );
}

export function DataOutputCollectionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <FileIcon strokeColor={props.stroke} fillColor={props.fill?.toString()} />
      <DataOutputArrow color={props.stroke} />
      <CollectionMarker color={props.stroke} />
    </svg>
  );
}

export function DataStoreIcon({
  className,
  strokeColor = "currentColor",
  fillColor = "#fafafa",
}: {
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10V18C5 19.6569 8.13401 21 12 21C15.866 21 19 19.6569 19 18V10"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill={fillColor}
      />
      <ellipse
        cx="12"
        cy="10"
        rx="7"
        ry="3"
        stroke={strokeColor}
        strokeWidth="1.5"
        fill={fillColor}
      />
      <path
        d="M19 6C19 7.65685 15.866 9 12 9C8.13401 9 5 7.65685 5 6"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <ellipse
        cx="12"
        cy="6"
        rx="7"
        ry="3"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
    </svg>
  );
}