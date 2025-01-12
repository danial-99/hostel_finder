import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Booking {
  name: string
  phone: string
  address: string
  checkInDate: string
  checkOutDate: string
  date: string
  type: string
  price: string
  status: 'unpaid' | 'paid' | 'pending'
  status2: 'completed' | 'active' | 'canceled'
}

interface BookingsTableProps {
  bookings: Booking[]
}


export default function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <Table className='bg-white'>
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader className='bg-secondary/10'>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Payment</TableHead> {/* Payment header */}
          <TableHead className="text-right">Status</TableHead> {/* Status header */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.name}>
            <TableCell className="font-medium">{booking.name}</TableCell>
            <TableCell>{booking.phone}</TableCell>
            <TableCell>{booking.address}</TableCell>
            <TableCell><span className="mb-2">Dates: {new Date(booking.checkInDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}  - {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} </span></TableCell>
            <TableCell>{booking.type}</TableCell>
            <TableCell className="text-right">
              {booking.price}
            </TableCell>
            <TableCell className="text-right">
              {booking.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
