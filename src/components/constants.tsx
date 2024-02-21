
interface MenuNavLinkObj {
    name: string;
    address: string;
    icon: React.ReactNode;
}

interface adminObject {
    name: string;
    role: string;
    profilePicture: string;
}

interface customerObject {
    name: string;
    email: string;
    profilePicture: string;
}

interface SectionObject {
    title: string;
    author: string;
    imageSource: string;
}


interface CourseInterface {
    id: string;
    title: string;
    description: string;
}

interface ChapterInterface {
    id: string;
    courseId: string;
    title: string;
    description: string;
}

interface MediaInterface {
    chapterId: string;
    title: string;
    description: string;
    url: string;
    mediaType: string;
}