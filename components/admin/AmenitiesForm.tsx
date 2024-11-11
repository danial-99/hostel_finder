"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Utensils,
  Wifi,
  Lightbulb,
  WashingMachine,
  AirVent,
  Droplet,
  Tent,
} from "lucide-react";
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator";

interface Amenity {
  icon: React.ElementType;
  label: string;
  id: string;
}

const amenities: Amenity[] = [
  { icon: Shield, label: "Security", id: "security" },
  { icon: Utensils, label: "3 times meal", id: "meal" },
  { icon: Wifi, label: "Fiber/Wifi", id: "wifi" },
  { icon: Lightbulb, label: "24/7 light", id: "light" },
  { icon: WashingMachine, label: "Laundry space", id: "laundry" },
  { icon: AirVent, label: "AC/Heater", id: "ac" },
  { icon: Droplet, label: "Geyser", id: "geyser" },
  { icon: Tent, label: "Out door space", id: "outdoor" },
];

const AmenityIcon: React.FC<{
  amenity: Amenity;
  selected: boolean;
  onClick: () => void;
}> = ({ amenity, selected, onClick }) => (
  <div className='text-center'>
    <div
      className={cn(
        "flex flex-col items-center justify-center p-10 rounded-lg cursor-pointer transition-colors",
        selected
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/10 hover:bg-secondary/30"
      )}
      onClick={onClick}
    >
      <amenity.icon className='w-16 h-16' />
    </div>
    <p className='text-base text-center mt-2'>{amenity.label}</p>
  </div>
);

export default function AmenitiesForm() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "security",
    "wifi",
    "geyser",
  ]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    console.log("Selected amenities:", selectedAmenities);
    // Here you would typically send the data to your backend
  };

  return (
    <Card className='w-full max-w-7xl mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-normal'>
          Select what you Provide
        </CardTitle>
        <Separator className="my-10"/>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
          {amenities.map((amenity) => (
            <AmenityIcon
              key={amenity.id}
              amenity={amenity}
              selected={selectedAmenities.includes(amenity.id)}
              onClick={() => toggleAmenity(amenity.id)}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex justify-end gap-x-3'>
        <Button className="w-2/12" variant='outline'>Cancel</Button>
        <Button className="w-3/12" onClick={handleSave}>Save</Button>
      </CardFooter>
    </Card>
  );
}
