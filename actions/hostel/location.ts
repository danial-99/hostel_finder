"use server"

import prisma  from "@/lib/prisma"

export async function getHostelLocation(hostelId: string) {
  const hostel = await prisma.hostel.findUnique({
    where: { id: hostelId },
    select: {
      latitude: true,
      longitude: true,
      address: true
    }
  })

  if (!hostel) {
    throw new Error("Hostel not found")
  }

  return {
    latitude: hostel.latitude,
    longitude: hostel.longitude,
    address: hostel.address
  }
}

export async function updateHostelLocation(
  hostelId: string, 
  data: { 
    latitude: number, 
    longitude: number, 
    address: string 
  }
) {
  return await prisma.hostel.update({
    where: { id: hostelId },
    data: {
      latitude: data.latitude,
      longitude: data.longitude,
      address: data.address
    }
  })
}