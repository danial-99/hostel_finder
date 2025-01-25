'use server'

import  prisma  from '@/lib/prisma'
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

export async function updatePlan(planId: string, data: {
  name: string
  price: number
  interval: string
  discount: number
  features: { id: string; text: string }[]
}): Promise<ServerResponse<Plan>> {
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
      include: {
        features: true
      }
    })

    // Get existing features
    const existingFeatures = await prisma.feature.findMany({
      where: { planId }
    })

    // Delete features that are not in the new data
    const featureIdsToKeep = data.features.map(f => f.id)
    const featuresToDelete = existingFeatures.filter(f => 
      !featureIdsToKeep.includes(f.id) && f.id.startsWith('existing-')
    )
    
    if (featuresToDelete.length > 0) {
      await prisma.feature.deleteMany({
        where: {
          id: {
            in: featuresToDelete.map(f => f.id)
          }
        }
      })
    }

    // Update or create features
    for (const feature of data.features) {
      if (feature.id.startsWith('new-')) {
        // Create new feature
        await prisma.feature.create({
          data: {
            text: feature.text,
            planId
          }
        })
      } else {
        // Update existing feature
        await prisma.feature.update({
          where: { id: feature.id },
          data: { text: feature.text }
        })
      }
    }

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