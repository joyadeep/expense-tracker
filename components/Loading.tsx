import Image from 'next/image'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Image src={"/images/loading.svg"} alt='loading' width={200} height={200} className='animate-spin ' />
    </div>
  )
}

export default Loading