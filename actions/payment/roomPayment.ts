"use server"

import prismadb from "@/lib/prisma";
import { cookies } from 'next/headers';

export default async function bookingConfirm(id: string) {
    const cookieStore = cookies();
    const curUserId = cookieStore.get('userId');
    const userId = curUserId?.value;
    if(userId){
        const res = await prismadb.bookingRequests.update({
            where:{
                id,
            },
            data:{
                status: "PAID"
            }
        })
        if(res){
            return true;
        }
    }
    
}