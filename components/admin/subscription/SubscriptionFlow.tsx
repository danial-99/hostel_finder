"use client"

import { useState } from "react"
import PlanSelection from "./PlaneSelection"
import PaymentForm from "./PaymentForm"
import PaymentConfirmation from "./PaymentConform"

// Define the Plan interface
interface Plan {
  name: string
  price: number
  duration: string
  discount?: number
  features: string[]
}

const steps = ["Select Plan", "Payment", "Dashboard"]

export default function SubscriptionFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan)
    setCurrentStep(1)
  }

  const handlePaymentComplete = () => {
    setCurrentStep(2)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-center items-center">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-12 ${
                    index < currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div key={step} className="text-sm font-medium">
              {step}
            </div>
          ))}
        </div>
      </div>
      {currentStep === 0 && <PlanSelection onSelectPlan={handlePlanSelect} />}
      {currentStep === 1 && (
        <PaymentForm plan={selectedPlan as Plan} onPaymentComplete={handlePaymentComplete} />
      )}
      {currentStep === 2 && <PaymentConfirmation plan={selectedPlan as Plan} />}
    </div>
  )
}
