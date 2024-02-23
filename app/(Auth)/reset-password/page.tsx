import Loading from '@/components/Loading'
import React, { Suspense } from 'react'
import ResetPassword from './reset'

type Props = {}

const page = (props: Props) => {
  return (
    <Suspense fallback={<Loading/>}>
        <ResetPassword/>
    </Suspense>
  )
}

export default page