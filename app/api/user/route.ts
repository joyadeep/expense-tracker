import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET= async ()=>{
    try {
        const users = await db.users.findMany()
        return NextResponse.json({message:"success",data:users},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}