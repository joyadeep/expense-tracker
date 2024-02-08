"use client"
import Header from "@/components/Header"
import Sidenav from "@/components/Sidenav"
import { useState } from "react"

const Layout = ({children}:{children:React.ReactNode}) => {
    const [isOpen,setIsOpen]=useState(false);

    const toggleOpen = ()=>{
        setIsOpen((preval)=>!preval)
    }
  return (
    <div className="h-screen overflow-hidden flex flex-col">
            <Header toggleOpen={toggleOpen}/>
            <div className="flex flex-1 h-[calc(100vh-76px)]">
            <div className={`overflow-y-auto overflow-x-hidden ${isOpen ? "w-[250px]":"w-16"}  transition-all duration-300 `}>
                <Sidenav isOpen={isOpen}/>
            </div>
            <div className="  overflow-y-auto bg-white  w-full px-10 pt-5 mb-2 ">
                {children}
            </div>
            </div>
    </div>
  )
}

export default Layout