"use server";
import { cookies } from 'next/headers';

export async function optVerification(otpEntered: string) {
  const cookieStore = cookies();
  const otp = cookieStore.get('otp');
  const userEmail = cookieStore.get('userEmail');
  var email = "";

  if(userEmail){
    email = userEmail.value;
  }
  
  if(otp){
    if(otpEntered == otp.value) {
      const verifyEmail = await prismadb.user.data({
        where:{email},
        data:{
          verifiction: true
        }
      },
    );
      
    return true;
  }else{
    return true;
  } 
}
}