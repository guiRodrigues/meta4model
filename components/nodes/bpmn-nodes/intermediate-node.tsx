"use client"

import type React from "react"

import { memo, useState, useEffect, useRef } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import type { NodeData } from "@/types/kaos-types"
import { CircleIntermediateIcon } from "@/components/icons/bpmn-icons"


function IntermediateEventNode({ data, type, id }: NodeProps<NodeData>) {
    const [isEditing, setIsEditing] = useState(false)
    const [label, setLabel] = useState(data.label)
    const inputRef = useRef<HTMLInputElement>(null)

    // Use our fixed node size
    const size = 60

    useEffect(() => {
        if (data.isNew) {
            const timer = setTimeout(() => {
                setIsEditing(true)
                data.isNew = false
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [data])

    // Focus input when editing starts
    useEffect(() => {
        if (isEditing && inputRef.current) {
            const timer = setTimeout(() => {
                inputRef.current?.focus()
                inputRef.current?.select()
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [isEditing])

    const handleDoubleClick = () => {
        setIsEditing(true)
    }

    const handleBlur = () => {
        setIsEditing(false)
        data.label = label.trim() || "Intermediate"
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false)
            data.label = label.trim() || "Intermediate"
        } else if (e.key === "Escape") {
            setIsEditing(false)
            setLabel(data.label)
        }
    }

    return (
        <div className="relative" onDoubleClick={handleDoubleClick} style={{ width: `${size}px`, height: `${size}px` }}>

            <div className="pt-0 pb-0">
                <CircleIntermediateIcon className={`h-${size} w-${size} text-blue-500`} />
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="!bg-green-400"
                style={{ right: -4 }}
            />

            <div className="absolute inset-0 flex items-center justify-center text-center">
                {isEditing ? (
                    <div className="flex justify-center mt-1">
                        <input
                            ref={inputRef}
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className="w-4/5 bg-white/80 text-xs font-medium outline-none border-b border-green-700 text-center text-gray-700 rounded px-1"
                        />
                    </div>
                ) : (
                    <div className="text-xs font-medium text-gray-700 text-center absolute top-full mt-1 left-1/2 transform -translate-x-1/2">
                        {data.label}
                    </div>)}
            </div>
        </div >
    )
}

export default memo(IntermediateEventNode)
