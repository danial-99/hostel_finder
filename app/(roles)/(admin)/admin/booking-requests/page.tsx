"use client";
import { useState, useEffect } from 'react';
import BookingRequestCard from '@/components/admin/BookingRequestCard';
import { fetchBookingRequests, fetchPendingBookingRequests } from '@/actions/hostel/booking';

export default function BookingRequestsPage() {
  const [bookingRequests, setBookingRequests] = useState<any[]>([]); // State for storing booking requests
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const loadBookingRequests = async () => {
      try {
        setLoading(true); // Start loading
        const requests = await fetchPendingBookingRequests();
        console.log(requests);
        if (requests)
          setBookingRequests(requests); // Update the state with fetched data
        console.log(requests);
      } catch (err) {
        setError('Failed to load booking requests'); // Set error message
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadBookingRequests(); // Fetch data when component mounts
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>; // Show error message if data fetching fails
  }


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Booking Requests
      </h1>
      <div className="space-y-6">
        {bookingRequests.length > 0 ? (
          bookingRequests.map((request) => (
            <BookingRequestCard key={request.id} {...request} />
          ))
        ) : (
          <p>No booking requests available.</p> // Show message if no requests
        )}
      </div>
    </div>
  );
}
