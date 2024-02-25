import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export const PUT =async(req:NextRequest,{params}:{params:{userId:string}})=>{
    try {
        const {userId} = params;
        const {password} = await req.json();

        if (!password){
            return NextResponse.json({message:"new password is required"},{status:400})
 
       }
       const salt= bcrypt.genSaltSync(10);
       const hashedPassword = bcrypt.hashSync(password,salt);

        await db.users.update({
            where:{
                id:userId
            },
            data:{
                password:hashedPassword
            }
        })

        return NextResponse.json({message:"Password changed successfully"},{status:200})

    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}