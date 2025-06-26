export function CircleTimeIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="0.5"
            />

            <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
            />

            <path
                d="M12 8v4l2.5 1"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

        </svg>
    )
}

export function CircleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="currentColor"
                fillOpacity="0.1"
                stroke="currentColor"
                strokeWidth="0.5"
            />
        </svg>
    )
}