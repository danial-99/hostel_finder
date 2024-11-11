'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

import ProgressIndicator from './ProgressIndicator'
import PersonalDataForm from './PersonalDataForm'
import BookingInfoForm from './BookingInfoForm'
import BookingSummary from './BookingSummary'

const steps = ['Personal data', 'Booking info', 'Summary']

export default function BookingRoom() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    checkIn: '',
    checkOut: '',
    totalRoom: '01',
    totalGuest: '02',
    codeReferral: '',
  })

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDataForm formData={formData} handleInputChange={handleInputChange} handleNext={handleNext} />
      case 1:
        return <BookingInfoForm formData={formData} handleInputChange={handleInputChange} handleNext={handleNext} />
      case 2:
        return <BookingSummary formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Booking Room</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="lg:w-1/3">
          <CardContent className="p-6">
            <Image
              src="/room1.png"
              alt="Premium Deluxe Room"
              width={400}
              height={300}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">Premium Deluxe</h2>
            <p className="text-sm text-gray-600 mb-2">60 m² • 1 bed • 1 bathroom • balcony</p>
            <p className="text-2xl font-bold text-primary">$1200 <span className="text-sm font-normal text-gray-600">/ Per Month</span></p>
          </CardContent>
        </Card>
        <Card className="lg:w-2/3">
          <CardContent className="p-6">
            <ProgressIndicator steps={steps} currentStep={currentStep} />
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}