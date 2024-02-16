import 'bootstrap/dist/css/bootstrap.css';
import BaseLayout from "@/components/baseLayout/BaseLayout";
import BootstrapClient from '@/components/BootstrapClient';
import SideBar from "@/components/menu/sideBar";
import TopBar from '@/components/topNavBar/topBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ position: "relative", width: "100%" }} className="row m-0 p-0">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10 p-0 m-0" style={{ backgroundColor: "#F6F6F6" }}>
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
