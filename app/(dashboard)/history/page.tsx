
import Heading from '@/components/Heading';
import HistoryTable from './HistoryTable';


const History = () => {

  return (
     <div className='w-full h-[95%]'>
        <Heading title='History' />
        <HistoryTable/>
     </div>
  )
}

export default History