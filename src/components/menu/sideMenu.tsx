import React from 'react'
import sideMenuStyle from "./sideMenu.module.css"
import UserInfo from "../userInfo/UserInfo";
import Link from 'next/link';


export default function SideMenu() {
    const navPages: MenuNavLinkObj[] = [];
    return (
        <div className={sideMenuStyle.sideMenu}>
            {/* <ul>
                <li>
                    <UserInfo username="" dp="" fullname="" />
                </li>
                {navPages.map((obj) => <li key={obj.name}>
                    menuTile
                </li>)}
                <li></li>
            </ul> */}
        </div>
    )
}
