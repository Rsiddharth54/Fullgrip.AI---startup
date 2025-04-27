"use client"

import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"
import type { Document } from "@/lib/types"

interface ProcessingTimelineProps {
  document: Document
}

export function ProcessingTimeline({ document }: ProcessingTimelineProps) {
  const steps = document.processingSteps || []

  if (!steps.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Clock className="h-10 w-10 text-gray-300" />
        <p className="mt-4 text-gray-500">No processing history available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <ol className="relative border-l border-gray-200 ml-3">
        {steps.map((step, index) => (
          <li key={index} className="mb-6 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white">
              {getStepIcon(step.status)}
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold">
              {step.name}
              {step.status === "completed" && (
                <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                  Completed
                </span>
              )}
              {step.status === "processing" && (
                <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                  In Progress
                </span>
              )}
              {step.status === "failed" && (
                <span className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                  Failed
                </span>
              )}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
              {new Date(step.timestamp).toLocaleString()}
            </time>
            <p className="mb-4 text-base font-normal text-gray-500">{step.description}</p>
            {step.details && (
              <div className="p-3 bg-gray-50 rounded-md text-sm">
                <pre className="whitespace-pre-wrap">{step.details}</pre>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function getStepIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case "processing":
      return <Clock className="w-4 h-4 text-blue-500" />
    case "failed":
      return <XCircle className="w-4 h-4 text-red-500" />
    case "warning":
      return <AlertCircle className="w-4 h-4 text-yellow-500" />
    default:
      return <Clock className="w-4 h-4 text-gray-500" />
  }
}
