"use client"
import OptionDrawer from '@/components/Drawer';
import Error from '@/components/Error';
import PageHeading from '@/components/Heading'
import Loading from '@/components/Loading';
import Paginate from '@/components/Paginate';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import { useModal } from '@/hooks/useModal';
import { currencyFormat } from '@/lib/currency';
import { fetcher } from '@/lib/fetcher';
import { Activity } from '@prisma/client';
import { useState } from 'react';
import useSWR from 'swr';

const ITEMS_PER_PAGE=10;

const Report = () => {
    const [page,setPage]=useState(1);
    const {data,isLoading,error}= useSWR<any>(["history",page],()=>fetcher(`/api/activity/user/${localStorage.getItem("userId")}?pageNumber=${page}`),{
        errorRetryCount:1,
    })
    
    const history:Activity[]=data?.data;
    const {onOpen}=useModal();

    const onPageChange =(page:number)=>{
        setPage(page);
    }


    if(isLoading){
        return <Loading/>
    }
    if(error){
        return <Error message={error?.message}/>
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
                    <TableHead className='w-52 text-right'>Amount</TableHead>
                    <TableHead className='w-40'>Created</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    history?.map((expense,index)=>(
                        <TableRow key={expense.id}>
                            <TableCell>{(data?.currentPage-1)* ITEMS_PER_PAGE+index+1}</TableCell>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell className='text-xs font-medium'>{expense.category}</TableCell>
                            <TableCell className='font-semibold text-right'>{currencyFormat(expense.amount)}</TableCell>
                            <TableCell>{new Date(expense.createdAt).toDateString()}</TableCell>
                            <TableCell className='block md:hidden'>
                                <OptionDrawer expense={expense} />
                            </TableCell>
                            <TableCell className='hidden md:flex gap-3'>
                                <p className='cursor-pointer' onClick={()=>{onOpen("ViewEdit Activity",{mode:"View",expenseData:expense})}} >view</p>
                                <p className='cursor-pointer' onClick={()=>{onOpen("ViewEdit Activity",{mode:"Edit",expenseData:expense,page:page})}}>edit</p>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        <Paginate currentPage={data?.currentPage} totalPages={data?.totalPages} onPageChange={onPageChange} />
        
        </div>
  )
}

export default Report