"use server";

import prismadb from "@/app/lib/prisma";

interface BookingRequestData {
  userId: string;
  hostelId: string;
  roomId?: string;
  amount: number;
  paymentMethod: string;
}

// Function to create a new booking request
export async function createBookingRequest(formData: FormData) {
  try {
    // Parse formData
    const bookingData = JSON.parse(
      formData.get("bookingData") as string
    ) as BookingRequestData;

    // Step 1: Create the BookingRequest
    const bookingRequest = await prismadb.bookingRequests.create({
      data: {
        user: { connect: { id: bookingData.userId } },
        hostel: { connect: { id: bookingData.hostelId } },
        room: bookingData.roomId ? { connect: { id: bookingData.roomId } } : undefined,
        status: "PENDING",
      },
    });

    // Step 2: Create BookingPayment associated with the BookingRequest
    const bookingPayment = await prismadb.bookingPayments.create({
      data: {
        booking: { connect: { id: bookingRequest.id } },
        amount: bookingData.amount,
        paymentMethod: bookingData.paymentMethod,
        paymentStatus: "PENDING", // Default payment status
      },
    });

    // Step 3: Return success response
    return {
      status: 201,
      success: true,
      message: "Booking request created successfully",
      data: {
        bookingRequest,
        bookingPayment,
      },
    };
  } catch (error) {
    console.error("[CREATE_BOOKING_REQUEST_ERROR]", error);
    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: "Internal server error",
    };
  }
}
