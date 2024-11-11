"use client";

import { createHostel } from "@/actions/admin/createHostel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { HostelType } from "@prisma/client";
import { Image as ImageIcon, Plus, Trash2, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";

interface RoomDetail {
  id: number;
  bedCount: number;
  numberOfRooms: number;
  price: number;
}

interface HostelFormData {
  hostelImage: File | null;
  hostelName: string;
  ownerId: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  type: HostelType;
  cnic: string;
  phone: string;
  description: string;
}

interface RoomFormData {
  roomDetails: RoomDetail[];
}

interface FacilitiesData {
  [key: string]: boolean;
}

interface ImageUploadData {
  roomImages: File[] | null;
}

export default function HostelRegistrationForm() {
  const { user } = useAuth();
  const userId = user?.id as string;
  const [step, setStep] = useState(1);
  const [imageUploadData, setImageUploadData] = useState<ImageUploadData>({
    roomImages: [],
  });

  const [hostelImage, setHostelImage] = useState<File | null>(null);

  const [hostelData, setHostelData] = useState<HostelFormData>({
    hostelImage: null,
    hostelName: "",
    ownerId: userId,
    country: "",
    province: "",
    city: "",
    zipCode: "",
    type: HostelType.MALE,
    cnic: "",
    description: "",
    phone: "",
  });

  const [rooms, setRooms] = useState<RoomDetail[]>([
    { id: 1, bedCount: 1, numberOfRooms: 1, price: 0 },
  ]);

  const [roomData, setRoomData] = useState<RoomFormData>({
    roomDetails: rooms,
  });

  const [facilitiesData, setFacilitiesData] = useState<FacilitiesData>({
    security: false,
    internet: false,
    electricity24_7: false,
    mattressAvailable: false,
    cleanWater: false,
    geyser: false,
    iron: false,
    library: false,
    balcony: false,
    terrace: false,
    meals3Times: false,
    laundry: false,
    playground: false,
    roomCleaning: false,
    smokingZone: false,
    airConditioning: false,
    freeWiFi: false,
    breakfastIncluded: false,
    linenIncluded: false,
    towelsIncluded: false,
    freeCityMaps: false,
    hotShowers: false,
    security24Hours: false,
    keyCardAccess: false,
    luggageStorage: false,
    lockers: false,
    commonRoom: false,
    swimmingPool: false,
    bar: false,
    poolTable: false,
    kitchen: false,
    cooker: false,
    vendingMachines: false,
    washingMachine: false,
    readingLight: false,
  });


  const handleHostelInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHostelData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleHostelSelectChange = (
    name: keyof HostelFormData,
    value: string
  ) => {
    setHostelData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setFacilitiesData((prev) => ({ ...prev, [facility]: checked }));
  };

  const handleImageUpload = (file: File, type: "logo" | "roomImages") => {
    if (type === "logo") {
      setHostelImage(file);
      setHostelData((prevData) => ({ ...prevData, hostelImage: file }));
    } else {
      setImageUploadData((prev) => ({
        ...prev,
        roomImages: [...(prev.roomImages || []), file],
      }));
    }
  };

  const handleRemoveImage = (type: "logo" | "roomImages", index?: number) => {
    setImageUploadData((prev) => {
      if (type === "roomImages" && typeof index === "number") {
        return {
          ...prev,
          roomImages: (prev.roomImages || []).filter((_, i) => i !== index),
        };
      } else {
        return {
          ...prev,
          [type]: null,
        };
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      const selectedFacilities = Object.entries(facilitiesData)
        .filter(([_, value]) => value)
        .reduce((acc, [key]) => ({ ...acc, [key]: true }), {});

      const formData = new FormData();
      formData.append(
        "hostelData",
        JSON.stringify({ ...hostelData, ownerId: userId })
      );
      formData.append("roomData", JSON.stringify(roomData));
      formData.append("facilitiesData", JSON.stringify(selectedFacilities));
      imageUploadData.roomImages &&
        imageUploadData.roomImages.forEach((image) =>
          formData.append("roomImages", image)
        );

      const response = await createHostel(formData, userId);
      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: response.message,
          variant: "default",
        });
      }
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const logoDropzone = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], "logo"),
  });

  const hostelImagesDropzone = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0], "roomImages"),
    multiple: true,
  });

  const renderHostelRegistrationStep = () => (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='logo'>Hostel Image or Logo</Label>
        <div
          {...logoDropzone.getRootProps()}
          className='mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors'
        >
          <input {...logoDropzone.getInputProps()} />
          {hostelImage ? (
            <div className='flex items-center justify-center'>
              <Avatar className='w-20 h-20'>
                <AvatarImage
                  src={URL.createObjectURL(hostelImage)}
                  alt='Logo'
                />
                <AvatarFallback>Logo</AvatarFallback>
              </Avatar>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='ml-2'
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage("logo");
                }}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ) : (
            <div>
              <p className='mb-2'>
                Drag & drop your image here, or choose an option:
              </p>
              <div className='flex justify-center space-x-4'>
                <Button
                  type='button'
                  onClick={() =>
                    document.getElementById("logo-upload")?.click()
                  }
                >
                  Upload
                </Button>
              </div>
              <input
                required
                id='logo-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  if (e.target.files)
                    handleImageUpload(e.target.files[0], "logo");
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor='hostelName'>Hostel Name</Label>
        <Input
          id='hostelName'
          name='hostelName'
          value={hostelData.hostelName}
          onChange={handleHostelInputChange}
          required
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='country'>Country</Label>
          <Select
            name='country'
            onValueChange={(value) =>
              handleHostelSelectChange("country", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select country' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pakistan'>Pakistan</SelectItem>
              <SelectItem value='india'>India</SelectItem>
              <SelectItem value='bangladesh'>Bangladesh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='province'>Province</Label>
          <Input
            id='province'
            name='province'
            value={hostelData.province}
            onChange={handleHostelInputChange}
            required
            placeholder='Enter province'
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='city'>City</Label>
          <Input
            id='city'
            name='city'
            value={hostelData.city}
            onChange={handleHostelInputChange}
            required
          />
        </div>

        <div>
          <Label htmlFor='zipCode'>Zip/Postal Code</Label>
          <Input
            type='number'
            min={1}
            max={99999}
            id='zipCode'
            name='zipCode'
            value={hostelData.zipCode}
            onChange={handleHostelInputChange}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor='hostelType'>Hostel Type</Label>
        <Select
          name='hostelType'
          onValueChange={(value) => handleHostelSelectChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select hostel type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={HostelType.MALE}>Male</SelectItem>
            <SelectItem value={HostelType.FEMALE}>Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor='cnic'>CNIC Number</Label>
        <Input
          type='number'
          min={1}
          max={9999999999999}
          id='cnic'
          name='cnic'
          value={hostelData.cnic}
          onChange={handleHostelInputChange}
          required
          placeholder='1234567890123'
        />
      </div>

      <div>
        <Label htmlFor='phone'>Phone Number</Label>
        <Input
          id='phone'
          name='phone'
          type='tel'
          value={hostelData.phone}
          onChange={handleHostelInputChange}
          required
          placeholder='+92 XXX XXXXXXX'
        />
      </div>

      <div>
        <Label htmlFor='description'>Hostel Description</Label>
        <Textarea
          id='description'
          name='description'
          value={hostelData.description}
          onChange={handleHostelInputChange}
          rows={4}
        />
      </div>
    </div>
  );

  const renderRoomDetailsStep = () => (
    <div className='space-y-6'>
      {rooms.map((room) => (
        <div
          key={room.id}
          className='p-4 border rounded-lg space-y-4'
        >
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>Room {room.id}</h3>
            {rooms.length > 1 && (
              <Button
                variant='destructive'
                size='icon'
                onClick={() => removeRoom(room.id)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            )}
          </div>
          <div className='grid grid-cols-1 gap-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor={`numberOfRooms-${room.id}`}>Room Number</Label>
                <Input
                  id={`numberOfRooms-${room.id}`}
                  type='number'
                  min='1'
                  value={room.numberOfRooms}
                  onChange={(e) =>
                    updateRoom(
                      room.id,
                      "numberOfRooms",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor={`bedCount-${room.id}`}>Number of Beds</Label>
                <Select
                  value={room.bedCount.toString()}
                  onValueChange={(value) =>
                    updateRoom(room.id, "bedCount", parseInt(value))
                  }
                >
                  <SelectTrigger id={`bedCount-${room.id}`}>
                    <SelectValue placeholder='Select bed count' />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                      <SelectItem
                        key={count}
                        value={count.toString()}
                      >
                        {count} {count === 1 ? "Bed" : "Beds"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`price-${room.id}`}>Price per Bed</Label>
                <Input
                  id={`price-${room.id}`}
                  type='number'
                  min='0'
                  value={room.price}
                  onChange={(e) =>
                    updateRoom(room.id, "price", parseInt(e.target.value))
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor='roomImages'>Room Images</Label>
              <div
                {...hostelImagesDropzone.getRootProps()}
                className='mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors'
              >
                <input {...hostelImagesDropzone.getInputProps()} />
                <p className='mb-2'>
                  Drag & drop room images here, or choose an option:
                </p>
                <div className='flex justify-center space-x-4'>
                  <Button
                    type='button'
                    onClick={() =>
                      document.getElementById("hostel-images-upload")?.click()
                    }
                  >
                    Upload from Device
                  </Button>
                </div>
                <input
                  id='hostel-images-upload'
                  type='file'
                  accept='image/*'
                  multiple
                  className='hidden'
                  onChange={(e) => {
                    if (e.target.files)
                      handleImageUpload(
                        e.target.files[0],
                        "roomImages"
                      );
                  }}
                />
              </div>
              {imageUploadData.roomImages &&
                imageUploadData.roomImages.length > 0 && (
                  <div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                    {imageUploadData.roomImages.map((file, index) => (
                      <div
                        key={index}
                        className='relative'
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Hostel ${index + 1}`}
                          className='w-full h-32 object-cover rounded-md'
                        />
                        <Button
                          type='button'
                          variant='destructive'
                          size='sm'
                          className='absolute top-1 right-1'
                          onClick={() => handleRemoveImage("roomImages", index)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}
      <Button
        type='button'
        onClick={addRoom}
        className='w-full'
      >
        <Plus className='mr-2 h-4 w-4' /> Add More Rooms
      </Button>
    </div>
  );

  const renderFacilitiesStep = () => (
    <Card className='w-full'>
      <CardContent className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>Facilities</h3>
        <p className='text-sm text-muted-foreground mb-6'>
          Select the facilities available at your hostel.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {Object.entries(facilitiesData).map(([key, value]) => (
            <div
              key={key}
              className='flex items-center space-x-2'
            >
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) =>
                  handleFacilityChange(key, checked as boolean)
                }
                className='peer'
              />
              <Label
                htmlFor={key}
                className='peer-hover:text-primary transition-all duration-200 ease-in-out peer-checked:font-bold'
              >
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderSummaryStep = () => (
    <Card className='w-full'>
      <CardContent className='p-6'>
        <h3 className='text-2xl font-bold mb-6 text-center'>Summary</h3>
        <div className='flex justify-center mb-6'>
          {hostelImage ? (
            <Avatar className='w-32 h-32'>
              <AvatarImage
                src={URL.createObjectURL(hostelImage)}
                alt='Hostel Logo'
              />
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
          ) : (
            <div className='w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center'>
              <ImageIcon className='w-16 h-16 text-gray-400' />
            </div>
          )}
        </div>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-semibold mb-4'>Uploaded Images</h4>
            {imageUploadData.roomImages &&
            imageUploadData.roomImages.length > 0 ? (
              <Carousel className='w-full max-w-xs mx-auto'>
                <CarouselContent>
                  {imageUploadData.roomImages.map((file, index) => (
                    <CarouselItem key={index}>
                      <div className='p-1'>
                        <div className='flex aspect-square items-center justify-center p-6'>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Hostel ${index + 1}`}
                            className='w-full h-full object-cover rounded-md'
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <p className='text-muted-foreground'>No images uploaded</p>
            )}
          </div>
          <div className='space-y-6'>
            <div>
              <h4 className='font-semibold mb-2'>Hostel Information</h4>
              <p>
                <span className='font-medium'>Name:</span>{" "}
                {hostelData.hostelName}
              </p>
              <p>
                <span className='font-medium'>Owner:</span> {hostelData.ownerId}
              </p>
              <p>
                <span className='font-medium'>Phone:</span> {hostelData.phone}
              </p>
              <p>
                <span className='font-medium'>Location:</span> {hostelData.city}
                , {hostelData.province}, {hostelData.country}
              </p>
              <p>
                <span className='font-medium'>Zip Code:</span>{" "}
                {hostelData.zipCode}
              </p>
              <p>
                <span className='font-medium'>Hostel Type:</span>{" "}
                {hostelData.type}
              </p>
              <p>
                <span className='font-medium'>CNIC:</span> {hostelData.cnic}
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Room Information</h4>
              <p>
                <span className='font-medium'>Total Rooms:</span> {rooms.length}
              </p>
              <p>
                <span className='font-medium'>Total Beds:</span>{" "}
                {rooms.reduce(
                  (acc, room) => acc + room.numberOfRooms * room.bedCount,
                  0
                )}
              </p>
              <p>
                <span className='font-medium'>Room Types:</span>{" "}
                {[
                  ...Array.from(
                    new Set(rooms.map((room) => `${room.bedCount}-Bed`))
                  ),
                ].join(", ")}
              </p>
              {rooms.map((room) => (
                <p key={room.id}>
                  <span className='font-medium'>
                    {room.bedCount}-Bed Room Price:
                  </span>{" "}
                  ${room.price}
                </p>
              ))}
              <p>
                <span className='font-medium'>Payment Methods:</span>{" "}
                {/* Add your payment methods here */}
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Facilities</h4>
              <ul className='list-disc list-inside'>
                {Object.entries(facilitiesData)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <li key={key}>
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Description</h4>
              <p>{hostelData.description || "No description provided."}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const addRoom = () => {
    setRooms((prevRooms) => {
      const newRoom = {
        id: prevRooms.length + 1,
        bedCount: 1,
        numberOfRooms: 1,
        price: 0,
      };
      const updatedRooms = [...prevRooms, newRoom];
      setRoomData({ roomDetails: updatedRooms });
      return updatedRooms;
    });
  };

  const removeRoom = (id: number) => {
    setRooms((prevRooms) => {
      const updatedRooms = prevRooms.filter((room) => room.id !== id);
      setRoomData({ roomDetails: updatedRooms });
      return updatedRooms;
    });
  };

  const updateRoom = (id: number, field: keyof RoomDetail, value: number) => {
    setRooms((prevRooms) => {
      const updatedRooms = prevRooms.map((room) =>
        room.id === id ? { ...room, [field]: value } : room
      );
      setRoomData({ roomDetails: updatedRooms });
      return updatedRooms;
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow'
    >
      <h2 className='text-2xl font-bold text-center mb-6'>
        {step === 1
          ? "Hostel Registration"
          : step === 2
          ? "Room Details"
          : step === 3
          ? "Facilities"
          : "Summary"}
      </h2>

      {step === 1
        ? renderHostelRegistrationStep()
        : step === 2
        ? renderRoomDetailsStep()
        : step === 3
        ? renderFacilitiesStep()
        : renderSummaryStep()}

      <div className='flex justify-between gap-4'>
        {step > 1 && (
          <Button
            type='button'
            variant='outline'
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <Button
          type='submit'
          className={step === 1 ? "w-full" : "flex-1"}
        >
          {step === 4 ? "Request Registration" : "Continue"}
        </Button>
      </div>
    </form>
  );
}
