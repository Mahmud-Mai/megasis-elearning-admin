import axios from "axios";
import { apiRoot } from "@/constants";
import AuthData from "@/core/dto/login/AuthData";
import LoginUserRequest from "@/core/dto/login/requests/LoginUserRequest";
import CreateUserRequest from "@/core/dto/login/requests/CreateUserRequest";
import ProfileDTO from "@/core/dto/login/ProfileDTO";
import UpdatePasswordRequest from "@/core/dto/login/requests/UpdatePasswordRequest";

const getProfileUrl: string = `${apiRoot}/getProfile`;
const loginUrl: string = `${apiRoot}/loginUser`;
const registerUrl: string = `${apiRoot}/createUser`;
const userExistsUrl: string = `${apiRoot}/userExists`;
const updatePasswordUrl: string = `${apiRoot}/updatePassword`;

export async function getProfile(): Promise<ProfileDTO> {
  const userId = localStorage.getItem("userId") || "";
  return await fetch(`${getProfileUrl}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    }
  }).then((res) => res.json());
}

export async function loginUser(
  req: LoginUserRequest
): Promise<AuthData | undefined> {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req)
    });

    if (!response.ok || !response) {
      // const errorData = await response.json();
      // throw new Error(errorData?.message || "Login failed");
      throw new Error(
        `Login failed. Encountered an error: ${response.status}] [${response.statusText}] [${response.url}]`
      );
    }

    const authData = await response.json();
    return authData;
  } catch (error) {
    console.error("Error logging in user:", error);
    return undefined;
  }
}

export async function updatePassword(
  req: UpdatePasswordRequest
): Promise<boolean> {
  return await fetch(updatePasswordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    },
    body: JSON.stringify(req)
  }).then((res) => res.json());
}

export async function createUser(req: CreateUserRequest): Promise<AuthData> {
  return await axios(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    },
    data: req
  }).then((res) => res.data);
}

export async function userExists(userId: string): Promise<boolean> {
  return await fetch(`${userExistsUrl}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    }
  }).then((res) => res.json());
}
