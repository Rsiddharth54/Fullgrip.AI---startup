export interface Document {
  id: string
  filename: string
  fileType?: string
  fileSize?: string
  content?: string
  url: string
  status: string
  uploadedAt: string
  processingSteps?: ProcessingStep[]
}

export interface ProcessingStep {
  name: string
  status: string
  timestamp: string
  description: string
  details?: string
}

export interface DocumentResult {
  documentId: string
  status: string
  progress: number
  processingTime: number
  confidenceScore: number
  extractedFields?: ExtractedField[]
  errors?: ProcessingError[]
}

export interface ExtractedField {
  name: string
  value: string
  validationStatus: string
  validationMessage?: string
  agentResults?: AgentResult[]
}

export interface AgentResult {
  agentName: string
  value: string
  confidence?: number
  match: boolean
}

export interface ProcessingError {
  type: string
  message: string
  location?: string
}
