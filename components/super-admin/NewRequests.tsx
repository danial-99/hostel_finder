"use client";

import { HostelStatusUpdate } from "@/actions/super-admin/hostelstatusupdate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { HostelType } from "@prisma/client";
import { MapPin } from "lucide-react";
import Image from "next/image";

type Hostel = {
  id: string;
  ownerId: string;
  status: string;
  hostelName: string;
  hostelImage: string | null;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  type: HostelType;
  cnic: string;
  phone: string;
  address: string;
  category: string;
  description: string;
  facilities: string[];
  createdAt: string;
  updatedAt: string;
};
const fasci = ") ";
const HostelRequestCard: React.FC<{
  hostel: Hostel;
  onAccept: () => void;
  onReject: () => void;
}> = ({ hostel, onAccept, onReject }) => {
  return (
    <Card className='w-full mb-6 overflow-hidden'>
      <CardContent className='p-0'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/3 lg:w-1/4'>
            <Image
              unoptimized
              width={0}
              height={0}
              src={`data:image/jpeg;base64,${hostel.hostelImage}`}
              alt={hostel.hostelName}
              className='w-full h-48 md:h-full object-cover'
            />
          </div>
          <div className='w-full md:w-2/3 lg:w-3/4 p-4'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4'>
            <div>
            <h4 className='font-semibold mb-4'>Hostel Information</h4>
            <p><span className='font-medium'>Name:</span>{hostel.hostelName}</p>
            <p><span className='font-medium'>Owner:</span> {hostel.hostelName}</p>
            <p><span className='font-medium'>Location:</span> {hostel.city},{hostel.province}, {hostel.country}</p>
            <p><span className='font-medium'>Zip Code:</span> {hostel.zipCode}</p>
            <p><span className='font-medium'>Address:</span>{hostel.address}</p>
            <p><span className='font-medium'>Hostel Type:</span> {hostel.type}</p>
            <p><span className='font-medium'>Category:</span> {hostel.category}</p>
            <p><span className='font-medium'>CNIC:</span> {hostel.cnic}</p>
            <p><span className='font-medium'>Phone:</span> {hostel.phone}</p>
            <p><span className='font-medium'>Number of Rooms:</span> 4</p>
          </div>
            </div>
            <div className='flex flex-wrap gap-2'>
              Facilities:</div>
            <ul>
            {hostel.facilities.map((facility: any, index: number) => (
              <li key={index}>{index + 1}{fasci}{facility}</li>
            ))}
          </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end space-x-2 p-4 bg-white'>
        <Button
          variant='destructive'
          onClick={onReject}
        >
          Reject
        </Button>
        <Button onClick={onAccept}>Accept</Button>
      </CardFooter>
    </Card>
  );
};

const NewRequests: React.FC<{ pendingHostels: Hostel[] }> = ({
  pendingHostels,
}) => {
  const handleStatusChange = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    const result = await HostelStatusUpdate(id, status);
    if (result.status === 200) {
      toast({
        title: status === "APPROVED" ? "Hostel Accepted" : "Hostel Rejected",
        description: `The hostel has been ${status.toLowerCase()} successfully.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: `Failed to ${status.toLowerCase()} the hostel. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleAccept = (id: string) => handleStatusChange(id, "APPROVED");
  const handleReject = (id: string) => handleStatusChange(id, "REJECTED");

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>New Hostel Requests</h1>
      {pendingHostels.length === 0 ? (
        <p className='text-center text-gray-500'>
          No new requests at the moment.
        </p>
      ) : (
        pendingHostels.map((request) => (
          <HostelRequestCard
            key={request.id}
            hostel={request}
            onAccept={() => handleAccept(request.id)}
            onReject={() => handleReject(request.id)}
          />
        ))
      )}
    </div>
  );
};

export default NewRequests;


