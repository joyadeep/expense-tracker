"use client"
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'JAN',
      income: 4000,
      expense: 2000,
    },
    {
      name: 'FEB',
      income: 3000,
      expense: 1398,
    },
    {
      name: 'MAR',
      income: 2000,
      expense: 9800,
    },
    {
      name: 'APR',
      income: 2780,
      expense: 3908,
    },
    {
      name: 'MAY',
      income: 1890,
      expense: 4800,
    },
    {
      name: 'JUN',
      income: 2390,
      expense: 3800,
    },
    {
      name: 'JUL',
      income: 3490,
      expense: 4300,
    },
  ];

const Chart =()=> {
  return (
   <div className='w-full h-full'>
    <h2 className='font-semibold text-black/70 text-md pl-2 pb-2'>Income and Expense graph</h2>
     <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="expense" stroke="#9A0928" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="income" stroke="#2C9A09" />
    </LineChart>
  </ResponsiveContainer>
   </div>
  )
}

export default Chart