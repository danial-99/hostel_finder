'use server';

import prismadb from "@/lib/prisma";
import { Buffer } from 'buffer';
import { cookies } from "next/headers";

export default async function getHostelsDetail(id: string) {
  console.log("run");

  const hostel = await prismadb.hostel.findUnique({
    where: {
      id,
    },
  });

  const rooms = await prismadb.roomType.findMany({
    where: {
      hostelId: id,
    },
  });

  if (rooms) {
    rooms.map((rm: any) => {
      // Ensure rm.image is valid before calling convertToBase64
      rm.image = rm.image ? convertToBase64(rm.image) : '';
    });
  }

  if (hostel) {
    // Use map to return a transformed object with Base64 conversions
    return {
      ...hostel,
      hostelImage: hostel.hostelImage ? convertToBase64(hostel.hostelImage) : '',
      electercityBill: hostel.electercityBill ? convertToBase64(hostel.electercityBill) : '',
      gasBill: hostel.gasBill ? convertToBase64(hostel.gasBill) : '',
      rooms,
    };
  } else {
    return false;  // Return false if no hostels were found
  }
}

export async function fetchHostelsDetail() {
  const cookieStore = cookies();
  const curUserId = cookieStore.get('userId');
  const userId = curUserId?.value;

  if (userId) {
    const hostel = await prismadb.hostel.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (hostel) {
      const rooms = await prismadb.roomType.findMany({
        where: {
          hostelId: hostel.id,
        },
      });

      if (rooms) {
        rooms.map((rm: any) => {
          // Ensure rm.image is valid before calling convertToBase64
          rm.image = rm.image ? convertToBase64(rm.image) : '';
        });
      }

      return {
        ...hostel,
        hostelImage: hostel.hostelImage ? convertToBase64(hostel.hostelImage) : '',
        electercityBill: hostel.electercityBill ? convertToBase64(hostel.electercityBill) : '',
        gasBill: hostel.gasBill ? convertToBase64(hostel.gasBill) : '',
        rooms,
        hostel,
      };
    } else {
      return false;  // Return false if no hostels were found
    }
  }
}

export async function getHostelsDetails() {
  const cookieStore = cookies();
  const curUserId = cookieStore.get('userId');
  const userId = curUserId?.value;

  if (userId) {
    const hostel = await prismadb.hostel.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (hostel) {
      const rooms = await prismadb.roomType.findMany({
        where: {
          hostelId: hostel.id,
        },
      });

      if (rooms) {
        rooms.map((rm: any) => {
          // Ensure rm.image is valid before calling convertToBase64
          rm.image = rm.image ? convertToBase64(rm.image) : '';
        });
      }

      return {
        ...hostel,
        hostelImage: hostel.hostelImage ? convertToBase64(hostel.hostelImage) : '',
        electercityBill: hostel.electercityBill ? convertToBase64(hostel.electercityBill) : '',
        gasBill: hostel.gasBill ? convertToBase64(hostel.gasBill) : '',
        rooms,
      };
    } else {
      return false;  // Return false if no hostels were found
    }
  }
}

const convertToBase64 = (bytes: any) => {
  // Check if the input is valid (not null or undefined)
  if (!bytes) {
    return '';  // Return empty string or a placeholder value
  }
  // Convert the valid bytes to Base64
  return Buffer.from(bytes).toString("base64");
};
