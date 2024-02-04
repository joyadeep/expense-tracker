// import PageHeading from '@/components/PageHeading'
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {roomStatusConstant} from '@/constants/AmountConstant';
// import { useModal } from '@/hooks/useModal';
import { currencyFormat } from '@/lib/currency';

const Report = () => {
    // TODO : description also might need.
    const rooms = [
        {
            id:1,
            name:"1BHK",
            location:"Boudha",
            price:18000,
            status:"available",
            bathroom:"attached",
            eligible:"family"
        },
        {
            id:2,
            name:"1 room, 1 kitchen",
            location:"New Baneshwor",
            price:12000,
            status:"booked",
            bathroom:"shared",
            eligible:"2 people"
        },
        {
            id:3,
            name:"1 room",
            location:"Kupandol",
            price:7000,
            status:"pending",
            bathroom:"shared",
            eligible:"anyone"
        }
    ]
    // const {activeModal} = useModal();
  return (
    <div>
        {/* <PageHeading title='Room Page' /> */}
        
        <div className='bg-white rounded-md w-full p-2'>
        <Button variant={'default'} className='w-fit bg-blue-500 hover:bg-blue-500/90' size={'sm'}  >Add room</Button>
        <Table>
            <TableHeader>
                <TableRow className=''>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bathroom</TableHead>
                    <TableHead>Eligibile</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    rooms.map((room)=>(
                        <TableRow key={room.id}>
                            <TableCell>{room.id}</TableCell>
                            <TableCell>{room.name}</TableCell>
                            <TableCell>{room.location}</TableCell>
                            <TableCell>{roomStatusConstant[room.status]}</TableCell>
                            <TableCell>{room.bathroom}</TableCell>
                            <TableCell className='font-medium'>{room.eligible}</TableCell>
                            <TableCell className='font-semibold'>{currencyFormat(room.price)}</TableCell>
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