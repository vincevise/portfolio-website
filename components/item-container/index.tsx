'use client'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md';

type Props = {
    col?:number;
    children:ReactNode;
    height?:string;
    chips?:string[];
    title?:string;
    pointerEventNone?:boolean;
    onClick?:()=>void
    href?:string
}

export const container_border = `rounded-xl border-2 border-black  shadow-[2px_2px_0px_1px_#000000]`

const ItemContainer = ({col=3, children, height, title='Title', pointerEventNone, onClick, href}: Props) => {
  const router = useRouter()
  return (
    <div 
        className={`bg-white  overflow-hidden flex items-center justify-center text-center ${!height && 'aspect-square'}  rounded-xl border-2 border-black  shadow-[2px_2px_0px_1px_#000000] relative group`}
        style={{
            height,
            gridColumn: `span ${col} / span ${col}`,
          
        }}
    >
          <div className='inline-block absolute left-3 top-3 bg-white border border-gray-600 text-sm rounded-md px-4 py-1 z-[40]'>
              {title}
          </div>
      <div className='w-full h-full flex items-center justify-center' style={{  pointerEvents: pointerEventNone ? 'none' : 'auto'  }}>
          {children}
      </div>
          <button
                className="p-1.5 bg-white shadow-lg border border-slate-400 text-gray-500 hover:text-gray-800 rounded-full absolute bottom-3 left-3 transform 
  translate-x-[-150%] 
  translate-y-[150%] 
  group-hover:translate-x-0 
      group-hover:translate-y-0 
      hover:border-gray-900 
  transition-all duration-500 drop-shadow-lg "
                onClick={()=>{
                  console.log('on click triggering')
                  if(onClick){
                    onClick()
                  }
                  if(href){
                    console.log('pusing')
                    router.push(href)
                  }
                }}
              >
                <MdOutlineArrowOutward className="w-6 h-6" />
              </button>
    </div>
  )
}

export default ItemContainer