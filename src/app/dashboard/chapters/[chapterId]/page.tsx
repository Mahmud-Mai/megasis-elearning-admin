"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import ContentCard from "@/components/contentCard/ContentCard";
import { useRouter } from "next/navigation";
import {
  createMedia,
  deleteMedia,
  getChapter,
  getMediaByChapterId,
  getSignedUploadUrl,
  updateMedia,
  uploadFile
} from "@/core/services/content-service";
import ChapterDTO from "@/core/dto/content/ChapterDTO";
import MediaDTO from "@/core/dto/content/MediaDTO";

import { FaRegCirclePlay } from "react-icons/fa6";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MediaSource } from "@/core/enums/MediaSource.enum";
import { MediaType } from "@/core/enums/MediaType.enum";
import DialogTriggerBtn from "@/components/reusables/DialogTriggerBtn";
import PageHeading from "@/components/reusables/PageHeading";
import PrimaryBtn from "@/components/reusables/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";

export default function ChapterDetailsPage({
  params
}: {
  params: { chapterId: string };
}) {
  const router = useRouter();

  const [refresher, setRefresher] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [mediaId, setMediaId] = useState("");
  const [updating, setUpdating] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const [uploadingFile, setUploadingFile] = useState(false);
  const [mediaSource, setMediaSource] = useState<string>(MediaSource.URL);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [chapter, setChapter] = useState<ChapterDTO>();
  const [mediaList, setMediaList] = useState<MediaDTO[]>([]);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<MediaDTO | null>(null);

  const wrapperId = "video-modal-wrapper"; // ID for the modal container

  const performFileUpload = async () => {
    // get signed upload url and upload file to S3
    if (mediaSource == MediaSource.UPLOAD) {
      if (!file) {
        return;
      }
      const result = await getSignedUploadUrl({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      setUploadingFile(true);
      await uploadFile(result.url, file, uploadProgress);

      setUrl(result.objectRef);
      setUploadingFile(false);
    }
  };

  const saveMedia = async () => {
    const chapterId = params.chapterId;
    setLoading(true);

    await performFileUpload();

    createMedia({
      chapterId,
      title,
      description,
      url,
      mediaType,
      source: mediaSource
    })
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        setLoading(false);
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
        console.log("🚀 ~ saveMedia ~ err:", err);
        setLoading(false);
        alert("Failed to save new media");
        console.log("Unable to save Media");
      });
  };

  const updateMediaFunction = async () => {
    setLoading(true);

    await performFileUpload();

    updateMedia({ mediaId, title })
      .then((res) => {
        setLoading(false);
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
        setLoading(false);
        alert("Failed to update media");
        console.log("Unable to update Media");
      });
  };

  const deleteMediaFunction = (mediaId: string) => {
    deleteMedia(mediaId)
      .then((res) => {
        setRefresher(!refresher);
      })
      .catch((err) => {
        console.log("Unable to delete Media");
      });
  };

  const editMedia = (media: MediaDTO) => {
    setTitle(media.title);
    setDescription(media.description);
    setUrl(media.url);
    setMediaType(media.mediaType);
    setMediaId(media.id ?? "");
    setUpdating(true);
    setShow(true);
  };

  // load chapter info
  useEffect(() => {
    getChapter(params.chapterId)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        setChapter(chapter);
      })
      .catch((error) => {
        console.log("Unable to load data");
      });
  }, [chapter, params.chapterId]);

  // get list of media for this chapter
  useEffect(() => {
    getMediaByChapterId(params.chapterId)
      .then((mediaList) => {
        console.log("🚀 ~ .then ~ mediaList:", mediaList);
        setMediaList(mediaList);
      })
      .catch((error) => {
        console.log("unable to load data");
        setMediaList([]);
      });
  }, [params.chapterId, refresher]);

  const openVideoModal = (media: MediaDTO) => {
    setSelectedVideo(media);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsVideoModalOpen(false);
  };

  return (
    <div className="container p-16 h-full">
      <div className="text-center mb-8">
        <h3 className="fw-bold-fs-3 text-capitalize">{chapter?.title}</h3>
        <p>{chapter?.description}</p>
      </div>

      <Dialog open={show} onOpenChange={setShow}>
        <PageHeading>
          <DialogTriggerBtn>Add New Media</DialogTriggerBtn>
        </PageHeading>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{updating ? "Update" : "Add New"} Media </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="media-type" className="text-right">
                Media Type
              </Label>
              <div className="col-span-3">
                <Select
                  value={mediaType}
                  onValueChange={(e) => setMediaType(e)}
                >
                  <SelectTrigger id="media-type">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={MediaType.DOCUMENT}>Document</SelectItem>
                    <SelectItem value={MediaType.VIDEO}>Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Media Source
              </Label>
              <div className="col-span-3">
                <Select
                  value={mediaSource}
                  onValueChange={(e) => setMediaSource(e)}
                >
                  <SelectTrigger id="media-type">
                    <SelectValue placeholder="Select Media Source" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={MediaSource.UPLOAD}>
                      File Upload
                    </SelectItem>
                    <SelectItem value={MediaSource.URL}>
                      Externala URL
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {mediaSource == MediaSource.URL ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Media url
                </Label>
                <Input
                  id="url"
                  className="col-span-3"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com"
                />
              </div>
            ) : (
              <></>
            )}
            {mediaSource == MediaSource.UPLOAD ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Select File
                </Label>
                <Input id="file" type="file" className="col-span-3" />
              </div>
            ) : (
              <></>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Media Title"
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
              >
                {description}
              </Textarea>
            </div>
          </div>
          <DialogFooter>
            {uploadingFile ? (
              <div className="w-full text-center">
                <div className="text-center">
                  Uploading Document...{" "}
                  <span>{uploadProgress} % completed</span>
                </div>
                <Progress value={uploadProgress} className="w-[60%]" />
              </div>
            ) : (
              <span></span>
            )}
            <DialogTriggerBtn
              disabled={loading}
              onClick={() => (updating ? updateMediaFunction() : saveMedia())}
            >
              {loading ? "Saving..." : "Save"}
            </DialogTriggerBtn>
            {/* <Button
              disabled={loading}
              onClick={() => (updating ? updateMediaFunction() : saveMedia())}
              type="submit"
            >
              {loading ? "Saving..." : "Save"}
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="text-start my-8">
        <span className="font-bold uppercase">Media List</span>
      </div>
      <hr />
      <div className="max-w-[1200px] mx-auto my-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 space-y-4">
        {mediaList.map((media, index) => (
          <Card
            key={index}
            className="max-w-[300px] rounded-2xl hover:shadow-xl"
          >
            <div className="h-[280px] rounded-t-lg w-full overflow-hidden relative">
              <div className="h-[280px] rounded-t-lg w-full overflow-hidden relative">
                {media.mediaType === "VIDEO" ? (
                  <div
                    className="bg-transparent bg-[url('/assets/images/course_img_2.jpg')] bg-cover h-full"
                    onClick={() => openVideoModal(media)}
                  >
                    <div className="w-full h-full  flex items-center justify-center bg-black/60 ">
                      <FaRegCirclePlay
                        className="text-white w-12 lg:w-20 h-12 lg:h-20 hover:scale-110 duration-300 hover:cursor-pointer"
                        width={200}
                      />
                    </div>
                  </div>
                ) : media.mediaType === "DOCUMENT" ? (
                  <div className="h-full">
                    <Link
                      href={media.url}
                      target="_blank"
                      download={media.title}
                      className="text-blue-500 hover:underline"
                    >
                      <Image
                        alt="pdf icon"
                        src={"/assets/images/pdf.png"}
                        fill
                      />
                    </Link>
                  </div>
                ) : (
                  <p className="flex justify-center items-center text-red-700">
                    Unsupported Media Format
                  </p>
                )}
              </div>
            </div>
            {/* Card Footer  */}
            <div className="mt-4 text-center px-4">
              <h3 className="font-bold mb-2">{media.title}</h3>
              <p className="text-gray-600 pl-2">
                {"Some description comes here"}
              </p>
              <div className="flex justify-between my-3">
                <PrimaryBtn
                  onClick={() => editMedia(media)}
                  variant="secondary"
                >
                  Edit
                </PrimaryBtn>
                <PrimaryBtn
                  variant="delete"
                  onClick={() => deleteMediaFunction(media.id)}
                >
                  Delete
                </PrimaryBtn>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Video modal (conditional rendering) */}
      {isVideoModalOpen && selectedVideo && (
        <div
          className="fixed inset-0 bg-black/60 z-50 overflow-auto"
          onClick={closeVideoModal}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-700 p-3 rounded-lg shadow-lg w-[70%] max-h-[70%]">
              <ReactPlayer
                url={selectedVideo.url}
                controls
                height={"44rem"}
                width="100%"
                onUnmount={closeVideoModal} // Close modal when video finishes
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal container (created outside the component) */}
      <div id={wrapperId} style={{ display: "none" }} />
    </div>
  );
}
