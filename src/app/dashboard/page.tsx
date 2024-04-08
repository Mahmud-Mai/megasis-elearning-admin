"use client"
import { Button } from "@/components/ui/button";
import RevenueStatsDTO from "@/core/dto/content/RevenueStatsDTO";
import SubscriptionStatsDTO from "@/core/dto/content/SubscriptionStatsDTO";
import UserStatsDTO from "@/core/dto/content/UserStatsDTO";
import { getRevenueStats, getSubscriptionStats, getUserStats } from "@/core/services/stats-service";
import { useEffect, useState } from "react";
import PieChart from "@/components/charts/pieChart";
import BarChart from "@/components/charts/barChart";
import LineChart from "@/components/charts/lineChart";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export default function Home() {
  const [userCount, setUserCount] = useState<UserStatsDTO>({
    admins: 0,
    users: 0,
  });
  const yearOptions = [
    2024, 2025, 2026, 2027, 2028, 2029,
  ]
  const monthOptions = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]
  const [subscriptionsCount, setSubscriptionsCount] = useState<SubscriptionStatsDTO[]>();
  const [revenueCount, setRevenueCount] = useState<RevenueStatsDTO[]>();

  const [selectedYear, setSelectedYear] = useState<string>();
  const [subsMonth, setSubsMonth] = useState<string>();
  const [revenueMonth, setRevenueMonth] = useState<string>();

  const processSubscriptions = (subs: SubscriptionStatsDTO[], month?: string, year?: string): { plans: string[], values: number[] } => {
    const plans: string[] = [];
    const values: number[] = [];
    subs.forEach((sub) => {
      if (month && sub.month == month) {
        if (year && sub.year == year) {
          plans.push(sub.plan);
          values.push(sub.count);
        } else {
          plans.push(sub.plan);
          values.push(sub.count);
        }
      }
    })
    return { plans, values }
  }

  const loadStats = () => {
    getUserStats().then(res => setUserCount(res)).catch(err => console.log("failed to load users"));

    getSubscriptionStats().then(res => setSubscriptionsCount(res)).catch(err => console.log("failed to load subscriptions"))

    getRevenueStats().then(res => setRevenueCount(res)).catch(err => console.log("failed to load revenue"))
  }
  useEffect(() => { loadStats(); }, [])
  return (
    <div>
      <div className="flex flex-row items-end align-middle justify-end">
        <div className="w-[130px]">
          <Select onValueChange={(val) => setSelectedYear(val)} value={selectedYear}>
            <SelectTrigger id="sub year">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent position="popper">
              {
                yearOptions.map((year) => <SelectItem key={year} className="capitalize" value={year.toString()}>{year}</SelectItem>)
              }
            </SelectContent>
          </Select>
        </div>
        <div className="mx-1">
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg> <span className="m-2"> Refresh </span>
          </Button>
        </div>
      </div>

      <div className="p-3">
        {/* users */}
        <Card className="p-5 my-3 w-full">
          <CardTitle>
            <div className="uppercase font-bold">Users</div>
          </CardTitle>
          <CardContent>
            {userCount ?
              <PieChart labels={['Admins', 'Students']} data={[userCount?.admins, userCount?.users]} />
              : <div className="text-center text-secondary">Users</div>
            }
          </CardContent>
        </Card>
        {/* subscriptions */}
        <Card className="p-5 my-3 w-full">
          <CardTitle className="flex justify-between align-middle items-center">
            <div className="uppercase font-bold">Subscriptions</div>
            <div className="w-[130px]">
              <Select onValueChange={(val) => setSubsMonth(val)} value={subsMonth}>
                <SelectTrigger id="sub year">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {
                    monthOptions.map((month) => <SelectItem key={month} className="capitalize" value={month}>{month}</SelectItem>)
                  }
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
          <CardContent>
            {subscriptionsCount ?
              <BarChart
                colors={[]}
                labels={processSubscriptions(subscriptionsCount ?? [], subsMonth, selectedYear).plans}
                data={processSubscriptions(subscriptionsCount ?? [], subsMonth, selectedYear).values} />
              : <div className="text-center text-secondary">Subscriptions</div>
            }
          </CardContent>
        </Card>

        {/* revenue */}
        <Card className="p-5 my-3 w-full">
          <CardTitle className="flex justify-between align-middle items-center">
            <div className="uppercase font-bold">Revenue</div>
            <div className="w-[130px]">

              <Select onValueChange={(val) => setRevenueMonth(val)} value={revenueMonth}>
                <SelectTrigger id="revenue-month">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {
                    monthOptions.map((month) => <SelectItem key={month} className="capitalize" value={month}>{month}</SelectItem>)
                  }
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
          <CardContent>
            {revenueCount ?
              <LineChart
                colors={[]}
                labels={revenueCount?.filter(revenue => revenue.year == selectedYear).map<string>(revenue => revenue.month) ?? []}
                data={revenueCount?.filter(revenue => revenue.year == selectedYear).map(revenue => revenue.amount) ?? []} />
              : <div className="text-center text-secondary">Revenue</div>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
