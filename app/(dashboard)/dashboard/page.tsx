import Heading from '@/components/Heading'
import Chart from '@/components/Chart'
import StatCard from '@/components/StatCard'
import { Banknote, HandCoins, PiggyBank, Settings, Wallet } from 'lucide-react'
import React from 'react'
import Piechart from '@/components/Piechart'
import RecentActivities from '@/components/RecentActivities'

const Dashboard = () => {
  return (
    <main>
        <Heading title="Overview" />
        <div className='flex justify-between gap-20'>
            <StatCard icon={<Wallet/>} title='Availabe Balance' amount={400}/>
            <StatCard icon={<Banknote/>} title='Income' amount={500}/>
            <StatCard icon={<HandCoins/>} title='Expense' amount={100}/>
        </div>
        <section className='flex gap-3 mt-5'>
        <div className='w-3/4 h-[350px] bg-white rounded-lg py-2'>
        <Chart />
        {/* <Piechart/> */}
        </div>
        <div className='border border-slate-200 rounded-md bg-white w-1/4 pt-2'>
          <RecentActivities/>
        </div>
        </section>
    </main>
  )
}

export default Dashboard