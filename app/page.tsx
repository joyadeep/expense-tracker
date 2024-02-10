"use client"
import { Button } from "@/components/ui/button";
import landingIllustration from "@/public/images/landing_illustration.png"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


const links = [
  {
    id:1,
    title:"About",
    link:"/about"
  },
  {
    id:2,
    title:"Pricing",
    link:"/pricing"
  },
  {
    id:3,
    title:"Contact",
    link:"/contact"
  }
]

export default function Home() {

  const router = useRouter();
  
  return (
    <main className="">
      <div className="w-full h-14 flex items-center justify-between px-5 md:px-16 mb-5">
       <span className="flex">
       <Image alt="logo" src="/logo.svg" width={25} height={25} />
        <p className="bg-orange-500 text-white rounded-full h-4 text-xs px-2">beta</p>
       </span>
        <div className="flex gap-10 items-center">
          {
            links.map((link)=>(
              <Link className="text-black hover:underline hover:underline-offset-8 hidden md:block " key={link.id} href={link.link}>{link.title}</Link>
            ))
          }
          <div className="flex gap-5">
          <Button variant={"outline"} onClick={()=>router.push("/auth")}>Login</Button>
          <Button variant={"primary"} className="hidden md:block"  onClick={()=>router.push("/auth?type=register")}>Request a Demo</Button>
        </div>
        </div>
        
      </div>
     <section className="px-5 md:px-20 flex flex-col gap-5  items-center">
     <h1 className="mx-auto text-center text-neutral-800 text-3xl md:text-5xl font-bold w-full md:w-1/2 leading-tight">Manage Your Expenses Anywhere in Real Time</h1>
     <p className="text-xs md:text-sm w-full md:w-3/4 mx-auto text-justify md:text-center text-neutral-800/80">Embark on a journey of financial empowerment with our cutting-edge expense tracker. Precision meets simplicity as every transaction finds purpose in our intuitive platform. Seamlessly navigate your expenses, charting a course towards financial brilliance. Crafted for those who seek meticulous budgeting and smart spending, our app transforms every cent into a strategic step towards long-term prosperity. Elevate your financial IQ – where precision tracking meets masterful living.</p>
     <Button variant={"primary"} size={"lg"} className="w-fit shadow-lg shadow-blue-400/80 "  onClick={()=>router.push("/auth?type=register")}>Request a Demo</Button>
     </section>
    <div className="w-full md:w-1/2  aspect-video mx-auto relative mt-5">
      <Image src={landingIllustration} alt={"landing illustration"} className="object-contain" />
    </div>
    </main>
  );
}
