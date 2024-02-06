import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req:Request,{params}:{params:{userId:string}})=>{
    try {
        const user = await db.users.findFirst({where:{id:params.userId}});
        if (!user) {
            return NextResponse.json({message:"User not found"},{status:404})
        }
        return NextResponse.json({message:"success",data:user},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Something went wrong"},{status:500})
    }
}