"use client"
import AuthCarousel from "@/components/AuthCarousel"
import Login from "@/components/Login"
import Register from "@/components/Register"
import { useSearchParams } from "next/navigation"

const AuthComponent = () => {
  const searchParams = useSearchParams();
  const field_type = searchParams.get("type") ?? "login"
  return (
     <div className="w-full h-screen flex">
        <div className="flex flex-1 items-center bg-background">
            {
              field_type ==="register" ?<Register/> : <Login/>
            }
        </div>
        <div className="flex-[2] hidden md:flex justify-center items-center bg-sky-100">
            <AuthCarousel/>
        </div>
    </div>
  )
}

export default AuthComponent