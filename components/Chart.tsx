"use client"
import { useGraph } from '@/hooks/useGraph';
import React, { useEffect, useState } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { currencyShorter } from '@/lib/currency';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
// TODO : DayType is not accessible


const Chart =()=> {
  const [time,setTime]=useState("DAILY")
  const {data} = useSWR<any>(["chart",time],()=>fetcher(`/api/graph/${localStorage.getItem("userId")}?time=${time}`))
  const chart=data?.data;

  const CustomYAxisTick = (props:any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={-10} dy={16} textAnchor="end" fill="#666" className='text-xs -ml-10'>
          {currencyShorter(payload.value)}
        </text>
      </g>
    );
  };

  return (
   <div className='w-full h-[450px] border rounded-lg p-1 md:p-5'>
    <div className='flex justify-between items-center'>
      <h2 className='font-semibold text-foreground tracking-tight'>Expense graph</h2>
      <div className='w-32 mb-2'>
      <Select value={time} onValueChange={(value)=>setTime(value)} >
        <SelectTrigger>
          <SelectValue placeholder="select time" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
              <SelectItem value="DAILY" >Daily</SelectItem>
              <SelectItem value="MONTHLY" >Monthly</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
    </div>
     <ResponsiveContainer width="100%" height="95%" >
     <AreaChart
          data={chart}
          margin={{ top: 0, right: 0, left: -10, bottom: 0}}
          className='pb-3 md:pb-0'
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 10}} />
          <YAxis tick={CustomYAxisTick}  />
          <Tooltip contentStyle={{ color: "#000" }} />
          <defs>
      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="10%" stopColor="#9A0928" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#FB0036" stopOpacity={0} />
      </linearGradient>
    </defs>
          <Area type="monotone" dataKey="expense" stroke="#BB0D32" fill="url(#colorUv)" />
        </AreaChart>
  </ResponsiveContainer>
   </div>
  )
}

export default Chart