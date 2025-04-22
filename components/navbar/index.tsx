'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'


const Navbar = () => {
  return (
    <div className="flex h-[56px] p-4   fixed  top-0 left-0 z-[100] bg-white items-center justify-between w-full border-y border-gray-300 shadow ">
            <div className="flex items-center gap-2  ">
              <Image
                // src={"/dp.png"}
                // src={"/myface.png"}
                src={"/my-notion-face-customized.png"}
    
                alt="dp"
                className="w-10 h-10 rounded-full    object-contain  "
                width={100}
                height={100}
              />
              <Link href={'/'} className="">
                <div className=" text-gray-800 font-inter">Vincent Vuram</div>
                <div className="text-xs text-gray-500">Frontend Dev</div>
              </Link>
            </div>
            <button className="h-8 w-8 p-2 flex items-center justify-center rounded">
              <BsThreeDotsVertical className="w-full h-full" />
            </button>
          </div>
  )
}

export default Navbar