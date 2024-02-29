import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'

interface Ipagination {
    currentPage:number;
    totalPages:number;
    onPageChange:(page:number)=>void;

}
const MAX_PAGE_NUMBER = 2

//  TODO : use herf to update page number but study first about performance.
//  TODO : pagination is not shown in mobile view

const Paginate = ({currentPage,totalPages,onPageChange}:Ipagination) => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_NUMBER / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGE_NUMBER - 1);

    // Add ellipsis and surrounding page numbers
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>);
      }
      pageNumbers.push(totalPages);
    }


  return (
    <Pagination className='mt-5 pb-5'>
            <PaginationContent className=' w-fit ml-auto'>
                <PaginationItem className='cursor-pointer'>
                    <PaginationPrevious onClick={()=>{currentPage>1&&onPageChange(currentPage-1)}} />
                </PaginationItem>
              {
                pageNumbers.map((page,index)=>(
                    <PaginationItem key={index} className='cursor-pointer ' >
                        <PaginationLink isActive={page===currentPage} 
                        onClick={()=>onPageChange(index+1)}
                        >{page}</PaginationLink>
                    </PaginationItem>
                ))
              }
        <PaginationItem className='cursor-pointer'>
          <PaginationNext onClick={()=>{currentPage<totalPages&&onPageChange(currentPage+1)}}  />
        </PaginationItem>
            </PaginationContent>
        </Pagination>
  )
}

export default Paginate
