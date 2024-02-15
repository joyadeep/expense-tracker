"use client"

import { Suspense } from "react"
import AuthComponent from "./auth"
import Loading from "@/components/Loading"
const Auth = () => {
  return (
    <Suspense fallback={<Loading/>}> 
      <AuthComponent />
    </Suspense>
  )
}

export default Auth