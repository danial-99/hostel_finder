import React from 'react'
import { Button } from '@/components/ui/button'

interface BookingSummaryProps {
  formData: {
    totalRoom: string
    totalGuest: string
    checkIn: string
    [key: string]: string
  }
}

export default function BookingSummary({ formData }: BookingSummaryProps) {
  return (
    <div>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Total Room</span>
          <span>{formData.totalRoom}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Guest</span>
          <span>{formData.totalGuest}</span>
        </div>
        <div className="flex justify-between">
          <span>Check In</span>
          <span>{formData.checkIn}</span>
        </div>
        <div className="flex justify-between">
          <span>Price</span>
          <span>$1200</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>-</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total Price</span>
          <span className="text-primary">$1200</span>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <span>Payment Method:</span>
        <div className="flex items-center">
          <span className="mr-2">Master Card</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="12" r="4" fill="#EB001B"/>
            <circle cx="17" cy="12" r="4" fill="#F79E1B"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 16C13.3649 14.9251 14.2 13.3062 14.2 11.5C14.2 9.69378 13.3649 8.07485 12 7C10.6351 8.07485 9.8 9.69378 9.8 11.5C9.8 13.3062 10.6351 14.9251 12 16Z" fill="#FF5F00"/>
          </svg>
        </div>
      </div>
      <Button className="w-full">Booking Now</Button>
    </div>
  )
}