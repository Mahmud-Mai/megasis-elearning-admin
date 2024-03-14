
export interface MenuNavLinkObj {
    name: string;
    address: string;
    icon: React.ReactNode;
}

export interface AdminObject {
    name: string;
    role: string;
    profilePicture: string;
}

export interface customerObject {
    name: string;
    email: string;
    profilePicture: string;
}

export interface SectionObject {
    title: string;
    author: string;
    imageSource: string;
}


export interface CourseInterface {
    id: string;
    title: string;
    description: string;
}

export interface ChapterInterface {
    id: string;
    courseId: string;
    title: string;
    description: string;
}

export interface MediaInterface {
    id?: string;
    chapterId: string;
    title: string;
    description: string;
    url: string;
    mediaType: string;
}

export interface AuthDataObject {
    loginId: string;
    token: string;
    authLevel: string;
    tokenExpiration: Date;
}

export interface ProfileInterface {
    emailAddress: string;
    name: string;
    digits: string;
    countryCode: string;
}



export interface SubscriptionInterface {
    id: string,
    period: number, // In Months
    price: number,
    userId: string,
    stripeCustomerId: string,
    active: Boolean,
    expireDate: string,
    createdAt: string,
    updatedAt: string
}

export interface PlanInterface {
    id: string,
    period: number,
    title: string,
    description: string,
    price: number,
    active: boolean,
    createdAt: string,
    updatedAt: string
    countryCode: string;
}

export const baseApiUrl: string = process.env.API || "http://localhost:4003";
export const apiRoot: string = `${baseApiUrl}/api`;


//URLs
export const healthCheckUrl: string = `${baseApiUrl}/health`;

//Login
export const getProfileUrl: string = `${apiRoot}/getProfile`;
export const loginUrl: string = `${apiRoot}/loginUser`;
export const registerUrl: string = `${apiRoot}/createUser`;
export const userExistsUrl: string = `${apiRoot}/userExists`;
export const updatePasswordUrl: string = `${apiRoot}/updatePassword`;

//Auth
export const isAuthUrl: string = `${apiRoot}/isAuth`;
export const authByLevelUrl: string = `${apiRoot}/authByLevel`;
export const authByIdUrl: string = `${apiRoot}/authById`;

//Email
export const checkEmailAvailableUrl: string = `${apiRoot}/checkEmailAvailable`;

//Subscription
export const getSubscriptionOfferUrl: string = `${apiRoot}/getSubscriptionOffer`;
export const getSubscriptionOffersUrl: string = `${apiRoot}/getSubscriptionOffers`;
export const getSubscriptionsBoughtUrl: string = `${apiRoot}/getSubscriptionsBought`;
export const buySubscriptionUrl: string = `${apiRoot}/buySubscription`;
export const createSubscriptionOfferUrl: string = `${apiRoot}/createSubscriptionOffer`;
export const updateSubscriptionOfferUrl: string = `${apiRoot}/updateSubscriptionOffer`;
export const deleteSubscriptionOfferUrl: string = `${apiRoot}/deleteSubscriptionOffer`;
export const checkCustomerHasActiveSubscriptionUrl: string = `${apiRoot}/checkCustomerHasActiveSubscription`;
export const confirmSubscriptionUrl: string = `${apiRoot}/confirmSubscription`;

export const manageSubscriptionUrl: string = ""; // missing

//Content
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
export const deleteChapterByCourseIdUrl: string = `${apiRoot}/deleteChapterByCourseId`;
export const createMediaUrl: string = `${apiRoot}/createMedia`;
export const updateMediaUrl: string = `${apiRoot}/updateMedia`;
export const deleteMediaUrl: string = `${apiRoot}/deleteMedia`;
export const deleteMediaByChapterIdUrl: string = `${apiRoot}/deleteMediaByChapterId`;
export const getMediaUrl: string = `${apiRoot}/getMedia`;
export const getMediaByChapterIdUrl: string = `${apiRoot}/getMediaByChapterId`;
export const getAllMediaByMediaTypeUrl: string = `${apiRoot}/getAllMediaByMediaType`;
export const mediaNameAvailableUrl: string = `${apiRoot}/mediaNameAvailable`;
export const uploadDocumentUrl: string = `${apiRoot}/uploadDocument`;
export const uploadVideoUrl: string = `${apiRoot}/uploadVideo`;

