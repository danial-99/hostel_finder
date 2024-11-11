"use server";

import { generateToken } from "@/lib/auth";
import prismadb from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function Login(formData: FormData) {
  console.log(formData);
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const remember = formData.get("remember") as string;

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

    // Check if user exists
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return {
        status: 404,
        success: false,
        message: "User not found",
        error: "User not found",
      };
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return {
        status: 401,
        success: false,
        message: "Invalid credentials",
        error: "Invalid credentials",
      };
    }

    // Generate token with remember me option
    const rememberMe = remember === "true";
    const token = generateToken(existingUser.id, rememberMe);

    // Set cookies
    cookies().set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60,
      sameSite: "strict",
      path: "/",
    });

    cookies().set("userRole", existingUser.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60,
      sameSite: "strict",
      path: "/",
    });

    return {
      status: 200,
      success: true,
      message: "Logged in successfully",
      data: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        token: token,
      },
    };
  } catch (error) {
    console.error("[USER_LOGIN]", error);
    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred. Please try again.",
      error: "Internal server error",
    };
  }
}
