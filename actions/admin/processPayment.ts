'use server';

import PlanSelection from "@/components/admin/subscription/PlaneSelection";
import prismadb from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function processPayment(plan: any) {
    var subDate; // To hold the subscription end date

// Get the current date
const currentDate = new Date();

// Switch based on the plan's duration
switch(plan.duration) {
    case "per month":
        subDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        break;
    case "per 6 months":
        subDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
        break;
    case "per year":
        subDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
        break;
    default:
        // Default case is per month
        subDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        break; 
}

// Update the subscription end date for hostels


    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    const userId = curUserId?.value;
    const hostels = await prismadb.hostel.updateMany({
        where: {
            ownerId: userId
        },
        data: {
            subcriptionEnd: subDate
        }
    });
    if(hostels){
        return "subcription successfull";
    }
}