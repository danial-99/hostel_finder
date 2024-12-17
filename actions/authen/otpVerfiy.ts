"use server";
import { cookies } from 'next/headers';
import prismadb from "@/lib/prisma";


export async function optVerification(otpEntered: any) {
  const cookieStore = cookies();
  const userEmail = cookieStore.get('usrEmail');
  var email = "";

  if(userEmail){
    email = userEmail.value;
  }

  const curUser = await prismadb.user.findFirst({
    where:{
      email,
    }
  })
  const otp = curUser?.otp?.toString();
  console.log("Enter otp is:", otpEntered.inputValue);
  console.log("otp from db is:", otp);
  if(otp){
    if(otpEntered.inputValue == otp.toString()) {
      await prismadb.user.update({
        where: { email },
        data: { otp },
      });
    return true;
  }else{
    return false;
  } 
}
}