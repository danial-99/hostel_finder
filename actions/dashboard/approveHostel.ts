"use server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

// Define the expected status type
type HostelStatus = "APPROVED" | "DISAPPROVED";

// Define the expected request payload type
interface UpdateHostelStatusRequest {
  hostelId: string;
  status: HostelStatus;
}

export async function PUT(request: Request) {
  try {
    const { hostelId, status } = (await request.json()) as UpdateHostelStatusRequest;

    // Check if status is valid
    if (!["APPROVED", "DISAPPROVED"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 }
      );
    }

    // Update the hostel's status in the database
    const updatedHostel = await prismadb.hostel.update({
      where: { id: hostelId },
      data: { status },
    });

    // Respond with success message and updated hostel data
    return NextResponse.json(
      {
        success: true,
        message: "Hostel status updated successfully",
        data: updatedHostel,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[UPDATE_HOSTEL_STATUS_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
