"use client";
import { useState, useEffect } from "react";
import {getTopHostelsList} from "@/actions/hostel/listHostels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HostelList() {
  // State to hold the hostels data
  const [hostels, setHostels] = useState<any[]>([]);

  // Fetch hostel data from the backend
  useEffect(() => {
    async function fetchHostels() {
      const hostelData = await getTopHostelsList();
      if (hostelData) {
        setHostels(hostelData);
      }
    }

    fetchHostels();
  }, []);
console.log(hostels);
  // Check if hostels data is empty
  if (hostels.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">No hostels are currently registered</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Top Rated Hostels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <Link href={`/hostels/${hostel.id}`} key={hostel.id}>
              <Card className="transition-transform hover:scale-105">
                <CardHeader className="p-0">
                  {/* Convert byte data to Base64 and display it as image */}
                  <Image
                    src={`data:image/jpeg;base64,${hostel.hostelImage}`}
                    alt={hostel.hostelName}
                    className="w-full h-48 object-cover"
                    width={300}
                    height={200}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle>{hostel.name}</CardTitle>
                  <div className="flex items-center mt-2">
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
                    <span className="ml-2 text-sm text-gray-600">
                      {hostel.rating}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hostel.location}
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    Capacity: {hostel.capacity}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
