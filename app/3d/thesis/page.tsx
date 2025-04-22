'use client'
import SidebarArchitecture from '@/components/3d/sidebar'
import Thesis3d from '@/components/3d/thesis'
import ThesisSidebar from '@/components/3d/thesis/thesis-sidebar'
import PageContainer from '@/components/page-container'
import React from 'react'


const index = ( ) => {
  return (
    <PageContainer>
      <SidebarArchitecture title='Vav'>
        <ThesisSidebar />
      </SidebarArchitecture>
      <Thesis3d/> 
    </PageContainer>
  )
}

export default index