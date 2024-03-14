import {apiRoot} from "@/constants";
import SubscriptionOffer from "@/core/dto/subscription/SubscriptionOffer";
import BuySubscriptionRequest from "@/core/dto/subscription/requests/BuySubscriptionRequest";
import CreateSubscriptionOfferRequest from "@/core/dto/subscription/requests/CreateSubscriptionOfferRequest";
import UpdateSubscriptionOfferRequest from "@/core/dto/subscription/requests/UpdateSubscriptionOfferRequest";
import DeleteSubscriptionOfferRequest from "@/core/dto/subscription/requests/DeleteSubscriptionOfferRequest";
import ConfirmSubscriptionRequest from "@/core/dto/subscription/requests/ConfirmSubscriptionRequest";

export const getSubscriptionOfferUrl: string = `${apiRoot}/getSubscriptionOffer`;
export const getSubscriptionOffersUrl: string = `${apiRoot}/getSubscriptionOffers`;
export const getSubscriptionsBoughtUrl: string = `${apiRoot}/getSubscriptionsBought`;
export const buySubscriptionUrl: string = `${apiRoot}/buySubscription`;
export const createSubscriptionOfferUrl: string = `${apiRoot}/createSubscriptionOffer`;
export const updateSubscriptionOfferUrl: string = `${apiRoot}/updateSubscriptionOffer`;
export const deleteSubscriptionOfferUrl: string = `${apiRoot}/deleteSubscriptionOffer`;
export const checkCustomerHasActiveSubscriptionUrl: string = `${apiRoot}/checkCustomerHasActiveSubscription`;
export const confirmSubscriptionUrl: string = `${apiRoot}/confirmSubscription`;


export async function getSubscriptionOffer(subscriptionId: string, userId: string): Promise<SubscriptionOffer> {
    return await fetch(`${getSubscriptionOfferUrl}/${subscriptionId}/${userId}`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        }
    }).then(res => res.json());
}

export async function getSubscriptionOffers(): Promise<SubscriptionOffer[]> {
    return await fetch(getSubscriptionOffersUrl, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        }
    }).then(res => res.json());
}

export async function getSubscriptionsBought(userId: string): Promise<SubscriptionOffer[]> {
    return await fetch(`${getSubscriptionsBoughtUrl}/${userId}`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        }
    }).then(res => res.json());
}

export async function buySubscription(req: BuySubscriptionRequest): Promise<string> { // Returns a client secret
    return await fetch(`${buySubscriptionUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function createSubscriptionOffer(req: CreateSubscriptionOfferRequest): Promise<SubscriptionOffer> {
    return await fetch(createSubscriptionOfferUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function updateSubscriptionOffer(req: UpdateSubscriptionOfferRequest): Promise<SubscriptionOffer> {
    return await fetch(updateSubscriptionOfferUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function deleteSubscriptionOffer(req: DeleteSubscriptionOfferRequest): Promise<boolean> {
    return await fetch(deleteSubscriptionOfferUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}

export async function checkCustomerHasActiveSubscription(userId: string): Promise<void> {
    await fetch(`${checkCustomerHasActiveSubscriptionUrl}/${userId}`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        }
    }).then(res => res);
    return;
}

export async function confirmSubscription(req: ConfirmSubscriptionRequest): Promise<boolean> {
    return await fetch(confirmSubscriptionUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${localStorage.getItem("bearer-token")}`
        },
        body: JSON.stringify(req)
    }).then(res => res.json());
}