"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { Modal } from "react-bootstrap"
import { useRouter } from 'next/navigation';

export default function CourseDetails({ params }: { params: { courseId: string } }) {
    const router = useRouter();
    const [course, setCourse] = useState<CourseInterface>();
    const [show, setShow] = useState(false);
    const [updating, setupdating] = useState(false);
    const [chapters, setChapters] = useState<ChapterInterface[]>([]);
    var token = localStorage.getItem("bearer-token");

    const [id, setId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleClose = () => { setShow(false); setupdating(false) };
    const handleShow = () => setShow(true);


    const saveChapter = () => {
        fetch(createChapterUrl, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({ courseId, title, description }),
        })
            .then((response) => response.json())
            .then((data) => router.refresh())
            .catch((err) => console.log(err))
    }

    const updateChapter = () => {
        fetch(updateChapterUrl, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({ id, courseId, title, description }),
        })
            .then((response) => response.json())
            .then((data) => router.refresh())
            .catch((err) => console.log(err))
    }
    const deleteChapter = (chapter: ChapterInterface) => {
        fetch(deleteChapterUrl, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({ id: chapter.id }),
        })
            .then((response) => response.json())
            .then((data) => router.refresh())
            .catch((err) => console.log(err))
    }

    const editChapter = (chapter: ChapterInterface) => {
        setId(chapter.id);
        setTitle(chapter.title);
        setDescription(chapter.description);
        setCourseId(chapter.courseId);
        setupdating(true);
        setShow(true);
    }

    // load course info
    useEffect(() => {
        fetch(getCourseUrl, {
            method: "post",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ courseId: params.courseId }),
        })
            .then(res => res.json())
            .then((res) => {
                const { course } = res;
                setCourse(course);
            }).catch((error) => {
                console.log("Unable to load data")
            })
    });

    // get list of chapters
    useEffect(() => {
        fetch(getChaptersByCourseIdUrl, {
            method: "post",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ courseId: params.courseId }),
        })
            .then(res => res.json())
            .then((response) => {
                const { chapters } = response;
                setChapters(chapters);
            }).catch((error) => {
                console.log("failed to load chapters")
                setChapters([]);
            })
    });


    return (
        <div className="container p-3">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> {updating ? "Update" : "Add New"} Chapter </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input value={params.courseId} type="hidden" className="form-control" id="customFile" />
                        <input value={id} type="hidden" className="form-control" id="customFile" />
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
                    <button onClick={() => updating ? updateChapter() : saveChapter()} type="submit" className="btn m-2 px-4" style={{ backgroundColor: "#4ED164", color: "white", height: "40px", borderRadius: "20px" }}>Save</button>
                </Modal.Footer>
            </Modal>
            <div className="text-center">
                <h3>{course?.title}</h3>
                <p>{course?.description}</p>
            </div>
            <div className='d-flex align-items-center justify-content-between py-3'>
                <span className='fw-bold text-uppercase fs-4'>Chapters</span>
                <span>
                    <button className="btn btn-primary mx-1" onClick={() => handleShow()}>Add New Chapter</button>
                </span>
            </div>
            <table className="table table-hover table-responsive">
                <thead className="thead-dark">
                    <tr className='text-uppercase'>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        chapters.map((chapter) => <tr key={chapter.id}>
                            <td>{chapter.title}</td>
                            <td>{chapter.description}</td>
                            <td>
                                <Link href={`/dashboard/chapters/${chapter.id}`} className="btn btn-primary">View</Link>
                                <button className="btn btn-secondary" onClick={() => editChapter(chapter)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteChapter(chapter)}>Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
