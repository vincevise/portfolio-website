import React from 'react'
import { IconType } from 'react-icons/lib'

type Props = {
    icon: IconType;
    title: string
}

const NodeHeader = ({icon: Icon, title}: Props) => {
  return (
    <div className='flex p-0.5 rounded-sm items-center gap-2 w-full ' >
        <button className='w-6 h-6 rounded bg-gray-200 flex items-center justify-center'>
            <Icon  className='w-4 h-4'/> 
        </button>
        <p className=' text-sm '>{title} </p>
    </div>
  )
}

export default NodeHeader