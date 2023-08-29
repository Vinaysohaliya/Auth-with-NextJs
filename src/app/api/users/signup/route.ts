import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/usermodel"
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest){

    try {
        const reqBody=await request.json()
        const {email,password,name}=reqBody;
        console.log(reqBody);
 
        if (!email||!password||!name) {
           return NextResponse.json({message:"all feild are required"})
        }
        

        const user=await User.findOne({email});

        if (user) {
            return NextResponse.json({error:"user alredy exist"},{status:400})
        }
        //hash password
        const slat=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,slat)

       const newUser= new User({
            name,
            email,
            password:hashPassword
        })

        const saveUser=newUser.save()
        console.log(saveUser);
        
        return NextResponse.json({message:"user save successfully",success:true,saveUser})
        
    } catch (error:any) {
        return NextResponse.json({error:error.messsage},
            {status:500})
        
    }

}