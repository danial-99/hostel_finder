"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPlans, type Plan as AdminPlan } from "@/actions/plans/subscription"
import { toast } from "@/hooks/use-toast"

// Define the Plan interface for the owner's view
interface OwnerPlan {
  id: string
  name: string
  price: number
  duration: string
  discount: number
  features: string[]
}

interface PlanSelectionProps {
  onSelectPlan: (plan: OwnerPlan) => void
}

export default function PlanSelection({ onSelectPlan }: PlanSelectionProps) {
  const [plans, setPlans] = useState<OwnerPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const result = await getPlans()
      if (result.success && result.data) {
        // Transform admin plans to owner plans
        const ownerPlans = result.data.map((adminPlan): OwnerPlan => ({
          id: adminPlan.id,
          name: adminPlan.name,
          price: adminPlan.price,
          duration: adminPlan.interval,
          discount: adminPlan.discount,
          features: adminPlan.features.map(f => f.text)
        }))
        setPlans(ownerPlans)
      } else {
        throw new Error(result.error || 'Failed to fetch plans')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subscription plans.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateDiscountedPrice = (plan: OwnerPlan): string => {
    if (plan.discount) {
      return (plan.price * (100 - plan.discount) / 100).toFixed(2)
    }
    return plan.price.toFixed(2)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading plans...</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              {plan.price === 0 ? (
                "Free"
              ) : (
                <>
                  Rs {calculateDiscountedPrice(plan)} /{plan.duration}
                  {plan.discount > 0 && (
                    <span className="ml-2 text-green-600">({plan.discount}% off)</span>
                  )}
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="list-disc list-inside space-y-2">
              {plan.features.map((feature, index) => (
                <li key={`${plan.id}-feature-${index}`}>{feature}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => onSelectPlan(plan)}
              variant={plan.price === 0 ? "outline" : "default"}
              disabled={plan.price === 0} // Disable the button for free plans
            >
              {plan.price === 0 ? "Select Free Plan" : `Select ${plan.name} Plan`}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}