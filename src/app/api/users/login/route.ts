import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 

dotenv.config();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
        
    if (!email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    } 
        
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });  
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        message: "Invalid password",
        success: false
      });
    }

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const token = await jwt.sign(tokenData, 'process.env.TOKEN_SECRET', { expiresIn: "1d" });
    const res = NextResponse.json({
      message: "Login successfully",
      success: true
    });

    res.cookies.set("token", token, { httpOnly: true });

    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
