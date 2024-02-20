"use client"
import Heading from '@/components/Heading'
import Chart from '@/components/Chart'
import StatCard from '@/components/StatCard'
import { Banknote, HandCoins, PiggyBank, Settings, Wallet } from 'lucide-react'
import React, { useEffect } from 'react'
import Piechart from '@/components/Piechart'
import RecentActivities from '@/components/RecentActivities'
import { useStats } from '@/hooks/useStats'
import BarCharts from '@/components/BarCharts'

const Dashboard = () => {
  const {data,getStats}= useStats();
  useEffect(()=>{
    getStats()
  },[])
  return (
    <main className='flex flex-col gap-5'>
        <Heading title="Overview" />
        <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-10'>
            <StatCard icon={<HandCoins size={18} strokeWidth={2}/>} title='This Month' amount={data?.currentMonthExpense} flux={data?.difference}/>
            <StatCard icon={<Wallet size={18} strokeWidth={2}/>} title='Total Expenses' amount={data?.totalExpenses} />
            <StatCard icon={<Banknote size={18} strokeWidth={2}/>} title='Last Month' amount={data?.lastMonthExpense} />
        </div>
        <section className='flex flex-col md:flex-row gap-3 h-full md:h-[450px] '>
        <div className='w-full md:w-2/3 bg-white rounded-lg '>
        <Chart />
        </div>
        <div className='border border-slate-200 rounded-md bg-white h-[350px] md:h-full w-full md:w-1/3 pt-2'>
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