"use client"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { Modal } from 'react-bootstrap';
import {
    createSubscriptionOffer, deleteSubscriptionOffer,
    getSubscriptionOffers,
    updateSubscriptionOffer
} from "@/core/services/subscription-service";
import SubscriptionOffer from "@/core/dto/subscription/SubscriptionOffer";


export default function Plans() {
    const router = useRouter();

    const [refresher, setRefresher] = useState(false);
    const [show, setShow] = useState(false);
    const [updating, setUpdating] = useState(false);
    // plan
    const [plans, setPlans] = useState<SubscriptionOffer[]>([]);
    // fields
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [period, setPeriod] = useState(1);
    const [active, setActive] = useState(true);



    const handleClose = () => { setShow(false); setUpdating(false) };
    const handleShow = () => setShow(true);

    // functions
    const loadPlans = () => {
        getSubscriptionOffers()
            .then(
                (subscriptionOffers) => {
                    setPlans(subscriptionOffers);
                }
            ).catch((err) => {
                console.log("Unable to load offers")
                setPlans([]);
            })
    }

    const addNewPlan = () => {
        createSubscriptionOffer({ title, description, price, period, active })
            .then((res) => setRefresher(!refresher)).catch((err) => {
                console.log("Unable to save offer")
                setPlans([]);
            })
    }

    const updatePlan = () => {
        updateSubscriptionOffer({ subscriptionId: id, title, description, price, period, active })
            .then((res) => setRefresher(!refresher)).catch((err) => {
                console.log("Unable to save offer")
                setPlans([]);
            })
    }

    const deletePlan = () => {
        deleteSubscriptionOffer({ subscriptionId: id })
            .then((res) => setRefresher(!refresher)).catch((err) => {
                console.log("Unable to delete offer")
                setPlans([]);
            })
    }

    const editPlan = (plan: SubscriptionOffer) => {
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
    }, [refresher]);

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
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="activeCheckBox" checked={active} onChange={(e) => setActive(e.target.checked)} />
                            <label className="form-check-label" htmlFor="activeCheckBox"> {active ? "Active" : "Inactive"}</label>
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