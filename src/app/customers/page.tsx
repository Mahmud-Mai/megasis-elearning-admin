import UserCard from '@/components/userCard/UserCard'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

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
                        <div className="rounded m-1 my-3" style={{ backgroundColor: "white" }}>
                            <UserCard profilePicture={customer.profilePicture} title={customer.name} subTitle={customer.email} />
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    )
}
