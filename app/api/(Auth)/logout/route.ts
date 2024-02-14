import { NextResponse } from "next/server"

export const POST =async()=>{
    try {
        const response = NextResponse.json({message:"user logged out successfully"},{status:200})
        response.cookies.delete("token")
        return response;
    } catch (error) {
        return NextResponse.json({message:"something went wrong"},{status:500})
    }
}