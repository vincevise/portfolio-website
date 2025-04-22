'use client'
import SidebarArchitecture from '@/components/3d/sidebar'
import Vav3d from '@/components/3d/vav'
import VavSidebar from '@/components/3d/vav/vav-sidebar'
import PageContainer from '@/components/page-container'
import React from 'react'


const index = ( ) => {
  return (
    <PageContainer>
      <SidebarArchitecture title='Vav'>
        <VavSidebar />
      </SidebarArchitecture>
      <Vav3d/> 
    </PageContainer>
  )
}

export default index