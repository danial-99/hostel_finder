"use server";

import prismadb from "@/lib/prisma";

export async function listPendingHostel() {
  const hostels = await prismadb.hostel.findMany({
    where: { status: "PENDING" },
  });
  return hostels;
}