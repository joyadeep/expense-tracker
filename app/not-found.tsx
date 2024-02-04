import notfound from "@/public/images/notfound.png"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
const NotFound = () => {
  return (
    <div className="px-5 md:px-10 flex flex-col md:flex-row items-center h-screen ">
        <Image alt="error page" src={notfound} />
        <div className="flex flex-col gap-5">
            <div className="text-slate-700 text-md md:text-lg"><span className="underline underline-offset-8">Error</span> 404</div>
            <p className="font-bold text-4xl md:text-7xl tracking-tighter">there is light in here too. </p>
            <p className="text-md md:text-lg text-slate-800">But the page is missing or you assembled the link incorrectly.</p>
            <Link href={"/"} replace className="w-fit text-left text-slate-800 flex items-center hover:underline hover:underline-offset-4">Go home<MoveRight className="ml-2 pt-1"/></Link>
        </div>
    </div>
  )
}

export default NotFound