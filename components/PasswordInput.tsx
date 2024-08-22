"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Eye,EyeOff } from 'lucide-react'

type Props = {
    field:any;
    placeholder?:string;
}

const PasswordInput = ({field,placeholder="Enter password"}: Props) => {
    const [showPassword,setShowPassword] = useState(false);
  return (
    <div className='relative'>
        <Input type={showPassword ? "text" : "password"} placeholder={placeholder} className='pr-12' {...field}  />
        <div className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
        {
            showPassword ? <EyeOff strokeWidth={1} size={20}/> : <Eye strokeWidth={1} size={20}/>
        }
        </div>
    </div>
  )
}

export default PasswordInput