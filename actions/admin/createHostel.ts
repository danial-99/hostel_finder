"use server";

import prismadb from "@/lib/prisma";

export async function createHostel(formData: FormData, userId: string) {
  try {
    // Collect all necessary fields from JSON strings
    const hostelData = JSON.parse(formData.get("hostelData") as string);
    const roomData = JSON.parse(formData.get("roomData") as string);
    const facilitiesData = JSON.parse(formData.get("facilitiesData") as string);
    const hostelImage = hostelData.hostelImage;
    const hostelName = hostelData.hostelName;
    const country = hostelData.country;
    const province = hostelData.province;
    const city = hostelData.city;
    const zipCode = hostelData.zipCode;
    const type = hostelData.type;
    const cnic = hostelData.cnic;
    const phone = hostelData.phone;
    const roomDetails = hostelData.description;
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

    // Create a new hostel entry
    const hostel = await prismadb.hostel.create({
      data: {
        owner: { connect: { id: userId } },
        // hostelImage?: null,
        hostelName: hostelName,
        country: country,
        province: province,
        city: city,
        zipCode: zipCode,
        cnic: cnic,
        phone: phone,
        description: roomDetails || "",
        status: "PENDING",
        type: type,
        rooms: { create: roomData },
        facilities: Object.keys(facilitiesData),
      },
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
