"use client"
import axios from 'axios';
import { useState, useEffect } from 'react'


interface PlanInterface {
    title: string, description: string, price: string, period: number, active: boolean
}

export default function Plans() {
    const [plans, setPlans] = useState<PlanInterface[]>([]);
    useEffect(() => {
        // TODO call api to get list of plans
        setPlans([
            {
                title: "Basic",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus architecto, maiores reiciendis dolorum quos cumque ut ipsam totam recusandae.",
                price: "300",
                period: 5,
                active: true,
            },
            {
                title: "Basic",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus architecto, maiores reiciendis dolorum quos cumque ut ipsam totam recusandae.",
                price: "300",
                period: 5,
                active: true,
            },
            {
                title: "Basic",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus architecto, maiores reiciendis dolorum quos cumque ut ipsam totam recusandae.",
                price: "300",
                period: 5,
                active: true,
            },
            {
                title: "Basic",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus architecto, maiores reiciendis dolorum quos cumque ut ipsam totam recusandae.",
                price: "300",
                period: 5,
                active: true,
            },
        ]);
    }, []);
    return (
        <div className="container p-3">
            <div className='d-flex align-items-center justify-content-between py-3'>
                <span className='fw-bold text-uppercase fs-4'>List of Subscription Plans</span> <span><button className="btn btn-primary text-end">Add New Plan</button></span>
            </div>
            <table className="table table-hover table-responsive">
                <thead className="thead-dark bg-dark">
                    <tr className='text-uppercase'>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">period</th>
                        <th scope="col">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        plans.map((plan, index) => <tr key={index}>
                            <td>{plan.title}</td>
                            <td>{plan.description}</td>
                            <td>${plan.price}</td>
                            <td>{plan.period} Months</td>
                            <td>
                                <div style={{ height: "15px", width: "15px" }} className={`rounded-circle bg-${plan.active ? 'success' : 'dander'}`}></div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div >
    )
}