import Link from "next/link"
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { getRecentDocuments } from "@/lib/api-client"

export async function RecentDocuments() {
  try {
    // Fetch documents with built-in fallback to mock data
    const documents = await getRecentDocuments()

    return (
      <div className="space-y-4">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            href={`/documents/${doc.id}`}
            className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{doc.filename}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </span>
                <span className={`flex items-center text-xs ${getStatusColor(doc.status)}`}>
                  {getStatusIcon(doc.status)}
                  {doc.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in RecentDocuments component:", error)
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">Unable to load recent documents</p>
        <p className="text-xs text-gray-400 mt-1">Check the console for more details</p>
      </div>
    )
  }
}

function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return "text-green-600"
    case "processing":
      return "text-blue-600"
    case "failed":
      return "text-red-600"
    case "pending":
      return "text-yellow-600"
    default:
      return "text-gray-600"
  }
}

function getStatusIcon(status: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return <CheckCircle className="h-3 w-3 mr-1" />
    case "processing":
      return <Clock className="h-3 w-3 mr-1" />
    case "failed":
      return <XCircle className="h-3 w-3 mr-1" />
    case "pending":
      return <AlertCircle className="h-3 w-3 mr-1" />
    default:
      return null
  }
}
