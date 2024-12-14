"use server";
import { cookies } from "next/headers";
import { sendOtp } from "../nodemailer/emailTemplates";

export async function resendOTP(){
    const cookieStore = cookies();
    const userEmail = cookieStore.get("userEmail");
    const email = "";
    if(userEmail){
        const email = userEmail.value;
    }
    function generateFourDigitOTP(): number {
        const otp = Math.floor(1000 + Math.random() * 9000);
        return otp;
    }
    const otp: string = generateFourDigitOTP().toString();
    await prismadb.user.update({
        where: { email },
        data: { otp },
      });
    const mailReponse = await sendOtp(email, otp);
    return mailReponse;
}