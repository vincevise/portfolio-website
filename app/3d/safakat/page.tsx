'use client'
import SafakatHouseScene from '@/components/3d/safakathouse'
import SafakatHouseSidebar from '@/components/3d/safakathouse/safakathouse-sidebar'
import SidebarArchitecture from '@/components/3d/sidebar'
import PageContainer from '@/components/page-container'
import React from 'react'


const page = () => {
  return (
    <PageContainer>
      <SidebarArchitecture title='Safakat House'>
        <SafakatHouseSidebar/>
      </SidebarArchitecture>
      <SafakatHouseScene/>
    </PageContainer>
  )
}

export default page