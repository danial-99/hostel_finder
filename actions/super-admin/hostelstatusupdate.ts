"use server"

import prismadb from "@/lib/prisma"
import { HostelStatus } from "@prisma/client";

export async function HostelStatusUpdate(userId: string, status: HostelStatus) {
    try {
        const hostel = await prismadb.hostel.findUnique({
            where: {
            id: userId
        }
    })
    
    if (!hostel) {
        return {
            message: "Hostel not found",
            status: 404,
            success: false,
            error: "Hostel not found"
        }
    } 
    const updatedHostel = await prismadb.hostel.update({
      where: {
        id: userId, 
      },
      data: {
        status: status, 
      }
    });
    return {
        message: "Hostel status updated successfully",
        status: 200,
        success: true,
        hostel: updatedHostel
        };
    } catch (error) {
        return {
            message: "Error updating hostel status",
            status: 500,
            success: false,
            error: "Internal server error"
        };
    }
}