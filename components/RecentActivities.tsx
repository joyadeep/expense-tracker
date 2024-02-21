"use client"
import { currencyFormat } from '@/lib/currency'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import TooltipAction from './TooltipAction'
import Link from 'next/link'
import { useModal } from '@/hooks/useModal'
import { useActivity } from '@/hooks/useActivity'
import { Skeleton } from './ui/skeleton'
import { categoryConstant } from '@/constants/CategoryConstant'
import { Plus } from 'lucide-react'


const RecentActivities = () => {
  const {data,getActivity,error,isLoading}=useActivity();
  const {onOpen} = useModal()
  useEffect(()=>{
    if(data?.length === 0){
        getActivity();
    }
  },[getActivity,data?.length])
  return (
    <div className=' h-full relative overflow-hidden flex flex-col'>
        <div className='px-5 flex justify-between items-center '>
        <h5 className='font-semibold text-foreground tracking-tight'>Recent Activities</h5>
        <TooltipAction label='Add Activity' side='left' align='center' condition>
            <Button variant={"ghost"} size={"icon"} onClick={()=>onOpen("Add Activity")}><Plus/></Button>
        </TooltipAction>
        </div>
        <div className='flex-1 overflow-hidden after:absolute after:bottom-7 after:left-0 after:w-full after:h-[80px] z-20 after:bg-gradient-to-t after:from-background/80'>
          {error ? 
          <p className='text-center text-foreground/60 text-sm mt-10'>{error}</p> 
          :isLoading ? 
          Array.from({length:7}).map((_,index)=>(
            <div key={index} className='px-5 flex justify-between gap-5 items-center py-2'>
            <Skeleton className='bg-background/30 w-8 h-8 rounded-full'/>
            <div className='flex-1'>
             <Skeleton className=' bg-background/30 w-full h-3 rounded-md'/>
              <Skeleton className='bg-background/30 w-16 h-2 rounded-md mt-1'/>
            </div>
           <Skeleton className='bg-background/30 w-14 h-5 rounded-md'/>
        </div>
          ))
          :
          data?.map((activity,index)=>(
            <div key={index} className='px-5 flex justify-between gap-5 items-center py-2  hover:bg-background/5 cursor-pointer'>
            <div className='flex justify-center items-center w-8 h-8 text-foreground  rounded-full bg-background/10'>
              {categoryConstant[activity.category]}
            </div>
            <div className='flex-1'>
              <p className='text-sm text-foreground first-letter:capitalize'>{activity.title}</p>
              <p className='text-xs text-foreground/50'>{ new Date(activity.createdAt).toDateString()}</p>
            </div>
            <p className='font-semibold text-sm'>{currencyFormat(activity.amount)}</p>
        </div>
       ))
          }
        </div>
        <div className='text-center text-blue-400 text-sm mt-auto pb-2 ' >
        <Link href={"/history"}>
            see all expenses
        </Link>
        </div>
    </div>
  )
}

export default RecentActivities