import Link from 'next/link'
import React from 'react'




export default function MenuTile({ name, address, icon }: MenuNavLinkObj) {

    return (
        <Link href={address} className="decoration-none text-dark p-0 mt-3" style={{ height: "50px", textDecoration: "none" }}>
            <div className='p-1 py-2 my-1'>
                {icon}
                <span className='m-2'>{name}</span>
            </div>
        </Link>
    )
}
