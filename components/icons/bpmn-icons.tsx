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

export function CompensationIcon({ className }: { className?: string }) {
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
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Segundo triângulo (seta apontando à esquerda) */}
        <polygon
          points="12,12 16,8 16,16"
          stroke="currentColor"
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


export function PlusIcon({ className }: { className?: string }) {
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
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Linha horizontal do “+” */}
      <line
        x1="9"
        y1="12"
        x2="15"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
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
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
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

export function ErrorIcon({ className }: { className?: string }) {
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
          stroke="currentColor"
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
        stroke="currentColor"
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
        fill="#f3f4f6"
        stroke="black"
        strokeWidth="0.5"
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
        fill="#f3f4f6"
        stroke="black"
        strokeWidth="0.5"
      />
      <line x1="9" y1="9" x2="15" y2="15" stroke="black" strokeWidth="2" />
      <line x1="15" y1="9" x2="9" y2="15" stroke="black" strokeWidth="2" />
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
        fill="#f3f4f6"
        stroke="black"
        strokeWidth="0.5"
      />
      <line x1="12" y1="8" x2="12" y2="16" stroke="black" strokeWidth="2" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="black" strokeWidth="2" />
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

