import React from 'react'
import { currencyFormat } from '@/lib/currency';

interface Istatcard {
    icon:React.ReactElement;
    title:string;
    amount:number;
}

const StatCard = ({icon,title,amount}:Istatcard) => {
  return (
    <div className='flex gap-2 px-2 py-5 border border-gray-400/50 rounded-lg bg-white w-full hover:shadow-md cursor-pointer '>
         <div className='rounded-md border border-blue-500 flex justify-center items-center w-12'>{icon}</div>
            <div>
                <h4 className='text-sm'>{title}</h4>
                <p className='font-semibold'>{currencyFormat(amount)}</p>
            </div>
    </div>
  )
}

export default StatCard