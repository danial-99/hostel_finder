"use server";

import { sendEmail } from "@/helpers/email";
import prismadb from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { sendOtp } from "../nodemailer/emailTemplates";
import { cookies } from "next/headers";

enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

function generateFourDigitOTP(): number {
  // Generate a random number between 1000 and 9999
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
}


export async function signUp(formData: FormData) {
  console.log(formData);
  try {
    const name = formData.get("username") as string;
    const role = formData.get("role") as UserRole;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const termsConditions = formData.get("terms&Conditions") as string;

    console.log(name, email, role, termsConditions, password);

    if (!name)
      return {
        status: 400,
        success: false,
        message: "Name is required",
        error: "Name is required",
      };
    if (!role)
      return {
        status: 400,
        success: false,
        message: "Role is required",
        error: "Role is required",
      };
    if (!email)
      return {
        status: 400,
        success: false,
        message: "Email is required",
        error: "Email is required",
      };
    if (!password)
      return {
        status: 400,
        success: false,
        message: "Password is required",
        error: "Password is required",
      };
    if (!termsConditions)
      return {
        status: 400,
        success: false,
        message: "Terms & Conditions acceptance is required",
        error: "Terms & Conditions acceptance is required",
      };

    // if([name, role, email, password, termsConditions].find((t) => t))

    //check if user already exists
    const existingUser = await prismadb.user.findFirst({
      where: {
        email: email,
        verifiction: true,
      },
    });

    if (existingUser) {
      return {
        status: 409,
        success: false,
        message: "User with this email already exists",
        error: "User with this email already exists",
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //sendEmail
    // const mailResponse = await sendEmail({
    //   from: "devshavaiz200@gmail.com",
    //   to: email,
    //   subject: "HostelFinder - Sign Up Confirmation",
    //   text: `Welcome to HostelFinder, ${name}. Please confirm your email address by clicking the link below:
    //   https://example.com/confirm-email/${email}`,
    //   html: `
    //   <h1>Welcome to HostelFinder, ${name}!</h1>
    //   <p>Please confirm your email address by clicking the link below:</p>
    //   <a href="https://example.com/confirm-email/${email}">Confirm Email</a>
    //   `,
    // });

    // console.log(mailResponse);

    const user = await prismadb.user.create({
      data: {
        name,
        role,
        email,
        password: hashedPassword,
        termsConditions: termsConditions === "on",
      },
    });

    //sending opt to user for email verification
    const otp: string = generateFourDigitOTP().toString();
    await prismadb.user.update({
      where: { email },
      data: { otp },
    });
    const mailReponse = await sendOtp(email, otp);
    
    //saving opt to cookie
    cookies().set("otp", otp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    cookies().set("userEamil", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: '/',
    });

    return {
      status: 201,
      success: true,
      message: `User created successfully ${mailReponse}`,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      // mailResponse,
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
