"use client";
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import HostelProfile from '@/components/user/HostelProfile';
import getHostelsDetail from '@/actions/hostel/hostelProfile';

const fetchHostelData = async (id: string) => {
  const res = await getHostelsDetail(id); // Assuming you have an API route that fetches hostel data by ID.
  if (!res) {
    throw new Error('Failed to fetch hostel data');
  }
  return res;
};

export default function HostelPage({ params }: { params: { id: string } }) {
  const [hostel, setHostel] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHostelData = async () => {
      try {
        setLoading(true); // Start loading
        const data = await fetchHostelData(params.id); // Fetch the hostel data
        setHostel(data); // Update the state with the fetched data
      } catch (err) {
        setError('Failed to load hostel data');
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadHostelData(); // Fetch the data when the component mounts
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error if there is one
  }

  if (!hostel) {
    notFound(); // If no hostel is found, show a 404
  }

  return <HostelProfile hostel={hostel} />; // Pass the fetched data to the component
}
