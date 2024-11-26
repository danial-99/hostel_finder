import { cookies } from 'next/headers';

export async function optVerification(otpEntered: string) {
  const cookieStore = cookies();
  const otp = cookieStore.get('otp');
  
  if(otp){
    if(otpEntered == otp.value) {
        return true;
  }else{
    return false;
  } 
}
}