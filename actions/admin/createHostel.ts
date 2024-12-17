"use server";

import prismadb from "@/lib/prisma";
import { Buffer } from "buffer";

export async function createHostel(formD: any, userId: string) {
  try {
    // Collect all necessary fields from JSON strings
    const facilitiesData = JSON.parse(formD.get("facilitiesData") as string);
    const formData = JSON.parse(formD.get("hostelData") as string);
    const roomData = formData.rooms;
    const ownerName = formData.ownerName;
    const address = formData.address;
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

    // Create a new hostel entry
    const hostel = await prismadb.hostel.create({
      data: {
        owner: { connect: { id: userId } },
        hostelImage: hostelImageBuffer,
        hostelName: hostelName,
        ownerName,
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