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
