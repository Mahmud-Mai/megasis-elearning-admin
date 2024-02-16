"use client"
import React from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Row, Col, Image } from "react-bootstrap";
import ContentCard from '@/components/contentCard/ContentCard';




export default function Sections() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sections: SectionObject[] = [
        {
            title: "how to record 4k videos on iphone",
            author: "john doe",
            imageSource: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
        },
        {
            title: "how to record 4k videos on iphone",
            author: "john doe",
            imageSource: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
        },
        {
            title: "how to record 4k videos on iphone",
            author: "john doe",
            imageSource: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
        },
        {
            title: "how to record 4k videos on iphone",
            author: "john doe",
            imageSource: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
        },
    ];


    return (
        <Container className='pt-3'>
            <div>
                <button
                    className='btn btn-larg text-light bg-primary'
                    onClick={handleShow}>Add New Section</button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Add New Section </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group form-control">
                                <label className="form-label" htmlFor="customFile">Section Image</label>
                                <input type="file" className="form-control" id="customFile" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="email" className="form-control" id="title" placeholder="name@example.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input type="text" className="form-control" id="author" placeholder="name@example.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Body</label>
                                <textarea name="body" className="form-control" id="body" ></textarea>
                            </div>
                            <div className="d-flex align-items-center justify-content-evenly">

                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn m-2 px-4" style={{ backgroundColor: "#4ED164", color: "white", height: "40px", borderRadius: "20px" }}>Save as Draft</button>
                        <button type="submit" className="btn m-2 px-4" style={{ backgroundColor: "#4ED164", color: "white", height: "40px", borderRadius: "20px" }}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Row className='my-1'>
                {sections.map((section, index) =>
                    <Col key={index} sm="12" md="6" lg="4" className="my-1" >
                        <ContentCard title={section.title} author={section.author} imageSource={section.imageSource} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}
