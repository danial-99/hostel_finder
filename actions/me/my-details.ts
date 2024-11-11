'use server';
import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function myDetails(userId: string) {
    if(!userId) {
        return NextResponse.json({
            success: false,
            message: 'UserId not found',
            status: 404,
            error: "User not found"
        })
    }
    try {
        const user = await prismadb.user.findUnique({
            where: {
                id: userId
            }
        })
        return NextResponse.json({
            success: true,
            message: "User details fetched successfully",
            data: user,
        })
    }
    catch (error) {
        console.error("[GET_USER_ERROR]", error);
        return NextResponse.json(
            {
                success: false,
                message: "An unexpected error occurred. Please try again.",
                error: "Internal server error",
            },
        )
    }
   
}