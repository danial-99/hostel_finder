import { notFound } from 'next/navigation';
import HostelProfile from '@/components/user/HostelProfile';

const hostels = [
  {
    id: 1,
    name: "Capital Boys Hostel",
    rating: 4.5,
    location: "City Center",
    capacity: 50,
    image: "/assets/room.jpg",
    description: "A comfortable hostel in the heart of the city.",
    facilities: ["Free WiFi", "24/7 Security", "Key Card Access", "Parking Available"],
    rooms: [
      { name: "One Bed Room", beds: 1, price: 50, available: true, image: "/assets/room.jpg" },
      { name: "Two Bed Room", beds: 2, price: 35, available: false, image: "/assets/room.jpg" },
      { name: "Three Bed Room", beds: 3, price: 30, available: true, image: "/assets/room.jpg" },
      { name: "Four Bed Room", beds: 4, price: 25, available: true, image: "/assets/room.jpg" },
    ],
  },
  {
    id: 2,
    name: "Downtown Hostel",
    rating: 4.2,
    location: "Downtown",
    capacity: 40,
    image: "/assets/room.jpg",
    description: "Experience the vibrant downtown life in our cozy hostel.",
    facilities: ["Free WiFi", "Shared Kitchen", "Laundry Service", "Bike Rental"],
    rooms: [
        { name: "One Bed Room", beds: 1, price: 50, available: true, image: "/assets/room.jpg" },
        { name: "Two Bed Room", beds: 2, price: 35, available: false, image: "/assets/room.jpg" },
        { name: "Three Bed Room", beds: 3, price: 30, available: true, image: "/assets/room.jpg" },
        { name: "Four Bed Room", beds: 4, price: 25, available: true, image: "/assets/room.jpg" },
      ],
    },
  {
    id: 3,
    name: "University Hostel",
    rating: 4.8,
    location: "University Area",
    capacity: 60,
    image: "/assets/room.jpg",
    description: "The perfect place for students and academics.",
    facilities: ["Study Rooms", "High-Speed Internet", "Gym", "Library"],
    rooms: [
        { name: "One Bed Room", beds: 1, price: 50, available: true, image: "/assets/room.jpg" },
        { name: "Two Bed Room", beds: 2, price: 35, available: false, image: "/assets/room.jpg" },
        { name: "Three Bed Room", beds: 3, price: 30, available: true, image: "/assets/room.jpg" },
        { name: "Four Bed Room", beds: 4, price: 25, available: true, image: "/assets/room.jpg" },
      ],
    },
];

export default function HostelPage({ params }: { params: { id: string } }) {
  const hostel = hostels.find(h => h.id === parseInt(params.id));

  if (!hostel) {
    notFound();
  }

  return <HostelProfile hostel={hostel} />;
}

