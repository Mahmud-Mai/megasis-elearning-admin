"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { Modal } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import CourseDTO from "@/core/dto/content/CourseDTO";
import {
  createCourse,
  getCourses,
  updateCourse
} from "@/core/services/content-service";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHeading from "@/components/reusables/PageHeading";
import DialogTriggerBtn from "@/components/reusables/DialogTriggerBtn";

export default function Courses() {
  const router = useRouter();
  const [refresher, setRefresher] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");

  const createCourseFunction = () => {
    setLoading(true);
    createCourse({ title, description })
      .then((res) => {
        setLoading(false);
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
        setLoading(false);
        alert("Unable to save course");
        console.log("Unable to save Course");
      });
  };

  const updateCourseFunction = () => {
    setLoading(true);
    updateCourse({ title, description, courseId })
      .then((res) => {
        setLoading(false);
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
        setLoading(false);
        alert("Unable to save course");
        console.log("Unable to update Course");
      });
  };

  const loadCoursesFunction = () => {
    getCourses()
      .then((courses) => {
        setCourses(courses);
      })
      .catch((err) => {
        console.log("Could not load courses");
        setCourses([]);
      });
  };

  useEffect(() => {
    loadCoursesFunction();
  }, [refresher]);

  return (
    <div className="container p-16 h-full">
      <PageHeading>
        <Dialog open={show} onOpenChange={setShow}>
          <DialogTrigger asChild className="grid justify-end">
            <DialogTriggerBtn>Add New Course</DialogTriggerBtn>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {updating ? "Update" : "Add New"} Course
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Course Title
                </Label>
                <Input
                  id="title"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                disabled={loading}
                onClick={() =>
                  updating ? updateCourseFunction() : createCourseFunction()
                }
                type="submit"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
    </Dialog>
      </PageHeading>

      <Table className="table-fixed border border-slate-400 rounded-md p-2">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-lg text-[#333] capitalize">
              Title
            </TableHead>
            <TableHead className="font-bold text-lg text-[#333] capitalize">
              Description
            </TableHead>
            <TableHead className="font-bold text-lg text-[#333] capitalize">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-gray-500">
          {courses.map((course) => (
            <TableRow
              key={course.id}
              className="odd:bg-gray-100 hover:!bg-slate-200"
            >
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>
                <Button variant="link">
                  <Link
                    href={`/dashboard/courses/${course.id}`}
                    className="btn btn-primary"
                  >
                    Open
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
