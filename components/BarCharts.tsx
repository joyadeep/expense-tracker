"use client"
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useBarGraph } from '@/hooks/useBarGraph';
import { Category } from '@prisma/client';
import { currencyShorter } from '@/lib/currency';

type Props = {}
export const shortCategories = {
    HOUSING_EXPENSES: "Housing",
    TRANSPORTATION_COSTS: "Transportation",
    FOOD_AND_DINING: "Food",
    HEALTHCARE: "Health",
    UTILITIES: "Utils",
    ENTERTAINMENT: "Entertainment",
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
  const {isLoading,error,getBargraph,monthBarGraph,yearBarGraph} = useBarGraph();
  useEffect(()=>{
    if (yearBarGraph.length === 0 || monthBarGraph.length === 0) {
      getBargraph(time)
    }
  },[time])
  return (
    <div className='w-full md:w-3/4 h-[450px] border rounded-lg p-1 md:p-5'>
    <div className='flex justify-between items-center'>
      <h2 className='font-semibold text-black tracking-tight'>Expense by category</h2>
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
    <ResponsiveContainer width="100%" height="100%">
        <BarChart className=' pb-14'  height={500} data={time === "MONTH" ? monthBarGraph : yearBarGraph}
        margin={{ top: 0, right: 0, left: -10, bottom: 0}}
        >
          <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" angle={-20} textAnchor='end' interval={0} tickFormatter={formatXAxis} className='text-xs w-full' />
          <YAxis tick={CustomYAxisTick} />
          <Tooltip wrapperStyle={{backgroundColor:"#BB0D32"}} cursorStyle={{stroke:"#BB0D32"}} />
          {/* <Legend className='bg-black' /> */}
          <Bar dataKey="expense" fill="#BB0D32" barSize={30}     />
        </BarChart>
      </ResponsiveContainer>
      </div>
  )
}

export default BarCharts