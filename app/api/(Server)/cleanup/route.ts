import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async()=>{
    try {
        const response = await db.resetPasswordRequest.deleteMany({
            where:{
                expiredAt:{
                    lte:new Date()
                }
            }
        })
        return NextResponse.json({message:"success",data:response},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}