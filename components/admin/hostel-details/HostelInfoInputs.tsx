import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface HostelInfoInputsProps {
  formData: {
    hostelName: string
    ownerName: string
    hostelLocation: string
    hostelType: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function HostelInfoInputs({ formData, handleInputChange }: HostelInfoInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="hostelName">Hostel Name</Label>
        <Input
          id="hostelName"
          name="hostelName"
          value={formData.hostelName}
          onChange={handleInputChange}
          placeholder="Enter Your Hostel Name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ownerName">Owner Name</Label>
        <Input
          id="ownerName"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hostelLocation">Hostel Location</Label>
        <Input
          id="hostelLocation"
          name="hostelLocation"
          value={formData.hostelLocation}
          onChange={handleInputChange}
          placeholder="Enter Your Hostel Address"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hostelType">Hostel Type</Label>
        <Input
          id="hostelType"
          name="hostelType"
          value={formData.hostelType}
          onChange={handleInputChange}
          placeholder="Enter Your Hostel Type"
        />
      </div>
    </div>
  )
}