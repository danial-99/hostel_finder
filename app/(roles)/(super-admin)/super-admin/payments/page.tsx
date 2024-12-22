"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
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

const columns = [
  { key: "hostelName", header: "Hostel Name" },
  { key: "subscriptionPlan", header: "Subscription Plan" },
  { key: "amount", header: "Amount Paid" },
  { key: "discountApplied", header: "Discount" },
  { key: "status", header: "Status" },
  { key: "email", header: "Email" },
  { key: "phoneNumber", header: "Phone Number" },
  { key: "paymentDate", header: "Payment Date" },
]

function DataTable({ data }: { data: Payment[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = data.filter((payment) =>
    payment.hostelName.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              {columns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.hostelName}</TableCell>
                <TableCell>{payment.subscriptionPlan}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(payment.amount)}
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
                <TableCell>{payment.paymentDate.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function getData(): Payment[] {
  // This is mock data. In a real application, you would fetch this data from an API.
  return [
    {
      id: "728ed52f",
      amount: 0,
      status: "success",
      email: "1308azharabbas@example.com",
      phoneNumber: "+92451234567",
      hostelName: "testing Hostel",
      paymentDate: new Date("2024-12-21"),
      subscriptionPlan: "Free",
      discountApplied: "0%",
    },
    {
      id: "489e1d42",
      amount: 29.99,
      status: "success",
      email: "azhar.diligent@gmail.com",
      phoneNumber: "+93242442423",
      hostelName: "testing",
      paymentDate: new Date("2024-12-22"),
      subscriptionPlan: "Monthly",
      discountApplied: "0%",
    }
  ]
}

export default function PaymentsPage() {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Super Admin - Hostel Subscription Payments</h1>
      <DataTable data={data} />
    </div>
  )
}

