"use client"
import Link from 'next/link'
import React from 'react'
import ImageAvater from '../imageAvater/imageAvater'
import topBarStyle from './topBar.module.css'

export default function TopBar() {
    return (
        <div
            className="p-0 m-0 flex flex-row items-center justify-end"
            style={{ backgroundColor: "white", padding: "0", margin: "0", position: "sticky", top: "0", right: "0", width: "100%" }}
        >
            <div className='m-3 flex justify-center items-center text-center' style={{ height: "40px", width: "40px", padding: "auto", borderRadius: "50%", backgroundColor: "lightgrey" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
            </div>
            <div className="m-2 flex justify-center items-center" >
                <ImageAvater size={30} alt="" src="https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png" />
            </div>
            <div className="flex m-3 justify-center items-center text-center">
                <span className="me-3" >Mike</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                </svg>
            </div>
        </div>
    )
}
