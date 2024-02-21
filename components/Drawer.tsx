import React from 'react'
import { Drawer,DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Eye, MoreHorizontal, Pencil } from 'lucide-react';
import { useModal } from '@/hooks/useModal';

interface IDrawer {
    expense:any;
}
const OptionDrawer = ({expense}:IDrawer) => {
    const {onOpen}=useModal();
  return (
    <Drawer >
        <DrawerTrigger asChild>
            <MoreHorizontal/>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle className='text-left'>Options</DrawerTitle>
            </DrawerHeader>
            <div className='w-full h-[300px] px-2'>
                <Button variant={"ghost"} onClick={()=>onOpen("ViewEdit Activity",{mode:"View",expenseData:expense})} className='w-full text-lg font-normal justify-start gap-5 text-black/70'> <Eye/> View</Button>
                <Button variant={"ghost"} onClick={()=>onOpen("ViewEdit Activity",{mode:"Edit",expenseData:expense})} className='w-full text-lg font-normal justify-start gap-5 text-black/70'> <Pencil/> Edit</Button>
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default OptionDrawer