import React, { useEffect } from 'react'
import TopNavBar from '../topNavBar/topBar'
import SideMenu from '../menu/sideBar'
import SideBar from "@/components/menu/sideBar";
import TopBar from '@/components/topNavBar/topBar';
import { useState } from 'react';
import { Button } from '../ui/button';
import ProfileDTO from '@/core/dto/login/ProfileDTO';
import { getProfile } from '@/core/services/login-service';


export default function BaseAdminLayout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [profile, setProfile] = useState<ProfileDTO>();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    getProfile().then(res => setProfile(res));
  })

  return (
    <div className="w-[100%] flex felx-row  m-0 p-0">
      <Button className="lg:collapse md:visible sm:visible fixed top-3 left-3 z-50" onClick={() => setExpanded(!expanded)}>
        {expanded ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>}
      </Button>
      {expanded ?
        <div
          className="block lg:hidden xl:hidden fixed top-0 left-0" style={{ zIndex: "49" }}>
          <SideBar username={profile?.name} onPageChanged={setPageTitle} />
        </div>
        : <></>}
      <div className='h-screen w-[100%] flex flex-row'>
        <div className="h-screen hidden lg:block xl:block z-50" >
          <SideBar username={profile?.name} onPageChanged={setPageTitle} />
        </div>
        <div className="w-[100%] h-screen p-0 m-0" style={{ backgroundColor: "#F6F6F6" }}>
          <TopBar title={pageTitle} />
          <main className='p-3 m-0'>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
