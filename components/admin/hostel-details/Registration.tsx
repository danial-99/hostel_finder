'use client'

import { useState, useEffect } from "react"
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { HostelType, Category } from "@prisma/client"
import { X, Camera, Upload, MapPin } from 'lucide-react'
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import router from "next/router"
import { createHostel } from "@/actions/admin/createHostel"

const formSchema = z.object({
  hostelName: z.string().min(1, "Hostel name is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  country: z.string().min(1, "Country is required"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  address: z.string().min(1, "Address is required"),
  type: z.nativeEnum(HostelType),
  category: z.nativeEnum(Category),
  cnic: z.string().regex(/^\d{13}$/, "CNIC must be 13 digits"),
  phone: z.string().regex(/^\+92\d{10}$/, "Phone number must be in format +92XXXXXXXXXX"),
  description: z.string().optional(),
  hostelImages: z.array(z.instanceof(File)).min(1, "At least one hostel image is required"),
  rooms: z.array(z.object({
    bedCount: z.number().min(1).max(4),
    numberOfRooms: z.number().min(0, "Number of rooms must be at least 0"),
    price: z.number().min(0, "Price must be at least 0"),
    image: z.instanceof(File).optional().nullable()
  })).min(1, "At least one room type must be added"),
  facilities: z.record(z.boolean()),
  electricityBill: z.instanceof(File).optional().nullable(),
  gasBill: z.instanceof(File).optional().nullable(),
  latitude: z.number(),
  longitude: z.number()
})

type FormData = z.infer<typeof formSchema>

const pakistanCenter = { lat: 30.3753, lng: 69.3451 }

export default function HostelRegistrationForm() {
  const { user } = useAuth()
  const userId = user?.id as string
  const [step, setStep] = useState(1)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places']
  })

  const { register, control, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostelImages: [],
      rooms: [
        { bedCount: 1, numberOfRooms: 0, price: 0, image: null },
        { bedCount: 2, numberOfRooms: 0, price: 0, image: null },
        { bedCount: 3, numberOfRooms: 0, price: 0, image: null },
        { bedCount: 4, numberOfRooms: 0, price: 0, image: null }
      ],
      facilities: {},
      latitude: pakistanCenter.lat,
      longitude: pakistanCenter.lng
    },
    mode: 'onChange'
  })

  const { fields, update, remove } = useFieldArray({
    control,
    name: "rooms"
  })

  const [facilitiesData, setFacilitiesData] = useState<Record<string, boolean>>({
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
    towelsIncluded: false,
    freeCityMaps: false,
    hotShowers: false,
    security24Hours: false,
    keyCardAccess: false,
    luggageStorage: false,
    lockers: false,
    commonRoom: false,
    swimmingPool: false,
    cupboards: false,
    poolTable: false,
    kitchen: false,
    cooker: false,
    vendingMachines: false,
    washingMachine: false,
    readingLight: false,
    UPS: false,
  })

  const onSubmit = async (data: FormData) => {
    if (step < 6) {
      setStep(prev => prev + 1)
    } else {
      const selectedFacilities = Object.entries(facilitiesData)
    .filter(([_, value]) => value)
    .reduce((acc, [key]) => ({ ...acc, [key]: true }), {});

  const formData = new FormData();
  formData.append("facilitiesData", JSON.stringify(selectedFacilities));
  formData.append('hostelData', JSON.stringify(data));

  const gasBillFile = data.gasBill; // Assuming fileInput contains the file(s)
    if (gasBillFile) {
      const file = gasBillFile; // Assuming you only send one file
      const buffer = await fileToBuffer(file); // Convert file to buffer
      if(buffer){
        const base64File = buffer.toString('base64'); // Convert buffer to Base64
        formData.append("gasBill", base64File); // Append Base64 encoded file to formData
      }
      
    }
  const electricityBillFile = data.electricityBill; // Assuming fileInput contains the file(s)
  if (electricityBillFile) {
    const file = electricityBillFile; // Assuming you only send one file
    const buffer = await fileToBuffer(file); // Convert file to buffer
    const base64File = buffer.toString('base64'); // Convert buffer to Base64
    formData.append("hostelImages", base64File); // Append Base64 encoded file to formData
  }

  const hostelImagesFile = data.hostelImages; // Assuming fileInput contains the file(s)
  if (hostelImagesFile) {
    const file = hostelImagesFile[0]; // Assuming you only send one file
    const buffer = await fileToBuffer(file); // Convert file to buffer
    const base64File = buffer.toString('base64'); // Convert buffer to Base64
    formData.append("electricityBill", base64File); // Append Base64 encoded file to formData
  }


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
    router.push("/admin/dashboard");
  }
}
  }


  const fileToBuffer = (file: File) => {
    return new Promise<Buffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(Buffer.from(reader.result));
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };


  const handleContinue = () => {
    if (isValid) {
      setStep(prev => Math.min(6, prev + 1))
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      })
    }
  }

  const handleBack = () => setStep(prev => Math.max(1, prev - 1))

  const hostelImagesDropzone = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      const currentImages = watch('hostelImages') || []
      setValue('hostelImages', [...currentImages, ...acceptedFiles], { shouldValidate: true })
    }
  })

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setFacilitiesData(prev => ({ ...prev, [facility]: checked }))
    setValue(`facilities.${facility}`, checked, { shouldValidate: true })
  }

  useEffect(() => {
    Object.entries(facilitiesData).forEach(([key, value]) => {
      setValue(`facilities.${key}`, value, { shouldValidate: true })
    })
  }, [facilitiesData, setValue])

  const renderPersonalDetails = () => (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='hostelImages'>Hostel Images</Label>
        <div {...hostelImagesDropzone.getRootProps()} className='mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors'>
          <input {...hostelImagesDropzone.getInputProps()} />
          <div>
            <p className='mb-2'>Drag & drop your images here, or click to select</p>
            <Button type='button'>Upload Images</Button>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-3 gap-4'>
          {watch('hostelImages')?.map((file, index) => (
            <div key={index} className='relative'>
              <Image src={URL.createObjectURL(file)} alt={`Hostel Image ${index + 1}`} width={100} height={100} className='object-cover rounded-md' />
              <Button
                type='button'
                variant='destructive'
                size='icon'
                className='absolute top-0 right-0'
                onClick={() => {
                  const currentImages = watch('hostelImages') || []
                  setValue(
                    'hostelImages',
                    currentImages.filter((_, i) => i !== index),
                    { shouldValidate: true }
                  )
                }}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </div>
        {errors.hostelImages && <p className='text-red-500'>{errors.hostelImages.message}</p>}
      </div>

      <div>
        <Label htmlFor='hostelName'>Hostel Name</Label>
        <Input id='hostelName' {...register('hostelName')} />
        {errors.hostelName && <p className='text-red-500'>{errors.hostelName.message}</p>}
      </div>

      <div>
        <Label htmlFor='ownerName'>Owner Name</Label>
        <Input id='ownerName' {...register('ownerName')} />
        {errors.ownerName && <p className='text-red-500'>{errors.ownerName.message}</p>}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='country'>Country</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select country' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='pakistan'>Pakistan</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && <p className='text-red-500'>{errors.country.message}</p>}
        </div>

        <div>
          <Label htmlFor='province'>Province</Label>
          <Controller
            name="province"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Province' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Punjab'>Punjab</SelectItem>
                  <SelectItem value='Sindh'>Sindh</SelectItem>
                  <SelectItem value='Balochistan'>Balochistan</SelectItem>
                  <SelectItem value='KPK'>KPK</SelectItem>
                  <SelectItem value='GB'>Gilgit Baltistan</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.province && <p className='text-red-500'>{errors.province.message}</p>}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='city'>City</Label>
          <Input id='city' {...register('city')} />
          {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
        </div>

        <div>
          <Label htmlFor='zipCode'>Zip/Postal Code</Label>
          <Input id='zipCode' {...register('zipCode')} />
          {errors.zipCode && <p className='text-red-500'>{errors.zipCode.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor='address'>Address</Label>
        <Input id='address' {...register('address')} />
        {errors.address && <p className='text-red-500'>{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor='hostelType'>Hostel Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select hostel type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={HostelType.MALE}>Male</SelectItem>
                  <SelectItem value={HostelType.FEMALE}>Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && <p className='text-red-500'>{errors.type.message}</p>}
        </div>

        <div>
          <Label htmlFor='category'>Hostel Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select hostel category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Category.STUDENT}>Students</SelectItem>
                  <SelectItem value={Category.PROFESSIONAL}>Professionals</SelectItem>
                  <SelectItem value={Category.FAMILY}>Family</SelectItem>
                  <SelectItem value={Category.OTHER}>Others</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor='cnic'>CNIC Number</Label>
        <Input id='cnic' {...register('cnic')} placeholder='1234567890123' />
        {errors.cnic && <p className='text-red-500'>{errors.cnic.message}</p>}
      </div>

      <div>
        <Label htmlFor='phone'>Phone Number</Label>
        <Input id='phone' {...register('phone')} placeholder='+92XXXXXXXXXX' />
        {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor='description'>Hostel Description</Label>
        <Textarea id='description' {...register('description')} rows={4} />
        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
      </div>
    </div>
  )

  const renderRoomDetails = () => (
    <div className='space-y-6'>
      {fields.map((field, index) => (
        <Card key={field.id} className='p-4'>
          <CardContent className='space-y-4'>
            <h3 className='text-lg font-semibold'>{field.bedCount} Bed Room</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor={`rooms.${index}.numberOfRooms`}>Number of Rooms</Label>
                <Input
                  id={`rooms.${index}.numberOfRooms`}
                  type='number'
                  min={0}
                  {...register(`rooms.${index}.numberOfRooms` as const, { 
                    valueAsNumber: true,
                    min: 0
                  })}
                />
                {errors.rooms?.[index]?.numberOfRooms && <p className='text-red-500'>{errors.rooms[index]?.numberOfRooms?.message}</p>}
              </div>
              <div>
                <Label htmlFor={`rooms.${index}.price`}>Price per Bed</Label>
                <Input
                  id={`rooms.${index}.price`}
                  type='number'
                  min={0}
                  {...register(`rooms.${index}.price` as const, { 
                    valueAsNumber: true,
                    min: 0
                  })}
                />
                {errors.rooms?.[index]?.price && <p className='text-red-500'>{errors.rooms[index]?.price?.message}</p>}
              </div>
            </div>
            <div>
              <div style={{display: "none"}}>
              <Label>Room Image</Label>
              <div className='mt-2 flex items-center d-none space-x-4'>
                <Input
                  type='file'
                  accept='image/*'
                  onChange={e => {
                    const files = e.target.files
                    if (files && files[0]) {
                      setValue(`rooms.${index}.image`, files[0], { shouldValidate: true })
                    }
                  }}
                  className='hidden'
                  id={`room-image-${index}`}
                />
                <Button type='button' onClick={() => document.getElementById(`room-image-${index}`)?.click()}>
                  <Upload className='mr-2 h-4 w-4' /> Upload Image
                </Button>
                <Button type='button' variant='outline'>
                  <Camera className='mr-2 h-4 w-4' /> Take Photo
                </Button>
              </div>
              </div>
              <div className='mt-4'>
                {watch(`rooms.${index}.image`) && (
                  <div className='relative'>
                    {watch(`rooms.${index}.image`) instanceof File && (
                      <Image 
                        src={URL.createObjectURL(watch(`rooms.${index}.image`)!)} // Non-null assertion
                        alt={`${field.bedCount} Bed Room Image`} 
                        width={100} 
                        height={100} 
                        className='object-cover rounded-md' 
                      />
                    )
                    }
                    <Button
                      type='button'
                      variant='destructive'
                      size='icon'
                      className='absolute top-0 right-0'
                      onClick={() => setValue(`rooms.${index}.image`, null, { shouldValidate: true })}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
  

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
  )

  const renderBillsUpload = () => (
    <div className='space-y-6'>
      <div>
        <Label htmlFor='electricityBill'>Electricity Bill</Label>
        <div className='mt-2 flex items-center space-x-4'>
          <Input
            id='electricityBill'
            type='file'
            accept='image/*,application/pdf'
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) setValue('electricityBill', file, { shouldValidate: true })
            }}
            className='hidden'
          />
          <Button type='button' onClick={() => document.getElementById('electricityBill')?.click()}>
            <Upload className='mr-2 h-4 w-4' /> Upload File
          </Button>
          <Button type='button' variant='outline'>
            <Camera className='mr-2 h-4 w-4' /> Take Photo
          </Button>
        </div>
        {watch('electricityBill') && (
          <div className='mt-2 flex items-center justify-between'>
            <p>{watch('electricityBill')?.name}</p>
            <Button type='button' variant='destructive' size='sm' onClick={() => setValue('electricityBill', null, { shouldValidate: true })}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        )}
        {watch('electricityBill') && (
          <div className='mt-2'>
            {watch('electricityBill')?.type.startsWith('image/') ? (
              <Image src={URL.createObjectURL(watch('electricityBill') as File)} alt="Electricity Bill" width={200} height={200} className='object-contain' />
            ) : (
              <p>File uploaded: {watch('electricityBill')?.name}</p>
            )}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor='gasBill'>Gas Bill</Label>
        <div className='mt-2 flex items-center space-x-4'>
          <Input
            id='gasBill'
            type='file'
            accept='image/*,application/pdf'
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) setValue('gasBill', file, { shouldValidate: true })
            }}
            className='hidden'
          />
          <Button type='button' onClick={() => document.getElementById('gasBill')?.click()}>
            <Upload className='mr-2 h-4 w-4' /> Upload File
          </Button>
          <Button type='button' variant='outline'>
            <Camera className='mr-2 h-4 w-4' /> Take Photo
          </Button>
        </div>
        {watch('gasBill') && (
          <div className='mt-2 flex items-center justify-between'>
            <p>{watch('gasBill')?.name}</p>
            <Button type='button' variant='destructive' size='sm' onClick={() => setValue('gasBill', null, { shouldValidate: true })}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        )}
        {watch('gasBill') && (
          <div className='mt-2'>
            {watch('gasBill')?.type.startsWith('image/') ? (
              <Image src={URL.createObjectURL(watch('gasBill') as File)} alt="Gas Bill" width={200} height={200} className='object-contain' />
            ) : (
              <p>File uploaded: {watch('gasBill')?.name}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const renderLocationMap = () => {
    if (!isLoaded) return <div>Loading map...</div>

    return (
      <div className='space-y-6'>
        <div>
          <Label htmlFor='address'>Address</Label>
          <div className='flex items-center space-x-2'>
            <Input id='address' {...register('address')} />
            <Button type='button' onClick={() => {
              const geocoder = new google.maps.Geocoder()
              geocoder.geocode({ address: watch('address') }, (results, status) => {
                if (status === 'OK' && results?.[0]) {
                  const { lat, lng } = results[0].geometry.location
                  setValue('latitude', lat(), { shouldValidate: true })
                  setValue('longitude', lng(), { shouldValidate: true })
                }
              })
            }}>
              <MapPin className='mr-2 h-4 w-4' /> Locate
            </Button>
          </div>
        </div>
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMap
            center={{ lat: watch('latitude'), lng: watch('longitude') }}
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
            onClick={(e) => {
              if (e.latLng) {
                setValue('latitude', e.latLng.lat(), { shouldValidate: true })
                setValue('longitude', e.latLng.lng(), { shouldValidate: true })
              }
            }}
          >
            <Marker position={{ lat: watch('latitude'), lng: watch('longitude') }} />
          </GoogleMap>
        </div>
      </div>
    )
  }

  const renderSummary = () => (
    <Card className='w-full'>
      <CardContent className='p-6'>
        <h3 className='text-2xl font-bold mb-6 text-center'>Summary</h3>
        <Carousel className="w-full max-w-xs mx-auto mb-6">
          <CarouselContent>
            {watch('hostelImages')?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image src={URL.createObjectURL(image)} alt={`Hostel Image ${index + 1}`} width={200} height={200} className="object-cover" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-semibold mb-4'>Hostel Information</h4>
            <p><span className='font-medium'>Name:</span> {watch('hostelName')}</p>
            <p><span className='font-medium'>Owner:</span> {watch('ownerName')}</p>
            <p><span className='font-medium'>Location:</span> {watch('city')}, {watch('province')}, {watch('country')}</p>
            <p><span className='font-medium'>Zip Code:</span> {watch('zipCode')}</p>
            <p><span className='font-medium'>Address:</span> {watch('address')}</p>
            <p><span className='font-medium'>Hostel Type:</span> {watch('type')}</p>
            <p><span className='font-medium'>Category:</span> {watch('category')}</p>
            <p><span className='font-medium'>CNIC:</span> {watch('cnic')}</p>
            <p><span className='font-medium'>Phone:</span> {watch('phone')}</p>
          </div>
          <div>
            <h4 className='font-semibold mb-4'>Room Information</h4>
            {watch('rooms').map((room, index) => (
              room.numberOfRooms > 0 && (
                <div key={index} className='mb-4'>
                  <p><span className='font-medium'>{room.bedCount} Bed Room:</span> {room.numberOfRooms} room(s), ${room.price}/bed</p>
                  <div className='mt-2 grid grid-cols-3 gap-2'>
                    {room.image && 
                      <Image 
                        key={room.numberOfRooms}
                        src={URL.createObjectURL(room.image)}
                        alt={`${room.bedCount} Bed Room Image ${room.numberOfRooms + 1}`}
                        width={100}
                        height={100}
                        className='object-cover rounded-md'
                      />
                    }
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        <div className='mt-6'>
          <h4 className='font-semibold mb-2'>Facilities</h4>
          <ul className='list-disc list-inside grid grid-cols-2 gap-2'>
            {Object.entries(facilitiesData)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <li key={key}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </li>
              ))}
          </ul>
        </div>
        <div className='mt-6'>
          <h4 className='font-semibold mb-2'>Uploaded Bills</h4>
          {watch('electricityBill') && (
            <div className='mb-2'>
              <p>Electricity Bill: {watch('electricityBill')?.name}</p>
              {watch('electricityBill')?.type.startsWith('image/') && (
                <Image src={URL.createObjectURL(watch('electricityBill') as File)} alt="Electricity Bill" width={200} height={200} className='object-contain mt-2' />
              )}
            </div>
          )}
          {watch('gasBill') && (
            <div>
              <p>Gas Bill: {watch('gasBill')?.name}</p>
              {watch('gasBill')?.type.startsWith('image/') && (
                <Image src={URL.createObjectURL(watch('gasBill') as File)} alt="Gas Bill" width={200} height={200} className='object-contain mt-2' />
              )}
            </div>
          )}
        </div>
        <div className='mt-6'>
          <h4 className='font-semibold mb-2'>Location</h4>
          <p>Latitude: {watch('latitude')}</p>
          <p>Longitude: {watch('longitude')}</p>
        </div>
        <div className='mt-6'>
          <h4 className='font-semibold mb-2'>Description</h4>
          <p>{watch('description') || 'No description provided.'}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow'>
      <h2 className='text-2xl font-bold text-center mb-6'>
        {step === 1 ? "Personal Details" :
         step === 2 ? "Room Details" :
         step === 3 ? "Facilities" :
         step === 4 ? "Bills Upload" :
         step === 5 ? "Location" :
         "Summary"}
      </h2>

      {step === 1 ? renderPersonalDetails() :
       step === 2 ? renderRoomDetails() :
       step === 3 ? renderFacilitiesStep() :
       step === 4 ? renderBillsUpload() :
       step === 5 ? renderLocationMap() :
       renderSummary()}

      <div className='flex justify-between gap-4'>
        {step > 1 && (
          <Button type='button' variant='outline' onClick={handleBack}>
            Back
          </Button>
        )}
        {step < 6 ? (
          <Button type='button' onClick={handleContinue} className={step === 1 ? 'w-full' : 'flex-1'}>
            Continue
          </Button>
        ) : (
          <Button type='submit' className='flex-1'>
            Submit Registration
          </Button>
        )}
      </div>
    </form>
  )
}

