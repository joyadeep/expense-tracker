import Image from 'next/image'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <Image src={"/images/loading.svg"} alt='loading' width={200} height={200} className='animate-spin ' />
  )
}

export default Loading