import ImageAvater from "../imageAvater/imageAvater";
import MenuTile from "../menuTile/menuTile";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export interface MenuNavLinkObj {
  name: string;
  address: string;
  icon: React.ReactNode;
  onCloseSidebar?: (() => void) | undefined;
}

export default function SideBar({
  username,
  onPageChanged
}: {
  username?: string;
  onPageChanged?: (name: string) => void;
  onCloseSidebar?: () => void;
}) {
  const navPages: MenuNavLinkObj[] = [
    {
      name: "Dashboard",
      address: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-columns-gap"
          viewBox="0 0 16 16"
        >
          <path d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" />
        </svg>
      )
    },
    {
      name: "Profile",
      address: "/dashboard/profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
      )
    },
    {
      name: "Add Admin",
      address: "/dashboard/add_admin",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-plus-fill"
          viewBox="0 0 16 16"
        >
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          <path
            fillRule="evenodd"
            d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
          />
        </svg>
      )
    },
    {
      name: "Plans",
      address: "/dashboard/plans",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-sliders2-vertical"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M0 10.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H3V1.5a.5.5 0 0 0-1 0V10H.5a.5.5 0 0 0-.5.5M2.5 12a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5m3-6.5A.5.5 0 0 0 6 6h1.5v8.5a.5.5 0 0 0 1 0V6H10a.5.5 0 0 0 0-1H6a.5.5 0 0 0-.5.5M8 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2A.5.5 0 0 0 8 1m3 9.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H14V1.5a.5.5 0 0 0-1 0V10h-1.5a.5.5 0 0 0-.5.5m2.5 1.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5"
          />
        </svg>
      )
    },
    {
      name: "Courses",
      address: "/dashboard/courses",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bag"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
        </svg>
      )
    }
  ];
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("bearer-token");
    router.replace("/");
  };
  return (
    <aside
      id="default-sidebar"
      className="w-60 flex flex-col h-full bg-green-400"
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col h-full py-4 overflow-y-auto bg-[#152259] text-white">
        <center className="content-center py-6 border-[1px] border-transparent border-b-gray-400">
          <div className="flex align-middle justify-center">
            <ImageAvater size={60} alt={username ?? ""} src="" />
          </div>
          <div className="my-4">
            <span className="capitalize font-bold">
              Megasis Learning | admin
            </span>
          </div>
        </center>
        <ul className="my-6 mx-6 space-y-4 font-medium ">
          {navPages.map((e) => (
            <li onClick={() => onPageChanged!(e.name)} key={e.name}>
              <MenuTile name={e.name} icon={e.icon} address={e.address} />
            </li>
          ))}
          <li className="absolute bottom-9 lg:bottom-7 left-35">
            <button
              onClick={logout}
              className="flex items-center bg-black/35 hover:scale-110 duration-200 ease-linear px-8 py-3 shadow-2xl text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
              <span className="mx-2"> Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
