"use client"
import 'bootstrap/dist/css/bootstrap.css';
import BaseAdminLayout from "@/components/baseLayout/BaseLayout";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react'; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('bearer-token');
    if (!token) {
      router.push('/');
    }
  });

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <BaseAdminLayout>{children}</BaseAdminLayout>
      </body>
    </html >
  );
}
