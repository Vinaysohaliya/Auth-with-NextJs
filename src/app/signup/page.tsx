"use client"
import Link from "next/link"
import React from "react"
import {useState,useEffect } from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function signup() {
  const router=useRouter();
    const [user, setuser] = useState({
        name:"",
        email:"",
        password:"",
    })
    const [btnDisable,setbtnDisable]=useState(true)
 
    const signup=async()=>{
      try {
        const userData= await axios.post("/api/users/signup/",user);
        console.log(userData.data);
        router.push("/login")
        
      } catch (error:any) {
        console.log("signup failed",error.message);
        toast.error(error.message);
      }
    }

useEffect(() => {
  if (user.name.length>0&&user.email.length>0&&user.password.length>0) {
    setbtnDisable(false)
  }else{
    setbtnDisable(true)
  }
 
}, [user.email,user.name,user.password])
    

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="flex justify-center items-center   flex-col bg-black text-white
            border-solid border-2 border-sky-500  p-8">
          <div className="p-2 font-bold ">Signup</div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => setuser({ ...user, name: e.target.value })}
                className="p-2 border text-black w-70"
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setuser({ ...user, email: e.target.value })}
                className=" w-70 p-2 border text-black"
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setuser({ ...user, password: e.target.value })}
                className="w-70 p-2 border mb-2 text-black"
              />
            </div>
            <button disabled={btnDisable} onClick={signup} type="submit" className="bg-blue-500 text-white p-2 mb-2 rounded">
              Signup
            </button>
          <Link href="/login" className="mt-2 border-b-2 border-indigo-500 ">
            Visit Login Page
          </Link>
        </div>
        </div>
      );
}