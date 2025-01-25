"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle, MessageSquare, Ban } from 'lucide-react'
import { getFeedBack } from "@/actions/hostel/feedback"
import { HostelDetain } from "@/actions/super-admin/hostelstatusupdate"

interface Report {
  id: string
  hostelName: string
  hostelAddress: string
  reporterName: string
  reporterEmail: string
  subject: string
  description: string
  createdAt: string
  status: "pending" | "resolved" | "restricted"
}

export default function HostelReportsPage() {
  const [reports, setReports] = useState<any[]>([])
   useEffect(() => {
      async function fetchHostels() {
        const feedbackData = await getFeedBack();
        if (feedbackData) {
          setReports(feedbackData);
        }
      }
  
      fetchHostels();
    }, []);
    // {
    //   id: "1",
    //   hostelName: "Sunshine Hostel",
    //   hostelAddress: "123 Beach Road, Miami, FL",
    //   reporterName: "John Doe",
    //   reporterEmail: "john@example.com",
    //   subject: "Cleanliness Issue",
    //   description: "The bathroom was not clean upon arrival.",
    //   date: "2023-06-15",
    //   status: "pending"
    // },
    // {
    //   id: "2",
    //   hostelName: "Mountain View Lodge",
    //   hostelAddress: "456 Pine Street, Denver, CO",
    //   reporterName: "Jane Smith",
    //   reporterEmail: "jane@example.com",
    //   subject: "Noise Complaint",
    //   description: "Excessive noise from other guests late at night.",
    //   date: "2023-06-14",
    //   status: "resolved"
    // },
    // {
    //   id: "3",
    //   hostelName: "City Center Hostel",
    //   hostelAddress: "789 Main St, New York, NY",
    //   reporterName: "Alice Johnson",
    //   reporterEmail: "alice@example.com",
    //   subject: "Booking Discrepancy",
    //   description: "My reservation was not found in the system upon arrival.",
    //   date: "2023-06-16",
    //   status: "pending"
    // }
  //])

  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (!selectedReport || !message.trim()) return;

    // Here you would typically send the message to the hostel owner via an API
    console.log(`Sending message to ${selectedReport.hostelName}: ${message}`)
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedReport.hostelName}.`,
    })
    setMessage("")
  }

  const handleRestrictHostel = async (reportId: string) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: "restricted" } : report
    ))
    const hostelName = reports.find(r => r.id === reportId)?.hostelName;
    const result = await HostelDetain(hostelName, "SUSPENDED");
    toast({
      title: "Hostel Restricted",
      description: `${hostelName} has been restricted.`,
      variant: "destructive",
    })
  }

  const handleResolveReport = (reportId: string) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: "resolved" } : report
    ))
    const hostelName = reports.find(r => r.id === reportId)?.hostelName;
    toast({
      title: "Report Resolved",
      description: `The report for ${hostelName} has been marked as resolved.`,
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Hostel Reports Management</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Hostel Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.hostelName}</TableCell>
                <TableCell>{report.subject}</TableCell>
                <TableCell>{new Date(report.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}</TableCell>
                <TableCell>Pending
                  {/* <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${report.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      report.status === 'resolved' ? 'bg-green-200 text-green-800' :
                      'bg-red-200 text-red-800'}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span> */}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Report Details</DialogTitle>
                        <DialogDescription>
                          Review the report and take appropriate action.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="hostelName" className="text-right">
                            Hostel
                          </Label>
                          <Input id="hostelName" value={selectedReport?.hostelName} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-right">
                            Address
                          </Label>
                          <Input id="address" value={selectedReport?.hostelAddress} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="reporter" className="text-right">
                            Reporter
                          </Label>
                          <Input id="reporter" value={selectedReport?.name} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                            Subject
                          </Label>
                          <Input id="subject" value={selectedReport?.subject} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Textarea id="description" value={selectedReport?.description} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="message" className="text-right">
                            Message
                          </Label>
                          <Textarea 
                            id="message" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            placeholder="Enter a message for the hostel owner"
                            className="col-span-3" 
                          />
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <Button type="button" onClick={handleSendMessage} disabled={!message.trim()}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => selectedReport && handleResolveReport(selectedReport.id)}
                          disabled={selectedReport?.status === 'resolved'}
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Mark as Resolved
                        </Button>
                        <Button 
                          type="button" 
                          variant="destructive" 
                          onClick={() => selectedReport && handleRestrictHostel(selectedReport.id)}
                          disabled={selectedReport?.status === 'restricted'}
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Restrict Hostel
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

