import Loading from '@/components/Loading'
import React, { Suspense } from 'react'
import ResetPassword from './reset'

const page = () => {
  return (
    <Suspense fallback={<Loading/>}>
        <ResetPassword/>
    </Suspense>
  )
}

export default page