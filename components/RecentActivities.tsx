"use client"
import { currencyFormat } from '@/lib/currency'
import { DollarSign, Plus } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import TooltipAction from './TooltipAction'
import Link from 'next/link'
import { useModal } from '@/hooks/useModal'


const RecentActivities = () => {
  const {onOpen} = useModal()
  return (
    <div>
        <div className='flex justify-between items-center px-2'>
        <h5 className='font-semibold text-black/60'>Recent Activities</h5>
        <TooltipAction label='Add Activity' side='left' align='center' condition>
            <Button variant={"outline"} size={"icon"} onClick={()=>onOpen("Add Activity")}><Plus/></Button>
        </TooltipAction>
        </div>
        <div>
           {Array.from({length:6}).map((_,index)=>(
                <div key={index} className='flex justify-between items-center py-2 px-1 hover:bg-slate-100 cursor-pointer'>
                <div className='w-6 h-6'>
                <DollarSign/>
                </div>
                <p className='text-sm'>Bought 3kg apple</p>
                <p className='font-semibold text-sm'>{currencyFormat(600)}</p>
            </div>
           ))}
          

        </div>
        <div className='text-center text-blue-400 text-sm mt-4 ' >
        <Link href={"#"}>
            see all activities
        </Link>
        </div>
    </div>
  )
}

export default RecentActivities