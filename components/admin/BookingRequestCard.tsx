'use client'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Utensils, Square, Shield, Wifi, Car } from 'lucide-react'
import Image from 'next/image'

interface BookingRequestCardProps {
  hostelName: string
  hostelType: string
  location: string
  rooms: number
  kitchens: number
  size: string
  amenities: string[]
  imageUrl: string
}

export default function BookingRequestCard({
  hostelName,
  hostelType,
  location,
  rooms,
  kitchens,
  size,
  amenities,
  imageUrl
}: BookingRequestCardProps) {

  const onAccept = (id: number) => {
    console.log(`Accepted booking request ${id}`)
    // Implement accept logic here
  }

  const onReject = (id: number) => {
    console.log(`Rejected booking request ${id}`)
    // Implement reject logic here
  }
  return (
    <Card className="w-full mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <Image unoptimized width={0} height={0} src={imageUrl} alt={hostelName} className="w-full h-48 object-cover rounded-lg" />
          </div>
          <div className="w-full md:w-3/4 md:pl-6">
            <h2 className="text-2xl font-bold">{hostelName}</h2>
            <p className="text-gray-500 mb-2">{hostelType}</p>
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-sm text-gray-600">{location}</span>
            </div>
            <div className="flex justify-start items-start gap-4 mb-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm">{rooms} Rooms</span>
              </div>
              <div className="flex items-center">
                <Utensils className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm">{kitchens} Kitchen</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm">{size}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {amenities.includes('Security') && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <Shield className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Security</span>
                </div>
              )}
              {amenities.includes('Wifi') && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <Wifi className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Wifi</span>
                </div>
              )}
              {amenities.includes('Parking') && (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <Car className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm">Parking</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-6">
        <Button variant="outline" onClick={() => onReject} className="bg-red-500 text-white hover:bg-red-600">
          Reject
        </Button>
        <Button onClick={() => onAccept} className="bg-primary text-white hover:bg-primary-dark">
          Accept
        </Button>
      </CardFooter>
    </Card>
  )
}