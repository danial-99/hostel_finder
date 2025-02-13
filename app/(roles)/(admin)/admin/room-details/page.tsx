"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import getHostelsDetail, { fetchHostelsDetail } from "@/actions/hostel/hostelProfile";
import { updateRoomDetails } from "@/actions/admin/createHostel";

type Room = {
  id: string;
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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetchHostelsDetail();
        if (res) {
          const roomsData = res.rooms.map((room: any) => ({
            id: room.id,
            bedCount: room.bedCount,
            price: room.price,
            available: room.available,
            numberOfRooms: room.numberOfRooms.toString(), // Convert number to string
            image: room.image ? room.image.toString('base64') : "", // Convert Buffer to Base64 string if it exists
            // Optionally, you can drop hostelId if not needed
          }));
          setRooms(roomsData);
        }
      } catch (error) {
        console.error("Error fetching rooms data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch rooms data.",
          variant: "destructive",
        });
      }
    };
  
    fetchRooms();
  }, []);
  

  const handlePriceChange = (roomId: string, newPrice: number) => {
    if (newPrice <= 0) {
      toast({
        title: "Error",
        description: "Price must be greater than 0 PKR",
        variant: "destructive",
      });
      return;
    }
    updateRoom(roomId, { price: newPrice });
  };

  const handleNumberOfRoomsChange = (roomId: string, newNumberOfRooms: string) => {
    updateRoom(roomId, { numberOfRooms: newNumberOfRooms });
  };

  const updateRoom = (roomId: string, update: Partial<Room>) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, ...update } : room
    );
    setRooms(updatedRooms);
    updatePendingChanges(updatedRooms);
  };

  const updatePendingChanges = (updatedRooms: Room[]) => {
    setPendingChanges(updatedRooms.filter((room) => room.price !== 0 || room.numberOfRooms !== ""));
  };

  const saveChanges = async () => {
    try {
      const sanitizedChanges = pendingChanges.map(({ image, ...rest }) => rest);
      await updateRoomDetails(sanitizedChanges);
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
          {rooms.map((room, index) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle>{room.bedCount} Beded Room</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="relative w-24 h-24">
                      <Image
                        src={`data:image/jpeg;base64,${room.image}`}
                        alt={`room Image`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Price per Month</Label>
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
                        <Label>Number of Rooms</Label>
                        <select
                          value={room.numberOfRooms}
                          onChange={(e) => handleNumberOfRoomsChange(room.id, e.target.value)}
                          className="w-24 mt-1 rounded-md border-gray-300"
                        >
                          {[...Array(11).keys()].map((num) => (
                            <option key={num} value={num.toString()}>
                              {num}
                            </option>
                          ))}
                        </select>
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
              <div key={room.id} className="p-4 border-b">
                <p>{room.bedCount} Beded Room</p>
                <p>Price: {room.price} PKR</p>
                <p>Number of Rooms: {room.numberOfRooms}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={saveChanges} disabled={pendingChanges.length === 0}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
