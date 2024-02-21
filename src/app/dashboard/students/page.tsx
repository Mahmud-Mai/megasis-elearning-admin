import UserCard from '@/components/userCard/UserCard'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import style from "./customer.module.css"

export default function Customers() {
    const customers: customerObject[] = [
        {
            name: "Carl Jacob",
            email: "carol@mail.com",
            profilePicture: "",
        },
        {
            name: "Carl Jacob",
            email: "carol@mail.com",
            profilePicture: "",
        },
        {
            name: "Carl Jacob",
            email: "carol@mail.com",
            profilePicture: "",
        },
        {
            name: "Carl Jacob",
            email: "carol@mail.com",
            profilePicture: "",
        },
        {
            name: "Carl Jacob",
            email: "carol@mail.com",
            profilePicture: "",
        },
        {
            name: "Carl Jacob",
            email: "carol@mail.com",
            profilePicture: "",
        },
    ]
    return (
        <div className='container'>
            <Row>
                {customers.map((customer) =>
                    <Col sm='6' md='4' lg='3' key={customer.email}>
                        <div className={`${style.customerCard} rounded m-1 my-3 customer-card`} style={{ backgroundColor: "white" }}>
                            <div className={`d-flex align-items-center justify-content-center rounded-circle text-light customer-remove-btn ${style.customerRemoveBtn}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                </svg>
                            </div>
                            <UserCard profilePicture={customer.profilePicture} title={customer.name} subTitle={customer.email} />
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    )
}
