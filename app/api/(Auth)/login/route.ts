import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";



export const POST=async(req:Request)=>{
try {
    const {username,password} = await req.json();
    if(!username || !password){
        return NextResponse.json({message:"Missing fields"},{status:400})
    }
    const user= await db.users.findFirst({where:{username}});

    if(!user){
        return NextResponse.json({message:"User not found"},{status:404})
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return NextResponse.json({message:"Invalid credentials"},{status:400})
    }
    const tokenData = {
        id:user.id,
        email:user.email,
        username:user.username
    }

    const token = jwt.sign(tokenData,process.env.JWT_SECRET!);
    // * remove userId response for production
    const response = NextResponse.json({message:"user logged in successfully",id:user.id},{status:200})
    response.cookies.set({
        name:"token",
        value:token,
        httpOnly:true,
        maxAge:60*60*24*7
    })
    return response;

} catch (error) {
    return NextResponse.json({error:"Internal Server Error"},{status:500})
}
}