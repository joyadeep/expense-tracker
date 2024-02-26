import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest,{params}:{params:{userId:string}}) => {
    const activities = await db.activity.findMany({where:{userId:params.userId},orderBy:{createdAt:"desc"}});
    return NextResponse.json({message:"success",data:activities},{status:200})
}