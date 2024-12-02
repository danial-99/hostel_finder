"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Edit2, Save, X, Plus, Minus } from 'lucide-react'

interface Feature {
  id: string
  text: string
}

interface Plan {
  id: string
  name: string
  price: number
  interval: string
  discount: number
  features: Feature[]
}

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "free",
      name: "Free",
      price: 0,
      interval: "forever",
      discount: 0,
      features: [
        { id: "f1", text: "Basic listing" },
        { id: "f2", text: "Limited visibility" }
      ]
    },
    {
      id: "monthly",
      name: "Monthly",
      price: 29.99,
      interval: "month",
      discount: 0,
      features: [
        { id: "m1", text: "Basic listing" },
        { id: "m2", text: "Improved visibility" }
      ]
    },
    {
      id: "semi-annual",
      name: "Semi-Annual",
      price: 162.39,
      interval: "6 months",
      discount: 5,
      features: [
        { id: "s1", text: "Top listing" },
        { id: "s2", text: "High visibility" },
        { id: "s3", text: "Get off" }
      ]
    },
    {
      id: "annual",
      name: "Annual",
      price: 291.50,
      interval: "year",
      discount: 10,
      features: [
        { id: "a1", text: "Top listing" },
        { id: "a2", text: "High visibility" },
        { id: "a3", text: "Get more off" }
      ]
    }
  ])

  const [editingPlan, setEditingPlan] = useState<string | null>(null)
  const [editedPlans, setEditedPlans] = useState<{ [key: string]: Plan }>({})

  const startEditing = (planId: string) => {
    setEditingPlan(planId)
    setEditedPlans(prev => ({
      ...prev,
      [planId]: JSON.parse(JSON.stringify(plans.find(p => p.id === planId)!))
    }))
  }

  const cancelEditing = (planId: string) => {
    setEditingPlan(null)
    const { [planId]: _, ...rest } = editedPlans
    setEditedPlans(rest)
  }

  const updateEditedPlan = (planId: string, field: keyof Plan, value: any) => {
    setEditedPlans(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        [field]: value
      }
    }))
  }

  const updateFeature = (planId: string, featureId: string, newText: string) => {
    setEditedPlans(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        features: prev[planId].features.map(f =>
          f.id === featureId ? { ...f, text: newText } : f
        )
      }
    }))
  }

  const addFeature = (planId: string) => {
    setEditedPlans(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        features: [
          ...prev[planId].features,
          { id: `new-${Date.now()}`, text: "" }
        ]
      }
    }))
  }

  const removeFeature = (planId: string, featureId: string) => {
    setEditedPlans(prev => ({
      ...prev,
      [planId]: {
        ...prev[planId],
        features: prev[planId].features.filter(f => f.id !== featureId)
      }
    }))
  }

  const savePlan = (planId: string) => {
    setPlans(prev =>
      prev.map(p => (p.id === planId ? editedPlans[planId] : p))
    )
    setEditingPlan(null)
    const { [planId]: _, ...rest } = editedPlans
    setEditedPlans(rest)
    toast({
      title: "Plan Updated",
      description: "The subscription plan has been successfully updated.",
    })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              {editingPlan === plan.id ? (
                <div className="space-y-2">
                  <Label htmlFor={`${plan.id}-name`}>Plan Name</Label>
                  <Input
                    id={`${plan.id}-name`}
                    value={editedPlans[plan.id].name}
                    onChange={(e) =>
                      updateEditedPlan(plan.id, "name", e.target.value)
                    }
                  />
                </div>
              ) : (
                <CardTitle>{plan.name}</CardTitle>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editingPlan === plan.id ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor={`${plan.id}-price`}>Price</Label>
                    <Input
                      id={`${plan.id}-price`}
                      type="number"
                      step="0.01"
                      value={editedPlans[plan.id].price}
                      onChange={(e) =>
                        updateEditedPlan(plan.id, "price", parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${plan.id}-interval`}>Billing Interval</Label>
                    <Input
                      id={`${plan.id}-interval`}
                      value={editedPlans[plan.id].interval}
                      onChange={(e) =>
                        updateEditedPlan(plan.id, "interval", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${plan.id}-discount`}>Discount (%)</Label>
                    <Input
                      id={`${plan.id}-discount`}
                      type="number"
                      value={editedPlans[plan.id].discount}
                      onChange={(e) =>
                        updateEditedPlan(plan.id, "discount", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Features</Label>
                    {editedPlans[plan.id].features.map((feature, index) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <Input
                          value={feature.text}
                          onChange={(e) =>
                            updateFeature(plan.id, feature.id, e.target.value)
                          }
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeFeature(plan.id, feature.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addFeature(plan.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Feature
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    ${plan.price}
                    <span className="text-sm text-muted-foreground">
                      /{plan.interval}
                    </span>
                  </div>
                  {plan.discount > 0 && (
                    <div className="text-sm text-green-600">
                      {plan.discount}% off
                    </div>
                  )}
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex items-center">
                        • {feature.text}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {editingPlan === plan.id ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => cancelEditing(plan.id)}
                  >
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => savePlan(plan.id)}
                  >
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditing(plan.id)}
                >
                  <Edit2 className="h-4 w-4 mr-2" /> Edit
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

