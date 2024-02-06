import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
export const POST=async(req:Request)=>{
try {
    const {email,password} = await req.json();
    if(!email || !password){
        return NextResponse.json({message:"Missing fields"},{status:400})
    }
    const user= await db.users.findFirst({where:{email}});
    if(!user){
        return NextResponse.json({message:"User not found"},{status:404})
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return NextResponse.json({message:"Invalid credentials"},{status:401})
    }
    const token = jwt.sign({email},process.env.JWT_SECRET!);
    return NextResponse.json({message:"success",data:user,token:token},{status:200})

} catch (error) {
    return NextResponse.json({error:"Internal Server Error"},{status:500})
}
}