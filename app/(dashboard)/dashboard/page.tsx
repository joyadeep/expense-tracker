"use client"
import Heading from '@/components/Heading'
import Chart from '@/components/Chart'
import StatCard from '@/components/StatCard'
import { Banknote, HandCoins, PiggyBank, Settings, Wallet } from 'lucide-react'
import React, { useEffect } from 'react'
import Piechart from '@/components/Piechart'
import RecentActivities from '@/components/RecentActivities'
import { useStats } from '@/hooks/useStats'

const Dashboard = () => {
  const {data,getStats}= useStats();
  useEffect(()=>{
    getStats()
  },[])
  return (
    <main>
        <Heading title="Overview" />
        <div className='flex justify-between gap-20'>
            <StatCard icon={<HandCoins size={18} strokeWidth={2}/>} title='This Month' amount={data.currentMonthExpense} flux={data.difference}/>
            <StatCard icon={<Wallet size={18} strokeWidth={2}/>} title='Total Expenses' amount={data.totalExpenses} />
            <StatCard icon={<Banknote size={18} strokeWidth={2}/>} title='Last Month' amount={data.lastMonthExpense} />
        </div>
        <section className='flex gap-3 mt-5'>
        <div className='w-2/3 h-[350px] bg-white rounded-lg py-2'>
        <Chart />
        {/* <Piechart/> */}
        </div>
        <div className='border border-slate-200 rounded-md bg-white w-1/3 pt-2'>
          <RecentActivities/>
        </div>
        </section>
    </main>
  )
}

export default Dashboard