import React from 'react'

interface Iheading {
    title:string;
}

const Heading = ({title}:Iheading) => {
  return (
    <div className='text-lg text-black/80 font-semibold mb-4 tracking-tight'>{title}</div>
  )
}

export default Heading