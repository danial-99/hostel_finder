"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import { HostelDetailsView } from "./subscription/HostelDetail"

// Define the type for hostel data
interface Hostel {
  id: number
  name: string
  location: string
  plan: string
  status: string
  lastPayment: string
  endDate: string
}

// Mock data for hostels and their subscriptions
const hostelData: Hostel[] = [
  { id: 1, name: "Sunny Beach Hostel", location: "Miami, FL", plan: "1 Year", status: "Active", lastPayment: "2023-05-15", endDate: "2024-05-15" },
  { id: 2, name: "Mountain View Lodge", location: "Denver, CO", plan: "Free", status: "Active", lastPayment: "N/A", endDate: "N/A" },
  { id: 3, name: "City Center Backpackers", location: "New York, NY", plan: "6 Months", status: "Active", lastPayment: "2023-05-28", endDate: "2023-11-28" },
  { id: 4, name: "Coastal Retreat Hostel", location: "San Diego, CA", plan: "1 Month", status: "Expired", lastPayment: "2023-04-30", endDate: "2023-05-30" },
  { id: 5, name: "Historic Downtown Inn", location: "Boston, MA", plan: "1 Month", status: "Active", lastPayment: "2023-06-05", endDate: "2023-07-05" },
]

export default function SuperAdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null)

  const filteredAndSortedHostels = useMemo(() => {
    const filtered = hostelData.filter(
      (hostel) =>
        hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hostel.plan.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const currentDate = new Date()
    return filtered.sort((a, b) => {
      if (a.endDate === "N/A" && b.endDate === "N/A") return 0
      if (a.endDate === "N/A") return 1
      if (b.endDate === "N/A") return -1

      const aDate = new Date(a.endDate)
      const bDate = new Date(b.endDate)

      if (aDate < currentDate && bDate >= currentDate) return -1
      if (bDate < currentDate && aDate >= currentDate) return 1

      return aDate.getTime() - bDate.getTime()
    })
  }, [searchTerm])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleViewDetails = (hostel: Hostel) => {
    setSelectedHostel(hostel)
  }

  const handleCloseDetails = () => {
    setSelectedHostel(null)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hostel Subscription Overview</h1>
      
      {selectedHostel ? (
        <HostelDetailsView hostel={selectedHostel} onClose={handleCloseDetails} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hostels..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8 w-[300px]"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hostel Subscriptions</CardTitle>
              <CardDescription>Overview of all hostel subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hostel Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Subscription Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Subscription End Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedHostels.map((hostel) => {
                    const isExpired = hostel.endDate !== "N/A" && new Date(hostel.endDate) < new Date()
                    return (
                      <TableRow key={hostel.id} className={isExpired ? "bg-red-50" : ""}>
                        <TableCell className="font-medium">{hostel.name}</TableCell>
                        <TableCell>{hostel.location}</TableCell>
                        <TableCell>{hostel.plan}</TableCell>
                        <TableCell>
                          <Badge variant={isExpired ? "destructive" : "success"}>
                            {isExpired ? "Expired" : hostel.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{hostel.lastPayment}</TableCell>
                        <TableCell>{hostel.endDate}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(hostel)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
