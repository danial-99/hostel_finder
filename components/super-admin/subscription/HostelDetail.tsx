import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, DollarSign, Users, MapPin, Phone, Mail, Globe, ArrowUpCircle } from "lucide-react"

interface HostelDetailsProps {
  hostel: {
    id: number
    name: string
    location: string
    plan: string
    status: string
    lastPayment: string
    endDate: string
  }
  onClose: () => void
}

export function HostelDetailsView({ hostel, onClose }: HostelDetailsProps) {
  const [activeTab, setActiveTab] = useState("details")

  const handlePromote = () => {
    if (hostel.plan.toLowerCase() === "premium") {
      alert(`${hostel.name} has been promoted successfully!`)
    } else {
      alert(`Promotion is only available for Premium plans. Please upgrade your subscription.`)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{hostel.name}</CardTitle>
          <Badge variant={hostel.status === "Active" ? "success" : "destructive"}>
            {hostel.status}
          </Badge>
        </div>
        <CardDescription>{hostel.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="space-y-4 mt-4">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>123 Hostel Street, {hostel.location}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>contact@{hostel.name.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                <span>www.{hostel.name.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Capacity: 50 guests</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="subscription">
            <div className="space-y-4 mt-4">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Subscription Plan: {hostel.plan}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                <span>Last Payment: {hostel.lastPayment}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>End Date: {hostel.endDate}</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={handlePromote}>
          <ArrowUpCircle className="mr-2 h-4 w-4" />
          Promote Hostel
        </Button>
      </CardFooter>
    </Card>
  )
}
