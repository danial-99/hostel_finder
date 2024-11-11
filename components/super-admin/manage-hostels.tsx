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

// Types
type Hostel = {
  id: string;
  name: string;
  type: string;
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

// HostelCard Component
const HostelCard: React.FC<{ hostel: Hostel }> = ({ hostel }) => {
  return (
    <Card className='w-full mb-4 p-6'>
      <CardContent className='p-0'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/4'>
            <Image
              unoptimized
              width={0}
              height={0}
              src={hostel.image}
              alt={hostel.name}
              className='w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none'
            />
          </div>
          <div className='w-full md:w-3/4 p-4'>
            <div className='flex justify-between items-start'>
              <div>
                <div className='flex justify-start items-center gap-x-4'>
                  <h2 className='text-2xl font-bold'>{hostel.name}</h2>
                  <Badge variant={hostel.featured ? "default" : "secondary"}>
                    {hostel.featured ? "Featured" : "Not Featured"}
                  </Badge>
                </div>
                <p className='text-gray-500'>{hostel.type}</p>
                <div className='flex items-center mt-1'>
                  <MapPin className='w-4 h-4 mr-1 text-gray-500' />
                  <span className='text-sm text-gray-500'>
                    {hostel.location}
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
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4'>
              <div className='flex items-center'>
                <Home className='w-4 h-4 mr-2' />
                <span className='text-sm'>{hostel.rooms} Rooms</span>
              </div>
              <div className='flex items-center'>
                <CookingPot className='w-4 h-4 mr-2' />
                <span className='text-sm'>{hostel.kitchen} Kitchen</span>
              </div>
              <div className='flex items-center'>
                <LandPlot className='w-4 h-4 mr-2' />
                <span className='text-sm'>{hostel.area}</span>
              </div>
              {hostel.security && (
                <div className='flex items-center'>
                  <Shield className='w-4 h-4 mr-2' />
                  <span className='text-sm'>Security</span>
                </div>
              )}
              {hostel.wifi && (
                <div className='flex items-center'>
                  <Wifi className='w-4 h-4 mr-2' />
                  <span className='text-sm'>Wifi</span>
                </div>
              )}
              {hostel.parking && (
                <div className='flex items-center'>
                  <Car className='w-4 h-4 mr-2' />
                  <span className='text-sm'>Parking</span>
                </div>
              )}
            </div>
          </div>
          <div className='text-right'>
            <div className='flex flex-col justify-end space-y-2 mt-2'>
              <Button
                variant='default'
                onClick={() => console.log("Sustain clicked")}
              >
                Sustain
              </Button>
              <Button
                className='bg-secondary/10'
                variant='secondary'
                onClick={() => console.log("Promote clicked")}
              >
                Promote
              </Button>
              <Button
                variant='destructive'
                onClick={() => console.log("Remove clicked")}
              >
                Remove
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
  const hostels: Hostel[] = [
    {
      id: "1",
      name: "Akasia Hostel",
      type: "Boys Hostel",
      location: "Figueroa, Los Angeles",
      rating: 5,
      rooms: 12,
      kitchen: 2,
      area: "66x78 m²",
      security: true,
      wifi: true,
      parking: true,
      image: "/room.jpg",
      featured: true,
    },
  ];

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Manage Hostels</h1>
      {hostels.map((hostel) => (
        <HostelCard key={hostel.id} hostel={hostel} />
      ))}
    </div>
  );
};

export default ManageHostels;
