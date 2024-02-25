"use client"
import { BedSingle, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { twMerge } from 'tailwind-merge';


  const navitems = [
    {
      title:"Profile",
      icon:<LayoutGrid size={16}/>,
      href:"/profile"
    },
    {
      title:"History",
      icon:<BedSingle size={16} />,
      href:"/history"
    }
  ]
const UserSidenav = () => {
    const path = usePathname();
  return (
    <div className="flex flex-col gap-3 text-sm ">
      {
        navitems.map((nav)=>(
            <Link key={nav.title} href={nav.href} className={twMerge('flex items-center gap-2 rounded-full hover:text-foreground/70',
            path===nav.href&& "font-semibold"
            )} ><span>{nav.icon}</span> {nav.title}</Link>
        ))
      }
  </div>
  )
}

export default UserSidenav