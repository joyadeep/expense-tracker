"use client"
import { useGraph } from '@/hooks/useGraph';
import React, { useEffect, useState } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { currencyShorter } from '@/lib/currency';
// TODO : DayType is not accessible


const Chart =()=> {
  const {isLoading,yearlyGraph,getYearlyGraph,dailyGraph} = useGraph();
  const [time,setTime]=useState("DAILY")
  useEffect(()=>{
    if (yearlyGraph.length === 0 || dailyGraph.length === 0) {
      getYearlyGraph(time)
    }
  },[time])

  const CustomYAxisTick = (props:any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={-10} dy={16} textAnchor="end" fill="#666" className='text-xs'>
          {currencyShorter(payload.value)}
        </text>
      </g>
    );
  };

  return (
   <div className='w-full h-[450px] border rounded-lg p-1 md:p-5'>
    <div className='flex justify-between items-center'>
      <h2 className='font-semibold text-black tracking-tight'>Expense graph</h2>
      <div className='w-32'>
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
          
          data={time === "DAILY"? dailyGraph : yearlyGraph}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 14}} />
          <YAxis tick={CustomYAxisTick} />
          <Tooltip />
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