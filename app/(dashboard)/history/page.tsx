"use client"
import PageHeading from '@/components/Heading'
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import { useActivity } from '@/hooks/useActivity';
import { currencyFormat } from '@/lib/currency';
import { useEffect } from 'react';

const Report = () => {
    const {data,getActivity,pagedData,getPagedActivity}= useActivity();
    useEffect(()=>{
        if(data.length === 0){
            getPagedActivity(1);
        }
    },[])
    console.log(pagedData);

  return (
    <div className=''>
         {/*  // TODO : pagination, filter and page is getting extra scrollbar when extra div or heading is added */}
        
        <div className='bg-white rounded-md w-full p-2'>
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
                    pagedData.map((expense,index)=>(
                        <TableRow key={expense.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{expense.title}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell className='font-semibold'>{currencyFormat(expense.amount)}</TableCell>
                            <TableCell>---</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        <Pagination className='mt-5 pb-5'>
            <PaginationContent className=' w-fit ml-auto'>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href='#' >1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
            </PaginationContent>
        </Pagination>
        
        </div>
    </div>
  )
}

export default Report