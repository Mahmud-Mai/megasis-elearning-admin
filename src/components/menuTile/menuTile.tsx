import Link from 'next/link'
import React from 'react'
export interface MenuNavLinkObj {
    name: string;
    address: string;
    icon: React.ReactNode;
}



export default function MenuTile({ name, address, icon }: MenuNavLinkObj) {

    return (
        <Link href={address} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            {icon}
            <span className="ms-3">{name}</span>
        </Link>
    )
}
