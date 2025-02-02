'use client'

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { updateBookingStatus } from "@/actions/hostel/booking"


interface BookingRequestCardProps {
  id: number
  name: string
  profession: string
  email: string
  address: string
  phone: string
  cnic: string
  roomType: string
  imageUrl: string
  price: number
  bedCount: number
  status: string
  bkId: string
}

export default function BookingRequestCard({
  id,
  name,
  profession,
  email,
  address,
  cnic,
  phone,
  bedCount,
  imageUrl,
  price,
  status,
  bkId,
}: BookingRequestCardProps) {
  // Default payment status is 'Unpaid'
  const [paymentStatus, setPaymentStatus] = useState<string>(status)

  const onAccept = async () => {
    const res = await updateBookingStatus(bkId, "Pending Payment");
    if (res.status == 200) {
      toast({
        title: "Booking Request Sent",
        description: res.message,
        variant: "default"
      });
    } else {
      toast({
        title: "Booking Request Sent",
        description: res.message,
        variant: "destructive"
      });
    }
    // Update payment status to indicate further action is required
    setPaymentStatus("Pending Payment");

  }

  const onReject = async () => {
    const res = await updateBookingStatus(bkId, "Rejected");
    if (res.status == 200) {
      toast({
        title: "Booking Request Sent",
        description: res.message,
        variant: "default"
      });
    } else {
      toast({
        title: "Booking Request Sent",
        description: res.message,
        variant: "destructive"
      });
    }
    // Keep payment status as 'Unpaid' since the request was rejected
    setPaymentStatus("Rejected")
  }

  return (
    <Card className="w-full mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <Image
              unoptimized
              width={0}
              height={0}
              src={`data:image/jpeg;base64,${imageUrl}`}
              alt={name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-3/4 md:pl-6">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-500 mb-2">{profession}</p>
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-600">Phone: {phone}</span>
            </div>
            <p className="text-gray-600 mb-2">CNIC: {cnic}</p>
            <p className="text-gray-600 mb-2">email: {email}</p>
            <p className="text-gray-600 mb-2">address: {address}</p>
            <p className="text-gray-600 mb-4">Room Type: {bedCount} Bedded</p>
            <p className="text-gray-600 mb-4">Cost: {price}</p>
            <p
              className={`text-sm font-medium ${paymentStatus === "Pending Payment" || paymentStatus == "PAID"
                ? "text-blue-600"
                : paymentStatus === "Paid"
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              {paymentStatus}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-6">
        <Button
          variant="outline"
          onClick={onReject}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Reject
        </Button>
        <Button
          onClick={onAccept}
          className="bg-primary text-white hover:bg-primary-dark"
        >
          Accept
        </Button>
      </CardFooter>
    </Card>
  )
}
