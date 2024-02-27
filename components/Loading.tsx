import Image from 'next/image'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Image src={"/images/loading.svg"} alt='loading' width={200} height={200} className='animate-spin duration-1000 ease-in-out ' />
    </div>
  )
}

export default Loading