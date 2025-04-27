import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Users, Clock, Globe, Building2, HeartPulse, Play, Github, Twitter, Linkedin } from "lucide-react"
import CodeBlock from "@/components/code-block"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <FileText className="absolute text-blue-600 w-8 h-8" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-pulse"></div>
                  </div>
                </div>
                <span className="text-xl font-bold">fullgrip.ai</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <a href="#solutions" className="text-gray-600 hover:text-blue-600 transition-colors">
                Solutions
              </a>
              <a href="#industries" className="text-gray-600 hover:text-blue-600 transition-colors">
                Industries
              </a>
              <a href="#api-docs" className="text-gray-600 hover:text-blue-600 transition-colors">
                API Docs
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center border rounded-md px-2 py-1 text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                <span>EN</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <Link href="/demo">
                <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">Get a Demo</Button>
              </Link>
              <button className="md:hidden p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Document accuracy, automated and amplified
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                A modern multi-agent AI designed to automate, validate, and enhance high-volume document workflows with
                unmatched precision.
              </p>
              <Link href="/demo">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-md">
                  Get a Demo
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden shadow-xl max-w-md mx-auto bg-gray-900">
                <Image
                  src="/images/world-map.png"
                  alt="Global accuracy map"
                  width={800}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 h-3 w-3 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-800">AI Analysis Active</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-blue-100 p-3 rounded-lg shadow-md z-10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-800">98.7% Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-700 bg-opacity-50 p-8 rounded-xl hover:bg-opacity-70 transition-all duration-300">
              <div className="bg-white bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-agent validation</h3>
              <p className="text-blue-100">Cross-verification eliminates human error</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-blue-700 bg-opacity-50 p-8 rounded-xl hover:bg-opacity-70 transition-all duration-300">
              <div className="bg-white bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Immediate processing</h3>
              <p className="text-blue-100">5x faster than industry standard</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-blue-700 bg-opacity-50 p-8 rounded-xl hover:bg-opacity-70 transition-all duration-300">
              <div className="bg-white bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Always accurate</h3>
              <p className="text-blue-100">AI agents update based on local regulations and languages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Try Our API Section */}
      <section id="industries" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Try Our API</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* BFSI Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-8">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">BFSI</h3>
                <p className="text-gray-600 mb-6">
                  Automate loan processing, KYC verification, and financial document analysis with unmatched accuracy.
                </p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  View Documentation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Healthcare Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-8">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <HeartPulse className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Healthcare</h3>
                <p className="text-gray-600 mb-6">
                  Process medical records, insurance claims, and clinical documentation with HIPAA-compliant AI agents.
                </p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  View Documentation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Demonstration Section */}
      <section id="api-docs" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">API Demonstration</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Video Player */}
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                  <Play className="h-6 w-6 text-blue-600 ml-1" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
                See fullgrip.ai in action (2:45)
              </div>
            </div>

            {/* Code Snippet */}
            <div>
              <h3 className="text-xl font-bold mb-4">Simple Integration</h3>
              <p className="text-gray-600 mb-6">
                Integrate document processing into your workflow with just a few lines of code.
              </p>
              <CodeBlock
                code={`import { FullgripClient } from '@fullgrip/sdk';

// Initialize the client
const client = new FullgripClient({
  apiKey: 'your_api_key',
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
                language="javascript"
              />
              <div className="mt-6">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View Full Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8">
                  <FileText className="absolute text-blue-400 w-8 h-8" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent"></div>
                  </div>
                </div>
                <span className="text-xl font-bold">fullgrip.ai</span>
              </div>
              <p className="text-gray-400 mb-4">
                Multi-agent AI designed to automate, validate, and enhance high-volume document workflows.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">rishi@fullgrip.ai</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">123 AI Street, San Francisco, CA 94107</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} fullgrip.ai. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
