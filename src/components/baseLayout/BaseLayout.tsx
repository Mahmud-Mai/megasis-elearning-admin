import React from 'react'
import TopNavBar from '../topNavBar/TopNavBar'
import SideMenu from '../menu/sideMenu'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: "#F6F6F6", height: "100%", width: "100%" }}>
      <SideMenu />
      <div>
        <TopNavBar />
        {children}
      </div>
    </div>
  )
}
