import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {AlignRight} from 'lucide-react'

interface IHeader {
  toggleOpen:()=>void;
}

const Header = ({toggleOpen}:IHeader) => {
  return (
    <header className={` w-full sticky top-0 flex justify-between items-center px-5 py-3 h-16 bg-background`}>
        <div className="flex items-center gap-2 text-foreground">
        <AlignRight onClick={toggleOpen} className="cursor-pointer" size={24} />
        <div className="text-foreground">Logo</div>
        </div>
        <Avatar className="cursor-pointer">
          {/* <AvatarImage src="https://images.pexels.com/photos/11719062/pexels-photo-11719062.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" /> */}
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
    </header>
  )
}

export default Header