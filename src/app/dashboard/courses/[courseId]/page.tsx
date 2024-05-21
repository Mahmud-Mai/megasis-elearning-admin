"use client";
import { IoTrashOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageHeading from "@/components/reusables/PageHeading";
import DialogTriggerBtn from "@/components/reusables/DialogTriggerBtn";
import PrimarySpinner from "@/components/reusables/PrimarySpinner";

export default function CourseDetails({
  params
}: {
  params: { courseId: string };
}) {
  const router = useRouter();

  const [refresher, setRefresher] = useState(false);
  const [course, setCourse] = useState<CourseDTO>();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [chapters, setChapters] = useState<ChapterDTO[]>([]);

  const [chapterId, setChapterId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setShow(false);
    setUpdating(false);
  };
  const handleShow = () => setShow(true);

  const createChapterFunction = () => {
    alert("Created new chapter successfully!");
    createChapter({ courseId, title, description })
      .then((_) => {
        setTimeout(() => setState("success"), 2000);
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
        alert("Failed to save new chapter");
        console.log(err);
      });
  };

  const updateChapterFunction = () => {
    alert("Updated chapter successfully!");
    updateChapter({ chapterId, title, description })
      .then((_) => {
        setTimeout(() => setState("success"), 2000);
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
        alert("Failed to update chapter");
        console.log(err);
      });
  };

  const deleteChapterFunction = (chapter: ChapterDTO) => {
    deleteChapter(chapter.id)
      .then((_) => {
        alert("Deleted chapter successfully!");
        setRefresher(!refresher);
      })
      .catch((err) => {
        alert("Failed to delete chapter");
        console.log(err);
      });
  };

  const editChapter = (chapter: ChapterDTO) => {
    setChapterId(chapter.id);
    setTitle(chapter.title);
    setDescription(chapter.description);
    setCourseId(chapter.courseId);
    setUpdating(true);
    setShow(true);
  };

  // load course info
  useEffect(() => {
    setState("loading");
    setCourseId(params.courseId);
    getCourse(params.courseId)
      .then((course) => {
        setCourse(course);
        setTimeout(() => setState("success"), 2000);
      })
      .catch((error) => {
        console.log("Unable to chapter info");
        setState("error");
        setErrorMessage("Unable to chapter info");
      });
  }, [params.courseId]);

  // get list of chapters
  useEffect(() => {
    setState("loading");

    getChaptersByCourseId(params.courseId)
      .then((chapters) => {
        setChapters(chapters);
        setTimeout(() => setState("success"), 2000);
      })
      .catch((error) => {
        console.log("failed to load chapters");
        setChapters([]);
        setState("error");
        setErrorMessage("Failed to load chapters");
      });
  }, [params.courseId, refresher]);

  return (
    <div className="container p-16 h-full">
      <PageHeading>
        <Dialog open={show} onOpenChange={setShow}>
          <DialogTriggerBtn onClick={handleShow}>
            Add New Chapter
          </DialogTriggerBtn>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {updating ? "Update" : "Add New"} Chapter
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <input
                value={params.courseId}
                type="hidden"
                className="form-control"
                id="customFile"
              />
              <input
                value={chapterId}
                type="hidden"
                className="form-control"
                id="customFile"
              />

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
                  updating ? updateChapterFunction() : createChapterFunction()
                }
                type="submit"
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeading>
      <div className="text-center mb-8">
        <h3 className="font-bold text-xl">{course?.title}</h3>
        <p className="text-lg">{course?.description}</p>
      </div>
      {state === "loading" && !chapters && (
        <div className="flex justify-center">
          <PrimarySpinner />
        </div>
      )}
      {state === "error" && (
        <div className="text-red-500 py-4 text-center">
          Error: {errorMessage}
        </div>
      )}
      {state === "success" && chapters.length === 0 && (
        <div className="py-4 w-full text-center">No chapters found.</div>
      )}
      {state === "success" && chapters.length !== 0 && (
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
            {chapters.map((chapter) => (
              <TableRow
                key={chapter.id}
                className="odd:bg-gray-100 hover:!bg-slate-200"
              >
                <TableCell>{chapter.title}</TableCell>
                <TableCell width={"600px"}>{chapter.description}</TableCell>
                <TableCell className="flex space-x-8 items-center">
                  <button>
                    <Link href={`/dashboard/chapters/${chapter.id}`}>
                      <IoEyeOutline
                        size={22}
                        className="text-green-800 hover:scale-125 duration-300 ease-in-out"
                      />
                    </Link>
                  </button>
                  <button onClick={() => editChapter(chapter)}>
                    <GoPencil
                      size={22}
                      className="text-blue-950 hover:scale-125 duration-300 ease-in-out"
                    />
                  </button>
                  <button onClick={() => deleteChapterFunction(chapter)}>
                    <IoTrashOutline
                      size={22}
                      className="text-red-800 hover:scale-125 duration-300 ease-in-out"
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
