"use client";
import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import {
  createMedia,
  getChapter,
  getMediaByChapterId
} from "@/core/services/content-service";
import ChapterDTO from "@/core/dto/content/ChapterDTO";
import MediaDTO from "@/core/dto/content/MediaDTO";

import { FaRegCirclePlay } from "react-icons/fa6";
import { Card } from "@/components/ui/card";
import { MediaSource } from "@/core/enums/MediaSource.enum";
import PageHeading from "@/components/reusables/PageHeading";
import PrimaryBtn from "@/components/reusables/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";

import PrimarySpinner from "@/components/reusables/PrimarySpinner";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults
} from "next-cloudinary";
import { revalidatePath } from "next/cache";

export default function ChapterDetailsPage({
  params
}: {
  params: { chapterId: string };
}) {
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

  const [showSpinner, setShowSpinner] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [CldResources, setCldResources] = useState("");

  const wrapperId = "video-modal-wrapper";

  const handleChange = async (event: any) => {
    setShowSpinner(true);
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("inputFile", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      setPublicId(data.public_id);
    } catch (error) {
      setShowSpinner(false);
    } finally {
      setShowSpinner(false);
      setShowVideo(true);
    }
  };

  const saveMedia = async () => {
    const chapterId = params.chapterId;
    setLoading(true);

    createMedia({
      chapterId,
      title,
      description,
      url,
      mediaType,
      source: mediaSource
    })
      .then((res) => {
        console.log("🚀 ~ .then ~ saveMedia res:", res);
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

  // load chapter info
  useEffect(() => {
    getChapter(params.chapterId)
      .then((res) => {
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
        setMediaList(mediaList);
      })
      .catch((error) => {
        console.log("unable to load data");
        setMediaList([]);
      });
  }, [params.chapterId, refresher]);

  // load cloudinary media
  useEffect(() => {
    (async function fetchCloudinaryMedia() {
      console.log("fetching resources from cloudinary...");
      try {
        const response = await fetch("/api/resources");
        const { results } = await response.json();
        console.log("🚀 ~ fetchCloudinaryMedia ~ results:", results);
        setCldResources(results);
      } catch (error) {
        console.log("🚀 ~ fetchCloudinaryMedia ~ error:", error);
      }
    })();
  }, []);

  const openVideoModal = (cld_media: MediaDTO) => {
    setSelectedVideo(cld_media);
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

      <PageHeading>
        <CldUploadWidget
          onTags={() => {
            "chapter-media";
          }}
          uploadPreset={`megasis-lms-media`}
          onSuccess={(results: CloudinaryUploadWidgetResults) => {
            if (results) {
              console.log("Public ID", results);
              revalidatePath("/");
            }
          }}
          options={{
            sources: ["local", "google_drive", "url"],
            multiple: true,
            maxFiles: 5
          }}
        >
          {({ open }) => {
            return (
              <PrimaryBtn variant="secondary" onClick={() => open()}>
                Upload Local Media
              </PrimaryBtn>
            );
          }}
        </CldUploadWidget>
      </PageHeading>

      <div className="text-start my-8">
        <span className="font-bold uppercase">Media List</span>
      </div>
      <hr />
      {showSpinner && <PrimarySpinner />}

      <div className="max-w-[1200px] mx-auto my-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8">
        {Array.isArray(CldResources) &&
          CldResources.map((cld_media: MediaDTO) => (
            <Card
              key={cld_media.public_id}
              className="mx-auto max-w-[300px] rounded-2xl hover:shadow-xl"
            >
              <div className="h-[280px] rounded-t-lg w-full overflow-hidden relative">
                <div className="h-[280px] rounded-t-lg w-full overflow-hidden relative">
                  {cld_media.resource_type === "video" ? (
                    <div
                      className="bg-transparent bg-[url('/assets/images/course_img_2.jpg')] bg-cover h-full"
                      onClick={() => openVideoModal(cld_media)}
                    >
                      <div className="w-full h-full  flex items-center justify-center bg-black/60 ">
                        <FaRegCirclePlay
                          className="text-white w-12 lg:w-20 h-12 lg:h-20 hover:scale-110 duration-300 hover:cursor-pointer"
                          width={200}
                        />
                      </div>
                    </div>
                  ) : cld_media.resource_type === "pdf" ? (
                    <div className="h-full">
                      <Link
                        href={cld_media.url}
                        target="_blank"
                        download={cld_media}
                        className="text-blue-500 hover:underline"
                      >
                        <Image
                          alt="pdf icon"
                          src={"/assets/images/pdf.png"}
                          fill
                          className="m-0"
                        />
                      </Link>
                    </div>
                  ) : cld_media.resource_type === "image" ? (
                    <div className="h-full">
                      <Link
                        href={cld_media.url}
                        target="_blank"
                        download={cld_media}
                        className="text-blue-500 hover:underline"
                      >
                        <Image
                          alt={
                            cld_media.context?.caption ||
                            "Picture of learning material"
                          }
                          src={cld_media.secure_url}
                          loading="lazy"
                          fill
                          className="m-0"
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
                <h3 className="font-bold mb-2">
                  {cld_media.context?.caption || `Learning material`}
                </h3>
                <p className="text-gray-600 pl-2 pb-4">
                  {cld_media.context?.alt || "Some description of the material"}
                </p>
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
