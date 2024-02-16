import UserCard from '@/components/userCard/UserCard';
import React from 'react'
import { Row, Col } from "react-bootstrap";

export default function Admins() {
    const admins: adminObject[] = [
        {
            name: "Amjad singh",
            role: "Executive Admin",
            profilePicture: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
        },
        {
            name: "Amjad singh",
            role: "Executive Admin",
            profilePicture: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
        },
        {
            name: "Amjad singh",
            role: "Executive Admin",
            profilePicture: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
        },
        {
            name: "Amjad singh",
            role: "Executive Admin",
            profilePicture: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
        },
    ]
    return (
        <div className="container p-2 m-2" style={{ height: "100%" }}>
            <Row>
                <Col sm="12" md="9" lg="9" style={{ height: "100%" }}>
                    <form>
                        <div className="row  m-1">
                            <div className="form-group m-1">
                                <label htmlFor="inputAddress">Name</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="ex: john smith" />
                            </div>

                            <div className="form-group my-1 col-md-6 ">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" />
                            </div>
                            <div className="form-group my-1 col-md-6 ">
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="password" className="form-control" id="dob" placeholder="Password" />
                            </div>
                            <div className="form-group my-1 col-sm-12 col-md-6 col-lg-6">
                                <label htmlFor="email">Password</label>
                                <input type="email" className="form-control" id="email" placeholder="Password" />
                            </div>
                            <div className="form-group col-sm-12 col-md-6 col-lg-6">
                                <label htmlFor="dob">Confirm Password</label>
                                <input type="password" className="form-control" id="dob" placeholder="Confirm Password" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-evenly">

                            <button type="submit" className="btn m-2 px-4" style={{ backgroundColor: "#4ED164", color: "white", height: "40px", borderRadius: "20px" }}>Add New Admin</button>
                            <button className="btn m-2 px-4" style={{ backgroundColor: "#FF3C2F", color: "white", height: "40px", borderRadius: "20px" }}>Delete Admin</button>
                        </div>
                    </form>
                </Col>
                <Col sm="12" md="3" lg="3">
                    <div className="rounded shadow p-2" style={{ height: "100%", backgroundColor: "white" }}>
                        <p className="fw-bold">Admins</p>
                        <Row className="justify-content-center align-items-center">
                            {admins.map((admin) =>
                                <Col key={admin.name} sm="12" md="12" lg="12">
                                    <UserCard profilePicture={admin.profilePicture} title={admin.role} subTitle={admin.name} />
                                    <hr className='mx-3' />
                                </Col>
                            )}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
