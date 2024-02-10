import React from 'react'
import { Drawer,DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { Button } from './ui/button'
import { Eye, MoreHorizontal, Pencil } from 'lucide-react';

interface IDrawer {
    id:string;
}
const OptionDrawer = ({id}:IDrawer) => {
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
                <Button variant={"ghost"} className='w-full text-lg font-normal justify-start gap-5 text-black/70'> <Eye/> View</Button>
                <Button variant={"ghost"} className='w-full text-lg font-normal justify-start gap-5 text-black/70'> <Pencil/> Edit</Button>
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default OptionDrawer