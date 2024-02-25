"use client"
import { ChevronLeft, ChevronRight, LockKeyhole, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge';


  const navitems = [
    {
      title:"Profile",
      icon:<UserRound size={20}/>,
      href:"/profile"
    },
    {
      title:"Change Password",
      icon:<LockKeyhole size={20} />,
      href:"/change-password"
    }
  ]
const UserSidenav = () => {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={twMerge("flex flex-col gap-3 text-lg  pr-6 transition-all duration-700 ease-in-out relative ",isOpen?"w-48":"w-10")}>
      <div onClick={()=>setIsOpen(!isOpen)}  className='hidden md:flex absolute -right-3 top-8 w-6 h-6 rounded-full bg-slate-200  justify-center items-center cursor-pointer'> {isOpen?<ChevronLeft className='text-black'/>:<ChevronRight className='text-black'/>} </div>
      {
        navitems.map((nav)=>(
            <Link key={nav.title} href={nav.href} className={twMerge('flex  items-center gap-2  hover:text-foreground/70 text-sm whitespace-nowrap',
            path===nav.href&& "font-semibold text-blue-500"
            )} ><span>{nav.icon}</span>  <span className={`overflow-hidden transition-all opacity-100 ${isOpen?"w-full ":"w-0 opacity-0 duration-700"}`}>{nav.title}</span></Link>
        ))
      }
  </div>
  )
}

export default UserSidenav