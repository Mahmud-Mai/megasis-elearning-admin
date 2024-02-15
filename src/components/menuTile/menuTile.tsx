import Link from 'next/link'
import React from 'react'




export default function MenuTile({ name, address }: MenuNavLinkObj) {
    
    return (
        <Link href={address}>
            <div className="row">
                <div className="col-3">
                </div>
                <div className="col-9 p-2">{name}</div>
            </div>
        </Link>
    )
}
