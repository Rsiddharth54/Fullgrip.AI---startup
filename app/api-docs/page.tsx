import Link from "next/link"

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0d1117] text-[#e6edf3]">
      {/* Sidebar */}
      <aside className="w-full md:w-[280px] bg-[#161b22] p-8 border-r border-[#30363d] md:min-h-screen">
        <h1 className="text-2xl font-bold text-[#58a6ff] mb-8">FullGrip.AI</h1>
        <ul className="space-y-4">
          <li className="text-[#8b949e] hover:text-[#58a6ff] cursor-pointer transition-colors">🔹 Introduction</li>
          <li className="text-[#8b949e] hover:text-[#58a6ff] cursor-pointer transition-colors">🔹 Quickstart</li>
          <li className="text-[#8b949e] hover:text-[#58a6ff] cursor-pointer transition-colors">🔹 API Endpoints</li>
          <li className="text-[#8b949e] hover:text-[#58a6ff] cursor-pointer transition-colors">🔹 Authentication</li>
          <li className="text-[#8b949e] hover:text-[#58a6ff] cursor-pointer transition-colors">🔹 Error Handling</li>
          <li className="text-[#8b949e] hover:text-[#58a6ff] cursor-pointer transition-colors">🔹 FAQs</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-[#58a6ff] mb-4">Welcome to the FullGrip.AI API</h2>
          <p className="mb-4 text-[#c9d1d9]">
            Our API enables intelligent document automation using AI agents to extract, validate, and resolve data from
            documents such as loan applications, credit reports, and more.
          </p>
          <p className="mb-8 text-[#c9d1d9]">
            For detailed specs, check the{" "}
            <Link href="/docs" className="text-[#58a6ff] hover:underline">
              OpenAPI Swagger Docs
            </Link>
            .
          </p>

          {/* Interactive Demo Section */}
          <div className="mb-12 p-6 bg-[#161b22] border border-[#30363d] rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-[#e6edf3]">Interactive Demo</h3>
            <p className="mb-4 text-[#c9d1d9]">
              Try our interactive demo to see the API in action. The demo is running at{" "}
              <a
                href="http://localhost:8501/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline"
              >
                http://localhost:8501/
              </a>
              .
            </p>
            <div className="bg-[#0d1117] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#c9d1d9] font-medium">Demo Preview</span>
                <a
                  href="http://localhost:8501/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-[#238636] text-white text-sm rounded-md hover:bg-[#2ea043] transition-colors"
                >
                  Open Demo
                </a>
              </div>
              <div className="relative w-full h-64 bg-[#161b22] rounded border border-[#30363d] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[#8b949e] mb-3">Demo running at localhost:8501</p>
                    <p className="text-[#58a6ff]">Click "Open Demo" to view in a new tab</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[#8b949e] text-sm">
                <strong>Note:</strong> This demo runs locally and is only accessible on your machine. For deployment,
                you'll need to host the demo on a public server.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#58a6ff] mb-6">Core Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#161b22] p-6 border border-[#30363d] rounded-xl hover:border-[#58a6ff] transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-[#e6edf3]">📤 Upload</h3>
              <p className="text-sm text-[#8b949e]">
                Send a document (PDF, DOCX, or plain text) to the API for processing.
              </p>
            </div>
            <div className="bg-[#161b22] p-6 border border-[#30363d] rounded-xl hover:border-[#58a6ff] transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-[#e6edf3]">🧠 Guesser</h3>
              <p className="text-sm text-[#8b949e]">Extracts structured data and key fields from the document text.</p>
            </div>
            <div className="bg-[#161b22] p-6 border border-[#30363d] rounded-xl hover:border-[#58a6ff] transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-[#e6edf3]">✅ Checker</h3>
              <p className="text-sm text-[#8b949e]">
                Validates and cross-references document content for accuracy and logic.
              </p>
            </div>
            <div className="bg-[#161b22] p-6 border border-[#30363d] rounded-xl hover:border-[#58a6ff] transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-[#e6edf3]">🔁 Resolver</h3>
              <p className="text-sm text-[#8b949e]">
                Combines insights and produces a final structured decision object.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-[#161b22] border border-[#30363d] rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-[#e6edf3]">Quick Example</h3>
            <pre className="bg-[#0d1117] p-4 rounded-lg overflow-x-auto text-sm text-[#c9d1d9]">
              {`// Initialize the client
const client = new FullgripClient({
  apiKey: 'your_api_key',
  baseUrl: 'http://localhost:8501/api', // Local development
  // baseUrl: 'https://api.fullgrip.ai', // Production
});

// Process a document
async function processDocument(fileBuffer) {
  const result = await client.processDocument({
    document: fileBuffer,
    options: {
      extractFields: ['invoice_number', 'date', 'total'],
      validateFields: true,
    },
  });
  
  console.log(result.extractedFields);
  return result;
}`}
            </pre>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#58a6ff] mb-6">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-4 text-[#c9d1d9]">
              <li>
                <span className="font-semibold">Sign up</span> for a FullGrip.AI account and get your API key
              </li>
              <li>
                <span className="font-semibold">Install</span> our SDK using npm, yarn, or pnpm
              </li>
              <li>
                <span className="font-semibold">Initialize</span> the client with your API key
              </li>
              <li>
                <span className="font-semibold">Upload</span> your first document and process it
              </li>
            </ol>
            <div className="mt-8">
              <Link
                href="/demo"
                className="inline-block bg-[#58a6ff] hover:bg-[#4a90e2] text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Request API Access
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
