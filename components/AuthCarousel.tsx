"use client"
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import Autoplay from 'embla-carousel-autoplay'

const AuthCarousel = () => {
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
      Array.from({length:5}).map((_,index)=>(
        <CarouselItem key={index} >
          <Card className=''>
                <CardContent className="flex flex-col h-[500px] items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
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