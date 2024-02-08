import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest,{params}:{params:{userId:string}})=>{
    try {
        const pageSize = 10;
        const query = req.nextUrl.searchParams;
        const pageNumber = query.get("pageNumber") ?? 1;
       
        const offset = ((typeof pageNumber === "string" ? parseInt(pageNumber) : pageNumber) - 1) * pageSize;

        const totalCount= await prisma?.activity.count({where:{userId:params.userId}}) ?? 0
        const totalPages= Math.ceil(totalCount/pageSize)

        const response= await db.activity.findMany({
            take:pageSize,
            skip:offset,
            orderBy:{createdAt:"desc"},
            where:{userId:params.userId}})
            
        if(response.length ===0){
            return NextResponse.json({message:"No activity found"},{status:404})
        }
        return NextResponse.json({message:"success",currentPage:pageNumber,totalPages:totalPages,data:response},{status:200})
    } catch (error) {
        return NextResponse.json({message:"something went wrong",error:error},{status:500})
    }
}
