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
  roomNo: string
  address: string
  date: string
  type: string
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

export default function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <Table className='bg-white'>
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader className='bg-secondary/10'>
        <TableRow>
          <TableHead className="w-[100px]">Room No</TableHead>
          <TableHead>ADDRESS</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TYPE</TableHead>
          <TableHead className="text-right">STATUS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.roomNo}>
            <TableCell className="font-medium">{booking.roomNo}</TableCell>
            <TableCell>{booking.address}</TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell>{booking.type}</TableCell>
            <TableCell className="text-right">
              <StatusBadge status={booking.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}