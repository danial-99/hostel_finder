import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface PersonalDataFormProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleNext: () => void
}

export default function PersonalDataForm({ formData, handleInputChange, handleNext }: PersonalDataFormProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Your First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Your Last Name"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your Email"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Your Phone Number"
          required
        />
      </div>
      <Button type="submit" className="w-full">Next</Button>
    </form>
  )
}