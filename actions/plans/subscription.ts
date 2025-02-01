'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Define types for better type safety
export interface Feature {
  id: string
  text: string
  planId: string
}

export interface Plan {
  id: string
  name: string
  price: number
  interval: string
  discount: number
  features: Feature[]
}

export interface ServerResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export async function getPlans(): Promise<ServerResponse<Plan[]>> {
  try {
    const plans = await prisma.plan.findMany({
      include: {
        features: true
      }
    })
    return { success: true, data: plans }
  } catch (error) {
    console.error('Error fetching plans:', error)
    return { success: false, error: 'Failed to fetch plans' }
  }
}

export async function updatePlan(planId: string, data: Plan): Promise<ServerResponse<Plan>> {
  try {
    // Update plan details
    const updatedPlan = await prisma.plan.update({
      where: { id: planId },
      data: {
        name: data.name,
        price: data.price,
        interval: data.interval,
        discount: data.discount,
      },
    })

    // Handle features
    // Delete existing features
    await prisma.feature.deleteMany({
      where: { planId }
    })

    // Create new features
    await prisma.feature.createMany({
      data: data.features.map(feature => ({
        text: feature.text,
        planId
      }))
    })

    // Fetch the updated plan with all features
    const finalPlan = await prisma.plan.findUnique({
      where: { id: planId },
      include: {
        features: true
      }
    })

    if (!finalPlan) {
      throw new Error('Failed to fetch updated plan')
    }

    revalidatePath('/subscription-plans')
    return { success: true, data: finalPlan }
  } catch (error) {
    console.error('Error updating plan:', error)
    return { success: false, error: 'Failed to update plan' }
  }
}