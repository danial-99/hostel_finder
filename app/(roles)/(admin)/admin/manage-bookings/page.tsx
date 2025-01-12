"use client";
import { useState, useEffect } from 'react';
import BookingsTable from '@/components/admin/BookingsTable';
import { fetchBookingRequests } from '@/actions/hostel/booking';

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]); // State for storing bookings
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true); // Start loading
        const fetchedBookings = await fetchBookingRequests(); 
        console.log(fetchedBookings);
        if(fetchedBookings)
        setBookings(fetchedBookings); // Update the state with fetched data
        console.log(bookings);
      } catch (err) {
        setError('Failed to load bookings'); // Set error message
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadBookings(); // Fetch data when component mounts
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
    <div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
