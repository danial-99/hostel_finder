"use server";

import prismadb from "@/lib/prisma";
import { sendReportEmail } from "../nodemailer/emailTemplates";


export default async function feedback(data: any){
    const name = data.name;
    const email = data.email;
    const hostelName = data.hostelName;
    const hostelAddress = data.hostelAddress;
    const subject = data.subject;
    const description = data.description;

    const bookingRequest = await prismadb.feedback.create({
        data:{
            name, 
            email,
            hostelName,
            hostelAddress,
            subject,
            description
        }
    })
    if(!bookingRequest){
        return {
            success: false,
            message: "Failed to create hostel",
            status: 500,
        };
    }
    else{
        const hostelOwner = await prismadb.hostel.findFirst({
            where:{
                hostelName: data.hostelName,
            }
        })
        const ownerData = await prismadb.user.findUnique({
            where:{
                id: hostelOwner?.ownerId,
            }
        })
        var mailResponse;
        if(ownerData){
             mailResponse = await sendReportEmail(ownerData.email);
        }
        
        return{
            success: true,
            message: "Feebback Submitted",
            status: 200,
        }
       
    }
}

export async function getFeedBack() {
    const feedback = await prismadb.feedback.findMany();
    if(feedback){
        return feedback;
    }else{
        return false;
    }
}