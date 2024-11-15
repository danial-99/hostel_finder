"use server";
import { sendEmail } from "@/helpers/email";
import prismadb from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";

export async function ForgetPassword(formData: FormData) {
  try {
    const email = formData.get("email") as string;

    if (!email)
      return {
        status: 400,
        success: false,
        message: "Email is required",
        error: "Email is required",
      };

    // Check if user exists
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return {
        status: 404,
        success: false,
        message: "Email not found",
        error: "Email not found",
      };
    }

    // Generate OTP
    const otp = generateOTP();

    await prismadb.user.update({
      where: { email },
      data: { otp },
    });

    // Send OTP via email
    await sendEmail({
      from: "alishahaman652@gmail.com",
      to: email,
      subject: "Confirm OTP",
      text: "hello world",
    });

    return {
      status: 200,
      success: true,
      message: `We have sent an OTP code to your email address ${
        existingUser.email
      }`,
      data: {
        email: existingUser.email,
      },
    };
  } catch (error) {
    console.error("ForgetPassword error:", error);
    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: "Internal server error",
    };
  }
}
