import SubscriptionStatsDTO from "../dto/content/SubscriptionStatsDTO";

import { apiRoot } from "@/constants";
import UserStatsDTO from "../dto/content/UserStatsDTO";
import RevenueStatsDTO from "../dto/content/RevenueStatsDTO";

const subscriptionStatsUrl = `${apiRoot}`;
const usersStatsUrl = `${apiRoot}`;
const revenueStatsUrl = `${apiRoot}`;

export async function getSubscriptionStats(): Promise<SubscriptionStatsDTO[]> {
  return await fetch(subscriptionStatsUrl, {
    method: "GET",
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    }
  }).then((res) => res.json());
}
export async function getUserStats(): Promise<UserStatsDTO> {
  return await fetch(usersStatsUrl, {
    method: "GET",
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    }
  }).then((res) => res.json());
}
export async function getRevenueStats(): Promise<RevenueStatsDTO[]> {
  return await fetch(revenueStatsUrl, {
    method: "GET",
    mode: "no-cors",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearer-token")}`
    }
  }).then((res) => res.json());
}
