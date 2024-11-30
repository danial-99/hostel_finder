import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Successful!</CardTitle>
        <CardDescription>Thank you for subscribing to our {plan.name} plan</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-2xl font-bold text-green-600 mb-4">✓</p>
        <p className="text-center">
          Your payment of ${plan.price.toFixed(2)} for the {plan.name} plan has been processed successfully.
        </p>
        <p className="text-center mt-4">
          You now have access to all the features included in your chosen plan.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>Go to Dashboard</Button>
      </CardFooter>
    </Card>
  )
}
