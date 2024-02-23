import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
export const POST = async(req:NextRequest)=>{
    try {
        const {email} = await req.json();
        if (!email){
            return NextResponse.json({message:"Email is required"},{status:400})
        }

        const user = await db.users.findFirst({where:{email}});
        if (!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }

        const token = jwt.sign({email:email},process.env.JWT_SECRET!,{expiresIn:"24h"})

        const link = `https://${new URL(req.url).hostname}/reset-password?token=${token}`

        await db.resetPasswordRequest.create({
            data:{
                email:email,
                token:token,
                expiredAt:new Date(Date.now() + 24*60*60*1000)
            }
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dev.joyadeep@gmail.com',
                pass: process.env.MAIL_PASS
            }
        });
        
       await transporter.sendMail({
            from: 'dev.joyadeep@gmail.com',
            to: email,
            subject: 'Reset password',
            html: `
            <p>Hello,</p>
            <p>We received a request to reset your password. If you initiated this request, please click on the link below to reset your password. This link is valid for 24 hours.</p>
            <a href=${link}>Reset Password</a>
            <p>If you did not request a password reset, you can safely ignore this email.</p>
            <p>Please note that this link will expire after 24 hours. If you're unable to click the link, please copy and paste it into your browser's address bar.</p>
        `,
        })

        return NextResponse.json({message:"please check your email",data:link},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}