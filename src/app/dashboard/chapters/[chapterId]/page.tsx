"use client"
import React, { useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Row, Col, Image } from "react-bootstrap";
import ContentCard from '@/components/contentCard/ContentCard';


export default function ChapterDetailsPage({ params }: { params: { chapterId: string } }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [chapter, setChapter] = useState<ChapterInterface>();
    const [mediaList, setMediaList] = useState<MediaInterface[]>([]);

    useEffect(
        () => {
            // TODO get list of media
            // const mediaUrl = `${apiRoot}/api/getmedia?chapterId=${chapterId}`
            // var token =  Cookies.get("bearer-token");
            // try {
            //     const response = await axios.get(MediaUrl, {
            //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            //     })

            //     const { medias } = response.data;
            // setMediaList(medias);

            // } catch (error) {
            //     console.log("Invalid email or Password")
            //     setMediaList([]);
            // } 
            setMediaList(
                [
                    {
                        chapterId: "1",
                        title: "how to record 4k videos on iphone",
                        description: "john doe",
                        url: "https://www.wikihow.com/images/9/90/What_type_of_person_are_you_quiz_pic.png",
                        mediaType: "video",
                    },
                ]
            )
        }, []
    );

    // load and set chapter info
    useEffect(
        () => {
            // TODO get chapter
            // const chapterUrl = `api/getChapter?chapterId=${chapterId}`
            // var token =  Cookies.get("bearer-token");
            // try {
            //     const response = await axios.get(chapterUrl, {
            //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            //     })

            //     const { chapter } = response.data;
            // setChapter(chapter);

            // } catch (error) {
            //     console.log("Invalid email or Password")
            // } 
            setChapter({
                id: "1",
                courseId: "2",
                title: "loremjh b,jm",
                description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero eligendi aliquam temporibus autem adipisci quae?",
            })
        }, []
    );

    return (
        <Container className='pt-3'>
            <div>
                <div className="text-end">
                    <button
                        className='btn btn-larg text-light bg-primary'
                        onClick={handleShow}>Add Media</button>
                    <button
                        className='btn text-light bg-secondary mx-1'
                        onClick={handleShow}>Edit chapter</button>
                </div>
                <div className="text-center">
                    <h3 className="fw-bold-fs-3 text-capitalize">
                        {chapter?.title}
                    </h3>
                    <p>{chapter?.description}</p>
                </div>
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
            <div className="text-start">
                <span className='fw-bold fs-4 text-uppercase'>
                    Media List
                </span>
            </div>
            <hr />
            <Row className='my-1'>
                {mediaList.map((media, index) =>
                    <Col key={index} sm="12" md="6" lg="4" className="my-1" >
                        <ContentCard title={media.title} mediaType={media.mediaType} imageSource={media.url} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}
