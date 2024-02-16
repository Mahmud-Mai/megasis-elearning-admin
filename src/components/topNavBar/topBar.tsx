"use client"
import Link from 'next/link'
import React from 'react'
import { Navbar, Col, Row } from 'react-bootstrap'
import ImageAvater from '../imageAvater/imageAvater'
import topBarStyle from './topBar.module.css'

export default function TopBar() {
    return (
        <Row className="py-2" style={{ backgroundColor: "white", padding: "0", margin: "0", position: "sticky", top: "0", right: "0", width: "100%" }}>
            <Col sm='12' lg='6' md='6'>
                <div className="container rounded row justify-content-center align-items-center my-1 mx-2 px-2 py-1" style={{ width: "auto", backgroundColor: "#E8E8E8" }}>
                    <div className="col-1 d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>
                    <div className="col-10 d-flex align-items-center">
                        <input className="form-control shadow-none border-none" style={{ backgroundColor: "#E8E8E8", borderWidth: "0", fontSize: "14px" }} type="search" placeholder="Search items modules, and users" aria-label="Search" />
                    </div>
                    <div className="col-1 d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
                        </svg>
                    </div>
                </div>
            </Col>
            <Col sm='12' lg='6' md='6'>
                <div className='row justify-content-end align-items-center m-2'>
                    <div className='col-1 m-1 d-flex justify-content-center align-items-center text-center' style={{ height: "40px", width: "40px", padding: "auto", borderRadius: "50%", backgroundColor: "lightgrey" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                    </div>
                    <div className="col-1 m-1 d-flex justify-content-center align-items-center text-center" >
                        <ImageAvater size={35} alt="" src="https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png" />
                    </div>
                    <div className="col-2 d-flex m-1 justify-content-center align-items-center text-center">
                        <span className="me-3" >Mike</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
