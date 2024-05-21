"use client";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
// import { Modal } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import CourseDTO from "@/core/dto/content/CourseDTO";
import {
  createCourse,
  deleteCourse,
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
import PrimarySpinner from "@/components/reusables/PrimarySpinner";

export default function Courses() {
  const router = useRouter();
  const [refresher, setRefresher] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");

  const createCourseFunction = () => {
    createCourse({ title, description })
      .then((res) => {
        alert("Created course successfully!");
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
        alert("Unable to create course. Try again!");
        console.log("Unable to save Course");
      });
  };

  const updateCourseFunction = () => {
    updateCourse({ title, description, courseId })
      .then((res) => {
        alert("Updated course successfully!");
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
        alert("Updating course failed. Try again!");
        console.error(err);
      });
  };

  const loadCoursesFunction = () => {
    setState("loading");

    getCourses()
      .then((courses) => {
        setCourses(courses);
        setState("success");
      })
      .catch((err) => {
        console.log("Could not load courses");
        setState("error");
        setErrorMessage("Could not load courses");
        setCourses([]);
      });
  };

  const deleteCourseFunction = (
    courseId: string
  ): MouseEventHandler<HTMLButtonElement> | undefined => {
    console.log("🚀 ~ deleteCourseFunction ~ courseId:", courseId);
    try {
      deleteCourse(courseId);
      alert("Course deleted successfully!");
      setRefresher(!refresher);
    } catch (error) {
      console.log(error);
      alert("Could not delete course");
    }
    return;
  };

  useEffect(() => {
    loadCoursesFunction();
  }, [refresher]);

  return (
    <div className="container p-16 h-full">
      <h1 className="text-left my-4 text-2xl uppercase font-bold">Courses</h1>
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
              <DialogTriggerBtn
                disabled={state === "loading"}
                onClick={() =>
                  updating ? updateCourseFunction() : createCourseFunction()
                }
              >
                {state === "loading" ? "Saving..." : "Save"}
              </DialogTriggerBtn>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeading>

      {state === "loading" && (
        <div className="flex justify-center">
          <PrimarySpinner />
        </div>
      )}
      {state === "error" && (
        <div className="text-red-500 py-4 text-center">
          Error: {errorMessage}
        </div>
      )}
      {state === "success" && !courses && (
        <TableRow>
          <TableCell colSpan={6}>
            <div className="py-4 w-full text-center">No courses found.</div>
          </TableCell>
        </TableRow>
      )}
      {state == "success" && courses && (
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
            {state === "success" && !courses && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="py-4 w-full text-center">
                    No courses found.
                  </div>
                </TableCell>
              </TableRow>
            )}
            {courses.map((course) => (
              <TableRow
                key={course.id}
                className="odd:bg-gray-100 hover:!bg-slate-200"
              >
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="link">
                    <Link
                      href={`/dashboard/courses/${course.id}`}
                      className="btn btn-primary"
                    >
                      Open
                    </Link>
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => deleteCourseFunction(course.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
