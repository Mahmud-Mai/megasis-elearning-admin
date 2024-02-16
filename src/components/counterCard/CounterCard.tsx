import React from 'react'
import { Col } from 'react-bootstrap';

interface Props {
    title: string;
    value: string;

}

export default function CounterCard({ title, value }: Props) {
    return (
        <Col sm="6" md="4" lg="3" style={{ width: "250px" }} className='rounded my-1 bg-light p-3'>
            <p className='text-uppercase'>{title}</p>
            <p className='fs-1 fw-bold' style={{ color: "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)" }}>{value}</p>
        </Col >
    )
}
