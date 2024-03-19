"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'
// import { Modal } from 'react-bootstrap';
import { useRouter } from "next/navigation"
import CourseDTO from "@/core/dto/content/CourseDTO";
import { createCourse, getCourses, updateCourse } from "@/core/services/content-service";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';


export default function Courses() {
    const router = useRouter()
    const [refresher, setRefresher] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [courses, setCourses] = useState<CourseDTO[]>([]);

    const [title, setTitle] = useState("");
    const [courseId, setCourseId] = useState("");
    const [description, setDescription] = useState("");


    const createCourseFunction = () => {
        setLoading(true);
        createCourse({ title, description })
            .then((res) => {
                setLoading(false);
                setRefresher(!refresher);
            }).catch((err) => {
                setLoading(false);
                alert("Unable to save course");
                console.log("Unable to save Course")
            })
    }

    const updateCourseFunction = () => {
        setLoading(true);
        updateCourse({ title, description, courseId })
            .then((res) => {
                setLoading(false);
                setRefresher(!refresher);
            }).catch((err) => {
                setLoading(false);
                alert("Unable to save course");
                console.log("Unable to update Course")
            })
    }

    const loadCoursesFunction = () => {
        getCourses()
            .then((courses) => {
                setCourses(courses);
            }).catch((err) => {
                console.log("Could not load courses")
                setCourses([]);
            })
    }

    useEffect(() => {
        loadCoursesFunction();
    }, [refresher]);

    return (
        <div className="container p-3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New Course </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{updating ? "Update" : "Add New"} Course </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Course Title</Label>
                            <Input
                                id="title"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea
                                id="description"
                                className="col-span-3"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={loading} onClick={() => updating ? updateCourseFunction() : createCourseFunction()} type="submit" >{loading ? "Saving..." : "Save"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            <Table>
                <TableCaption>A list of Courses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course) => (
                        <TableRow key={course.id}>
                            <TableCell>{course.title}</TableCell>
                            <TableCell>{course.description}</TableCell>
                            <TableCell>
                                <Button variant="link" >
                                    <Link href={`/dashboard/courses/${course.id}`} className="btn btn-primary">Open</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
