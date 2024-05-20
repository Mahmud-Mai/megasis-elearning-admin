"use client";
import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import {
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
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [chapter, setChapter] = useState<ChapterDTO>();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<MediaDTO | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MediaDTO | null>(null);

  const [CldResources, setCldResources] = useState("");

  const wrapperId = "video-modal-wrapper";

  // load chapter info
  useEffect(() => {
    getChapter(params.chapterId)
      .then((res) => {
        setChapter(res);
      })
      .catch((error) => {
        console.log("Unable to load data");
      });
  }, [chapter, params.chapterId]);

  // load cloudinary media
  useEffect(() => {
    (async function fetchCloudinaryMedia() {
      setState("loading");
      try {
        const response = await fetch("/api/resources");
        const { results } = await response.json();
        setCldResources(results);
        setState("success");
      } catch (error) {
        console.log("🚀 ~ fetchCloudinaryMedia ~ error:", error);
        setState("error");
        setErrorMessage(errorMessage);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openVideoModal = (cld_media: MediaDTO) => {
    setSelectedVideo(cld_media);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsVideoModalOpen(false);
  };

  const openImageModal = (cld_media: MediaDTO) => {
    setSelectedImage(cld_media);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="container p-16 h-full">
      <div className="text-center mb-8">
        <h3 className="fw-bold-fs-3 text-capitalize">
          {chapter?.title || "Chapter title"}
        </h3>
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

      {state === "loading" && !CldResources && (
        <div className="flex justify-center">
          <PrimarySpinner />
        </div>
      )}

      {state === "error" && !CldResources && (
        <div className="text-red-500 py-4 text-center">
          Error: {errorMessage}
        </div>
      )}
      {state === "success" && !CldResources && (
        <div className="py-4 text-center">
          No media files are currently associated with this chapter.
        </div>
      )}
      {/* Conditionally render media based on media type */}
      {state === "success" && CldResources && (
        <div className="max-w-[1200px] mx-auto my-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8">
          {Array.isArray(CldResources) &&
            CldResources.map((cld_media: MediaDTO) => (
              <Card
                key={cld_media.public_id}
                className="mx-auto max-w-[300px] rounded-2xl hover:shadow-xl"
              >
                <div className="h-[280px] rounded-t-lg w-full overflow-hidden relative">
                  {(() => {
                    if (
                      cld_media.format === "mp4" ||
                      cld_media.resource_type === "video"
                    ) {
                      return (
                        <div
                          className="bg-transparent bg-[url('/assets/images/course_img_2.jpg')] bg-cover h-full"
                          onClick={() => openVideoModal(cld_media)}
                        >
                          <div className="w-full h-full flex items-center justify-center bg-black/60">
                            <FaRegCirclePlay className="text-white w-12 lg:w-20 h-12 lg:h-20 hover:scale-110 duration-300 hover:cursor-pointer" />
                          </div>
                        </div>
                      );
                    } else if (
                      cld_media.resource_type === "image" &&
                      cld_media.format !== "pdf"
                    ) {
                      return (
                        <>
                          <Image
                            onClick={() => openImageModal(cld_media)}
                            alt={
                              cld_media.context?.caption
                                ? cld_media.context?.caption
                                : cld_media.filename
                                ? cld_media.filename
                                : "Picture of learning material"
                            }
                            src={
                              cld_media.secure_url
                                ? cld_media.secure_url
                                : "/assets/images/docs_collage.png"
                            }
                            loading="lazy"
                            fill
                            className="m-0"
                          />
                          <div className="py-4">{cld_media.resource_type}</div>
                          <div className="py-4">{cld_media.format}</div>
                        </>
                      );
                    } else if (
                      // ["pdf", "ppt", "docx", "xls"].includes()
                      cld_media.format === "pdf" ||
                      cld_media.format === "docx" ||
                      cld_media.format === "ppt" ||
                      cld_media.format === "xls" ||
                      cld_media.resource_type === "raw"
                    ) {
                      return (
                        <Link
                          href={cld_media.secure_url}
                          target="_blank"
                          download={cld_media}
                          className="text-blue-500 hover:underline"
                        >
                          <Image
                            alt="Document icon"
                            src="/assets/images/docs_collage.png"
                            fill
                            className="m-0"
                          />
                        </Link>
                      );
                    } else {
                      return (
                        <Link
                          href={cld_media.secure_url}
                          target="_blank"
                          download={cld_media}
                          className="text-blue-500 hover:underline"
                        >
                          <Image
                            alt="Document icon"
                            src="/assets/images/pdf.png"
                            fill
                            className="m-0"
                          />
                        </Link>
                      );
                    }
                  })()}
                </div>
                {/* Card Footer */}
                <div className="mt-4 text-center px-4">
                  <h3 className="font-bold mb-2">
                    {cld_media.context?.caption
                      ? cld_media.context?.caption
                      : cld_media.filename
                      ? cld_media.filename
                      : "Learning Material"}
                  </h3>
                  <p className="text-gray-600 pl-2 pb-4">
                    {cld_media.context?.alt ||
                      "Some description of the material"}
                  </p>
                </div>
              </Card>
            ))}
        </div>
      )}

      {/* Image modal (conditional rendering) */}
      {isImageModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 z-50 overflow-auto flex items-center justify-center"
          onClick={closeImageModal}
        >
          <div
            className="bg-gray-700 p-3 rounded-lg shadow-lg"
            onClick={handleModalClick}
          >
            <Image
              alt={
                selectedImage.context?.caption
                  ? selectedImage.context?.caption
                  : selectedImage.filename
                  ? selectedImage.filename
                  : "Enlarged picture"
              }
              src={selectedImage.secure_url}
              loading="lazy"
              width={800}
              height={600}
            />
          </div>
        </div>
      )}
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
