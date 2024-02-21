"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'



export default function CourseDetails(courseId: string) {
    const [course, setCourse] = useState<CourseInterface>();
    const [chapters, setChapters] = useState<ChapterInterface[]>([]);
    useEffect(() => {
        // TODO call api to get course details
        setCourse(
            {
                id: "1",
                title: "Basic",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus architecto, maiores reiciendis dolorum quos cumque ut ipsam totam recusandae.",

            });
    }, []);

    useEffect(() => {
        // TODO call api to get list of chapters for course with id courseId
        setChapters(
            [{
                id: "1",
                courseId: "1",
                title: "Basic",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus architecto, maiores reiciendis dolorum quos cumque ut ipsam totam recusandae.",

            }]);
    }, []);


    return (
        <div className="container p-3">
            <div className="text-center">
                <h3>{course?.title}</h3>
                <p>{course?.description}</p>
            </div>
            <div className='d-flex align-items-center justify-content-between py-3'>
                <span className='fw-bold text-uppercase fs-4'>Chapters</span>
                <span>
                    <button className="btn btn-primary mx-1">Add New Chapter</button>
                    <button className="btn btn-secondary">Edit Course</button>
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
                            <td><Link href={`/dashboard/chapters/${chapter.id}`} className="btn btn-primary">View</Link></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
