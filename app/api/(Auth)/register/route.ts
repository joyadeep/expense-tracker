import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req:Request)=>{
    try {
        const {username,email,password,role} = await req.json();
        if(!username || !email || !password){
            return NextResponse.json({message:"Missing fields"},{status:400});
        }

        const  existingUsername = await prisma?.users.findUnique({where:{username}});
        if (existingUsername?.username === username)
            return NextResponse.json({message:"Username already taken"},{status:409});

        const existingEmail = await prisma?.users.findUnique({where:{email}});
        if (existingEmail?.email === email)
            return NextResponse.json({message:"Email already taken"},{status:409});
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await db.users.create({
            data:{
                username:username,
                email:email,
                password:hashedPassword,
                role:role
            }
        })
        
        return NextResponse.json({message:"success",data:user},{status:201});
    } catch (error) {
        console.log("error",error);
        return new NextResponse("internal error",{status:500});
    }
}