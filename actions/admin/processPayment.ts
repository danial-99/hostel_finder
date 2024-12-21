'use server';

import PlanSelection from "@/components/admin/subscription/PlaneSelection";
import prismadb from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function processPayment(plan: any) {
let subDate = new Date(); // Current date and time

    switch (plan.duration) {
        case "per month":
            subDate.setMonth(subDate.getMonth() + 1);
            break;
        case "per 6 month":
            subDate.setMonth(subDate.getMonth() + 6);
            break;
        case "per year":
            subDate.setFullYear(subDate.getFullYear() + 1);
            break;
        default:
            subDate.setMonth(subDate.getMonth() + 1); // Default to 1 month
            break;
    }
    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    const userId = curUserId?.value;
    const hostels = await prismadb.hostel.updateMany({
        where:{
            ownerId: userId
        }, 
        data:{
            subcriptionEnd: subDate
        }
    })
    if(hostels){
        return "subcription successfull";
    }
        
}
