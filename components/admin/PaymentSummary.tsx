'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bed, Users, Maximize } from 'lucide-react'
import Image from "next/image"

interface PaymentSummaryProps {
  hostelName: string
  beds: number
  sleeps: number
  squareFeet: number
  arrivalDate: string
  departureDate: string
  totalNights: number
  rate: number
  communityFee: number
  tax: number
  total: number
}

const HostelDetails: React.FC<{ name: string, beds: number, sleeps: number, squareFeet: number }> = ({ name, beds, sleeps, squareFeet }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold mb-2">{name}</h2>
    <div className="flex space-x-4 text-sm text-gray-500">
      <div className="flex items-center">
        <Bed className="w-4 h-4 mr-1" />
        <span>{beds} Beds</span>
      </div>
      <div className="flex items-center">
        <Users className="w-4 h-4 mr-1" />
        <span>{sleeps} Sleeps</span>
      </div>
      <div className="flex items-center">
        <Maximize className="w-4 h-4 mr-1" />
        <span>{squareFeet} Sq Ft</span>
      </div>
    </div>
  </div>
)

const PaymentBreakdown: React.FC<{ label: string, amount: number, isTotal?: boolean }> = ({ label, amount, isTotal }) => (
  <div className={`flex justify-between ${isTotal ? 'font-semibold' : ''}`}>
    <span>{label}</span>
    <span className="text-primary">${amount.toFixed(2)}</span>
  </div>
)

export default function PaymentSummary({
  hostelName,
  beds,
  sleeps,
  squareFeet,
  arrivalDate,
  departureDate,
  totalNights,
  rate,
  communityFee,
  tax,
  total
}: PaymentSummaryProps) {

    const onBack = () => {
        console.log('Back button clicked')
        // Implement back navigation logic here
      }
    
      const onAccept = () => {
        console.log('Accept button clicked')
        // Implement payment acceptance logic here
      }
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <Image
          unoptimized
            src="/room1.png"
            alt="Hostel Room"
            width={0}
            height={0}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <HostelDetails name={hostelName} beds={beds} sleeps={sleeps} squareFeet={squareFeet} />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Arrival Date</div>
            <div>{arrivalDate}</div>
            <div>Departure Date</div>
            <div>{departureDate}</div>
            <div>Total Nights</div>
            <div>{totalNights}</div>
          </div>
          <div className="space-y-2">
            <PaymentBreakdown label="Rate" amount={rate} />
            <PaymentBreakdown label="Community Fee" amount={communityFee} />
            <PaymentBreakdown label="Tax" amount={tax} />
            <hr className="my-2" />
            <PaymentBreakdown label="Total" amount={total} isTotal />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onAccept}>Accept</Button>
      </CardFooter>
    </Card>
  )
}