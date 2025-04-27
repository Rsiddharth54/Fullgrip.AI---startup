import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, FileText } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">About Us</h1>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="md:flex">
            <div className="md:w-1/3 bg-blue-50">
              <div className="p-6 flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
                  <Image
                    src="/images/rishi-photo.png"
                    alt="Rishi Siddharth"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Rishi Siddharth</h2>
                <p className="text-blue-600 text-center mb-6">Founder & CEO</p>
                <div className="flex space-x-3 mb-6">
                  <Link href="https://www.linkedin.com/in/rishi-siddharth/" target="_blank">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="mailto:rishi@fullgrip.ai">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h3 className="text-xl font-semibold mb-4">Background</h3>
              <p className="text-gray-700 mb-6">
                Data Science major and International Business minor at London School of Economics & American University.
              </p>

              <h3 className="text-xl font-semibold mb-4">About fullgrip.ai</h3>
              <p className="text-gray-700 mb-6">
                fullgrip.ai was founded with a vision to revolutionize document processing through advanced multi-agent
                AI systems. Our technology automates, validates, and enhances high-volume document workflows with
                unmatched precision.
              </p>

              <p className="text-gray-700 mb-6">
                By leveraging cutting-edge artificial intelligence and machine learning techniques, we've created a
                platform that eliminates human error, processes documents 5x faster than industry standards, and
                continuously adapts to regional regulations and languages.
              </p>

              <div className="mt-8">
                <Link href="/demo">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Request a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
