"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Modal } from 'react-bootstrap';
import {
    createSubscriptionOfferUrl, deleteSubscriptionOfferUrl,
    getSubscriptionOffersUrl,
    PlanInterface,
    updateSubscriptionOfferUrl
} from "@/constants";


export default function Plans() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [updating, setUpdating] = useState(false);
    // plan
    const [plans, setPlans] = useState<PlanInterface[]>([]);
    // fields
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [period, setPeriod] = useState(1);
    const [active, setActive] = useState(true);
    var token = localStorage.getItem("bearer-token");


    const handleClose = () => { setShow(false); setUpdating(false) };
    const handleShow = () => setShow(true);

    // functions
    const loadPlans = () => {
        fetch(getSubscriptionOffersUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then(
                (res) => {
                    const { subscriptionOffers } = res;
                    setPlans(subscriptionOffers);
                }
            ).catch((err) => {
                console.log("Unable to load offers")
                setPlans([]);
            })
    }

    const addNewPlan = () => {
        fetch(createSubscriptionOfferUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, price, period, active })
        })
            .then((res) => res.json())
            .then(
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

    const updatePlan = () => {
        fetch(updateSubscriptionOfferUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, price, period, active }),
        })
            .then((res) => res.json())
            .then(
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

    const deletePlan = () => {
        fetch(deleteSubscriptionOfferUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ subscriptionOfferId: id }),
        })
            .then((res) => res.json())
            .then(
                (res) => {
                    if (res.status == 200) {
                        router.reload();
                    }
                }
            ).catch((err) => {
                console.log("Unable to delete offer")
                setPlans([]);
            })
    }

    const editPlan = (plan: PlanInterface) => {
        setId(plan.id);
        setTitle(plan.title);
        setDescription(plan.description);
        setPrice(plan.price);
        setPeriod(plan.period);
        setActive(plan.active);
        setUpdating(true);
        setShow(true);
    }

    useEffect(() => {
        loadPlans();
    },);
    return (
        <div className="container p-3">
            <div className='d-flex align-items-center justify-content-between py-3'>
                <span className='fw-bold text-uppercase fs-4'>List of Subscription Plans</span> <span><button className="btn btn-primary text-end" onClick={handleShow}>Add New Plan</button></span>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> {updating ? "Update" : "Add New"} Subscription Offer </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input value={id} type="hidden" className="form-control" id="customFile" />
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="title" placeholder="name@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="body" className="form-control" id="body" >{description}</textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Price</label>
                            <input value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} type="number" className="form-control" id="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Period (months)</label>
                            <input value={period} onChange={(e) => setPeriod(parseInt(e.target.value))} type="number" className="form-control" id="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Active</label>
                            <input checked={active} onChange={(e) => setActive(e.target.checked)} type="checkbox" className="form-control" id="actve" />
                        </div>
                        <div className="d-flex align-items-center justify-content-evenly">
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => updating ? updatePlan() : addNewPlan()} type="submit" className="btn m-2 px-4" style={{ backgroundColor: "#4ED164", color: "white", height: "40px", borderRadius: "20px" }}>Save</button>
                </Modal.Footer>
            </Modal>
            <table className="table table-hover table-responsive">
                <thead className="thead-dark bg-dark">
                    <tr className='text-uppercase'>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">period</th>
                        <th scope="col">Active</th>
                        <th scope="col">Action</th>
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
                            <td>
                                <button className="btn btn-secondary" onClick={() => editPlan(plan)} >Edit</button>
                                <button className="btn btn-danger" onClick={() => deletePlan()} >Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div >
    )
}