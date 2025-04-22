'use client'
import CanteenViewer from '@/components/3d/canteen'
import CanteenSidebar from '@/components/3d/canteen/canteen-sidebar'
import SidebarArchitecture from '@/components/3d/sidebar'
import PageContainer from '@/components/page-container'
import React from 'react'


const Canteen = () => {
  return (
    <PageContainer>
      <SidebarArchitecture title='Canteen'>
        <CanteenSidebar/>
      </SidebarArchitecture>
      <CanteenViewer/>
    </PageContainer>
  )
}

export default Canteen