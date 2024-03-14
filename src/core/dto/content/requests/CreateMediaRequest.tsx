export default interface CreateMediaRequest {
    chapterId: string;
    title: string;
    description: string;
    mediaType: string; // TODO: enum this (Check if this works, if not, continue to use string)
    url: string;
}