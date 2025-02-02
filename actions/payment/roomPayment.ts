"use server"

import prismadb from "@/lib/prisma";
import { cookies } from 'next/headers';
import { sendBookingStatusEmail } from "../nodemailer/emailTemplates";

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
                status: "Payment Received"
            }
        })
        const user = await prismadb.user.findUnique({
            where:{
                id: userId,
            }
        })
        if(user){
            const mailResponse = await sendBookingStatusEmail(user.email, "Payment Received")
        }
        if(res){
            return true;
        }
    }
    
}