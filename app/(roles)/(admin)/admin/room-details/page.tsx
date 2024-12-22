"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ImagePlus, Pencil, Save, Upload, X, Camera } from 'lucide-react';
import Image from "next/image";
import axios from 'axios';
import getHostelsDetail, { fetchHostelsDetail } from "@/actions/hostel/hostelProfile";

type Room = {
  name: string;
  bedCount: number;
  price: number;
  available: boolean;
  numberOfRooms: string;
  image: string;
};

export default function Component() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showReview, setShowReview] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Room[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch room data from your API
    const fetchRooms = async () => {
      try {
        const res = await fetchHostelsDetail() // Replace with your actual API endpoint
        var roomsData;
        if(res){
          roomsData = res.rooms;
          setRooms(roomsData); // Set the rooms state with the fetched data
        }

      } catch (error) {
        console.error('Error fetching rooms data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch rooms data.",
          variant: "destructive",
        });
      }
    };

    fetchRooms();
  }, []); // Run only once when component mounts

  const handlePriceChange = (roomName: string, newPrice: number) => {
    if (newPrice <= 0) {
      toast({
        title: "Error",
        description: "Price must be greater than 0 PKR",
        variant: "destructive",
      });
      return;
    }
    updateRoom(roomName, { price: newPrice });
  };

  const handleAvailabilityChange = (roomName: string, available: boolean) => {
    updateRoom(roomName, { available });
  };

  const handleImageUpload = (roomName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Assume only one file is selected
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        updateRoom(roomName, { image: newImage });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateRoom = (roomName: string, update: Partial<Room>) => {
    const updatedRooms = rooms.map((room) =>
      room.name === roomName ? { ...room, ...update } : room
    );
    setRooms(updatedRooms);
    updatePendingChanges(updatedRooms);
  };

  const updatePendingChanges = (updatedRooms: Room[]) => {
    setPendingChanges(updatedRooms.filter((room) => room.image !== "" || room.price !== 0 || room.available !== true));
  };

  const saveChanges = async () => {
    try {
      // Here you would typically make an API call to save the changes
      console.log('Saving changes:', pendingChanges);
      toast({
        title: "Success",
        description: "Room details updated successfully",
        variant: "default",
      });
      setPendingChanges([]);
      setShowReview(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update room details",
        variant: "destructive",
      });
    }
  };

  const triggerFileInput = (roomName: string) => {
    fileInputRef.current?.click();
    fileInputRef.current?.addEventListener("change", (event) => {
      handleImageUpload(roomName, event as unknown as React.ChangeEvent<HTMLInputElement>);
    });
  };

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
          {rooms.map((room) => (
            <Card key={room.name}>
              <CardHeader>
                <CardTitle>{room.name} Room</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="relative w-24 h-24">
                      <Image
                        src={`data:image/jpeg;base64,${room.image}`}
                        alt={`${room.name} room`}
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
                            onChange={(e) => handlePriceChange(room.name, Number(e.target.value))}
                            className="w-24"
                            min="1"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Available</Label>
                        <Switch
                          checked={room.available}
                          onCheckedChange={(checked) => handleAvailabilityChange(room.name, checked)}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => triggerFileInput(room.name)}>
                          <Upload className="mr-2 h-4 w-4" /> Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={showReview} onOpenChange={(open) => setShowReview(open)}>
        <DialogTrigger>Review Changes</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Your Changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {pendingChanges.map((room) => (
              <div key={room.name} className="p-4 border-b">
                <p>{room.name} Room - {room.bedCount} Beds</p>
                <p>Price: {room.price} PKR</p>
                <p>Status: {room.available ? 'Available' : 'Not Available'}</p>
                {room.image && (
                  <div className="flex gap-2">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={room.image}
                        alt={`Room image`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={saveChanges} disabled={pendingChanges.length === 0}>
              <Save className="mr-2" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
