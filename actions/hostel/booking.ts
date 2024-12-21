"use server";

import prismadb from "@/lib/prisma";
import { cookies } from 'next/headers';
import { sendBookingRequestEmail } from "../nodemailer/emailTemplates";


export default async function bookingRequest(data: any){
    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    const userId = curUserId?.value;
    const hostelId = data.hostelId;
    const roomId = data.selectedRoomId;
    const checkInDate = data.checkInDate;
    const checkOutDate = data.checkOutDate;

    const bookingRequest = await prismadb.bookingRequests.create({
        data:{
            room: { connect: { id: roomId } },
            user: { connect: { id: userId } },
            hostel: { connect: { id: hostelId } },
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
        }
    })
    if(!bookingRequest){
        return {
            success: false,
            message: "Failed to create hostel",
            status: 500,
        };
    }
    else{
        await prismadb.roomType.update({
            where: {id: roomId},
            data: {available: false}
        })
        const hostelOwner = await prismadb.hostel.findUnique({
            where:{
                id: data.hostelId,
            }
        })
        const ownerData = await prismadb.user.findUnique({
            where:{
                id: hostelOwner?.ownerId,
            }
        })
        var mailResponse;
        if(ownerData){
             mailResponse = await sendBookingRequestEmail(ownerData.email);
        }
        return {
            success: false,
            message: `Booking request has been created, ${mailResponse}`,
            status: 200,
        };

    }
}

export async function fetchBookingRequests() {
    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    var userId = "";
    if(curUserId){
        userId = curUserId.value;
    }
  const hostel = await prismadb.hostel.findFirst({
    where:{
        ownerId: userId,
    }
  });
  if (hostel) {
    const bookingRequests = await prismadb.bookingRequests.findMany({
        where: {
            hostelBkId: hostel.id
        }
    });

    // Map over the bookingRequests to fetch userData for each booking request
    const bookingData = await Promise.all(bookingRequests.map(async (request) => {
        // Fetch user data for each booking request
        const userData = await prismadb.user.findUnique({
            where: {
                id: request.userBkId  // Assuming userBkId is the correct field to identify the user
            }
        });
        const roomData = await prismadb.roomType.findFirst({
            where:{
                id: request.roomId
            }
        })
        const imageUrl = convertToBase64(roomData?.image);
        // Return an object containing both booking request and user data
        return {
            ...request,
            ...userData,
            imageUrl,
        };
    }));
    return bookingData;
  }
}

const convertToBase64 = (bytes: any) => {
    return Buffer.from(bytes).toString("base64");
  };