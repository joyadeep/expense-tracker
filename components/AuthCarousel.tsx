"use client"
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import Autoplay from 'embla-carousel-autoplay'
import banner1 from "@/public/images/banner1.png"
import banner2 from "@/public/images/banner2.png"
import banner3 from "@/public/images/banner3.png"
import Image from 'next/image'

const AuthCarousel = () => {

  const banners = [
    {
      title:"Set budgets for different categories and get alerts when you're close to exceeding them.",
      image:banner1
    },
    {
      title:"Easily track your expenses in real-time and stay updated with your spending habits.",
      image:banner2
    },
    {
      title:"Access visual reports and insights to understand your spending patterns and make informed financial decisions.",
      image:banner3
    }
  ]
  return (
    <Carousel className='w-3/4' opts={{
      loop:true,
    }}
    plugins={[
      Autoplay({delay:3000,stopOnInteraction:false})
    ]}
    >
      <CarouselContent>
    {
      banners.map((banner,index)=>(
        <CarouselItem key={index} >
          <Card className=''>
                <CardContent className="flex flex-col h-[500px] items-center justify-center p-6">
                  <div className='flex flex-col items-center justify-center w-full h-full'>

                  <Image src={banner.image} alt="banner1" className='w-1/2 h-1/2 object-contain' />
                  <h3 className=' text-center text-sm mt-5 font-normal w-2/3'>{banner.title}</h3>
                  </div>
                </CardContent>
              </Card>
        </CarouselItem>
      ))
    }
      </CarouselContent>
    </Carousel>
  )
}

export default AuthCarousel