import SubscriptionStatsDTO from "../dto/content/SubscriptionStatsDTO"

import { apiRoot } from "@/constants";
import UserStatsDTO from "../dto/content/UserStatsDTO";
import RevenueStatsDTO from "../dto/content/RevenueStatsDTO";
const subscriptionStatsUrl = `${apiRoot}/`
const usersStatsUrl = `${apiRoot}`
const revenuewStatsUrl = `${apiRoot}`

export async function getSubscriptionsStats(): Promise<SubscriptionStatsDTO[]> {
    return await fetch(`${subscriptionStatsUrl}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`
        }
    }).then(res => res.json());
}
export async function getUsersStats(): Promise<UserStatsDTO> {
    return await fetch(`${usersStatsUrl}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`
        }
    }).then(res => res.json());
}
export async function getRevenueStats(): Promise<RevenueStatsDTO[]> {
    return await fetch(`${revenuewStatsUrl}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearer-token")}`
        }
    }).then(res => res.json());
}