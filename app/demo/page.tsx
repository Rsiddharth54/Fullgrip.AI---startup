import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Request a Demo</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          See how fullgrip.ai can transform your document processing operations
        </p>

        <div className="bg-white border rounded-xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <p className="text-gray-700 mb-2">Prefer to speak with someone directly?</p>
            <Link
              href="https://calendly.com"
              className="text-blue-600 hover:text-blue-700 inline-flex items-center"
              target="_blank"
            >
              Schedule time with us <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="border-t pt-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="firstName" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="lastName" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workEmail">
                  Work Email <span className="text-red-500">*</span>
                </Label>
                <Input id="workEmail" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" type="tel" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input id="companyName" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">
                  Company Size <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger id="companySize">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="helpMessage">
                  How can we help you? <span className="text-red-500">*</span>
                </Label>
                <Textarea id="helpMessage" rows={5} required />
              </div>

              <div className="text-sm text-gray-500">
                <span className="text-red-500">*</span> Required fields
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg">
                Request Demo
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
