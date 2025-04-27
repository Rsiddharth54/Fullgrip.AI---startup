"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DocumentViewer } from "@/components/document-viewer"
import { ProcessingTimeline } from "@/components/processing-timeline"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Document } from "@/lib/types"

interface DocumentDetailsProps {
  document: Document
}

export function DocumentDetails({ document }: DocumentDetailsProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [error, setError] = useState<string | null>(null)

  if (!document) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Document data is not available</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{document.filename || "Document"}</CardTitle>
            <CardDescription>
              {document.fileType} • {document.fileSize} • Uploaded on {new Date(document.uploadedAt).toLocaleString()}
            </CardDescription>
          </div>
          <Badge variant={getStatusVariant(document.status)}>{document.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">Document Preview</TabsTrigger>
              <TabsTrigger value="processing">Processing Timeline</TabsTrigger>
              <TabsTrigger value="raw">Raw Data</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <DocumentViewer document={document} />
            </TabsContent>

            <TabsContent value="processing" className="mt-4">
              <ProcessingTimeline document={document} />
            </TabsContent>

            <TabsContent value="raw" className="mt-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-xs overflow-auto max-h-[500px]">{JSON.stringify(document, null, 2)}</pre>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

function getStatusVariant(status: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return "success"
    case "processing":
      return "default"
    case "failed":
      return "destructive"
    case "pending":
      return "secondary"
    default:
      return "outline"
  }
}
