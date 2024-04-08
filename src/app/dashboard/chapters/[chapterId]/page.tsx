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
  uploadFile,
} from "@/core/services/content-service";
import ChapterDTO from "@/core/dto/content/ChapterDTO";
import MediaDTO from "@/core/dto/content/MediaDTO";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaSource } from "@/core/enums/MediaSource.enum";
import { MediaType } from "@/core/enums/MediaType.enum";

export default function ChapterDetailsPage({
  params,
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

  const onUploadProgress = (progressEvent: ProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  const performFileUpload = async () => {
    // get signed upload url and upload file to S3
    if (mediaSource == MediaSource.UPLOAD) {
      if (!file) {
        return;
      }
      const result = await getSignedUploadUrl({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      setUploadingFile(true);
      await uploadFile(result.url, file, onUploadProgress);

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
      source: mediaSource,
    })
      .then((res) => {
        setLoading(false);
        setShow(false);
        setRefresher(!refresher);
      })
      .catch((err) => {
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
        setChapter(chapter);
        console.log("🚀 ~ .then ~ chapter:", chapter);
      })
      .catch((error) => {
        console.log("Unable to load data");
      });
  }, [params.chapterId]);

  // get list of media for this chapter
  useEffect(() => {
    getMediaByChapterId(params.chapterId)
      .then((mediaList) => {
        setMediaList(mediaList);
      })
      .catch((error) => {
        console.log("unable to load data");
        setMediaList([]);
      });
  }, [refresher]);

  return (
    <div className="pt-3">
      <div className="text-center">
        <h3 className="fw-bold-fs-3 text-capitalize">{chapter?.title}</h3>
        <p>{chapter?.description}</p>
      </div>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogTrigger asChild>
          <Button disabled={chapter == null} variant="outline">
            Add New Media{" "}
          </Button>
        </DialogTrigger>
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
            <Button
              disabled={loading}
              onClick={() => (updating ? updateMediaFunction() : saveMedia())}
              type="submit"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="text-start">
        <span className="font-bold uppercase">Media List</span>
      </div>
      <hr />
      <div className="grid">
        {mediaList.map((media, index) => (
          <Card key={index} className="w-[350px]">
            <CardContent>
              <ContentCard
                title={media.title}
                mediaType={media.mediaType}
                url={media.url}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => editMedia(media)} variant="secondary">
                Edit
              </Button>
              <Button
                onClick={() => deleteMediaFunction(media.id)}
                variant="destructive"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
