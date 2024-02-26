"use client"
import Heading from '@/components/Heading'
import Chart from '@/components/Chart'
import StatCard from '@/components/StatCard'
import { Banknote, HandCoins,Wallet } from 'lucide-react'
import React, { useEffect } from 'react'
import Piechart from '@/components/Piechart'
import RecentActivities from '@/components/RecentActivities'
import BarCharts from '@/components/BarCharts'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

const Dashboard = () => {
  const {data}= useSWR<any>("expenses/overview",()=>fetcher(`/api/expense/${localStorage.getItem("userId")}`))
  const stats= data?.data;
  return (
    <main className='flex flex-col gap-5'>
        <Heading title="Overview" />
        <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-10'>
            <StatCard icon={<HandCoins size={18} strokeWidth={2}/>} title='This Month' amount={stats?.currentMonthExpense} flux={stats?.difference}/>
            <StatCard icon={<Wallet size={18} strokeWidth={2}/>} title='Total Expenses' amount={stats?.totalExpenses} />
            <StatCard icon={<Banknote size={18} strokeWidth={2}/>} title='Last Month' amount={stats?.lastMonthExpense} />
        </div>
        <section className='flex flex-col md:flex-row gap-3 h-full md:h-[450px] '>
        <div className='w-full md:w-2/3 bg-background rounded-lg '>
        <Chart />
        </div>
        <div className='border rounded-md bg-background h-[350px] md:h-full w-full md:w-1/3 pt-2'>
          <RecentActivities/>
        </div>
        </section>
        <section className=' h-[500px]'>
          <BarCharts/>
        </section>
    </main>
  )
}

export default Dashboard