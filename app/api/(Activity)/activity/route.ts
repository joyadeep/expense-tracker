import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// CREATE new Activity
export const POST = async(req:Request)=>{
    try {
        const {title,amount,category,userId}=await req.json();
        
        if (!title || !amount || !category || !userId) {
            return NextResponse.json({message:"Fields missing"},{status:400})
        }
        const data =await db.activity.create({
            data:{
                title,
                amount,
                category,
                userId
            }
        })
        return NextResponse.json({message:"Activity created",data:data},{status:201})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}