'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Wifi, Car, Coffee, Utensils, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'

// Mock data for the hostel
const hostelData = {
  name: "Backpackers Paradise",
  logo: "/placeholder.svg?height=50&width=50",
  rating: 4.5,
  description: "A cozy hostel in the heart of the city, perfect for budget travelers and adventure seekers.",
  amenities: ["Free Wi-Fi", "Parking", "Breakfast", "Kitchen"],
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  rooms: [
    { type: "1 Bed", price: 300 },
    { type: "2 Bed", price: 500 },
    { type: "3 Bed", price: 700 },
    { type: "4 Bed", price: 900 },
  ],
  location: {
    address: "123 Traveler's Lane, Adventure City, Wanderlust Country",
    coordinates: { lat: 40.7128, lng: -74.0060 }, // Example coordinates (New York City)
  },
}

const bookingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  profession: z.string().min(1, "Profession is required"),
  phone: z.string().regex(/^(\+92|0)?[0-9]{10}$/, "Invalid phone number format"),
  cnic: z.string().regex(/^[0-9]{5}-[0-9]{7}-[0-9]$/, "CNIC must be in the format: 12345-1234567-1"),
  address: z.string().min(1, "Address is required"),
})

type BookingFormData = z.infer<typeof bookingSchema>

export default function HostelDetails() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState<{ type: string; price: number } | null>(null)
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    profession: '',
    phone: '',
    cnic: '',
    address: '',
  })
  const [formErrors, setFormErrors] = useState<Partial<BookingFormData>>({})
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % hostelData.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + hostelData.images.length) % hostelData.images.length)
  }

  const handleRequestToBook = (roomType: string, price: number) => {
    setSelectedRoom({ type: roomType, price })
    setIsBookingModalOpen(true)
    setBookingStep(0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    try {
      bookingSchema.parse(formData)
      setFormErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.formErrors.fieldErrors as Partial<BookingFormData>)
      }
      return false
    }
  }

  const handleNextStep = () => {
    if (validateForm()) {
      setBookingStep(prev => prev + 1)
    }
  }

  const handlePrevStep = () => {
    setBookingStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    console.log('Booking submitted:', { selectedRoom, formData })
    setIsBookingModalOpen(false)
    setBookingStep(0)
    setSelectedRoom(null)
    setFormData({
      fullName: '',
      profession: '',
      phone: '',
      cnic: '',
      address: '',
    })
  }

  const renderBookingStep = () => {
    switch (bookingStep) {
      case 0:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>Please fill in your details to complete the booking</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  required 
                />
                {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profession">Profession</Label>
                <Input 
                  id="profession" 
                  name="profession" 
                  value={formData.profession} 
                  onChange={handleInputChange} 
                  required 
                />
                {formErrors.profession && <p className="text-red-500 text-sm">{formErrors.profession}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="03001234567"
                  required 
                />
                {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <Input 
                  id="cnic" 
                  name="cnic" 
                  value={formData.cnic} 
                  onChange={handleInputChange} 
                  placeholder="12345-1234567-1"
                  required 
                />
                {formErrors.cnic && <p className="text-red-500 text-sm">{formErrors.cnic}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  required 
                />
                {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleNextStep}>Next</Button>
            </DialogFooter>
          </>
        )
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Booking Summary</DialogTitle>
              <DialogDescription>Please review your booking details</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
              <p>Room Type: {selectedRoom?.type}</p>
              <p>Price: ${selectedRoom?.price} per month</p>
              <p>Full Name: {formData.fullName}</p>
              <p>Profession: {formData.profession}</p>
              <p>Phone: {formData.phone}</p>
              <p>CNIC: {formData.cnic}</p>
              <p>Address: {formData.address}</p>
            </div>
            <DialogFooter>
              <Button onClick={handlePrevStep} variant="outline">Back</Button>
              <Button onClick={handleSubmit}>Confirm Booking</Button>
            </DialogFooter>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src={hostelData.images[currentImage]}
          alt={`${hostelData.name} - Image ${currentImage + 1}`}
          layout="fill"
          objectFit="cover"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-white/80"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-white/80"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center">
            <Image src={hostelData.logo} alt={`${hostelData.name} logo`} width={50} height={50} className="mr-4 rounded-full" />
            <h1 className="text-3xl font-bold">{hostelData.name}</h1>
          </div>
          <div className="mb-4 flex items-center">
            <Star className="mr-1 h-5 w-5 text-yellow-400" />
            <span className="font-semibold">{hostelData.rating}</span>
          </div>
          <p className="mb-4 text-gray-600">{hostelData.description}</p>
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">Amenities</h2>
            <div className="flex flex-wrap gap-4">
              {hostelData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  {amenity === "Free Wi-Fi" && <Wifi className="mr-2 h-5 w-5" />}
                  {amenity === "Parking" && <Car className="mr-2 h-5 w-5" />}
                  {amenity === "Breakfast" && <Coffee className="mr-2 h-5 w-5" />}
                  {amenity === "Kitchen" && <Utensils className="mr-2 h-5 w-5" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="mb-2 text-xl font-semibold">Location</h2>
            <p className="mb-2">{hostelData.location.address}</p>
            <Button onClick={() => setIsMapModalOpen(true)}>
              <MapPin className="mr-2 h-4 w-4" />
              View on Map
            </Button>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Room Types</h2>
          <div className="grid gap-4">
            {hostelData.rooms.map((room, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{room.type} Room</CardTitle>
                  <CardDescription>Per month price</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${room.price}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleRequestToBook(room.type, room.price)}>Request to Book</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {renderBookingStep()}
        </DialogContent>
      </Dialog>

      <Dialog open={isMapModalOpen} onOpenChange={setIsMapModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${hostelData.location.coordinates.lat},${hostelData.location.coordinates.lng}`}
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  )
}