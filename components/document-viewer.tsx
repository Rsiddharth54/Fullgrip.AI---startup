"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import type { Document } from "@/lib/types"

interface DocumentViewerProps {
  document: Document
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for document preview
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gray-50 rounded-md">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <p className="text-sm text-gray-500">Loading document preview...</p>
        </div>
      </div>
    )
  }

  // Handle different document types
  if (document.fileType?.toLowerCase().includes("pdf")) {
    return <PDFViewer documentUrl={document.url} />
  } else if (
    document.fileType?.toLowerCase().includes("image") ||
    document.fileType?.toLowerCase().includes("jpg") ||
    document.fileType?.toLowerCase().includes("png") ||
    document.fileType?.toLowerCase().includes("jpeg")
  ) {
    return <ImageViewer documentUrl={document.url} />
  } else {
    return <TextViewer content={document.content || "No content available"} />
  }
}

function PDFViewer({ documentUrl }: { documentUrl: string }) {
  return (
    <div className="h-[600px] rounded-md overflow-hidden border">
      <iframe src={documentUrl} className="w-full h-full" title="PDF Document Viewer" />
    </div>
  )
}

function ImageViewer({ documentUrl }: { documentUrl: string }) {
  return (
    <div className="flex items-center justify-center bg-gray-50 rounded-md p-4 h-[600px]">
      <img
        src={documentUrl || "/placeholder.svg"}
        alt="Document Preview"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  )
}

function TextViewer({ content }: { content: string }) {
  return (
    <div className="bg-white border rounded-md p-6 h-[600px] overflow-auto">
      <div className="prose max-w-none">
        {content.split("\n").map((line, i) => (
          <p key={i}>{line || <br />}</p>
        ))}
      </div>
    </div>
  )
}
