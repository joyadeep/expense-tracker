"use client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {AlignRight, LogOut, Settings, UserRound} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";

interface IHeader {
  toggleOpen:()=>void;
  toggleMobileOpen:()=>void;
}


const Header = ({toggleOpen,toggleMobileOpen}:IHeader) => {
  const router = useRouter();
  const handleLogout=()=>{
    axiosInstance.post("/api/logout")
    .then((res)=>{
      toast.success(res.data.message);
      localStorage.removeItem("userId");
      router.replace("/auth")
    })
    .catch((error)=>{
      toast.error(error.response.data.message)
    });
    
  }
  return (
    <header className={` w-full sticky top-0 flex justify-between items-center border-b px-5 py-3 h-16 bg-background`}>
        <div className="flex items-center gap-2 text-foreground">
        <AlignRight onClick={toggleOpen} className="cursor-pointer hidden md:block" size={24} />
        <AlignRight onClick={toggleMobileOpen} className="cursor-pointer block md:hidden" size={24} />
        <Image alt="logo" src={"/logo.svg"} width={25} height={25} />
        </div>
        <div className="flex items-center gap-5">
          <ThemeToggle/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
              {/* <AvatarImage src="https://images.pexels.com/photos/11719062/pexels-photo-11719062.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" /> */}
              <AvatarFallback>JL</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer text-lg md:text-sm" onClick={() => router.push("/profile")}> <UserRound  className="mr-2 h-5 w-5 md:w-4 md:h-4"/> Profile</DropdownMenuItem>
                {/* <DropdownMenuItem className="cursor-pointer"> <Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem> */}
                <DropdownMenuItem className="cursor-pointer text-lg md:text-sm" onClick={handleLogout}> <LogOut className="mr-2 h-5 w-5 md:w-4 md:h-4"  /> Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </header>
  )
}

export default Header