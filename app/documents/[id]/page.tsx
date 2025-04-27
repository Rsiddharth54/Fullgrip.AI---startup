import { Suspense } from "react"
import { notFound } from "next/navigation"
import { DocumentDetails } from "@/components/document-details"
import { DocumentResultsVisualizer } from "@/components/document-results-visualizer"
import { Skeleton } from "@/components/ui/skeleton"
import { getDocumentById } from "@/lib/api-client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function DocumentPage({ params }: { params: { id: string } }) {
  try {
    const document = await getDocumentById(params.id)

    if (!document) {
      notFound()
    }

    return (
      <main className="container mx-auto py-10 px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{document.filename || "Document Details"}</h1>
          <p className="text-gray-500">Uploaded on {new Date(document.uploadedAt).toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
              <DocumentDetails document={document} />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <DocumentResultsVisualizer documentId={params.id} />
            </Suspense>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error loading document:", error)
    return (
      <main className="container mx-auto py-10 px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Document Details</h1>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Document</AlertTitle>
          <AlertDescription>
            There was a problem loading this document. The API might not be connected or the document ID might be
            invalid.
          </AlertDescription>
        </Alert>

        <div className="mt-6">
          <p className="text-gray-600">Possible solutions:</p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>Ensure your FastAPI backend is running and accessible</li>
            <li>Check that the NEXT_PUBLIC_API_BASE_URL environment variable is set correctly</li>
            <li>Verify that the document ID is valid</li>
          </ul>
        </div>
      </main>
    )
  }
}
