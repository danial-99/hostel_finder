"use client" // Ensure this component is rendered on the client side

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation" // Use next/navigation instead of next/router

// Define the Plan interface
interface Plan {
  name: string
  price: number
  duration: string
  discount?: number
  features: string[]
}

interface PaymentConfirmationProps {
  plan: Plan
}

export default function PaymentConfirmation({ plan }: PaymentConfirmationProps) {
  const router = useRouter() // Initialize the router

  const gotoDashBoard = () => {
    router.push("/admin/dashboard") // Use the router to navigate
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Successful!</CardTitle>
        <CardDescription>Thank you for subscribing to our {plan.name} plan</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-2xl font-bold text-green-600 mb-4">✓</p>
        <p className="text-center">
          Your payment of Rs {plan.price.toFixed(2)} for the {plan.name} plan has been processed successfully.
        </p>
        <p className="text-center mt-4">
          You now have access to all the features included in your chosen plan.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={gotoDashBoard}>Go to Dashboard</Button>
      </CardFooter>
    </Card>
  )
}