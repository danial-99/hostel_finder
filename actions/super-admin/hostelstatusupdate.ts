"use server";

import prismadb from "@/lib/prisma";
import { HostelStatus } from "@prisma/client";
import {
  sendRejectionEmail,
  sendApprovalEmail,
} from "@/actions/nodemailer/emailTemplates"; // Import the email functions

export async function HostelStatusUpdate(userId: string, status: HostelStatus) {
  try {
    const hostel = await prismadb.hostel.findUnique({
      where: {
        id: userId,
      },
    });

    const owner = await prismadb.user.findUnique({
      where: {
        id: hostel?.ownerId,
      },
      select: {
        email: true,
      },
    });

    if (!hostel) {
      return {
        message: "Hostel not found",
        status: 404,
        success: false,
        error: "Hostel not found",
      };
    }

    // Send email based on the status
    if (status === HostelStatus.REJECTED) {
      await sendRejectionEmail(owner?.email); // Assuming hostel has an email field
    } else if (status === HostelStatus.APPROVED) {
      await sendApprovalEmail(owner?.email); // Assuming hostel has an email field
    }

    const updatedHostel = await prismadb.hostel.update({
      where: {
        id: userId,
      },
      data: {
        status: status,
      },
    });
    return {
      message: "Hostel status updated successfully",
      status: 200,
      success: true,
      hostel: updatedHostel,
    };
  } catch (error) {
    return {
      message: "Error updating hostel status",
      status: 500,
      success: false,
      error: "Internal server error",
    };
  }
}
