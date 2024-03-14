import {apiRoot} from "@/constants";
import IsAuthRequest from "@/core/dto/auth/requests/IsAuthRequest";
import Auth from "@/core/dto/auth/Auth";
import AuthByLevelRequest from "@/core/dto/auth/requests/AuthByLevelRequest";
import AuthByIdRequest from "@/core/dto/auth/requests/AuthByIdRequest";

const isAuthUrl: string = `${apiRoot}/isAuth`;
const authByLevelUrl: string = `${apiRoot}/authByLevel`;
const authByIdUrl: string = `${apiRoot}/authById`;


export async function isAuth(req: IsAuthRequest): Promise<Auth> {
    return await fetch(isAuthUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function authByLevel(req: AuthByLevelRequest): Promise<boolean> {
    return await fetch(authByLevelUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function authById(req: AuthByIdRequest): Promise<boolean> {
    return await fetch(authByIdUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}