"use client"
import Link from "next/link"
import React from "react"
import {useState ,useEffect} from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast/headless"

export default function LoginPage() {
    const [user, setuser] = useState({
        email:"",
        password:"",
    })

    const router=useRouter();
    const [btnDisable,setbtnDisable]=useState(true)


    useEffect(() => {
      if (user.email.length>0&&user.password.length>0) {
        setbtnDisable(false)
      }else{
        setbtnDisable(true)
      }
    },[user.email,user.password])
    

    const login=async()=>{
      try {
        const userData= await axios.post("/api/users/login",user);
        console.log(userData.data);
        router.push("/profile")
        
      } catch (error:any) {
        console.log("login failed",error.message);
        toast.error(error.message);
      }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="flex justify-center items-center   flex-col bg-black text-white
            border-solid border-2 border-sky-500  p-8">
          <div className="p-2 font-bold ">Login</div>
            
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
            <button disabled={btnDisable} onClick={login} type="submit" className="rounded bg-blue-500 text-white p-2 mb-2">
              Login
            </button>
          <Link href="/signup" className="mt-2 border-b-2  border-indigo-500">
            Visit Signup Page
          </Link>
        </div>
        </div>
      );
}