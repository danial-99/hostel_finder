"use client";

import { HostelStatusUpdate } from "@/actions/super-admin/hostelstatusupdate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { HostelType } from "@prisma/client";
import { Download, MapPin } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Hostel = {
  id: string;
  ownerId: string;
  status: string;
  ownerName: string;
  hostelName: string;
  hostelImage: string | null;
  electercityBill: string | null;
  gasBill: string | null;       
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

const HostelRequestCard: React.FC<{
  hostel: Hostel;
  onAccept: () => void;
  onReject: () => void;
}> = ({ hostel, onAccept, onReject }) => {
  return (
    <Card className="w-full mb-6 overflow-hidden">
      <CardContent className="p-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="details">Hostel Details</TabsTrigger>
            <TabsTrigger value="images">Hostel Images</TabsTrigger>
            <TabsTrigger value="bills">Bills & Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">Hostel Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {hostel.hostelName}</p>
                  <p><span className="font-medium">Owner:</span> {hostel.ownerName }</p>
                  <p>
                    <span className="font-medium">Location:</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {hostel.city}, {hostel.province}, {hostel.country}
                    </span>
                  </p>
                  <p><span className="font-medium">Zip Code:</span> {hostel.zipCode}</p>
                  <p><span className="font-medium">Address:</span> {hostel.address}</p>
                  <p><span className="font-medium">Hostel Type:</span> {hostel.type}</p>
                  <p><span className="font-medium">Category:</span> {hostel.category}</p>
                  <p><span className="font-medium">CNIC:</span> {hostel.cnic}</p>
                  <p><span className="font-medium">Phone:</span> {hostel.phone}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Facilities</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {hostel.facilities.map((facility, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {index + 1}) {facility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{hostel.description || 'No description provided.'}</p>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="space-y-6">
              <h4 className="font-semibold mb-4">Hostel Images</h4>
              <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                  {[hostel.hostelImage].map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-video items-center justify-center p-6">
                            <Image
                              src={`data:image/jpeg;base64,${hostel.hostelImage}`}
                              width={800}
                              height={600}
                              className="object-cover rounded-lg"
                              unoptimized
                              alt="hostel image"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </TabsContent>

          <TabsContent value="bills">
  <div className="space-y-6">
    <h4 className="font-semibold mb-4">Bills & Documents</h4>
    <div className="grid md:grid-cols-2 gap-6">
      {/* Electricity Bill */}
      <Card>
        <CardContent className="p-6">
          <h5 className="font-medium mb-4">Electricity Bill</h5>
          <Image
            src={`data:image/jpeg;base64,${hostel.electercityBill}`}
            width={800}
            height={600}
            className="object-cover rounded-lg"
            unoptimized
            alt="Electricity bill image"
          />
          <a
            href={`data:image/jpeg;base64,${hostel.electercityBill}`}
            download="electricity-bill.jpg"
          >
            <Button className="w-full mt-4" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Electricity Bill
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Gas Bill */}
      <Card>
        <CardContent className="p-6">
          <h5 className="font-medium mb-4">Gas Bill</h5>
          <Image
            src={`data:image/jpeg;base64,${hostel.gasBill}`}
            width={800}
            height={600}
            className="object-cover rounded-lg"
            unoptimized
            alt="Gas bill image"
          />
          <a href={`data:image/jpeg;base64,${hostel.gasBill}`} download="gas-bill.jpg">
            <Button className="w-full mt-4" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Gas Bill
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  </div>
</TabsContent>

        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 p-4 bg-gray-50">
        <Button variant="destructive" onClick={onReject}>
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
        description: `The hostel has been ${status.toLowerCase()} successfully`,
        variant: "default"
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">New Hostel Requests</h1>
      {pendingHostels.length === 0 ? (
        <p className="text-center text-gray-500">
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

export default NewRequests;