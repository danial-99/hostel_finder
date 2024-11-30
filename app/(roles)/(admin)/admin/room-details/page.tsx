'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { ImagePlus, Pencil, Save, Upload, X, Camera } from 'lucide-react'
import Image from "next/image"

type Room = {
  id: string
  type: "single" | "double" | "triple" | "quad"
  bedCount: 1 | 2 | 3 | 4
  price: number
  available: boolean
  images: { id: string; url: string }[]
}

type RoomsByType = {
  [key: string]: Room[]
}

export default function Component() {
  const [rooms, setRooms] = useState<RoomsByType>({
    single: [
      { id: '1', type: 'single', bedCount: 1, price: 2000, available: true, images: [{ id: '1', url: '/placeholder.svg?height=100&width=100' }] },
      { id: '2', type: 'single', bedCount: 1, price: 2200, available: false, images: [{ id: '2', url: '/placeholder.svg?height=100&width=100' }] },
    ],
    double: [
      { id: '3', type: 'double', bedCount: 2, price: 2500, available: true, images: [{ id: '3', url: '/placeholder.svg?height=100&width=100' }] },
      { id: '4', type: 'double', bedCount: 2, price: 2700, available: false, images: [{ id: '4', url: '/placeholder.svg?height=100&width=100' }] },
    ],
    triple: [
      { id: '5', type: 'triple', bedCount: 3, price: 3000, available: true, images: [{ id: '5', url: '/placeholder.svg?height=100&width=100' }] },
      { id: '6', type: 'triple', bedCount: 3, price: 3200, available: false, images: [{ id: '6', url: '/placeholder.svg?height=100&width=100' }] },
      { id: '7', type: 'triple', bedCount: 3, price: 3400, available: true, images: [{ id: '7', url: '/placeholder.svg?height=100&width=100' }] }
    ],
    quad: [
      { id: '8', type: 'quad', bedCount: 4, price: 4000, available: true, images: [{ id: '8', url: '/placeholder.svg?height=100&width=100' }] },
      { id: '9', type: 'quad', bedCount: 4, price: 4200, available: true, images: [{ id: '9', url: '/placeholder.svg?height=100&width=100' }] },
      { id: '10', type: 'quad', bedCount: 4, price: 4400, available: false, images: [{ id: '10', url: '/placeholder.svg?height=100&width=100' }] }
    ]
  })

  const [showReview, setShowReview] = useState(false)
  const [pendingChanges, setPendingChanges] = useState<Room[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePriceChange = (roomId: string, newPrice: number) => {
    if (newPrice <= 0) {
      toast({
        title: "Error",
        description: "Price must be greater than 0 PKR",
        variant: "destructive",
      })
      return
    }
    updateRoom(roomId, { price: newPrice })
  }

  const handleAvailabilityChange = (roomId: string, available: boolean) => {
    updateRoom(roomId, { available })
  }

  const handleImageUpload = (roomId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage = { id: Date.now().toString(), url: e.target?.result as string }
          updateRoom(roomId, (room) => ({
            images: [...room.images, newImage]
          }))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleImageDelete = (roomId: string, imageId: string) => {
    updateRoom(roomId, (room) => ({
      images: room.images.filter(img => img.id !== imageId)
    }))
  }

  const updateRoom = (roomId: string, update: Partial<Room> | ((room: Room) => Partial<Room>)) => {
    const updatedRooms = { ...rooms }
    Object.keys(updatedRooms).forEach(type => {
      const roomIndex = updatedRooms[type].findIndex(r => r.id === roomId)
      if (roomIndex !== -1) {
        const room = updatedRooms[type][roomIndex]
        const updatedRoom = {
          ...room,
          ...(typeof update === 'function' ? update(room) : update)
        }
        updatedRooms[type][roomIndex] = updatedRoom
        updatePendingChanges(updatedRoom)
      }
    })
    setRooms(updatedRooms)
  }

  const updatePendingChanges = (updatedRoom: Room) => {
    setPendingChanges(prev => {
      const existingIndex = prev.findIndex(r => r.id === updatedRoom.id)
      if (existingIndex !== -1) {
        const newChanges = [...prev]
        newChanges[existingIndex] = updatedRoom
        return newChanges
      }
      return [...prev, updatedRoom]
    })
  }

  const saveChanges = async () => {
    try {
      // Here you would typically make an API call to save the changes
      console.log('Saving changes:', pendingChanges)
      toast({
        title: "Success",
        description: "Room details updated successfully",
        variant: "default",
      })
      setPendingChanges([])
      setShowReview(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update room details",
        variant: "destructive",
      })
    }
  }

  const triggerFileInput = (roomId: string) => {
    fileInputRef.current?.click()
    fileInputRef.current?.addEventListener("change", (event) => {
      handleImageUpload(roomId, event as unknown as React.ChangeEvent<HTMLInputElement>)
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Room Management</h1>
        <Button onClick={() => setShowReview(true)} disabled={pendingChanges.length === 0}>
          Review Changes
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-6">
          {Object.entries(rooms).map(([type, roomsOfType]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="capitalize">{type} Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {roomsOfType.map((room) => (
                    <div key={room.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="relative w-24 h-24">
                        <Image
                          src={room.images[0]?.url || '/placeholder.svg?height=100&width=100'}
                          alt={`${type} room`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Price per night (PKR)</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              value={room.price}
                              onChange={(e) => handlePriceChange(room.id, Number(e.target.value))}
                              className="w-24"
                              min="1"
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Available</Label>
                          <Switch
                            checked={room.available}
                            onCheckedChange={(checked) => handleAvailabilityChange(room.id, checked)}
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={() => triggerFileInput(room.id)}>
                            <Upload className="mr-2 h-4 w-4" /> Upload Images
                          </Button>
                          <Button variant="outline" onClick={() => triggerFileInput(room.id)}>
                            <Camera className="mr-2 h-4 w-4" /> Take Photo
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {room.images.map((image) => (
                            <div key={image.id} className="relative w-12 h-12 group">
                              <Image
                                src={image.url}
                                alt={`Room image`}
                                fill
                                className="object-cover rounded-md"
                              />
                              <button
                                onClick={() => handleImageDelete(room.id, image.id)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hidden group-hover:block"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        capture="environment"
      />

      <Dialog open={showReview} onOpenChange={setShowReview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Changes</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] p-4">
            <div className="space-y-4">
              {pendingChanges.map((room) => (
                <Card key={room.id}>
                  <CardContent className="flex items-start space-x-4 p-4">
                    <Image
                      src={room.images[0]?.url || '/placeholder.svg?height=100&width=100'}
                      alt={`${room.type} room`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold capitalize">{room.type} Room</h3>
                      <p>New Price: {room.price} PKR</p>
                      <p>Availability: {room.available ? 'Available' : 'Not Available'}</p>
                      <p>Number of Images: {room.images.length}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowReview(false)}>
              Cancel
            </Button>
            <Button onClick={saveChanges}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}