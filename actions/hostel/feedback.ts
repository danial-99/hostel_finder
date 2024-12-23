"use server";

import prismadb from "@/lib/prisma";


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
    if(!feedback){
        return {
            success: false,
            message: "Failed to create hostel",
            status: 500,
        };
    }
    else{
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