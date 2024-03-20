export default interface CreateMediaRequest {
    chapterId: string;
    title: string;
    description: string;
    mediaType: string; // TODO: enum this (Check if this works, if not, continue to use string)
    url: string;
    source: string; // NOTE: add this field to media table in server so as to know if you need to generate download url for the object when processing get request 
}