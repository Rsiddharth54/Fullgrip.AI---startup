"use client"

import { useState, useEffect } from "react"
import { Loader2, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getDocumentResults } from "@/lib/api-client"
import type { DocumentResult } from "@/lib/types"

interface DocumentResultsVisualizerProps {
  documentId: string
}

export function DocumentResultsVisualizer({ documentId }: DocumentResultsVisualizerProps) {
  const [results, setResults] = useState<DocumentResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchResults() {
      try {
        setIsLoading(true)
        const data = await getDocumentResults(documentId)
        setResults(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching document results:", err)
        setError("Failed to load document results. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()

    // Poll for updates if the document is still processing
    const interval = setInterval(() => {
      if (results?.status === "processing") {
        fetchResults()
      } else {
        clearInterval(interval)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [documentId, results?.status])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Processing Results</CardTitle>
          <CardDescription>Analyzing document with multi-agent system</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
          <p className="text-sm text-gray-500">Loading results...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Processing Results</CardTitle>
          <CardDescription>No results available yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">The document is still being processed or no results are available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Processing Status</CardTitle>
          <CardDescription>
            {results.status === "completed"
              ? "Document processing complete"
              : "Document is being processed by our multi-agent system"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{results.progress}%</span>
            </div>
            <Progress value={results.progress} className="h-2" />

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-xs text-gray-500">Processing Time</p>
                <p className="text-lg font-semibold">{results.processingTime}s</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-xs text-gray-500">Confidence Score</p>
                <p className="text-lg font-semibold">{results.confidenceScore}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Extracted Fields</CardTitle>
          <CardDescription>Fields extracted and validated by our multi-agent system</CardDescription>
        </CardHeader>
        <CardContent>
          {results.extractedFields && results.extractedFields.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {results.extractedFields.map((field, index) => (
                <AccordionItem key={index} value={`field-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-medium">{field.name}</span>
                      <FieldStatusBadge status={field.validationStatus} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <div>
                        <p className="text-sm font-medium">Extracted Value:</p>
                        <p className="text-sm bg-gray-50 p-2 rounded mt-1">{field.value}</p>
                      </div>

                      {field.agentResults && (
                        <div>
                          <p className="text-sm font-medium">Agent Results:</p>
                          <div className="space-y-2 mt-1">
                            {field.agentResults.map((agent, idx) => (
                              <div key={idx} className="bg-gray-50 p-2 rounded text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{agent.agentName}</span>
                                  <Badge variant={agent.match ? "success" : "destructive"} className="text-xs">
                                    {agent.match ? "Match" : "Mismatch"}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Value: {agent.value}</p>
                                {agent.confidence && (
                                  <p className="text-xs text-gray-500">Confidence: {agent.confidence}%</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {field.validationMessage && (
                        <div className="text-sm">
                          <p className="font-medium">Validation:</p>
                          <p className="text-gray-600 mt-1">{field.validationMessage}</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-sm text-gray-500">No fields have been extracted yet.</p>
          )}
        </CardContent>
      </Card>

      {results.errors && results.errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Processing Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.errors.map((error, index) => (
                <Alert key={index} variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>{error.type}</AlertTitle>
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function FieldStatusBadge({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case "valid":
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          <span>Valid</span>
        </Badge>
      )
    case "invalid":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          <span>Invalid</span>
        </Badge>
      )
    case "warning":
      return (
        <Badge variant="warning" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          <span>Warning</span>
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="flex items-center gap-1">
          <span>Unknown</span>
        </Badge>
      )
  }
}
