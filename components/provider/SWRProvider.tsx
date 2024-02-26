"use client"
import React, { ReactNode } from 'react'
import {SWRConfig} from "swr"
type Props = {}

const SWRProvider = ({children}:{children:ReactNode}) => {
  return (
    <SWRConfig value={{
        errorRetryInterval:0,
        errorRetryCount:3,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    }}>
        {children}
    </SWRConfig>
  )
}

export default SWRProvider