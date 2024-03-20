import { apiRoot } from "@/constants";
import CreateCourseRequest from "@/core/dto/content/requests/CreateCourseRequest";
import CourseDTO from "@/core/dto/content/CourseDTO";
import UpdateCourseRequest from "@/core/dto/content/requests/UpdateCourseRequest";
import ChapterDTO from "@/core/dto/content/ChapterDTO";
import CreateChapterRequest from "@/core/dto/content/requests/CreateChapterRequest";
import UpdateChapterRequest from "@/core/dto/content/requests/UpdateChapterRequest";
import CreateMediaRequest from "@/core/dto/content/requests/CreateMediaRequest";
import MediaDTO from "@/core/dto/content/MediaDTO";
import UpdateMediaRequest from "@/core/dto/content/requests/UpdateMediaRequest";
import GetSignedUploadUrlRequest from "../dto/content/requests/GetSignedUploadUrlRequest";
import SignedUploadUrlDTO from "../dto/content/SignedUploadUrl";
import axios from "axios";

export const createCourseUrl: string = `${apiRoot}/createCourse`;
export const updateCourseUrl: string = `${apiRoot}/updateCourse`;
export const deleteCourseUrl: string = `${apiRoot}/deleteCourse`;
export const getCourseUrl: string = `${apiRoot}/getCourse`;
export const getCoursesUrl: string = `${apiRoot}/getCourses`;
export const getChapterUrl: string = `${apiRoot}/getChapter`;
export const getChaptersByCourseIdUrl: string = `${apiRoot}/getChaptersByCourseId`;
export const createChapterUrl: string = `${apiRoot}/createChapter`;
export const updateChapterUrl: string = `${apiRoot}/updateChapter`;
export const deleteChapterUrl: string = `${apiRoot}/deleteChapter`;
export const deleteChaptersByCourseIdUrl: string = `${apiRoot}/deleteChaptersByCourseId`;
export const createMediaUrl: string = `${apiRoot}/createMedia`;
export const updateMediaUrl: string = `${apiRoot}/updateMedia`;
export const deleteMediaUrl: string = `${apiRoot}/deleteMedia`;
export const deleteMediaByChapterIdUrl: string = `${apiRoot}/deleteMediaByChapterId`;
export const getMediaUrl: string = `${apiRoot}/getMedia`;
export const getMediaByChapterIdUrl: string = `${apiRoot}/getMediaByChapterId`;
export const getAllMediaByMediaTypeUrl: string = `${apiRoot}/getAllMediaByMediaType`;
export const mediaNameAvailableUrl: string = `${apiRoot}/mediaNameAvailable`;
export const uploadDocumentUrl: string = `${apiRoot}/uploadDocument`;
export const getSingedUploadUrlUrl: string = `${apiRoot}/uploadVideo`; // TODO update this for the correct url 

export async function createCourse(req: CreateCourseRequest): Promise<CourseDTO> {
    return await fetch(createCourseUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function updateCourse(req: UpdateCourseRequest): Promise<CourseDTO> {
    return await fetch(updateCourseUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function deleteCourse(courseId: string): Promise<void> {
    return await fetch(`deleteCourseUrl/${courseId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export async function getCourse(courseId: string): Promise<CourseDTO> {
    return await fetch(`${getCourseUrl}/${courseId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function getCourses(): Promise<CourseDTO[]> {
    return await fetch(getCoursesUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function getChapter(chapterId: string): Promise<ChapterDTO> {
    return await fetch(`${getChapterUrl}/${chapterId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function getChaptersByCourseId(courseId: string): Promise<ChapterDTO[]> {
    return await fetch(`${getChaptersByCourseIdUrl}/${courseId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function createChapter(req: CreateChapterRequest): Promise<ChapterDTO> {
    return await fetch(createChapterUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function updateChapter(req: UpdateChapterRequest): Promise<ChapterDTO> {
    return await fetch(updateChapterUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function deleteChapter(chapterId: string): Promise<void> {
    return await fetch(`${deleteChapterUrl}/${chapterId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

export async function deleteChaptersByCourseId(courseId: string): Promise<void> {
    return await fetch(`${deleteChaptersByCourseIdUrl}/${courseId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function createMedia(req: CreateMediaRequest): Promise<MediaDTO> {
    return await fetch(createMediaUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function updateMedia(req: UpdateMediaRequest): Promise<MediaDTO> {
    return await fetch(updateMediaUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function deleteMedia(mediaId: string): Promise<void> {
    return await fetch(`${deleteMediaUrl}/${mediaId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function deleteMediaByChapterId(chapterId: string): Promise<void> {
    return await fetch(`${deleteMediaByChapterIdUrl}/${chapterId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function getMedia(mediaId: string): Promise<MediaDTO> {
    return await fetch(`${getMediaUrl}/${mediaId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function getMediaByChapterId(chapterId: string): Promise<MediaDTO[]> {
    return await fetch(`${getMediaByChapterIdUrl}/${chapterId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function getAllMediaByMediaType(mediaType: string): Promise<MediaDTO[]> {
    return await fetch(`${getAllMediaByMediaTypeUrl}/${mediaType}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}

export async function mediaNameAvailable(name: string, chapterId: string): Promise<boolean> {
    return await fetch(`${mediaNameAvailableUrl}/${chapterId}/${name}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        }
    }).then(res => res.json());
}


//TODO: Implement Multi part form upload later on!
export async function getSignedUploadUrl(req: GetSignedUploadUrlRequest): Promise<SignedUploadUrlDTO> {
    return await fetch(getSingedUploadUrlUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`,
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function uploadFile(signedUrl: string, file: File, onUploadProgress: (prog: ProgressEvent) => void): Promise<void> {
    return await axios.put(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
        onUploadProgress,
    });
}