import { NextRequest, NextResponse } from "next/server";
import {verifyJwtToken} from "@/lib/verifyToken"
export async function middleware (request:NextRequest) {

    const path= request.nextUrl.pathname;
    const publicPath= ["/" ,"/auth"];
    const publicRoutes = ["/api/login","/api/register"]

    const isPublicPath = publicPath.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const token = request.cookies.get("token")?.value;

    const verifiedToken = token && 
    ( await verifyJwtToken(token).catch((error)=>{
        console.log("Token verification error ",error)
    }) 
    )

    if(path.startsWith("/api")) {
        if(isPublicRoute){
            return NextResponse.next();
        }
        else if(!isPublicRoute && !verifiedToken){
            return NextResponse.json({message:"Unauthorized user"},{status:401})
        }
    }

    if (isPublicPath && verifiedToken) {
        return NextResponse.redirect(new URL("/dashboard",request.url))
    }

    if (!isPublicPath && !verifiedToken) {
        return NextResponse.redirect(new URL("/auth",request.url))
    }
}

export const config = {
    matcher :["/","/auth","/dashboard","/history" ,"/api/:path*"]
    // matcher :["/:path*"]
}