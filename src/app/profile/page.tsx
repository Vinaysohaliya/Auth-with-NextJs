"use client"

import axios from "axios"
import {useRouter} from "next/navigation"
import { toast } from "react-hot-toast"

export default function userProfile() {
    const router=useRouter()
    const logout=async()=>{
        try {            
            await axios.get("/api/users/logout")
            toast.success('logout Succesfully')
            router.push('/login')
        } catch (error:any) {
         toast.error("logout Fail") 
         console.log(error.message);
           
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className=" text-4xl"></p>
            <button onClick={logout} className="rounded bg-blue-500 text-white p-2 mb-2">Logout</button>
        </div>
    )
}