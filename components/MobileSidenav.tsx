import { usePathname } from "next/navigation";
import { Sheet, SheetContent } from "./ui/sheet"
import { History, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface IMobileSidenav{
    isOpen:boolean;
    toggleOpen:()=>void;
}

const MobileSidenav = ({isOpen,toggleOpen}:IMobileSidenav) => {
    const path = usePathname();
    const navitems = [
      {
        title:"Dashboard",
        icon:<LayoutGrid size={18}/>,
        href:"/dashboard"
      },
      {
        title:"History",
        icon:<History size={18} />,
        href:"/history"
      }
    ]
  return (
   <Sheet open={isOpen} onOpenChange={toggleOpen}>
    <SheetContent side={"left"}>
    <div className="-z-50 relative flex flex-col gap-2 pt-5">
        {
          navitems.map((nav)=>(
              <Link href={nav.href} onClick={toggleOpen} key={nav.title} className={
              twMerge('h-9 relative flex items-center gap-2 px-2 py-2  border border-transparent hover:border-blue-400  ',
              path===nav.href? "bg-blue-500/20 text-blue-500 font-medium" : "text-foreground",
              isOpen? "rounded-full" : "rounded-md justify-center gap-0 transition-all duration-500"
              )
            
            }>{nav.icon} 
            <span className={`overflow-hidden transition-all opacity-100 ${isOpen?"w-full ":"w-0 opacity-0 duration-700"}`}>{nav.title}</span> 
             </Link>
          ))
        }
      </div>
    </SheetContent>
   </Sheet>
  )
}

export default MobileSidenav