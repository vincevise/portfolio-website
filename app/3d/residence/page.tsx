'use client'
import ResidenceViewer from '@/components/3d/residence'
import ResidenceSidebar from '@/components/3d/residence/residence-sidebar'
import SidebarArchitecture from '@/components/3d/sidebar'
import PageContainer from '@/components/page-container'
import React from 'react'


const page = () => {
  return (
    <PageContainer>
      <SidebarArchitecture title='Residence'>
        <ResidenceSidebar/>
      </SidebarArchitecture>
      <ResidenceViewer/>
    </PageContainer>
  )
}

export default page