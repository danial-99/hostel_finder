"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Mail, Phone, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hostelName: "",
    hostelAddress: "",
    subject: "",
    description: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form submitted", formData)
    toast({
      title: "Report Submitted",
      description: "We've received your report and will investigate the issue.",
    })
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      hostelName: "",
      hostelAddress: "",
      subject: "",
      description: ""
    })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      
      <Tabs defaultValue="contact" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="report">Report a Problem</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>We're here to help with any questions or concerns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>support@hostelfinder.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="report">
          <Card>
            <CardHeader>
              <CardTitle>Report a Problem</CardTitle>
              <CardDescription>Let us know about any issues or inconveniences you've experienced.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hostelName">Hostel Name</Label>
                  <Input 
                    id="hostelName" 
                    name="hostelName" 
                    required 
                    value={formData.hostelName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hostelAddress">Hostel Address</Label>
                  <Input 
                    id="hostelAddress" 
                    name="hostelAddress" 
                    required 
                    value={formData.hostelAddress}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    required 
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description of the Problem</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    required 
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

