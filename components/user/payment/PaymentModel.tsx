"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import bookingConfirm from "@/actions/payment/roomPayment"
import { toast } from "@/hooks/use-toast"
import { z } from "zod"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  id: string
}

const currentDate = new Date()
const currentYear = currentDate.getFullYear() % 100 // Get last two digits of current year
const currentMonth = currentDate.getMonth() + 1 // getMonth() returns 0-11

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  expiryDate: z.string().refine((value) => {
    const [month, year] = value.split("/").map(Number)
    const expiry = new Date(2000 + year, month - 1) // month is 0-indexed in Date
    return (
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) && // Check format
      (year > currentYear || (year === currentYear && month >= currentMonth)) && // Check if date is in the future
      expiry > currentDate
    )
  }, "Expiry date must be in MM/YY format and in the future"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  name: z.string().min(1, "Cardholder name is required").max(100, "Name is too long"),
})

type PaymentFormData = z.infer<typeof paymentSchema>

export default function PaymentModal({ isOpen, onClose, amount, id }: PaymentModalProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const validateField = (field: keyof PaymentFormData, value: string) => {
    try {
      paymentSchema.shape[field].parse(value)
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    let processedValue = value
    if (field === "cardNumber") {
      processedValue = value.replace(/\D/g, "").slice(0, 16)
    } else if (field === "expiryDate") {
      processedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .slice(0, 5)
    } else if (field === "cvv") {
      processedValue = value.replace(/\D/g, "").slice(0, 4)
    }
    setFormData((prev) => ({ ...prev, [field]: processedValue }))
    validateField(field, processedValue)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      paymentSchema.parse(formData)
      setIsProcessing(true)
      const res = await bookingConfirm(id)
      if (res) {
        toast({
          title: "Success",
          description: "Payment successful",
          variant: "default",
        })
        onClose()
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof PaymentFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof PaymentFormData] = err.message
          }
        })
        setErrors(newErrors)
      } else {
        toast({
          title: "Error",
          description: "Payment failed",
          variant: "destructive",
        })
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const isFormValid =
    Object.values(errors).every((error) => !error) && Object.values(formData).every((value) => value.trim() !== "")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234567890123456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              required
            />
            {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                required
              />
              {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                required
              />
              {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="text-right text-lg font-bold">Total: Rs {amount}</div>
          <Button type="submit" className="w-full" disabled={isProcessing || !isFormValid}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

