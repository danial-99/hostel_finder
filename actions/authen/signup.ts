"use server";

import { sendEmail } from "@/helpers/email";
import prismadb from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { sendOtp } from "../nodemailer/emailTemplates";
import { cookies } from "next/headers";
import { generateOTP } from "@/lib/utils";

enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export async function signUp(formData: FormData) {
  try {
    const name = formData.get("username") as string;
    const role = formData.get("role") as UserRole;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const termsConditions = formData.get("terms&Conditions") as string;

    // Validate required fields
    if (!name || !role || !email || !password || !termsConditions) {
      const missingField = !name ? "Name" : !role ? "Role" : !email ? "Email" : !password ? "Password" : "Terms & Conditions";
      return {
        status: 400,
        success: false,
        message: `${missingField} is required`,
        error: `${missingField} is required`,
      };
    }

    // First check if a verified user exists with this email
    const verifiedUser = await prismadb.user.findFirst({
      where: {
        email: email,
        verifiction: true,
      },
    });

    if (verifiedUser) {
      // Check if the roles match to give a more specific error message
      if (verifiedUser.role === role) {
        return {
          status: 409,
          success: false,
          message: `An account with this email already exists as a ${role.toLowerCase()}`,
          error: "Account already exists",
        };
      } else {
        return {
          status: 409,
          success: false,
          message: `This email is already registered with a different role`,
          error: "Account exists with different role",
        };
      }
    }

    // Check for unverified user
    const unverifiedUser = await prismadb.user.findFirst({
      where: {
        email: email,
        verifiction: false,
      },
    });

    if (unverifiedUser) {
      const otp = generateOTP();
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update existing unverified user
      const updatedUser = await prismadb.user.update({
        where: { email },
        data: {
          name,
          role,
          password: hashedPassword,
          termsConditions: termsConditions === "true",
          otp,
        },
      });

      // Set email cookie
      cookies().set("usrEmail", email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        sameSite: "strict",
        path: '/',
      });

      // Try to send OTP email
      try {
        await sendOtp(email, otp);
        return {
          status: 200,
          success: true,
          message: "Verification email resent",
          data: {
            id: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
          },
          isResend: true,
        };
      } catch (emailError) {
        console.error("Failed to send OTP email:", emailError);
        return {
          status: 200,
          success: true,
          message: "Account exists but needs verification. OTP email failed to send.",
          data: {
            id: updatedUser.id,
            email: updatedUser.email,
            role: updatedUser.role,
          },
          emailError: true,
          isResend: true,
        };
      }
    }

    // Create new user if they don't exist
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = await prismadb.user.create({
      data: {
        name,
        role,
        email,
        password: hashedPassword,
        termsConditions: termsConditions === "true",
        otp,
      },
    });

    // Set email cookie
    cookies().set("usrEmail", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: '/',
    });

    // Try to send OTP email
    try {
      await sendOtp(email, otp);
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError);
      return {
        status: 201,
        success: true,
        message: "Account created but verification email failed to send",
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        emailError: true,
      };
    }

    return {
      status: 201,
      success: true,
      message: "Account created successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

  } catch (error) {
    console.error("[USER_SIGNUP]", error);
    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: "Internal server error",
    };
  }
}