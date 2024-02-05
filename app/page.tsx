import { Button } from "@/components/ui/button";
import landingIllustration from "@/public/images/landing_illustration.png"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
    },
    {
      id:"4",
      title:"Customer",
      link:"/customer"
    }
  ]
  return (
    <main className="">
      <div className="w-full h-14 flex items-center justify-between px-16 mb-5">
        <h5>Logo</h5>
        <div className="flex gap-10 items-center">
          {
            links.map((link)=>(
              <Link className="text-black hover:underline hover:underline-offset-8 " key={link.id} href={link.link}>{link.title}</Link>
            ))
          }
          <div className="flex gap-5">
          <Button variant={"outline"}>Login</Button>
          <Button variant={"primary"}>Request a Demo</Button>
        </div>
        </div>
        
      </div>
     <section className="px-20 flex flex-col gap-5  items-center">
     <h1 className="mx-auto text-center text-neutral-800 text-5xl font-bold  w-1/2 leading-tight">Manage Your Expenses Anywhere in Real Time</h1>
     <p className="text-sm w-3/4 mx-auto text-center text-neutral-800/80">Embark on a journey of financial empowerment with our cutting-edge expense tracker. Precision meets simplicity as every transaction finds purpose in our intuitive platform. Seamlessly navigate your expenses, charting a course towards financial brilliance. Crafted for those who seek meticulous budgeting and smart spending, our app transforms every cent into a strategic step towards long-term prosperity. Elevate your financial IQ – where precision tracking meets masterful living.</p>
     <Button variant={"primary"} size={"lg"} className="w-fit shadow-lg shadow-blue-400/80 ">Request a Demo</Button>
     </section>
    <div className="w-1/2  aspect-video mx-auto relative mt-5">
      <Image src={landingIllustration} alt={"landing illustration"} className="object-contain" />
    </div>
    </main>
  );
}
