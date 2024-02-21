"use client"
import Header from "@/components/Header"
import MobileSidenav from "@/components/MobileSidenav"
import Sidenav from "@/components/Sidenav"
import { useState } from "react"

const Layout = ({children}:{children:React.ReactNode}) => {
    const [isOpen,setIsOpen]=useState(false);
    const [isMobileOpen,setIsMobileOpen]=useState(false);


    const toggleOpen = ()=>{
        setIsOpen((preval)=>!preval)
    }
    const toggleMobileOpen = ()=>{
      setIsMobileOpen((preval)=>!preval)
    }
  return (
    <div className="h-screen overflow-hidden flex flex-col">
            <Header toggleOpen={toggleOpen} toggleMobileOpen={toggleMobileOpen}/>
            <div className="flex flex-1 h-[calc(100vh-76px)]">
            {/* desktop sidenav */}
            <div className={`overflow-y-auto overflow-x-hidden ${isOpen ? "w-[250px]":"w-16"}  transition-all duration-300 hidden md:block `}>
                <Sidenav isOpen={isOpen}/>
            </div>
            {/* mobile sidebar */}
            <div className="block md:hidden">
              <MobileSidenav isOpen={isMobileOpen} toggleOpen={toggleMobileOpen} />
            </div>
            <div className=" overflow-y-auto bg-background  w-full px-3 md:px-10 pt-5 pb-2 ">
                {children}
            </div>
            </div>
    </div>
    
  )
}

export default Layout