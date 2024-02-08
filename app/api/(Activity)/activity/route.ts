import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async(req:Request)=>{
    try {
        const response = await db.activity.findMany({orderBy:{createdAt:"desc"}});
        return NextResponse.json({message:"success",data:response},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}

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