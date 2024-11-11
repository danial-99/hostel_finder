import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface BookingInfoFormProps {
  formData: {
    checkIn: string
    checkOut: string
    totalRoom: string
    totalGuest: string
    codeReferral: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNext: () => void
}

export default function BookingInfoForm({ formData, handleInputChange, handleNext }: BookingInfoFormProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
          <Input
            id="checkIn"
            name="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
          <Input
            id="checkOut"
            name="checkOut"
            type="date"
            value={formData.checkOut}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="totalRoom" className="block text-sm font-medium text-gray-700 mb-1">Total Room</label>
          <Select name="totalRoom" value={formData.totalRoom} onValueChange={(value: any) => handleInputChange({ target: { name: 'totalRoom', value } } as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select total rooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01">01</SelectItem>
              <SelectItem value="02">02</SelectItem>
              <SelectItem value="03">03</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="totalGuest" className="block text-sm font-medium text-gray-700 mb-1">Total Guest</label>
          <Select name="totalGuest" value={formData.totalGuest} onValueChange={(value: any) => handleInputChange({ target: { name: 'totalGuest', value } } as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select total guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01">01</SelectItem>
              <SelectItem value="02">02</SelectItem>
              <SelectItem value="03">03</SelectItem>
              <SelectItem value="04">04</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="codeReferral" className="block text-sm font-medium text-gray-700 mb-1">Code Referral</label>
        <Input
          id="codeReferral"
          name="codeReferral"
          value={formData.codeReferral}
          onChange={handleInputChange}
          placeholder="Your Code Referral"
        />
      </div>
      <Button type="submit" className="w-full">Next</Button>
    </form>
  )
}