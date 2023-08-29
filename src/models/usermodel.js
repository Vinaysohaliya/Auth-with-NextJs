import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,"Name is required"],
    unique:true,
},
email:{
    type:String,
    required:[true,"email is required"],
    unique:true,
},
password:{
    type:String,
    required:[true,"password is required"],    
},
isVerified:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false
},
 forgotPasswordToken:String,
 forgotPasswordExpiry:Date,
 verifyToken:String,
 verifyExpiry:Date
})

const User=mongoose.models.users||mongoose.model("users",userSchema);

export default User