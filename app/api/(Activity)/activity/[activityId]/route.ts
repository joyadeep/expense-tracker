import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req:NextRequest,{params}:{params:{activityId:string}})=>{
    try {
        const activityId = params.activityId;
        if (!activityId){
            return NextResponse.json({message:"activity id is missing"},{status:400});
        }

        const {title,amount,category}=await req.json();

        if(!title || !amount || !category) {
            return NextResponse.json({message:"fields missing"},{status:400})
        }

        await db.activity.update({
            data:{
                title,
                amount,
                category
            },
            where:{
                id:activityId
            }
        })

        return NextResponse.json({message:"activity updated"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"something went wrong"},{status:500})
    }
}