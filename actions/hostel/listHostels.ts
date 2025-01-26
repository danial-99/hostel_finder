'use server';
import prismadb from "@/lib/prisma";
import { Buffer } from 'buffer';
import { date } from "zod";

export default async function getHostelsList() {
  const hostels = await prismadb.hostel.findMany({
    where: {
      subcriptionEnd: {
        lt: new Date() // `lt` stands for "less than"
      },
      status: "APPROVED"
    }
  });

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

export async function getTopHostelsList() {
  const hostels = await prismadb.hostel.findMany({
    where: {
      subcriptionEnd: {
        gt: new Date() // `lt` stands for "less than"
      },
      status: "APPROVED"
    }
  });

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

export async function getApprovedHostelsList() {
  const hostels = await prismadb.hostel.findMany({
    where: {
      status: "APPROVED"
    }
  });

  if (hostels.length > 0) {
    return hostels.map((hostel) => {
      return {
        ...hostel,
        hostelImage: convertToBase64(hostel.hostelImage),
        electercityBill: convertToBase64(hostel.electercityBill),
        gasBill: convertToBase64(hostel.gasBill),
      };
    });
  } else {
    return false;
  }
}

export async function getAllHostelsList() {
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

export async function getFullDetials() {
  const hostels = await prismadb.hostel.findMany();

  if (hostels.length > 0) {
    // Use map to return a transformed array
    return hostels.map(async (hostel) => {
      const userData = await prismadb.user.findMany({
        where: {
          id:hostel.ownerId
        }
      })
      return {
        ...hostel,
        hostelImage: convertToBase64(hostel.hostelImage),
        electercityBill: convertToBase64(hostel.electercityBill),
        gasBill: convertToBase64(hostel.gasBill),
        ...userData,
      };
    });
  } else {
    return false;  // Return false if no hostels were found
  }
}

export async function getStatistics() {
  const totalUsers = await prismadb.user.count();
  const totalHostels = await prismadb.hostel.count();
  const totalBookings = await prismadb.bookingRequests.count();

  return {
    totalUsers,
    totalHostels,
    totalBookings
  };
}
export async function getRvenue() {
  const totalUsers = await prismadb.user.count();
  const totalHostels = await prismadb.hostel.count();
  const totalBookings = await prismadb.bookingRequests.count();

  return {
    totalUsers,
    totalHostels,
    totalBookings
  };
}

const convertToBase64 = (bytes: any) => {
  return Buffer.from(bytes).toString("base64");
};
