'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import processPayment from "@/actions/admin/processPayment"

// Define the Plan interface
interface Plan {
  name: string
  price: number
  duration: string
  discount?: number
  features: string[]
}

interface PaymentFormProps {
  plan: Plan
  onPaymentComplete: () => void
}

// Define the Zod schema for form validation
const paymentFormSchema = z.object({
  cardOwner: z.string().min(3, "Name must be at least 3 characters"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
})

type PaymentFormData = z.infer<typeof paymentFormSchema>

export default function PaymentForm({ plan, onPaymentComplete }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  })

  const onSubmit = async (data: PaymentFormData) => {
    console.log("Processing payment...", data)
    const res = await processPayment(plan)
    console.log(res)
    onPaymentComplete()
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information for the {plan.name} plan</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="payment-form">
          <div className="space-y-2">
            <Label htmlFor="cardOwner">Card Owner Name</Label>
            <Input
              id="cardOwner"
              placeholder="John Doe"
              {...register("cardOwner")}
            />
            {errors.cardOwner && (
              <p className="text-sm text-red-500">{errors.cardOwner.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234567890123456"
              {...register("cardNumber")}
            />
            {errors.cardNumber && (
              <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                {...register("expiryDate")}
              />
              {errors.expiryDate && (
                <p className="text-sm text-red-500">{errors.expiryDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                {...register("cvv")}
              />
              {errors.cvv && (
                <p className="text-sm text-red-500">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          form="payment-form"
        >
          Pay ${plan.price.toFixed(2)}
        </Button>
      </CardFooter>
    </Card>
  )
}

