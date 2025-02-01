"use server";

import prismadb from "@/lib/prisma";
import { Buffer } from "buffer";

export async function createHostel(formD: any, userId: string) {
  try {
    // Collect all necessary fields from JSON strings
    const facilitiesData = JSON.parse(formD.get("facilitiesData") as string);
    const formData = JSON.parse(formD.get("hostelData") as string);
    const roomData = JSON.parse(formD.get("roomData") as string);
    const ownerName = formData.ownerName;
    const address = formData.address;
    const category = formData.category;
    const electercityBill = (formD.get("electricityBill"));
    const gasBill = formD.get("gasBill");
    const latitude = formData.latitude;
    const longitude = formData.longitude;
    const hostelImage = formD.get("hostelImages");
    const hostelName = formData.hostelName;
    const country = formData.country;
    const province = formData.province;
    const city = formData.city;
    const zipCode = formData.zipCode;
    const type = formData.type;
    const cnic = formData.cnic;
    const phone = formData.phone;
    const roomDetails = formData.description;
    // const images = Array.from(formData.getAll("hostelImages")) as Array<string>; // Changed to hostelImages

    
    // Validation: Check for missing required fields
    if (!userId) {
      console.log('userId not found');
      return {
        success: false,
        message: "Unauthorized access!",
        status: 401,
      };
    }


    // Convert files to Buffer (binary data)
    const electricityBillBuffer = await fileToBuffer(electercityBill);
    const gasBillBuffer = await fileToBuffer(gasBill);
    const hostelImageBuffer = await fileToBuffer(hostelImage);

    await Promise.all(
      roomData.map(async (rm: any, i: any) => {
        const roomImage = formD.get(`roomImage_${i}`)
        if (roomImage) {
          const buffer = await fileToBuffer(roomImage);
          rm.image = buffer;
        } else{
          rm.image = null;
        }
      })
    );

    // Create a new hostel entry
    const hostel = await prismadb.hostel.create({
      data: {
        owner: { connect: { id: userId } },
        hostelImage: hostelImageBuffer,
        hostelName: hostelName,
        ownerName,
        category,
        country: country,
        province: province,
        city: city,
        longitude,
        latitude,
        address,
        zipCode: zipCode,
        cnic: cnic,
        phone: phone,
        gasBill: gasBillBuffer,
        electercityBill: electricityBillBuffer,
        description: roomDetails || "",
        status: "PENDING",
        type: type,
        rooms: { create: roomData },
        facilities: Object.keys(facilitiesData),
      }
      
    });

    
    if (!hostel) {
      return {
        success: false,
        message: "Failed to create hostel",
        status: 500,
      };
    }
    
    return {
      success: true,
      message:
        "Hostel created successfully. You will be notified once it's approved.",
      status: 201,
      data: hostel,
    };
  } catch (error) {
    console.error("Error creating hostel:", error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
}

// Helper to decode base64 string into buffer
function fileToBuffer(base64: string): Buffer {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64Data, "base64");
}

export async function updateGeneralDetails(hostelId: string, details: any) {
  try {
    const updatedHostel = await prismadb.hostel.update({
      where: { id: hostelId },
      data: {
        hostelName: details['Hostel Name'],
        country: details['Country'],
        province: details['Province'],
        city: details['City'],
        zipCode: details['Zip Code'],
        type: details['Type'],
        category: details['Category'],
        cnic: details['CNIC'],
        phone: details['Phone'],
        description: details['Description'],
      },
    });

    return {
      success: true,
      message: 'General details updated successfully.',
      data: updatedHostel,
    };
  } catch (error) {
    console.error('Error updating general details:', error);
    return {
      success: false,
      message: 'Failed to update general details.',
    };
  }
}

export async function updateFacilities(hostelId: string, facilitiesData: Record<string, boolean>) {
  try {
    const updatedFacilities = Object.keys(facilitiesData).filter(key => facilitiesData[key]);

    const updatedHostel = await prismadb.hostel.update({
      where: { id: hostelId },
      data: {
        facilities: updatedFacilities,
      },
    });

    return {
      success: true,
      message: 'Facilities updated successfully.',
      data: updatedHostel,
    };
  } catch (error) {
    console.error('Error updating facilities:', error);
    return {
      success: false,
      message: 'Failed to update facilities.',
    };
  }
}

export async function updateRoomDetails(rooms: any[]) {
  try {
    const updatePromises = rooms.map((room) => {
      return prismadb.roomType.update({
        where: { id: room.id },
        data: {
          price: Number(room.price), // Convert price to number
          numberOfRooms: Number(room.numberOfRooms), // Convert numberOfRooms to number
        },
      });
    });

    await Promise.all(updatePromises);

    return {
      success: true,
      message: "Room details updated successfully.",
    };
  } catch (error) {
    console.error("Error updating room details:", error);
    return {
      success: false,
      message: "Failed to update room details.",
    };
  }
}
