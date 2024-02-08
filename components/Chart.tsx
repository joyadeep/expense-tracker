"use client"
import { useGraph } from '@/hooks/useGraph';
import React, { useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Chart =()=> {
  const {isLoading,yearlyGraph,getYearlyGraph} = useGraph();
  useEffect(()=>{
    getYearlyGraph();
  },[])
  console.log(yearlyGraph)
  return (
   <div className='w-full h-full'>
    <h2 className='font-semibold text-black/70 text-md pl-2 pb-2'>Expense graph</h2>
     <ResponsiveContainer width="100%" height="100%">
     <AreaChart
          width={500}
          height={400}
          data={yearlyGraph}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
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