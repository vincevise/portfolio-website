'use client'
import Button from '@/components/ButtonN';
import { ReactNode, useState } from 'react'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';

type Props = {
    children: ReactNode;
    title: string
}

const SidebarArchitecture = ({children, title}: Props) => {
    const [showSidebar, setShowSidebar] = useState(true)
  return (
    <div className={`w-96 ${showSidebar ? 'h-[calc(100vh-130px)] ' : 'h-fit '}   top-3 left-3 absolute bg-white flex flex-col  shadow overflow-hidden contianer-border-style`} >
        <div className='w-full h-12 p-3 border-b border-black flex items-center justify-between shrink-0'>

            {title} 
            <Button icon={showSidebar ? GoSidebarExpand : GoSidebarCollapse } size='iconsm' variant='ghost' onClick={()=>{
                setShowSidebar(!showSidebar)
            }}/>
        </div>
        <div className={`p-3 overflow-y-auto overflow-x-hidden ${showSidebar ? 'h-full block' : 'h-0 hidden'} transition-all duration-300`}>
            {children}
        </div>
    </div>
  )
}

export default SidebarArchitecture