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

const plans: Plan[] = [
  {
    name: "Free",
    price: 0,
    duration: "Forever",
    features: ["listing", "Limited visibility"],
  },
  {
    name: "Monthly",
    price: 29.99,
    duration: "per month",
    features: ["Basic listing", "Improved visibility"],
  },
  {
    name: "Semi-Annual",
    price: 170.94,
    duration: "per 6 months",
    discount: 5,
    features: ["Top listing", "High visibility","Get off"],
  },
  {
    name: "Annual",
    price: 323.89,
    duration: "per year",
    discount: 10,
    features: ["Top listing", "High visibility", "Get more off"],
  },
]

interface PlanSelectionProps {
  onSelectPlan: (plan: Plan) => void
}

export default function PlanSelection({ onSelectPlan }: PlanSelectionProps) {
  const calculateDiscountedPrice = (plan: Plan): string => {
    if (plan.discount) {
      return (plan.price * (100 - plan.discount) / 100).toFixed(2)
    }
    return plan.price.toFixed(2)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <Card key={plan.name} className="flex flex-col">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              {plan.price === 0 ? "Free" : `$${calculateDiscountedPrice(plan)} ${plan.duration}`}
              {plan.discount && (
                <span className="ml-2 text-green-600">({plan.discount}% off)</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="list-disc list-inside space-y-2">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => onSelectPlan(plan)}>
              {plan.price === 0 ? "Select Free Plan" : `Select ${plan.name} Plan`}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
