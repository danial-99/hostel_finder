'use client'

import { useEffect, useState } from 'react'
import PaymentModal from './payment/PaymentModel'
import { Button } from '@/components/ui/button'
import { UnpaidBookingRequests } from '@/actions/hostel/booking'

export default function Summ() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [bookings, setBookindgs] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any[]>([]);

  // Fetch hostel data from the backend
  useEffect(() => {
    async function fetchHostels() {
      const bookingData = await UnpaidBookingRequests();
      if (bookingData) {
        setBookindgs(bookingData);
      }
    }

    fetchHostels();
  }, []);
  console.log(bookings);

  if (bookings.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">No bookings yet</h2>
        </div>
      </section>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">Hostel Finder</h1>

        {/* Map through bookings array to render each booking card */}
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Your Booking Summary</h2>
            <p className="mb-2">Hostel: {booking.hostelName}</p>
            <p className="mb-2">Room Type: {booking.roomData.bedCount} Bedded</p>
            <p className="mb-2">Name: {booking.name}</p>
            <p className="mb-2">Dates: {new Date(booking.checkInDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}  - {new Date(booking.checkOutDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} </p>
            <p className="text-lg font-bold mt-4">Total: PKR {booking.price}</p>

            {/* Pay Now Button */}
            <Button
              onClick={() => {
                setSelectedBooking(booking);  // Set the selected booking for payment
                setIsPaymentModalOpen(true);
                // Open the payment modal
              }}
              className="w-full mt-6"
            >
              Pay Now
            </Button>
          </div>
        ))}

        {/* Payment Modal */}
        {selectedBooking && (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            amount={selectedBooking.price}
            id={selectedBooking.bkId} // Dynamically set the amount for the selected booking
          />
        )}
      </div>
    );

  }
}
