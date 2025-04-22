import MassHousingScene from '@/components/3d/masshousing'
import MasshousingSidebar from '@/components/3d/masshousing/masshousing-sidebar'
import SidebarArchitecture from '@/components/3d/sidebar'
import PageContainer from '@/components/page-container'
import React from 'react'


const page = () => {
  return (
    <PageContainer>
      <SidebarArchitecture title='Mass housing'>
        <MasshousingSidebar/>
      </SidebarArchitecture>
      <MassHousingScene/>
    </PageContainer>
  )
}

export default page