"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CourseDTO from "@/core/dto/content/CourseDTO";
import {createCourse, getCourses, updateCourse} from "@/core/services/content-service";

export default function Courses() {
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [courses, setCourses] = useState<CourseDTO[]>([]);
    const handleClose = () => { setShow(false); setUpdating(false) };
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const [description, setDescription] = useState("");


    const createCourseFunction = () => {
        createCourse({ title, description })
            .then((res) => {
                router.reload();
        }).catch((err) => {
            console.log("Unable to save Course")
        })
    }

    const updateCourseFunction = () => {
        updateCourse({ title, description, courseId }).then((res) => {
                router.reload();
        }).catch((err) => {
            console.log("Unable to update Course")
        })
    }

    const loadCoursesFunction = () => {
        getCourses()
            .then((courses) => {
                setCourses(courses);
            }).catch((err) => {
                console.log("Invalid email or Password")
                setCourses([]);
            })
    }

    useEffect(() => {
        loadCoursesFunction();
    });

    return (
        <div className="container p-3">
            <div className='d-flex align-items-center justify-content-between py-3'>
                <span className='fw-bold text-uppercase fs-4'>List of Courses</span> <span><button onClick={handleShow} className="btn btn-primary text-end">Add New Course</button></span>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> {updating ? "Update" : "Add New"} Course </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Course Title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" className="form-control" id="body" >{description}</textarea>
                        </div>
                        <div className="d-flex align-items-center justify-content-evenly">
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" onClick={() => updating ? updateCourseFunction() : createCourseFunction()} className="btn m-2 px-4" style={{ backgroundColor: "#4ED164", color: "white", height: "40px", borderRadius: "20px" }}>Save</button>
                </Modal.Footer>
            </Modal>
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
                        courses.map((course) => <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td><Link href={`/dashboard/courses/${course.id}`} className="btn btn-primary">Open</Link></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
