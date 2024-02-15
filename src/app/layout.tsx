import 'bootstrap/dist/css/bootstrap.css';
import BaseLayout from "@/components/baseLayout/BaseLayout";
import BootstrapClient from '@/components/BootstrapClient';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BaseLayout>
          {children}
          <BootstrapClient />
        </BaseLayout>
      </body>
    </html>
  );
}
