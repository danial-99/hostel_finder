'use client'

import { useState, useEffect } from "react"
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { HostelType, Category } from "@prisma/client"
import { ImageIcon, Plus, Trash2, X, Camera, Upload, MapPin } from 'lucide-react'
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

const formSchema = z.object({
  hostelImages: z.array(z.instanceof(File)).min(1, "At least one hostel image is required"),
  hostelName: z.string().min(1, "Hostel name is required"),
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
  rooms: z.array(z.object({
    numberOfRooms: z.number().min(1, "Number of rooms must be at least 1"),
    bedCount: z.number().min(1, "Bed count must be at least 1"),
    price: z.number().min(1, "Price must be at least 1"),
    images: z.array(z.instanceof(File)).optional(),
    isAvailable: z.boolean()
  })).min(1, "At least one room must be added"),
  facilities: z.record(z.boolean()),
  latitude: z.number(),
  longitude: z.number()
})

type FormData = z.infer<typeof formSchema>

const pakistanCenter = { lat: 30.3753, lng: 69.3451 }

export default function HostelUpdateForm({ hostelId }: { hostelId: string }) {
  const { user } = useAuth()
  const userId = user?.id as string
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places']
  })

  const { register, control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostelImages: [],
      rooms: [{ numberOfRooms: 1, bedCount: 1, price: 1, images: [], isAvailable: true }],
      facilities: {},
      latitude: pakistanCenter.lat,
      longitude: pakistanCenter.lng
    }
  })

  const { fields, append, remove } = useFieldArray({
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

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        const response = await fetch(`/api/hostels/${hostelId}`)
        if (!response.ok) throw new Error('Failed to fetch hostel data')
        const hostelData = await response.json()

        // Reset form with fetched data
        reset(hostelData)
        setFacilitiesData(hostelData.facilities)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching hostel data:', error)
        toast({
          title: "Error",
          description: "Failed to load hostel data. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchHostelData()
  }, [hostelId, reset])

  const onSubmit = async (data: FormData) => {
    if (step < 5) {
      setStep(prev => prev + 1)
    } else {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/hostels/${hostelId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) throw new Error('Failed to update hostel')

        toast({
          title: "Success",
          description: "Hostel information updated successfully",
          variant: "default",
        })
      } catch (error) {
        console.error('Error updating hostel:', error)
        toast({
          title: "Error",
          description: "Failed to update hostel information. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => setStep(prev => Math.max(1, prev - 1))

  const hostelImagesDropzone = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      const currentImages = watch('hostelImages') || []
      setValue('hostelImages', [...currentImages, ...acceptedFiles])
    }
  })

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setFacilitiesData(prev => ({ ...prev, [facility]: checked }))
    setValue(`facilities.${facility}`, checked)
  }

  useEffect(() => {
    Object.entries(facilitiesData).forEach(([key, value]) => {
      setValue(`facilities.${key}`, value)
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
              <Image src={typeof file === 'string' ? file : URL.createObjectURL(file)} alt={`Hostel Image ${index + 1}`} width={100} height={100} className='object-cover rounded-md' />
              <Button
                type='button'
                variant='destructive'
                size='icon'
                className='absolute top-0 right-0'
                onClick={() => {
                  const currentImages = watch('hostelImages') || []
                  setValue(
                    'hostelImages',
                    currentImages.filter((_, i) => i !== index)
                  )
                }}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor='hostelName'>Hostel Name</Label>
        <Input id='hostelName' {...register('hostelName')} />
        {errors.hostelName && <p className='text-red-500'>{errors.hostelName.message}</p>}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='country'>Country</Label>
          <Select onValueChange={value => setValue('country', value)} defaultValue={watch('country')}>
            <SelectTrigger>
              <SelectValue placeholder='Select country' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pakistan'>Pakistan</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && <p className='text-red-500'>{errors.country.message}</p>}
        </div>

        <div>
          <Label htmlFor='province'>Province</Label>
          <Select onValueChange={value => setValue('province', value)} defaultValue={watch('province')}>
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
          <Select onValueChange={value => setValue('type', value as HostelType)} defaultValue={watch('type')}>
            <SelectTrigger>
              <SelectValue placeholder='Select hostel type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={HostelType.MALE}>Male</SelectItem>
              <SelectItem value={HostelType.FEMALE}>Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className='text-red-500'>{errors.type.message}</p>}
        </div>

        <div>
          <Label htmlFor='category'>Hostel Category</Label>
          <Select onValueChange={value => setValue('category', value as Category)} defaultValue={watch('category')}>
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
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-semibold'>Room {index + 1}</h3>
              {fields.length > 1 && (
                <Button variant='destructive' size='icon' onClick={() => remove(index)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              )}
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <Label htmlFor={`rooms.${index}.numberOfRooms`}>Number of Rooms</Label>
                <Input
                  id={`rooms.${index}.numberOfRooms`}
                  type='number'
                  min={1}
                  {...register(`rooms.${index}.numberOfRooms` as const, {
                    valueAsNumber: true,
                    min: 1
                  })}
                />
                {errors.rooms?.[index]?.numberOfRooms && <p className='text-red-500'>{errors.rooms[index]?.numberOfRooms?.message}</p>}
              </div>
              <div>
                <Label htmlFor={`rooms.${index}.bedCount`}>Number of Beds</Label>
                <Select onValueChange={value => setValue(`rooms.${index}.bedCount`, parseInt(value))} defaultValue={watch(`rooms.${index}.bedCount`)?.toString()}>
                  <SelectTrigger id={`rooms.${index}.bedCount`}>
                    <SelectValue placeholder='Select bed count' />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map(count => (
                      <SelectItem key={count} value={count.toString()}>
                        {count} {count === 1 ? 'Bed' : 'Beds'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.rooms?.[index]?.bedCount && <p className='text-red-500'>{errors.rooms[index]?.bedCount?.message}</p>}
              </div>
              <div>
                <Label htmlFor={`rooms.${index}.price`}>Price per Bed</Label>
                <Input
                  id={`rooms.${index}.price`}
                  type='number'
                  min={1}
                  {...register(`rooms.${index}.price` as const, {
                    valueAsNumber: true,
                    min: 1
                  })}
                />
                {errors.rooms?.[index]?.price && <p className='text-red-500'>{errors.rooms[index]?.price?.message}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id={`rooms.${index}.isAvailable`}
                checked={watch(`rooms.${index}.isAvailable`)}
                onCheckedChange={(checked) => setValue(`rooms.${index}.isAvailable`, checked)}
              />
              <Label htmlFor={`rooms.${index}.isAvailable`}>Room Available</Label>
            </div>
            <div>
              <Label>Room Images</Label>
              <div className='mt-2 flex items-center space-x-4'>
                <Input
                  type='file'
                  accept='image/*'
                  multiple
                  onChange={e => {
                    const files = e.target.files
                    if (files) {
                      const currentImages = watch(`rooms.${index}.images`) || []
                      setValue(`rooms.${index}.images`, [...currentImages, ...Array.from(files)])
                    }
                  }}
                  className='hidden'
                  id={`room-images-${index}`}
                />
                <Button type='button' onClick={() => document.getElementById(`room-images-${index}`)?.click()}>
                  <Upload className='mr-2 h-4 w-4' /> Upload Images
                </Button>
                <Button type='button' variant='outline'>
                  <Camera className='mr-2 h-4 w-4' /> Take Photo
                </Button>
              </div>
              <div className='mt-4 grid grid-cols-3 gap-4'>
                {watch(`rooms.${index}.images`)?.map((file, fileIndex) => (
                  <div key={fileIndex} className='relative'>
                    <Image src={typeof file === 'string' ? file : URL.createObjectURL(file)} alt={`Room ${index + 1} Image ${fileIndex + 1}`} width={100} height={100} className='object-cover rounded-md' />
                    <Button
                      type='button'
                      variant='destructive'
                      size='icon'
                      className='absolute top-0 right-0'
                      onClick={() => {
                        const currentImages = watch(`rooms.${index}.images`) || []
                        setValue(
                          `rooms.${index}.images`,
                          currentImages.filter((_, i) => i !== fileIndex)
                        )
                      }}
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button type='button' onClick={() => append({ numberOfRooms: 1, bedCount: 1, price: 1, images: [], isAvailable: true })} className='w-full'>
        <Plus className='mr-2 h-4 w-4' /> Add More Rooms
      </Button>
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
                  setValue('latitude', lat())
                  setValue('longitude', lng())
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
                setValue('latitude', e.latLng.lat())
                setValue('longitude', e.latLng.lng())
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
                      <Image src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt={`Hostel Image ${index + 1}`} width={200} height={200} className="object-cover" />
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
              <div key={index} className='mb-4'>
                <p><span className='font-medium'>Room {index + 1}:</span> {room.numberOfRooms} room(s), {room.bedCount} bed(s), ${room.price}/bed</p>
                <p><span className='font-medium'>Availability:</span> {room.isAvailable ? 'Available' : 'Not Available'}</p>
                <div className='mt-2 grid grid-cols-3 gap-2'>
                  {room.images && room.images.map((image, imageIndex) => (
                    <Image
                      key={imageIndex}
                      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                      alt={`Room ${index + 1} Image ${imageIndex + 1}`}
                      width={100}
                      height={100}
                      className='object-cover rounded-md'
                    />
                  ))}
                </div>
              </div>
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow'>
      <h2 className='text-2xl font-bold text-center mb-6'>
        {step === 1 ? "Update Personal Details" :
          step === 2 ? "Update Room Details" :
            step === 3 ? "Update Facilities" :
              step === 4 ? "Update Location" :
                "Review Updates"}
      </h2>

      {step === 1 ? renderPersonalDetails() :
        step === 2 ? renderRoomDetails() :
          step === 3 ? renderFacilitiesStep() :
            step === 4 ? renderLocationMap() :
              renderSummary()}

      <div className='flex justify-between gap-4'>
        {step > 1 && (
          <Button type='button' variant='outline' onClick={handleBack}>
            Back
          </Button>
        )}
        <Button type='submit' className={step === 1 ? 'w-full' : 'flex-1'} disabled={isLoading}>
          {isLoading ? 'Updating...' : step === 5 ? 'Confirm Updates' : 'Continue'}
        </Button>
      </div>
    </form>
  )
}