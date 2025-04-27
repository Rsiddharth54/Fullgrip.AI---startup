import type { Document, DocumentResult } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

/**
 * Upload a document file to the FastAPI backend
 */
export async function uploadDocument(file: File): Promise<{ documentId: string }> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error occurred" }))
    throw new Error(error.detail || "Failed to upload document")
  }

  return response.json()
}

/**
 * Process text as a document
 */
export async function processTextDocument(text: string, documentName: string): Promise<{ documentId: string }> {
  const response = await fetch(`${API_BASE_URL}/api/documents/process-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      documentName,
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error occurred" }))
    throw new Error(error.detail || "Failed to process text")
  }

  return response.json()
}

/**
 * Get a document by ID
 */
export async function getDocumentById(id: string): Promise<Document> {
  // In preview/development, return mock data instead of making API calls
  if (process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") {
    const mockDocs = getMockRecentDocuments()
    const doc = mockDocs.find((d) => d.id === id)

    if (doc) {
      return {
        ...doc,
        content: "This is mock content for document preview purposes.",
        processingSteps: [
          {
            name: "Document Upload",
            status: "completed",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            description: "Document was successfully uploaded to the system.",
          },
          {
            name: "Text Extraction",
            status: "completed",
            timestamp: new Date(Date.now() - 3500000).toISOString(),
            description: "Text was successfully extracted from the document.",
          },
          {
            name: "Multi-Agent Processing",
            status: doc.status === "completed" ? "completed" : "processing",
            timestamp: new Date(Date.now() - 3400000).toISOString(),
            description: "Document is being processed by multiple AI agents.",
          },
        ],
      }
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error occurred" }))
      throw new Error(error.detail || "Failed to fetch document")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching document:", error)
    // Return a mock document as fallback
    return {
      id,
      filename: "Sample Document.pdf",
      fileType: "PDF",
      fileSize: "1.2 MB",
      url: "/placeholder.svg",
      status: "completed",
      content: "This is a fallback document because the API request failed.",
      uploadedAt: new Date().toISOString(),
      processingSteps: [
        {
          name: "API Error",
          status: "failed",
          timestamp: new Date().toISOString(),
          description: "Failed to fetch document from API. This is mock data.",
        },
      ],
    }
  }
}

/**
 * Get document processing results
 */
export async function getDocumentResults(documentId: string): Promise<DocumentResult> {
  // In preview/development, return mock data instead of making API calls
  if (process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") {
    return getMockDocumentResults(documentId)
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}/results`, {
      cache: "no-store",
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error occurred" }))
      throw new Error(error.detail || "Failed to fetch document results")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching document results:", error)
    // Return mock results as fallback
    return getMockDocumentResults(documentId)
  }
}

/**
 * Get recent documents
 */
export async function getRecentDocuments(): Promise<Document[]> {
  // In preview/development, return mock data instead of making API calls
  if (process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") {
    return getMockRecentDocuments()
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/recent`, {
      // Add a timeout to prevent hanging requests
      signal: AbortSignal.timeout(5000),
      // Add cache: 'no-store' to ensure fresh data
      cache: "no-store",
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Unknown error occurred" }))
      throw new Error(error.detail || "Failed to fetch recent documents")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching recent documents:", error)
    // Return mock data as fallback when API fails
    return getMockRecentDocuments()
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error occurred" }))
    throw new Error(error.detail || "Failed to delete document")
  }
}

/**
 * Retry document processing
 */
export async function retryDocumentProcessing(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/documents/${id}/retry`, {
    method: "POST",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error occurred" }))
    throw new Error(error.detail || "Failed to retry document processing")
  }
}

// Add this function to provide mock data
function getMockRecentDocuments(): Document[] {
  return [
    {
      id: "mock-doc-1",
      filename: "Invoice-2023-001.pdf",
      fileType: "PDF",
      fileSize: "1.2 MB",
      url: "/placeholder.svg",
      status: "completed",
      uploadedAt: new Date().toISOString(),
    },
    {
      id: "mock-doc-2",
      filename: "Contract-Agreement.docx",
      fileType: "DOCX",
      fileSize: "845 KB",
      url: "/placeholder.svg",
      status: "processing",
      uploadedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      id: "mock-doc-3",
      filename: "Financial-Report-Q2.xlsx",
      fileType: "XLSX",
      fileSize: "2.1 MB",
      url: "/placeholder.svg",
      status: "pending",
      uploadedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
  ]
}

// Add this function to provide mock document results
function getMockDocumentResults(documentId: string): DocumentResult {
  const mockDocs = getMockRecentDocuments()
  const doc = mockDocs.find((d) => d.id === documentId)

  if (doc && doc.status === "completed") {
    return {
      documentId,
      status: "completed",
      progress: 100,
      processingTime: 4.2,
      confidenceScore: 92,
      extractedFields: [
        {
          name: "Invoice Number",
          value: "INV-2023-456",
          validationStatus: "valid",
          validationMessage: "Invoice number format is valid",
          agentResults: [
            {
              agentName: "OCR Agent",
              value: "INV-2023-456",
              confidence: 95,
              match: true,
            },
            {
              agentName: "NLP Agent",
              value: "INV-2023-456",
              confidence: 92,
              match: true,
            },
          ],
        },
        {
          name: "Date",
          value: "2023-06-15",
          validationStatus: "valid",
          validationMessage: "Date is in valid format",
          agentResults: [
            {
              agentName: "OCR Agent",
              value: "2023-06-15",
              confidence: 98,
              match: true,
            },
            {
              agentName: "NLP Agent",
              value: "2023-06-15",
              confidence: 96,
              match: true,
            },
          ],
        },
        {
          name: "Total Amount",
          value: "$1,250.00",
          validationStatus: "valid",
          validationMessage: "Amount matches calculated total",
          agentResults: [
            {
              agentName: "OCR Agent",
              value: "$1,250.00",
              confidence: 94,
              match: true,
            },
            {
              agentName: "NLP Agent",
              value: "$1,250.00",
              confidence: 90,
              match: true,
            },
          ],
        },
      ],
    }
  } else if (doc && doc.status === "processing") {
    return {
      documentId,
      status: "processing",
      progress: 65,
      processingTime: 2.1,
      confidenceScore: 0,
      extractedFields: [
        {
          name: "Invoice Number",
          value: "Processing...",
          validationStatus: "pending",
          agentResults: [],
        },
      ],
    }
  } else {
    return {
      documentId,
      status: "pending",
      progress: 0,
      processingTime: 0,
      confidenceScore: 0,
      extractedFields: [],
    }
  }
}
