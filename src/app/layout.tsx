"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseAdminLayout from "@/components/baseLayout/BaseLayout";
import BootstrapClient from '@/components/BootstrapClient';
import {useEffect} from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js")
    }, [])

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>

        {children}

        <BootstrapClient />
      </body>
    </html >
  );
}
