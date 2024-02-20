"use client"
import 'bootstrap/dist/css/bootstrap.css';
import BaseAdminLayout from "@/components/baseLayout/BaseLayout";
import BootstrapClient from '@/components/BootstrapClient';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>

        {children}

        <BootstrapClient />
      </body>
    </html >
  );
}
