'use server';
import prismadb from "@/lib/prisma";
import { Buffer } from 'buffer';

export default async function getHostelsDetail(id: string) {
  const hostel = await prismadb.hostel.findUnique({
    where:{
        id,
    }
  });

  const rooms = await prismadb.roomType.findMany({
    where:{
        hostelId: id
    }
  })

  if (hostel) {
    // Use map to return a transformed array
      return {
        ...hostel,
        hostelImage: convertToBase64(hostel.hostelImage),
        electercityBill: convertToBase64(hostel.electercityBill),
        gasBill: convertToBase64(hostel.gasBill),
        rooms,
      };
  } else {
    return false;  // Return false if no hostels were found
  }
}

const convertToBase64 = (bytes: any) => {
  return Buffer.from(bytes).toString("base64");
};
