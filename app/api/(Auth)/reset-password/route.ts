import { NextRequest, NextResponse } from "next/server"

export const POST = async (req:NextRequest)=>{
    try {
        const {password,token}=await req.json();
        return NextResponse.json({message:"success"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"something went wrong "},{status:500})
    }
}