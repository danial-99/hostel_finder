"use server";

import prismadb from "@/lib/prisma";

export async function approvedHostels(ownerId: string) {
  const hostels = await prismadb.hostel.findMany({
    where: {ownerId},
  });
  return hostels;
}