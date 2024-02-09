"use client"

import { Suspense } from "react"
import AuthComponent from "./auth"
const Auth = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> {/* // TODO: create fallback UI  */}
      <AuthComponent />
    </Suspense>
  )
}

export default Auth