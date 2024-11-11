export async function getBookingRequests(pendingOnly = false) {
    try {
      const bookings = await prismadb.bookingRequests.findMany({
        where: pendingOnly ? { status: "PENDING" } : {},
        include: {
          user: true,
          hostel: true,
          room: true,
          payment: true,
        },
      });
  
      return {
        status: 200,
        success: true,
        data: bookings,
      };
    } catch (error) {
      console.error("[GET_BOOKING_REQUESTS_ERROR]", error);
      return {
        status: 500,
        success: false,
        message: "Failed to fetch booking requests.",
        error: "Internal server error",
      };
    }
  }


export async function approveBooking(id: string) {
    try {
      const booking = await prismadb.bookingRequests.findUnique({
        where: { id },
        select: { user: { select: { email: true } } },
      });

      if (!booking) {
        return {
          status: 404,
          success: false,
          message: "Booking request not found.",
          error: "Booking request with the given ID does not exist.",
        };
      }

      const updatedBooking = await prismadb.bookingRequests.update({
        where: { id },
        data: { status: "APPROVED" },
      });

      return {
        status: 200,
        success: true,
        message: "Booking request status updated to APPROVED.",
        data: updatedBooking,
        userEmail: booking.user?.email,
      };
    } catch (error) {
      console.error("[APPROVE_BOOKING_ERROR]", error);
      return {
        status: 500,
        success: false,
        message: "Failed to approve booking request.",
        error: "Internal server error",
      };
    }
  }


export async function rejectBooking(bookingId: string) {
    try {
      const booking = await prismadb.bookingRequests.findUnique({
        where: { id: bookingId },
        select: {
          status: true,
          user: { select: { email: true } },
        },
      });

      if (!booking || booking.status !== "PENDING") {
        return {
          status: 400,
          success: false,
          message: "Booking request not found or not pending approval",
        };
      }

      // Reject the booking request
      await prismadb.bookingRequests.update({
        where: { id: bookingId },
        data: { status: "REJECTED" },
      });

      return {
        status: 200,
        success: true,
        message: "Booking request rejected successfully",
        userEmail: booking.user?.email,
      };
    } catch (error) {
      console.error("[REJECT_BOOKING_ERROR]", error);
      return {
        status: 500,
        success: false,
        message: "Failed to reject booking request",
        error: "Internal server error",
      };
    }
  }
