// /app/api/hostel/getHostels.ts
"use server";

import prismadb from "@/app/lib/prisma";

// Function to get all or only unapproved hostels based on the parameter
export async function getHostels(unapprovedOnly = false) {
  try {
    console.log("HELLO")
    const hostels = await prismadb.hostel.findMany({
      where: unapprovedOnly ? { status: "PENDING" } : {},
      include: {
        rooms: true, // Assuming you have a relation to rooms
        facilities: true, // Assuming you have a relation to facilities
      },
    });

    return {
      status: 200,
      success: true,
      data: hostels,
    };
  } catch (error) {
    console.error("[GET_HOSTELS_ERROR]", error);
    return {
      status: 500,
      success: false,
      message: "Failed to fetch hostels.",
      error: "Internal server error",
    };
  }
}


export async function approveHostel(id: string) {
  try {

    const hostel = await prismadb.hostel.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!hostel) {
      return {
        status: 404,
        success: false,
        message: "Hostel not found.",
        error: "Hostel with the given ID does not exist.",
      };
    }

    const owner = await prismadb.user.findUnique({
      where: { id: hostel.ownerId },
      select: { email: true },
    });

    if (!owner) {
      return {
        status: 400,
        success: false,
        message: "Owner not found",
      };
    }

    const updatedHostel = await prismadb.hostel.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    return {
      status: 200,
      success: true,
      message: "Hostel status updated to APPROVED.",
      data: updatedHostel,
      ownerEmail: owner.email,
    };
  } catch (error) {
    console.error("[APPROVE_HOSTEL_ERROR]", error);
    return {
      status: 500,
      success: false,
      message: "Failed to approve hostel.",
      error: "Internal server error",
    };
  }
}

export async function rejectHostel(hostelId: string) {
  try {
    const hostel = await prismadb.hostel.findUnique({
      where: { id: hostelId },
      select: {
        status: true,
        ownerId: true,
      },
    });

    if (!hostel || hostel.status !== "PENDING") {
      return {
        status: 400,
        success: false,
        message: "Hostel not found or not pending approval",
      };
    }

    const owner = await prismadb.user.findUnique({
      where: { id: hostel.ownerId },
      select: { email: true },
    });

    if (!owner) {
      return {
        status: 400,
        success: false,
        message: "Owner not found",
      };
    }

    await prismadb.hostel.update({
      where: { id: hostelId },
      data: { status: "DISAPPROVED" },
    });

    return {
      status: 200,
      success: true,
      message: "Hostel rejected successfully",
      ownerEmail: owner.email,
    };
  } catch (error) {
    console.error("[REJECT_HOSTEL_ERROR]", error);
    return {
      status: 500,
      success: false,
      message: "Failed to reject hostel",
      error: "Internal server error",
    };
  }
}