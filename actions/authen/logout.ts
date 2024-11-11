"use server";

import { cookies } from "next/headers";

export async function logoutByCookies() {
  try {
    const cookieStore = cookies();

    // Clear cookies with all possible options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    };

    // Remove cookies
    cookieStore.delete("accessToken");
    cookieStore.delete("userRole");

    // Set empty cookies as backup
    cookieStore.set("accessToken", "", cookieOptions);
    cookieStore.set("userRole", "", cookieOptions);

    return { success: true, message: "Logout Successfully" };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Logout Failed" };
  }
}
