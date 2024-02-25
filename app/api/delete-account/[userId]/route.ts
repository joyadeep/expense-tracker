import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"
import { db } from "@/lib/db";

export const DELETE = async (req:NextRequest,{params}:{params:{userId:string}}) =>{
    try {
        const userId = params.userId;

        if (!userId){
            return NextResponse.json({message:"User Id is required"},{status:400})
        }

        const token = req.cookies.get("token")?.value;
        if(!token){
            return NextResponse.json({message:"Unauthorized user"},{status:401})
        }

        const decoded = jwt.decode(token) as JwtPayload;

        if (decoded?.id !== userId){
            return NextResponse.json({message:"Unauthorized user"},{status:401})
        }
        
        await db.users.delete({where:{id:userId}});
        return NextResponse.json({message:"User deleted successfully"},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}