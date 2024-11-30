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
  date: string
  type: string
  payment: 'unpaid' | 'paid' | 'pending'
  status: 'Completed' | 'Active' | 'Canceled'
}

interface BookingsTableProps {
  bookings: Booking[]
}

const StatusBadge: React.FC<{ status: Booking['status'] }> = ({ status }) => {
  const colorMap = {
    Completed: 'bg-primary text-primary-foreground hover:bg-primary/90',
    Active: 'bg-secondary/20 text-secondary-foreground hover:bg-secondary/80',
    Canceled: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  }

  return (
    <Badge className={colorMap[status]}>
      {status}
    </Badge>
  )
}

const PaymentBadge: React.FC<{ payment: Booking['payment'] }> = ({ payment }) => {
  const colorMap = {
    paid: 'bg-primary text-primary-foreground hover:bg-primary/90',
    pending: 'bg-secondary/20 text-secondary-foreground hover:bg-secondary/80',
    unpaid: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  }

  return (
    <Badge className={colorMap[payment]}>
      {payment}
    </Badge>
  )
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
            <TableCell>{booking.date}</TableCell>
            <TableCell>{booking.type}</TableCell>
            <TableCell className="text-right">
              <PaymentBadge payment={booking.payment} /> {/* Display Payment Badge */}
            </TableCell>
            <TableCell className="text-right">
              <StatusBadge status={booking.status} /> {/* Display Status Badge */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
