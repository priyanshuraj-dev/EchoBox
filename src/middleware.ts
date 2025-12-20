import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){

    const token = await getToken({req,secret:process.env.NEXTAUTH_SECRET});
    const isAuth = !!token;
    const {pathname} = req.nextUrl;
    if(isAuth && (pathname.startsWith("/login") || pathname.startsWith("/signup"))){
        return NextResponse.redirect(new URL("/dashboard",req.url))
    }
    if(!isAuth && pathname.startsWith("/dashboard")){
        // this req.url uses the original domain
        return NextResponse.redirect(new URL("/login",req.url));
    }
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/dashboard/:path*",
    ]
}