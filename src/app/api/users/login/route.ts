import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/usermodel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest) {
    try {

        const reqBody= await request.json();
        console.log(reqBody);
        const {email,password}=reqBody;
        
        if (!email||!password) {
            return NextResponse.json({message:"All feild Are required"},{status:400});
        } 
        
        const user= await User.findOne({email});
        if (!user) {
        return NextResponse.json({message:"user not find"},{status:404})  
        }

        const tokenData={
            id:user._id,
            name:user.name,
            email:user.email
        }
        const token =await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expireIn:"1d"});
        const res=NextResponse.json({
            message:"login Succesfully",
            success:true
        })

        console.log(res);
        res.cookies.set("token",token,{httpOnly:true})

        return res;
        

        
        
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}