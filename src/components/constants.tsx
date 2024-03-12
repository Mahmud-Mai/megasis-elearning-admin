
interface MenuNavLinkObj {
    name: string;
    address: string;
    icon: React.ReactNode;
}

interface AdminObject {
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



interface ProfileInterface {
    emailAddress: string;
    name: string;
    digits: string;
    countryCode: string;
}



interface SubscriptionInterface {
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

interface PlanInterface {
    id: string,
    period: number,
    title: string,
    description: string,
    price: number,
    active: Boolean,
    createdAt: string,
    updatedAt: string
    countryCode: string;
}

const baseApiUrl: string = process.env.API || "http://localhost:4003";
const apiRoot: string = `${baseApiUrl}/api`;


//URLs
const healthCheckUrl: string = `${baseApiUrl}/health`;

//Login
const getProfileUrl: string = `${apiRoot}/getProfile`;
const loginUrl: string = `${apiRoot}/loginUser`;
const registerUrl: string = `${apiRoot}/createUser`;
const userExistsUrl: string = `${apiRoot}/userExists`;
const updatePasswordUrl: string = `${apiRoot}/updatePassword`;

//Auth
const isAuthUrl: string = `${apiRoot}/isAuth`;
const authByLevelUrl: string = `${apiRoot}/authByLevel`;
const authByIdUrl: string = `${apiRoot}/authById`;
const profileUrl: string = ""; // Missing endpoint

//Email
const checkEmailAvailableUrl: string = `${apiRoot}/checkEmailAvailable`;

//Subscription
const getSubscriptionOfferUrl: string = `${apiRoot}/getSubscriptionOffer`;
const getSubscriptionOffersUrl: string = `${apiRoot}/getSubscriptionOffers`;
const getSubscriptionsBoughtUrl: string = `${apiRoot}/getSubscriptionsBought`;
const buySubscriptionUrl: string = `${apiRoot}/buySubscription`;
const createSubscriptionOfferUrl: string = `${apiRoot}/createSubscriptionOffer`;
const updateSubscriptionOfferUrl: string = `${apiRoot}/updateSubscriptionOffer`;
const deleteSubscriptionOfferUrl: string = `${apiRoot}/deleteSubscriptionOffer`;
const checkCustomerHasActiveSubscriptionUrl: string = `${apiRoot}/checkCustomerHasActiveSubscription`;
const confirmSubscriptionUrl: string = `${apiRoot}/confirmSubscription`;

const manageSubscriptionUrl: string = ""; // missing

//Content
const createCourseUrl: string = `${apiRoot}/createCourse`;
const updateCourseUrl: string = `${apiRoot}/updateCourse`;
const deleteCourseUrl: string = `${apiRoot}/deleteCourse`;
const getCourseUrl: string = `${apiRoot}/getCourse`;
const getCoursesUrl: string = `${apiRoot}/getCourses`;
const getChapterUrl: string = `${apiRoot}/getChapter`;
const getChaptersByCourseIdUrl: string = `${apiRoot}/getChaptersByCourseId`;
const createChapterUrl: string = `${apiRoot}/createChapter`;
const updateChapterUrl: string = `${apiRoot}/updateChapter`;
const deleteChapterUrl: string = `${apiRoot}/deleteChapter`;
const deleteChapterByCourseIdUrl: string = `${apiRoot}/deleteChapterByCourseId`;
const createMediaUrl: string = `${apiRoot}/createMedia`;
const updateMediaUrl: string = `${apiRoot}/updateMedia`;
const deleteMediaUrl: string = `${apiRoot}/deleteMedia`;
const deleteMediaByChapterIdUrl: string = `${apiRoot}/deleteMediaByChapterId`;
const getMediaUrl: string = `${apiRoot}/getMedia`;
const getMediaByChapterIdUrl: string = `${apiRoot}/getMediaByChapterId`;
const getAllMediaByMediaTypeUrl: string = `${apiRoot}/getAllMediaByMediaType`;
const mediaNameAvailableUrl: string = `${apiRoot}/mediaNameAvailable`;
const uploadDocumentUrl: string = `${apiRoot}/uploadDocument`;
const uploadVideoUrl: string = `${apiRoot}/uploadVideo`;