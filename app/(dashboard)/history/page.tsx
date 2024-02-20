"use client"
import OptionDrawer from '@/components/Drawer';
import PageHeading from '@/components/Heading'
import Paginate from '@/components/Paginate';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import { useActivity } from '@/hooks/useActivity';
import { currencyFormat } from '@/lib/currency';
import { useEffect, useState } from 'react';

const Report = () => {
    const {pagedData,getPagedActivity}= useActivity();
    const [page,setPage]=useState(1);
    useEffect(()=>{
        if(pagedData.data.length === 0){
            getPagedActivity(1);
        }
        else {
            getPagedActivity(page)
        }
    },[page])

    const onPageChange =(page:number)=>{
        setPage(page);
    }

  return (
        <div className='pb-10 md:pb-0'>
            <PageHeading title='History' />
        <Table>
            <TableHeader>
                <TableRow className=''>
                    <TableHead>#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    pagedData?.data?.map((expense,index)=>(
                        <TableRow key={expense.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell className='text-xs font-medium'>{expense.category}</TableCell>
                            <TableCell className='font-semibold'>{currencyFormat(expense.amount)}</TableCell>
                            <TableCell className='block md:hidden'>
                                <OptionDrawer id={expense.id} />
                            </TableCell>
                            <TableCell className='hidden md:flex gap-3'>
                                <p>view</p>
                                <p>edit</p>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        <Paginate currentPage={pagedData.currentPage} totalPages={pagedData.totalPages} onPageChange={onPageChange} />
        
        </div>
  )
}

export default Report