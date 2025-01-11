"use server"
import { cookies } from 'next/headers';

export async function getUserId() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId');
  
  if (userId) {
    return userId.value;
  } else {
    return "";
  }
}
