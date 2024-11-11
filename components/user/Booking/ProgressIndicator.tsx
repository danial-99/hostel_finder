import React from 'react'

interface ProgressIndicatorProps {
  steps: string[]
  currentStep: number
}

export default function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {index + 1}
          </div>
          <span className={`text-sm mt-2 ${
            index <= currentStep ? 'text-primary' : 'text-gray-400'
          }`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}