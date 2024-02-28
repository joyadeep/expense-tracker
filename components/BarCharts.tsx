"use client"
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Category } from '@prisma/client';
import { currencyShorter } from '@/lib/currency';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import Error from './Error';

type Props = {}
export const shortCategories = {
    HOUSING_EXPENSES: "Housing",
    TRANSPORTATION_COSTS: "Transport..",
    FOOD_AND_DINING: "Food",
    HEALTHCARE: "Health",
    UTILITIES: "Utils",
    ENTERTAINMENT: "Entert..",
    PERSONAL_CARE: "Personal",
    EDUCATION: "Education",
    DEBTS_AND_LOANS: "Debts",
    CLOTHING_AND_ACCESSORIES: "Clothing",
    TRAVEL: "Travel",
    GIFTS_AND_DONATIONS: "Gifts",
    SAVINGS_AND_INVESTMENTS: "Savings",
    PETS: "Pets",
    MISCELLANEOUS: "Misc"
}
const formatXAxis = (value: Category) => {
  const formattedCategory = shortCategories[value]
  return formattedCategory;
}

const CustomYAxisTick = (props:any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={-10} dy={16} textAnchor="end" fill="#666" className='-ml-10 text-xs'>
        {currencyShorter(payload.value)}
      </text>
    </g>
  );
};



const BarCharts = (props: Props) => {
  const [time,setTime]=useState("MONTH")
  const {data,isLoading,error} = useSWR<any>("expenses/bargraph",()=>fetcher(`/api/bargraph/${localStorage.getItem("userId")}?time=${time}`))

 
  return (
    <div className='w-full md:w-2/3 h-[450px] border rounded-lg p-1 md:p-5'>
    <div className='flex justify-between items-center'>
      <h2 className='font-semibold text-foreground tracking-tight'>Expense by category</h2>
      <div className='w-32 mb-2'>
      <Select value={time} onValueChange={(value)=>setTime(value)} >
        <SelectTrigger>
          <SelectValue placeholder="select time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
              <SelectItem value="MONTH" >Month</SelectItem>
              <SelectItem value="YEAR" >Year</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
    </div>
    {
      error ? <Error message={error.message} /> :
      <ResponsiveContainer width="100%" height="100%">
        <BarChart className=' pb-14 md:pb-0'  height={500} data={data?.data}
        margin={{ top: 0, right: 0, left: -10, bottom: 0}}
        >
          <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" angle={-20} fontSize={10} textAnchor='end' interval={0} tickFormatter={formatXAxis} className='text-xs w-full' />
          <YAxis tick={CustomYAxisTick}/>
          <Tooltip wrapperStyle={{backgroundColor:"#BB0D32"}} cursorStyle={{stroke:"#BB0D32"}} contentStyle={{ color: "#000" }} />
          <Bar dataKey="expense" fill="#BB0D32"     />
        </BarChart>
      </ResponsiveContainer>
    }

      </div>
  )
}

export default BarCharts