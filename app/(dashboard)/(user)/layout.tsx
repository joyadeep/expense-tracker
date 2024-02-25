import { Separator } from '@/components/ui/separator'
import React from 'react'
import UserSidenav from './UserSidenav'



const UserLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='flex h-full gap-1 md:gap-10'>
        <UserSidenav/>
        {/* <Separator orientation='vertical' /> */}
        <div className='flex-grow'>
            {children}
        </div>
    </main>
  )
}

export default UserLayout