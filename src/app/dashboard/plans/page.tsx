"use client"
import axios from 'axios';
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


export default function Plans() {
    const router = useRouter();
    // plan
    const [plans, setPlans] = useState<PlanInterface[]>([]);

    // fields
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [period, setPeriod] = useState("");
    const [active, setActive] = useState(true);

    // urls
    const plansUrl = getSubscriptionOffersUrl;
    const newPlanUrl = createSubscriptionOfferUrl;
    const updatePlanUrl = updateSubscriptionOfferUrl;

    // functions
    const loadPlans = () => {
        var token = Cookies.get("bearer-token");
        axios.get(plansUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(
            (res) => {
                const { offers } = res.data;
                setPlans(offers);
            }
        ).catch((err) => {
            console.log("Unable to load offers")
            setPlans([]);
        })
    }

    const addNewPlan = () => {
        const token = Cookies.get("bearer-token");
        axios.post(newPlanUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: { title, description, price, period, active }
        }).then(
            (res) => {
                if (res.status == 200) {
                    router.reload();
                }
            }
        ).catch((err) => {
            console.log("Unable to save offer")
            setPlans([]);
        })
    }

    const updateNewPlan = () => {
        var token = Cookies.get("bearer-token");
        axios.post(updatePlanUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: { title, description, price, period, active }
        }).then(
            (res) => {
                if (res.status == 200) {
                    router.reload();
                }
            }
        ).catch((err) => {
            console.log("Unable to save offer")
            setPlans([]);
        })
    }

    useEffect(() => {
        loadPlans();
    },);
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