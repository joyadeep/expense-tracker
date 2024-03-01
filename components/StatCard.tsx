import React from 'react'
import { currencyFormat } from '@/lib/currency';
import { cn } from '@/lib/utils';

interface Istatcard {
    icon:React.ReactElement;
    title:string;
    amount:number;
    flux?:number;
}

const StatCard = ({icon,title,amount,flux}:Istatcard) => {
  return (
    <div className=' p-6 border rounded-xl bg-card w-full hover:shadow-md cursor-pointer '>
         <div className='w-full flex items-center justify-between'>
          <div className='text-sm font-medium text-foreground/70'>{title}</div>
         <div className='text-foreground/70'>{icon}</div>
         </div>
          <p className='text-2xl font-bold'>{currencyFormat(amount ?? 0)}</p>
          <small className={cn('text-xs',flux && flux < 0 ? 'text-green-500' : 'text-red-500')}>{flux && `${flux} % from last month`}</small>
          {/* // TODO : add icon and color also add + for positive */}
    </div>
  )
}

export default StatCard