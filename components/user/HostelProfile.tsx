"use client";

import { useEffect, useState } from 'react'
import { Star, MapPin, ChevronLeft, ChevronRight, Calendar, CheckCircle, XCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import * as z from "zod"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Data } from '@react-google-maps/api';
import bookingRequest, { getComments, rating } from '@/actions/hostel/booking';
import { updateHostelLocation } from '@/actions/hostel/location';

interface HostelProfileProps {
  hostel?: {
    id: number;
    hostelName: string;
    rating: number;
    location: string;
    capacity: number;
    hostelImage: any;
    gasBill: any;
    city: string;
    country: string;
    electercityBill: any;
    description: string;
    facilities: string[];
    latitude: number;
    longitude: number;
    rooms: {
      name: string;
      bedCount: number;
      price: number;
      available: boolean;
      numberOfRooms: string;
      image: string;
    }[];
  };
}

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  cnic: z.string().regex(/^\d{13}$/, "CNIC must be 13 digits"),
  phone: z.string().regex(/^\+92\d{10}$/, "Phone number must be in the format +92xxxxxxxxxx"),
  checkInDate: z.date({
    required_error: "Check-in date is required",
  }),
  checkOutDate: z.date({
    required_error: "Check-out date is required",
  }),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface Room {
  id?: string;
  name: string;
  bedCount: number;
  price: number;
  available: boolean;
  numberOfRooms: string,
  image: string;
}

const feedbackFormSchema = z.object({
  rating: z.string().nonempty("Rating is required"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
});

type FeedbackFormData = z.infer<typeof feedbackFormSchema>;

export default function HostelProfile({ hostel }: HostelProfileProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [showCancellationDialog, setShowCancellationDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [finalFormData, setFinalFormData] = useState<any>(null);

  const { control, handleSubmit, getValues, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  const { control: feedbackControl, handleSubmit: handleFeedbackSubmit, formState: { errors: feedbackErrors } } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
  });

  const rooms: Room[] = hostel?.rooms || [];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length);
  };

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    if (selectedRoom?.available) {
      setShowBookingForm(true);
      setBookingStep(1);
    }
  };

  const onSubmit = (data: BookingFormData) => {

    const updatedData = {
      ...data,
      hostelId: hostel?.id,
      selectedRoomId: selectedRoom?.id,
    };

    console.log("Updated Data:", updatedData);
    setFinalFormData(updatedData);
    setBookingStep(2);

  };

  const handleBack = () => {
    setBookingStep(1);
  };

  const handleConfirmBooking = async () => {
    const checkInDate = getValues().checkInDate;
    const checkOutDate = getValues().checkOutDate;
    const numberOfDays = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
    const adjustedPrice = selectedRoom && selectedRoom.price ? (selectedRoom.price / 30) * numberOfDays : 0;

    const updatedData = {
      ...finalFormData,
      adjustedPrice,
    };
    console.log(updatedData);

    const res: any = await bookingRequest(updatedData);
    if (res.status == 200) {
      toast({
        title: "Booking Request Sent",
        description: res.message,
        variant: "default"
      });
    } else {
      toast({
        title: "Booking Request Sent",
        description: res.message,
        variant: "destructive"
      });
    }

    setShowBookingForm(false);
    setBookingStep(1);
  };

  const handleCancelBooking = () => {
    setShowCancellationDialog(true);
  };

  const handleConfirmCancellation = () => {
    console.log("Booking cancelled. Reason:", cancellationReason);
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been successfully cancelled.",
      variant: "destructive",
    });
    setShowCancellationDialog(false);
    setShowBookingForm(false);
    setBookingStep(1);
    setCancellationReason("");
  };

  const onSubmitFeedback = async (data: FeedbackFormData) => {
    // Replace with your feedback submission logic
    const curHostelID = hostel?.id ?? 0;
    const res = await rating(curHostelID, data);
    toast({
      title: "Feedback Submitted",
      description: res.message,
      variant: "default",
    });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places']
  });

  const [comments, setComments] = useState<any[]>([]);
  var hostelRating = 0;
  var iterator = 1; 
  var totalRatings = 0;
  useEffect(() => {
    const curHostelID = hostel?.id ?? 0;
    async function fetchStats() {
      const data = await getComments(curHostelID);
      if (data) {
        setComments(data);
      }
    comments.map((rat: any) =>{
      totalRatings += rat.rating
      iterator++;
    })
    hostelRating = totalRatings/iterator;
  }

    fetchStats();
  }, []);

  const [latitude, setLatitude] = useState(hostel?.latitude ?? 0); // State for latitude
  const [longitude, setLongitude] = useState(hostel?.longitude ?? 0); // State for longitude
  const lat = 0;
  const lg = 0;
  const address = hostel?.city;


  if (!hostel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">Hostel Not Found</h1>
            <p>Sorry, we couldn't find the hostel you're looking for.</p>
            <Link href="/" className="mt-4 inline-block">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Image Gallery */}
        <div className="relative mb-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 relative aspect-[4/3]">
              <Image
                src={`data:image/jpeg;base64,${hostel.hostelImage}`}
                alt="Hostel lounge"
                className="rounded-l-xl object-cover"
                fill
              />
            </div>
          </div>
        </div>

        {/* Hostel Info */}
        <div>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{hostel.hostelName}</h1>
              <p className="text-muted-foreground mt-2">{hostel.city}, {hostel.country}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-1">
                <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                <span className="font-bold">{hostel.rating}</span>
              </div>
              <div className="text-sm text-muted-foreground">Rating {hostelRating}</div>
            </div>
          </div>

          {/* Facilities */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.facilities.map((facility, index) => (
                  <span key={index}>{facility}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="rooms" className="mb-6">
            <TabsList>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="rooms" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {rooms.map((room, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="relative aspect-video">
                              <Image src={`data:image/jpeg;base64,${room.image}`} alt={room.name} fill className="rounded-lg object-cover" />
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2"
                                onClick={prevImage}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={nextImage}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex flex-col justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {room.bedCount === 1 ? 'Private room' : 'Shared room'} • {room.bedCount} bed{room.bedCount > 1 ? 's' : ''}
                                </p>
                                <p className="font-semibold text-lg mb-2">PKR {room.price.toLocaleString()} per bed/month</p>
                                <Badge variant={(room.available) && (room.numberOfRooms != '0') ? "default" : "destructive"} className="mb-2">
                                  {(room.available) && (room.numberOfRooms != '0') ? (
                                    <><CheckCircle className="w-4 h-4 mr-1" /> Available</>
                                  ) : (
                                    <><XCircle className="w-4 h-4 mr-1" /> Not Available</>
                                  )}
                                </Badge>
                              </div>
                              <Button
                                className="w-full md:w-auto"
                                onClick={() => handleBookNow(room)}
                                disabled={false}
                              >
                                {(room.available) && (room.numberOfRooms != '0') ? "Book Now" : "Not Available"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Form */}
                {showBookingForm && selectedRoom && (
                  <Card className="sticky top-6">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Book {selectedRoom.name}</h2>
                      {bookingStep === 1 ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Controller
                              name="name"
                              control={control}
                              render={({ field }) => <Input {...field} />}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                          </div>
                          <div>
                            <Label htmlFor="address">Address</Label>
                            <Controller
                              name="address"
                              control={control}
                              render={({ field }) => <Input {...field} />}
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                          </div>
                          <div>
                            <Label htmlFor="cnic">CNIC Number</Label>
                            <Controller
                              name="cnic"
                              control={control}
                              render={({ field }) => <Input {...field} placeholder="13 digits without spaces" />}
                            />
                            {errors.cnic && <p className="text-red-500 text-sm mt-1">{errors.cnic.message}</p>}
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Controller
                              name="phone"
                              control={control}
                              render={({ field }) => <Input {...field} placeholder="+92xxxxxxxxxx" />}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                          </div>
                          <div>
                            <Label htmlFor="checkInDate">Check-in Date</Label>
                            <Controller
                              name="checkInDate"
                              control={control}
                              render={({ field }) => (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                        }`}
                                    >
                                      <Calendar className="mr-2 h-4 w-4" />
                                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                            {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate.message}</p>}
                          </div>
                          <div>
                            <Label htmlFor="checkOutDate">Check-out Date</Label>
                            <Controller
                              name="checkOutDate"
                              control={control}
                              render={({ field }) => (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                        }`}
                                    >
                                      <Calendar className="mr-2 h-4 w-4" />
                                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                            {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate.message}</p>}
                          </div>
                          <Button type="submit">Continue to Summary</Button>
                        </form>
                      ) : (
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold">Booking Summary</h3>
                          <div>
                            <p><strong>Name:</strong> {getValues().name}</p>
                            <p><strong>Address:</strong> {getValues().address}</p>
                            <p><strong>CNIC:</strong> {getValues().cnic}</p>
                            <p><strong>Phone:</strong> {getValues().phone}</p>
                            <p><strong>Check-in Date:</strong> {getValues().checkInDate ? format(getValues().checkInDate, "PPP") : 'Not selected'}</p>
                            <p><strong>Check-out Date:</strong> {getValues().checkOutDate ? format(getValues().checkOutDate, "PPP") : 'Not selected'}</p>
                            <p><strong>Room:</strong> {selectedRoom.numberOfRooms}</p>
                            <p><strong>Price:</strong> PKR {selectedRoom.price.toLocaleString()} per bed/month</p>
                            {getValues().checkInDate && getValues().checkOutDate && (
                              <p>
                                <strong>Total Price:</strong> PKR {((selectedRoom.price / 30) * ((getValues().checkOutDate.getTime() - getValues().checkInDate.getTime()) / (1000 * 60 * 60 * 24))).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button onClick={handleConfirmBooking}>Request Booking</Button>
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                            <Button variant="destructive" onClick={handleCancelBooking}>Cancel Booking</Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-6">
              <div className='space-y-6'>
                <div>
                  <Label htmlFor='address'>Address</Label>
                </div>
                {/* <div style={{ height: '400px', width: '100%' }}>
          <GoogleMap
            center={{ lat: latitude, lng: longitude }}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              restriction: {
                latLngBounds: {
                  north: 37.084107,
                  south: 23.6345,
                  west: 60.872955,
                  east: 77.840516
                },
                strictBounds: true
              }
            }}
            
          >
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </div> */}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6">

                    <div className="space-y-4">
                      {comments.map((comment, index) => (
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="font-semibold">{comment.userName}</div>
                            <div className="text-sm text-muted-foreground">{timeAgo(comment.createdAt)}</div>
                            <div className="text-sm text-muted-foreground">Rating: {comment.rating}</div>
                          </div>
                          <p className="text-sm">{comment.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Feedback and Rating Section */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">Leave Your Feedback</h3>
                      <form onSubmit={handleFeedbackSubmit(onSubmitFeedback)} className="space-y-4">
                        <div>
                          <Label htmlFor="rating">Rating</Label>
                          <Controller
                            name="rating"
                            control={feedbackControl}
                            render={({ field }) => (
                              <select {...field} id="rating" className="w-full mt-1 rounded-md border-gray-300">
                                <option value="0">Select Rating</option>
                                <option value="5">5 - Excellent</option>
                                <option value="4">4 - Very Good</option>
                                <option value="3">3 - Average</option>
                                <option value="2">2 - Poor</option>
                                <option value="1">1 - Terrible</option>
                              </select>
                            )}
                          />
                          {feedbackErrors.rating && <p className="text-red-500 text-sm mt-1">{feedbackErrors.rating.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="feedback">Your Feedback</Label>
                          <Controller
                            name="feedback"
                            control={feedbackControl}
                            render={({ field }) => <Textarea {...field} id="feedback" placeholder="Share your experience..." className="mt-1" />}
                          />
                          {feedbackErrors.feedback && <p className="text-red-500 text-sm mt-1">{feedbackErrors.feedback.message}</p>}
                        </div>
                        <Button type="submit">Submit Review</Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Cancellation Dialog */}
        <Dialog open={showCancellationDialog} onOpenChange={setShowCancellationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Booking</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your booking? Please provide a reason for cancellation.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Reason for cancellation"
              className="mt-4"
            />
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowCancellationDialog(false)}>
                Keep Booking
              </Button>
              <Button variant="destructive" onClick={handleConfirmCancellation}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}


function timeAgo(createdAt: Date | string | number): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diff = now.getTime() - createdDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}

