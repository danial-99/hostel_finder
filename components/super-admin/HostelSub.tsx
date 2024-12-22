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
  { id: 1, name: "test hostel", location: "Murree", plan: "free", status: "Active", lastPayment: "2024-12-22", endDate: "2025-01-21" },
  { id: 2, name: "test", location: "Islaabad", plan: "6 month", status: "Active", lastPayment: "2024-12-22", endDate: "2025-06-22" },
  
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
