import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Users } from "lucide-react";
import Image from "next/image";

const hostels = [
  {
    id: 1,
    name: "Capital Boys Hostel",
    rating: 4.5,
    location: "City Center",
    capacity: 50,
    image: "/assets/room.jpg",
  },
  {
    id: 2,
    name: "Capital Boys Hostel",
    rating: 4.2,
    location: "Downtown",
    capacity: 40,
    image: "/assets/room.jpg",
  },
  {
    id: 3,
    name: "Capital Boys Hostel",
    rating: 4.8,
    location: "University Area",
    capacity: 60,
    image: "/assets/room.jpg",
  },
];

export default function HostelList() {
  return (
    <section className='py-12 bg-gray-50'>
      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>List of Hostels</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {hostels.map((hostel) => (
            <Card key={hostel.id}>
              <CardHeader className='p-0'>
                <Image
                  src={hostel.image}
                  alt={hostel.name}
                  className='w-full h-48'
                  width={0}
                  height={0}
                  unoptimized
                />
              </CardHeader>
              <CardContent className='p-4'>
                <CardTitle>{hostel.name}</CardTitle>
                <div className='flex items-center mt-2'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(hostel.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className='ml-2 text-sm text-gray-600'>
                    {hostel.rating}
                  </span>
                </div>
                <div className='flex items-center mt-2 text-sm text-gray-600'>
                  <MapPin className='w-4 h-4 mr-1' />
                  {hostel.location}
                </div>
                <div className='flex items-center mt-2 text-sm text-gray-600'>
                  <Users className='w-4 h-4 mr-1' />
                  Capacity: {hostel.capacity}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
