"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import {
    createChapter,
    deleteChapter,
    getChaptersByCourseId,
    getCourse,
    updateChapter
} from "@/core/services/content-service";
import ChapterDTO from "@/core/dto/content/ChapterDTO";
import CourseDTO from "@/core/dto/content/CourseDTO";

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

export default function CourseDetails({ params }: { params: { courseId: string } }) {
    const router = useRouter();

    const [refresher, setRefresher] = useState(false);
    const [course, setCourse] = useState<CourseDTO>();
    const [show, setShow] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [chapters, setChapters] = useState<ChapterDTO[]>([]);

    const [chapterId, setChapterId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleClose = () => { setShow(false); setUpdating(false) };
    const handleShow = () => setShow(true);


    const createChapterFunction = () => {
        createChapter({ courseId, title, description })
            .then((_) => {
                setRefresher(!refresher);
                setShow(false);
            })
            .catch((err) => console.log(err))
    }

    const updateChapterFunction = () => {
        updateChapter({ chapterId, title, description })
            .then((_) => {
                setRefresher(!refresher);
                setShow(false);
            })
            .catch((err) => console.log(err))
    }
    const deleteChapterFunction = (chapter: ChapterDTO) => {
        deleteChapter(chapter.id)
            .then((_) => setRefresher(!refresher))
            .catch((err) => console.log(err))
    }


    const editChapter = (chapter: ChapterDTO) => {
        setChapterId(chapter.id);
        setTitle(chapter.title);
        setDescription(chapter.description);
        setCourseId(chapter.courseId);
        setUpdating(true);
        setShow(true);
    }

    // load course info
    useEffect(() => {
        setCourseId(params.courseId)
        getCourse(params.courseId)
            .then((course) => {
                setCourse(course);
            }).catch((error) => {
                console.log("Unable to load data")
            })
    }, [params.courseId]);

    // get list of chapters
    useEffect(() => {
        getChaptersByCourseId(params.courseId)
            .then((chapters) => {
                setChapters(chapters);
            }).catch((error) => {
                console.log("failed to load chapters")
                setChapters([]);
            })
    }, [params.courseId, refresher]);


    return (
        <div className="p-3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New Chapter </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{updating ? "Update" : "Add New"} Chapter </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <input value={params.courseId} type="hidden" className="form-control" id="customFile" />
                        <input value={chapterId} type="hidden" className="form-control" id="customFile" />

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
                        <Button onClick={() => updating ? updateChapterFunction() : createChapterFunction()} type="submit" >Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="text-center">
                <h3>{course?.title}</h3>
                <p>{course?.description}</p>
            </div>

            <Table>
                <TableCaption>A list of Chapters.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {chapters.map((chapter) => (
                        <TableRow key={chapter.id}>
                            <TableCell>{chapter.title}</TableCell>
                            <TableCell>{chapter.description}</TableCell>
                            <TableCell>
                                <Button variant="link" >
                                    <Link href={`/dashboard/chapters/${chapter.id}`} className="btn btn-primary">View</Link>
                                </Button>
                                <Button variant='secondary' onClick={() => editChapter(chapter)}>Edit</Button>
                                <Button variant="destructive" onClick={() => deleteChapterFunction(chapter)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

