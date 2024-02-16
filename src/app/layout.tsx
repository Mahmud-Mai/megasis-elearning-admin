"use client"
import 'bootstrap/dist/css/bootstrap.css';
import BaseLayout from "@/components/baseLayout/BaseLayout";
import BootstrapClient from '@/components/BootstrapClient';
import SideBar from "@/components/menu/sideBar";
import TopBar from '@/components/topNavBar/topBar';
import { useState } from 'react';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [expanded, setExpanded] = useState(false);
  return (
    <html lang="en">
      <body>
        <div style={{ position: "relative", width: "100%" }} className="row m-0 p-0">
          <div className='d-block d-lg-none d-xl-none' style={{ height: "30px", width: "30px", position: "fixed", top: "90px", left: expanded ? "200px" : "10px", zIndex: "105" }}>
            <button onClick={() => setExpanded(!expanded)} className='border shadow bg-light rounded'>
              {expanded ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>}
            </button>

          </div>
          <div className={`${expanded ? "d-block" : "d-none"} d-block d-lg-none d-xl-none`} style={{ zIndex: "100", backgroundColor: "white", position: "fixed", top: "0", left: "0", bottom: "0", width: "300px" }}>
            <SideBar />
          </div>
          <div className="col-md-none col-lg-2 d-none d-lg-block">
            <SideBar />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-10 p-0 m-0" style={{ backgroundColor: "#F6F6F6" }}>
            <TopBar />
            <main style={{ height: "100vh", width: "100%" }}>

              {children}
            </main>
          </div>
        </div>
        <BootstrapClient />
      </body>
    </html >
  );
}
