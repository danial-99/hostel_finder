"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Home,
  CookingPot,
  LandPlot,
  Shield,
  Wifi,
  Car,
} from "lucide-react";
import Image from "next/image";
import listHostels, { getAllHostelsList } from "@/actions/hostel/listHostels";
import { useEffect, useState } from "react";
import { any } from "zod";
import getHostelsList from "@/actions/hostel/listHostels";
import { updateHostelStatus } from "@/actions/super-admin/hostelstatusupdate";
import { toast } from "@/hooks/use-toast"
// Types
type Hostel = {
  id: string;
  name: string;
  type: string;
  hostelImage: string;
  city: string;
  country: string;
  location: string;
  rating: number;
  rooms: number;
  kitchen: number;
  area: string;
  security: boolean;
  wifi: boolean;
  parking: boolean;
  image: string;
  featured: boolean;
};

enum HostelStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
  CLOSED = "CLOSED"
}

// HostelCard Component
const HostelCard: React.FC<{ hostel: Hostel }> = ({ hostel }) => {
  const handleStatusUpdate = async (hostelName: string, status: HostelStatus) => {
    const response = await updateHostelStatus(hostelName, status);
    if (response.success) {
      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className='w-full mb-4 p-6'>
      <CardContent className='p-0'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/4'>
            <Image
              unoptimized
              width={0}
              height={0}
              src={`data:image/jpeg;base64,${hostel.hostelImage}`}
              alt={hostel.name}
              className='w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none'
            />
          </div>
          <div className='w-full md:w-3/4 p-4'>
            <div className='flex justify-between items-start'>
              <div>
                <div className='flex justify-start items-center gap-x-4'>
                  <h2 className='text-2xl font-bold'>{hostel.name}</h2>
                </div>
                <p className='text-gray-500'>{hostel.type}</p>
                <div className='flex items-center mt-1'>
                  <MapPin className='w-4 h-4 mr-1 text-gray-500' />
                  <span className='text-sm text-gray-500'>
                    {hostel.city}
                  </span>
                  ,
                  <span className='text-sm text-gray-500'>
                    {hostel.country}
                  </span>
                </div>
                <div className='flex items-center mt-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < hostel.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='text-right'>
            <div className='flex flex-col justify-end space-y-2 mt-2'>
              <Button
                variant='default'
                onClick={() => handleStatusUpdate(hostel.name, HostelStatus.APPROVED)}
              >
                Activate
              </Button>
      
              <Button
                variant='destructive'
                onClick={() => handleStatusUpdate(hostel.name, HostelStatus.SUSPENDED)}
              >
                Sustain
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ManageHostels Component
const ManageHostels: React.FC = () => {
  const [hostels, setHostels] = useState<any[]>([]);
  useEffect(() => {
      async function fetchHostels() {
        const hostelData = await getAllHostelsList();
        if (hostelData) {
          setHostels(hostelData);
        }
      }
  
      fetchHostels();
    }, []); 
  
  // [
  //   {
  //     id: "1",
  //     name: "Akasia Hostel",
  //     type: "Boys Hostel",
  //     location: "Figueroa, Los Angeles",
  //     rating: 5,
  //     rooms: 12,
  //     kitchen: 2,
  //     area: "66x78 m²",
  //     security: true,
  //     wifi: true,
  //     parking: true,
  //     image: "/room.jpg",
  //     featured: true,
  //   },
  // ];

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Manage Hostels</h1>
      {(hostels.length > 0) ?
      hostels.map((hostel: any) => (     
        <HostelCard key={hostel.id} hostel={hostel} />
      ))
    :  
    <h2>No hostel regisreted yet</h2>}
    </div>
  );
};

export default ManageHostels;
