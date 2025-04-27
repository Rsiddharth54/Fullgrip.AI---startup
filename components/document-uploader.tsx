"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { uploadDocument, processTextDocument } from "@/lib/api-client"

const fileUploadSchema = z.object({
  file: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Please select a file to upload",
  }),
})

const textInputSchema = z.object({
  text: z.string().min(10, "Text must be at least 10 characters long"),
  documentName: z.string().min(3, "Document name must be at least 3 characters long"),
})

export function DocumentUploader() {
  const [activeTab, setActiveTab] = useState("file")
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const fileForm = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {},
  })

  const textForm = useForm<z.infer<typeof textInputSchema>>({
    resolver: zodResolver(textInputSchema),
    defaultValues: {
      text: "",
      documentName: "",
    },
  })

  async function onFileSubmit(data: z.infer<typeof fileUploadSchema>) {
    try {
      setIsUploading(true)
      const file = data.file[0]

      const response = await uploadDocument(file)

      toast({
        title: "Document uploaded successfully",
        description: "Your document is now being processed",
      })

      router.push(`/documents/${response.documentId}`)
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  async function onTextSubmit(data: z.infer<typeof textInputSchema>) {
    try {
      setIsUploading(true)

      const response = await processTextDocument(data.text, data.documentName)

      toast({
        title: "Text submitted successfully",
        description: "Your text is now being processed",
      })

      router.push(`/documents/${response.documentId}`)
    } catch (error) {
      console.error("Text processing error:", error)
      toast({
        title: "Processing failed",
        description: "There was a problem processing your text. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload a document or enter text to process with our multi-agent system</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="text">Text Input</TabsTrigger>
          </TabsList>

          <TabsContent value="file">
            <Form {...fileForm}>
              <form onSubmit={fileForm.handleSubmit(onFileSubmit)} className="space-y-6">
                <FormField
                  control={fileForm.control}
                  name="file"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Upload Document</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                          <Input
                            type="file"
                            className="hidden"
                            id="file-upload"
                            onChange={(e) => {
                              onChange(e.target.files)
                            }}
                            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                            {...rest}
                          />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <Upload className="h-10 w-10 text-gray-400" />
                              <p className="text-sm font-medium">Drag and drop or click to upload</p>
                              <p className="text-xs text-gray-500">Supports PDF, DOC, DOCX, TXT, JPG, JPEG, PNG</p>
                              {value && value[0] && (
                                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                                  <FileText className="h-4 w-4" />
                                  <span>{value[0].name}</span>
                                </div>
                              )}
                            </div>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Document"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="text">
            <Form {...textForm}>
              <form onSubmit={textForm.handleSubmit(onTextSubmit)} className="space-y-6">
                <FormField
                  control={textForm.control}
                  name="documentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a name for this document" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={textForm.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Text</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter the text to process..." className="min-h-[200px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Process Text"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <p>Max file size: 10MB</p>
        <p>Supported formats: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG</p>
      </CardFooter>
    </Card>
  )
}
