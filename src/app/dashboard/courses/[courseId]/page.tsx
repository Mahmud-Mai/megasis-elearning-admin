"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'



export default function CourseDetails({ params }: { params: { courseId: string } }) {
    const [course, setCourse] = useState<CourseInterface>();
    const [chapters, setChapters] = useState<ChapterInterface[]>([]);
    useEffect(() => {
        // TODO get course by id
        // const coursesUrl = `api/getCourses/?courseId=${courseId}`
        // var token =  Cookies.get("bearer-token");
        // try {
        //     const response = await axios.get(coursesUrl, {
        //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        //     })

        //     const { course } = response.data;
        // setCourse(course);

        // } catch (error) {
        //     console.log("Invalid email or Password")
        // }
        setCourse(
            {
                id: "1",
                title: "Basic",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus architecto, maiores reiciendis dolorum quos cumque ut ipsam totam recusandae.",

            });
    }, []);

    useEffect(() => {
        // TODO get list of chapters
        // TODO get chapters endpoint missing
        // const chaptersUrl = ""
        // var token =  Cookies.get("bearer-token");
        // try {
        //     const response = await axios.get(chaptersUrl, {
        //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        //     })

        //     const { chapters } = response.data;
        //     setChapters(chapters);

        // } catch (error) {
        //     console.log("Invalid email or Password")
        //     setChapters([]);
        // }
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
