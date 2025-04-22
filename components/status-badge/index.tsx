import React from 'react'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { MdOutlinePending } from 'react-icons/md'
import { TbProgressCheck } from 'react-icons/tb'

type Props = {
    status:'COMPLETED' | 'PENDING' | 'IN_PROGRESS' 
}

const status_data = {
    'COMPLETED':{
        color:'bg-green-300',
        icon:IoIosCheckmarkCircleOutline,
        text_color:'text-green-900',
        text:'Completed'
    },
    'PENDING':{
        color:'bg-gray-300',
        icon:MdOutlinePending,
        text_color:'text-gray-900',
        text:'Pending'
    },
    'IN_PROGRESS':{
        color:'bg-yellow-300',
        icon:TbProgressCheck,
        text_color:'text-yellow-900',
        text:'In Progress'
    },
     
}

const StatusBadge = ({status}: Props) => {
    const Icon = status_data[status].icon
  return (
    <span className={`${status_data[status].color} ${status_data[status].text_color} flex items-center gap-1.5 p-1 w-fit pr-3 font-medium rounded-full text-xs`}>
        <Icon className='w-[18px] h-[18px]' />
        {status_data[status].text}
    </span>
  )
}

export default StatusBadge