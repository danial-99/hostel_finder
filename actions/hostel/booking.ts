"use server";

import prismadb from "@/lib/prisma";
import { cookies } from 'next/headers';
import { sendBookingRequestEmail } from "../nodemailer/emailTemplates";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";


export default async function bookingRequest(data: any) {
    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    const userId = curUserId?.value;
    const hostelId = data.hostelId;
    const roomId = data.selectedRoomId;
    const checkInDate = data.checkInDate;
    const checkOutDate = data.checkOutDate;
    const phone = data.phone;
    const cnic = data.cnic;
    const address = data.address;
    const name = data.name;
    var price = 0;
    const duration = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

    const room = await prismadb.roomType.findUnique({
        where: {
            id: roomId
        }
    })
    if (room) {
        price = ((room?.price * duration) / 30);
    }

    const bookingRequest = await prismadb.bookingRequests.create({
        data: {
            name,
            address,
            phone,
            cnic,
            price,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            room: { connect: { id: roomId } },
            user: { connect: { id: userId } },
            hostel: { connect: { id: hostelId } },
        }
    })
    if (!bookingRequest) {
        return {
            success: false,
            message: "Failed to create hostel",
            status: 500,
        };
    }
    else {
        await prismadb.roomType.update({
            where: { id: roomId },
            data: {
                numberOfRooms: {
                    decrement: 1,
                },
            },
        })
        const hostelOwner = await prismadb.hostel.findUnique({
            where: {
                id: data.hostelId,
            }
        })
        const ownerData = await prismadb.user.findUnique({
            where: {
                id: hostelOwner?.ownerId,
            }
        })
        var mailResponse;
        if (ownerData) {
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
    if (curUserId) {
        userId = curUserId.value;
    }
    const hostel = await prismadb.hostel.findFirst({
        where: {
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
                where: {
                    id: request.roomId
                }
            })
            const imageUrl = convertToBase64(roomData?.image);
            const bedCount = roomData?.bedCount;
            // Return an object containing both booking request and user data
            return {
                ...request,
                ...userData,
                imageUrl,
                bedCount,
                phone: request.phone
            };
        }));
        return bookingData;
    }
}

export async function fetchPendingBookingRequests() {
    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    var userId = "";
    if (curUserId) {
        userId = curUserId.value;
    }
    const hostel = await prismadb.hostel.findFirst({
        where: {
            ownerId: userId,
        }
    });
    if (hostel) {
        const bookingRequests = await prismadb.bookingRequests.findMany({
            where: {
                hostelBkId: hostel.id,
                status: "PENDING"
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
                where: {
                    id: request.roomId
                }
            })
            const imageUrl = convertToBase64(roomData?.image);
            const bedCount = roomData?.bedCount;
            // Return an object containing both booking request and user data
            return {
                ...request,
                ...userData,
                imageUrl,
                bedCount,
                bkId: request.id,
            };
        }));
        return bookingData;
    }
}

export async function UnpaidBookingRequests() {
    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    var userId = "";
    if (curUserId) {
        userId = curUserId.value;
    }

    if (curUserId) {
        const bookingRequests = await prismadb.bookingRequests.findMany({
            where: {
                userBkId: userId,
                status: "PENDING",
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
                where: {
                    id: request.roomId
                }
            })
            const hostel = await prismadb.hostel.findFirst({
                where: {
                    id: request.hostelBkId,
                }
            });
            // Return an object containing both booking request and user data
            return {
                ...request,
                ...userData,
                roomData,
                ...hostel,
                bkId: request.id
            };
        }));
        return bookingData;
    }
}

const convertToBase64 = (bytes: any) => {
    return Buffer.from(bytes).toString("base64");
};

export async function rating(hostelID: number, data: any) {
    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    const userRtId = curUserId?.value ?? "";
    const hostelRtId = hostelID.toString();
    const rating = parseInt(data.rating);
    const message = data.feedback;
    const result = await prismadb.rating.create({
        data: {
            rating,
            message,
            userRtId,
            hostelRtId
        }
    })
    if (!result) {
        return {
            success: false,
            message: "Failed to comment",
            status: 500,
        };
    } else {
        return {
            success: true,
            message: `Your comment has been published created`,
            status: 200,
        };
    }

}
export async function getComments(hostelId: number | string) {
    try {
        const hostelIdStr = String(hostelId); // Convert hostelId to string

        // Fetch feedback where hostelRtId matches the given hostelId
        const feedback = await prismadb.rating.findMany({
            where: {
                hostelRtId: hostelIdStr,
            },
            include: {
                user: true, // Include the user table to fetch user details
            },
        });

        // Map the feedback to include userName
        const feedbackWithUserName = feedback.map((item) => ({
            ...item,
            userName: item.user?.name || "Unknown", // Safely access user name
        }));

        return feedbackWithUserName;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return false;
    }
}

export async function updateBookingStatus(id: string, status: string) {
    const existingBooking = await prismadb.bookingRequests.findUnique({
        where: { id }
    });

    if (!existingBooking) {
        return {
            success: false,
            message: "Booking request not found",
            status: 404,
        };
    }

    const result = await prismadb.bookingRequests.update({
        where: { id },
        data: { status }
    });

    return {
        success: true,
        message: `Booking request status updated: ${status}`,
        status: 200,
    };
}
