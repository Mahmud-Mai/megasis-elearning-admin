"use client"
import React, { useEffect } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Row, Col, Image } from "react-bootstrap";
import ContentCard from '@/components/contentCard/ContentCard';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ChapterDetailsPage({ params }: { params: { chapterId: string } }) {
    const router = useRouter()

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [id, setId] = useState("");
    const [updating, setUpdating] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [chapter, setChapter] = useState<ChapterInterface>();
    const [mediaList, setMediaList] = useState<MediaInterface[]>([]);

    const mediasUrl = `${apiRoot}/media/getMediaByChapterId?chapterId=${params.chapterId}`
    const chapterUrl = `${apiRoot}/chapters/getChapter/?chapterId=${params.chapterId}` // TODO missing endpoint for list of chapter details by id

    const newMediaCreateUrl = `${apiRoot}/media/createMedia`;
    const updateMediaUrl = `${apiRoot}/media/updateMedia`;


    const saveMedia = () => {
        const chapterId = params.chapterId;
        var token = Cookies.get("bearer-token");
        axios.post(newMediaCreateUrl, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ chapterId, title, description, url, mediaType }),
        }).then((res) => {
            if (res.status == 200) {
                router.reload();
            }
        }).catch((err) => {
            console.log("Unable to save Media")
        })
    }

    const updateMedia = () => {
        const chapterId = params.chapterId;
        var token = Cookies.get("bearer-token");
        axios.post(newMediaCreateUrl, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ id, chapterId, title, description, url, mediaType }),
        }).then((res) => {
            if (res.status == 200) {
                router.reload();
            }
        }).catch((err) => {
            console.log("Unable to update Media")
        })
    }

    // load chapter info
    useEffect(() => {
        var token = Cookies.get("bearer-token");
        axios.get(chapterUrl, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        }).then((res) => {
            const { chapter } = res.data;
            setChapter(chapter);
        }).catch((error) => {
            console.log("Unable to load data")
        })
    });

    // get list of media for this chapter
    useEffect(() => {
        // TODO get chapters endpoint missing
        var token = Cookies.get("bearer-token");
        axios.get(mediasUrl, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        }).then((response) => {
            const { mediaList } = response.data;
            setMediaList(mediaList);
        }).catch((error) => {
            console.log("unable to load data");
            setMediaList([]);
        })

    });

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
                                <label className="form-label" htmlFor="customFile">Media url</label>
                                <input value={url} onChange={(e) => setUrl(e.target.value)} type="text" className="form-control" id="customFile" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="title" placeholder="name@example.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Body</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="body" className="form-control" id="body" >{description}</textarea>
                            </div>
                            <div className="d-flex align-items-center justify-content-evenly">
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => updating ? updateMedia() : saveMedia()} type="submit" className="btn m-2 px-4" style={{ backgroundColor: "#4ED164", color: "white", height: "40px", borderRadius: "20px" }}>Save</button>
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
