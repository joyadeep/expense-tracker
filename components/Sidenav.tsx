import {History, LayoutGrid} from 'lucide-react';
import {usePathname} from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import TooltipAction from './TooltipAction';
import Link from 'next/link';
const Sidenav = ({isOpen}:{isOpen:boolean}) => {
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
    <div className="px-2 border-r h-full shadow-md ">
      
      <div className="relative flex flex-col gap-2 pt-5">
        {
          navitems.map((nav)=>(
            <TooltipAction label={nav.title} align='center' side='right' key={nav.title} condition={!isOpen}>
              <Link href={nav.href} key={nav.title} className={
              twMerge('h-9 relative flex items-center gap-2 px-2 py-2  border border-transparent hover:border-blue-400  ',
              path===nav.href? "bg-blue-500/20 text-blue-500 font-medium" : "text-foreground",
              isOpen? "rounded-full" : "rounded-md justify-center gap-0 transition-all duration-500"
              )
            
            }>
              <span>{nav.icon}</span> 
            <span className={`overflow-hidden transition-all opacity-100 ${isOpen?"w-full ":"w-0 opacity-0 duration-700"}`}>{nav.title}</span> 
             </Link>
            </TooltipAction>
          ))
        }
      </div>
    </div>
  )
}

export default Sidenav