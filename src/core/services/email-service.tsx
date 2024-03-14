import {apiRoot} from "@/constants";

const checkEmailAvailableUrl: string = `${apiRoot}/checkEmailAvailable`;
const USER: string = 'ADMIN';

export function checkEmailAvailable(emailAddress: string): Promise<boolean> {
    return fetch(`${checkEmailAvailableUrl}/${emailAddress}/${USER}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}