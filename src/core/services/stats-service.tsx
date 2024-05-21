import SubscriptionStatsDTO from "../dto/content/SubscriptionStatsDTO";

import { apiRoot } from "@/constants";
import UserStatsDTO from "../dto/content/UserStatsDTO";
import RevenueStatsDTO from "../dto/content/RevenueStatsDTO";

const usersStatsUrl = `${apiRoot}/usersStats`;
const revenueStatsUrl = `${apiRoot}/revenueStats`;
const subscriptionStatsUrl = `${apiRoot}/subscriptionStats`;

export async function getSubscriptionStats(): Promise<SubscriptionStatsDTO[]> {
  return await fetch(subscriptionStatsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    }
  })
    .then((res) => res.json())
    .catch((e: any) => e);
}
export async function getUserStats(): Promise<UserStatsDTO> {
  return await fetch(usersStatsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    }
  }).then((res) => res.json());
}
export async function getRevenueStats(): Promise<RevenueStatsDTO[]> {
  return await fetch(revenueStatsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    }
  }).then((res) => res.json());
}
