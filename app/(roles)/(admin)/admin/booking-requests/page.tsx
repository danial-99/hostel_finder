import BookingRequestCard from '@/components/admin/BookingRequestCard';

const bookingRequests = [
  {
    id: 1,
    name: 'John Doe',
    profession: 'Student',
    email:'ali@gmail.com',
    address:'islamabad',
    phone: '123-456-7890',
    cnic: '12345-6789012-3',
    roomType: 'Single Room',
    paymentStatus: 'Paid - $500',
    imageUrl: '/path/to/image1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    profession: 'Engineer',
    phone: '987-654-3210',
    cnic: '54321-0987654-3',
    email:'eng@gmail.com',
    address:'karachi',
    roomType: 'Double Room',
    paymentStatus: 'Unpaid',
    imageUrl: '/path/to/image2.jpg',
  },
];

export default function BookingRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Booking Requests
      </h1>
      <div className="space-y-6">
        {bookingRequests.map((request) => (
          <BookingRequestCard key={request.id} {...request} />
        ))}
      </div>
    </div>
  );
}
