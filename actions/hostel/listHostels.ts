'use server';
import prismadb from "@/lib/prisma";
import { Buffer } from 'buffer';

export default async function getHostelsList() {
  const hostels = await prismadb.hostel.findMany();

  if (hostels.length > 0) {
    // Use map to return a transformed array
    return hostels.map((hostel) => {
      return {
        ...hostel,
        hostelImage: convertToBase64(hostel.hostelImage),
        electercityBill: convertToBase64(hostel.electercityBill),
        gasBill: convertToBase64(hostel.gasBill),
      };
    });
  } else {
    return false;  // Return false if no hostels were found
  }
}

const convertToBase64 = (bytes: any) => {
  return Buffer.from(bytes).toString("base64");
};
