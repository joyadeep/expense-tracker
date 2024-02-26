import { Database } from 'lucide-react'
import React from 'react'

interface Ierror{
    message:string;
    hideIcon?:boolean;

}

const Error = ({message,hideIcon}:Ierror) => {
  return (
    <div className='w-full h-full flex flex-col gap-3 justify-center items-center'>
        {!hideIcon && 
        <div  className='w-24 h-24 bg-red-500 rounded-full flex items-center justify-center'>
            <Database size={40} className='text-white'/>
        </div>}
        <p className='text-foreground/80'>{message}  </p>
    </div>
  )
}

export default Error