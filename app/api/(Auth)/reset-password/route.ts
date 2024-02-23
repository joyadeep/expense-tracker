import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db";
import bcrypt from "bcryptjs"

export const POST = async (req:NextRequest)=>{
    try {
        const {password,token}=await req.json();
        if (!password || !token){
            return NextResponse.json({message:"Invalid request"},{status:400})
        }

        const isTokenVerified = jwt.verify(token,process.env.JWT_SECRET!)

        if(!isTokenVerified){
            return NextResponse.json({message:"Invalid token"},{status:400})
        }

        const getUser = await db.resetPasswordRequest.findFirst({
            where:{
                token
            }
        })

        if(!getUser){
            return NextResponse.json({message:"No user found"},{status:404})
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const changePassword = await db.users.update({
            where:{
                email:getUser.email
            },
            data:{
                password:hashedPassword
            }

        })

        await db.resetPasswordRequest.delete({
            where:{
                token
            }
        })


        return NextResponse.json({message:"Password reset successfully",},{status:200})        
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}