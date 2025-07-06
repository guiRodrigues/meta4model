export function CircleIcon({ className }: { className?: string }) {
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
        r="9"
        fill="#dcfce7"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export function ClockIcon({ className }: { className?: string }) {
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
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="12"
        x2="15"
        y2="14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PolygonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="
          12,7
          16.76,10.46
          14.94,16.04
          9.06,16.04
          7.24,10.46
        "
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Contorno do “documento” */}
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />

      {/* Linhas internas */}
      <line
        x1="9"
        y1="10"
        x2="15"
        y2="10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="13"
        x2="15"
        y2="13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="16"
        x2="15"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
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



export function DashedCircleIcon({ className }: { className?: string }) {
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
        r="9"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
        fill="#dcfce7"
      />
    </svg>
  )
}

export function SignalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="12,7 16,15 8,15"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}

export function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Caixa pequena (8×6), centralizada em x=8, y=9 */}
      <rect
        x="8"
        y="9"
        width="8"
        height="6"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      {/* Aba do envelope: vai até o ponto médio y = 12 */}
      <path
        d="M8 9 L12 12 L16 9"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}


export function CircleIntermediateIcon({ className }: { className?: string }) {
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
        r="9"
        fill="#dbeafe"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
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
        r="9"
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
