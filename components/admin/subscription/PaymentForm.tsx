import { useState } from "react"
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

export default function PaymentForm({ plan, onPaymentComplete }: PaymentFormProps) {
  const [cardOwner, setCardOwner] = useState<string>("")
  const [cardNumber, setCardNumber] = useState<string>("")
  const [expiryDate, setExpiryDate] = useState<string>("")
  const [cvv, setCvv] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically integrate with a payment gateway
    console.log("Processing payment...")
    const res = await processPayment(plan);
    console.log(res);
    onPaymentComplete()
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information for the {plan.name} plan</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" id="payment-form">
          <div className="space-y-2">
            <Label htmlFor="cardOwner">Card Owner Name</Label>
            <Input
              id="cardOwner"
              placeholder="John Doe"
              value={cardOwner}
              onChange={(e) => setCardOwner(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {/* The button triggers the form's onSubmit */}
        <Button
          className="w-full"
          type="submit"
          form="payment-form" // Link this button to the form by ID
        >
          Pay ${plan.price.toFixed(2)}
        </Button>
      </CardFooter>
    </Card>
  )
}
