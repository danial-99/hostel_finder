"use server";
import prismadb from "@/lib/prisma";
import { cookies } from 'next/headers';
import bcrypt from "bcrypt";

export async function UpdatePassword(formData: FormData) {
  try {
    const cookieStore = cookies();
    const usrEmail = cookieStore.get("usrEmail"); // Get user email from cookies
    const newPassword = formData.get("password") as string;
    const userEmail = usrEmail?.value;
    console.log(newPassword, userEmail);
    // Validate the inputs
    if (!userEmail || !newPassword)
      return {
        status: 400,
        success: false,
        message: "Email and new password are required",
        error: "Email and new password are required",
      };

    // Check if the user exists
    const existingUser = await prismadb.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      return {
        status: 404,
        success: false,
        message: "Email not found",
        error: "Email not found",
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await prismadb.user.update({
      where: { email: userEmail },
      data: {
        password: hashedPassword, // Update password
      },
    });

    return {
      status: 200,
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    console.error("UpdatePassword error:", error);
    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: "Internal server error",
    };
  }
}
