'use client'

import { useState } from 'react'
import PaymentModal from './payment/PaymentModel'
import { Button } from '@/components/ui/button'

export default function Summ() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Hostel Finder</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Your Booking Summary</h2>
        <p className="mb-2">Hostel: Sunny Side Hostel</p>
        <p className="mb-2">Room Type: 4-Bed Dormitory</p>
        <p className='mb-2'>Name: Azhar</p>
        <p className="mb-2">Dates: Aug 1, 2023 - Aug 5, 2023</p>
        <p className="text-lg font-bold mt-4">Total: PKR120.00</p>
        <Button 
          onClick={() => setIsPaymentModalOpen(true)}
          className="w-full mt-6"
        >
          Pay Now
        </Button>
      </div>
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        amount={120.00}
      />
    </div>
  )
}

