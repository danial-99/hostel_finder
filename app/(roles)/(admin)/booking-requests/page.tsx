
import BookingRequestCard from '@/components/admin/BookingRequestCard'

const bookingRequests = [
  {
    id: 1,
    hostelName: 'Akasia Hostel',
    hostelType: 'Boys Hostel',
    location: 'Figueroa, Los Angeles',
    rooms: 12,
    kitchens: 2,
    size: '66x78 m²',
    amenities: ['Security', 'Wifi', 'Parking'],
    imageUrl: '/room.jpg',
  },
  {
    id: 2,
    hostelName: 'Akasia Hostel',
    hostelType: 'Boys Hostel',
    location: 'Figueroa, Los Angeles',
    rooms: 12,
    kitchens: 2,
    size: '66x78 m²',
    amenities: ['Security', 'Wifi', 'Parking'],
    imageUrl: '/room1.png',
  },
]

export default function BookingRequestsPage() {

  return (
      <div className="space-y-6">
        {bookingRequests.map((request) => (
          <BookingRequestCard
            key={request.id}
            {...request}
          />
        ))}
      </div>
  )
}