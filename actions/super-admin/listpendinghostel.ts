"use server";

import prismadb from "@/lib/prisma";

export async function listPendingHostel() {
  // Fetch all pending hostels
  const hostels = await prismadb.hostel.findMany({
    where: { status: "PENDING" },
  });

  if (hostels.length > 0) {
    // Use Promise.all to handle async mapping
    const hostelList = await Promise.all(
      hostels.map(async (hostel) => {
        const totalRooms = await prismadb.roomType.aggregate({
          where: { hostelId: hostel.id },
          _sum: {
            numberOfRooms: true,
          },
        });

        return {
          ...hostel,
          totalRooms: totalRooms._sum.numberOfRooms || 0, // Add totalRooms to the response
          hostelImage: convertToBase64(hostel.hostelImage),
          electercityBill: convertToBase64(hostel.electercityBill),
          gasBill: convertToBase64(hostel.gasBill),
        };
      })
    );

    return hostelList;
  } else {
    return false; // Return false if no hostels were found
  }
}

const convertToBase64 = (bytes: any) => {
  return Buffer.from(bytes).toString("base64");
};
