"use client"

import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { getAllHostelsList, getFullDetials } from "@/actions/hostel/listHostels"
// import { Button } from "@/components/ui/button"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  phoneNumber: string
  hostelName: string
  paymentDate: Date
  subscriptionPlan: "Free" | "Monthly" | "6 Months" | "1 Year"
  discountApplied: string
}

// const columns = [
//   { key: "hostelName", header: "Hostel Name" },
//   { key: "subscriptionPlan", header: "Subscription Plan" },
//   { key: "amount", header: "Amount Paid" },
//   { key: "discountApplied", header: "Discount" },
//   { key: "status", header: "Status" },
//   { key: "email", header: "Email" },
//   { key: "phoneNumber", header: "Phone Number" },
//   { key: "paymentDate", header: "Payment Date" },
// ]

function DataTable({ data }: { data: Payment[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  

   const filteredData = data
  // //.filter((payment) =>
  //   payment.hostelName.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by hostel name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {data.map((column) => (
                <TableHead key={column.id}>{column.status}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((payment) => (
              <TableRow key={438534}>
                <TableCell>{payment.hostelName}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(349854)}
                </TableCell>
                <TableCell>{payment.discountApplied}</TableCell>
                <TableCell>
                  <div
                    className={`capitalize ${
                      payment.status === "success" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {payment.status}
                  </div>
                </TableCell>
                <TableCell>{payment.email}</TableCell>
                <TableCell>{payment.phoneNumber}</TableCell>
                {/* <TableCell>{payment.subscriptionEnd.toLocaleDateString()}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// function getData(): Payment[] {
//   // This is mock data. In a real application, you would fetch this data from an API.
//    return 
//   // [
//   //   {
//   //     id: "728ed52f",
//   //     amount: 0,
//   //     status: "success",
//   //     email: "sunshine@example.com",
//   //     phoneNumber: "+1 (555) 123-4567",
//   //     hostelName: "Sunshine Hostel",
//   //     paymentDate: new Date("2023-01-01"),
//   //     subscriptionPlan: "Free",
//   //     discountApplied: "0%",
//   //   },
//   //   {
//   //     id: "489e1d42",
//   //     amount: 29.99,
//   //     status: "success",
//   //     email: "moonlight@example.com",
//   //     phoneNumber: "+1 (555) 987-6543",
//   //     hostelName: "Moonlight Inn",
//   //     paymentDate: new Date("2023-02-15"),
//   //     subscriptionPlan: "Monthly",
//   //     discountApplied: "0%",
//   //   },
//   //   {
//   //     id: "8a6b8b02",
//   //     amount: 171.00,
//   //     status: "success",
//   //     email: "starry@example.com",
//   //     phoneNumber: "+1 (555) 246-8135",
//   //     hostelName: "Starry Night Hostel",
//   //     paymentDate: new Date("2023-03-20"),
//   //     subscriptionPlan: "6 Months",
//   //     discountApplied: "5%",
//   //   },
//   //   {
//   //     id: "a89c2f3e",
//   //     amount: 323.99,
//   //     status: "success",
//   //     email: "cozy@example.com",
//   //     phoneNumber: "+1 (555) 369-2580",
//   //     hostelName: "Cozy Corner Hostel",
//   //     paymentDate: new Date("2023-04-05"),
//   //     subscriptionPlan: "1 Year",
//   //     discountApplied: "10%",
//   //   },
//   //   // Add more mock data here to demonstrate the search functionality
//   //   {
//   //     id: "b23d9f7c",
//   //     amount: 29.99,
//   //     status: "pending",
//   //     email: "backpackers@example.com",
//   //     phoneNumber: "+1 (555) 789-0123",
//   //     hostelName: "Backpackers Paradise",
//   //     paymentDate: new Date("2023-05-10"),
//   //     subscriptionPlan: "Monthly",
//   //     discountApplied: "0%",
//   //   },
//   //   {
//   //     id: "c45e1a8d",
//   //     amount: 161.99,
//   //     status: "success",
//   //     email: "globetrotter@example.com",
//   //     phoneNumber: "+1 (555) 321-6547",
//   //     hostelName: "Globetrotter's Haven",
//   //     paymentDate: new Date("2023-06-22"),
//   //     subscriptionPlan: "6 Months",
//   //     discountApplied: "5%",
//   //   },
//   //]
// }

export default function PaymentsPage() {
  // const data = getData()
  const [columns, setColumns] = useState<any[]>([]);
  useEffect(() => {
      async function fetchHostels() {
        const hostelData = await getFullDetials();
        if (hostelData) {
          setColumns(hostelData);
        }
      }
  
      fetchHostels();
    }, []); 

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Super Admin - Hostel Subscription Payments</h1>
      <DataTable data={columns} />
    </div>
  )
}

