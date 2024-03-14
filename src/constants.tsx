
export interface MenuNavLinkObj {
    name: string;
    address: string;
    icon: React.ReactNode;
}

export interface AuthDataObject {
    loginId: string;
    token: string;
    authLevel: string;
    tokenExpiration: Date;
}

export const baseApiUrl: string = process.env.API || "http://localhost:4003";
export const apiRoot: string = `${baseApiUrl}/api`;
export const healthCheckUrl: string = `${baseApiUrl}/health`;

//URLs



export const updatePasswordUrl: string = `${apiRoot}/updatePassword`;



//Content
export const createCourseUrl: string = `${apiRoot}/createCourse`;
export const updateCourseUrl: string = `${apiRoot}/updateCourse`;
export const getCoursesUrl: string = `${apiRoot}/getCourses`;


