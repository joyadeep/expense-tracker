import Heading from '@/components/Heading'
import Chart from '@/components/Chart'
import StatCard from '@/components/StatCard'
import { Banknote, HandCoins, PiggyBank, Settings, Wallet } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
  return (
    <main>
        <Heading title="Overview" />
        <div className='flex justify-between gap-20'>
            <StatCard icon={<Wallet/>} title='Availabe Balance' amount={400}/>
            <StatCard icon={<Banknote/>} title='Income' amount={500}/>
            <StatCard icon={<HandCoins/>} title='Expense' amount={100}/>
        </div>
        <div className='w-1/2 aspect-video bg-white rounded-md mt-5 py-2'>
        <Chart />
        </div>
    </main>
  )
}

export default Dashboard