import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
export interface MenuNavLinkObj {
    name: string;
    address: string;
    icon: React.ReactNode;
}



export default function MenuTile({ name, address, icon }: MenuNavLinkObj) {
    const pathname = usePathname()
    return (
        <Link href={address} className={`flex items-center px-8 py-3 text-white hover:bg-[#509CDB] group ${pathname === address && "bg-[#509CDB]"}`}>
            {icon}
            <span className="ms-3">{name}</span>
        </Link>
    )
}
