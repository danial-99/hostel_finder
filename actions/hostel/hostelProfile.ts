'use server';
import prismadb from "@/lib/prisma";
import { Buffer } from 'buffer';
import { cookies } from "next/headers";
import { Z_STREAM_END } from "zlib";

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

  if(rooms){
    rooms.map((rm: any) =>{
      rm.image = convertToBase64(rm.image)
    })
  };
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

export async function fetchHostelsDetail() {

   const cookieStore = cookies();
      const curUserId = cookieStore.get('userId');
      const userId = curUserId?.value;
      if(userId){
        const hostel = await prismadb.hostel.findFirst({
          where:{
              ownerId: userId,
          }
        });
      if(hostel){
        const rooms = await prismadb.roomType.findMany({
          where:{
              hostelId: hostel.id
          }
        })
        if(rooms){
          rooms.map((rm: any) =>{
            rm.image = convertToBase64(rm.image)
          })
        };
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
  }

const convertToBase64 = (bytes: any) => {
  return Buffer.from(bytes).toString("base64");
};
