import SidebarArchitecture from '@/components/3d/sidebar'
import UrbansemScene from '@/components/3d/urbansem'
import UrbanSidebar from '@/components/3d/urbansem/urban-sidebar'
import PageContainer from '@/components/page-container'
import React from 'react'


const page = () => {
  return (
    <PageContainer>
      <SidebarArchitecture title='Urban Design'>
        <UrbanSidebar/>
      </SidebarArchitecture>
      <UrbansemScene/>
     </PageContainer>
  )
}

export default page