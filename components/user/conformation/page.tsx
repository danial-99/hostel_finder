'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  const isSuccess = status === 'success'

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {isSuccess ? (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">
              Your booking has been confirmed. Booking ID: #HF12345
            </p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Payment Failed</h2>
            <p className="mt-2 text-gray-600">
              There was an error processing your payment. Please try again.
            </p>
          </>
        )}
        <div className="mt-8">
          <Link href="/">
            <Button className="w-full">
              {isSuccess ? 'Return to Homepage' : 'Try Again'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

