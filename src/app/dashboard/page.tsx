"use client";
import { Button } from "@/components/ui/button";
import RevenueStatsDTO from "@/core/dto/content/RevenueStatsDTO";
import SubscriptionStatsDTO from "@/core/dto/content/SubscriptionStatsDTO";
import UserStatsDTO from "@/core/dto/content/UserStatsDTO";
// Endpoints not yet available
// import {
//   getRevenueStats,
//   getSubscriptionStats,
//   getUserStats
// } from "@/core/services/stats-service";
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
  SelectValue
} from "@/components/ui/select";

export default function Home() {
  const [userCount, setUserCount] = useState<UserStatsDTO>({
    admins: 4,
    users: 23
  });

  const yearOptions = [2024, 2025, 2026, 2027, 2028, 2029];
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
    "december"
  ];
  const [subscriptionsCount, setSubscriptionsCount] = useState<
    SubscriptionStatsDTO[]
  >([
    { plan: "Basic", count: 100, month: "January", year: "2024" },
    { plan: "Standard", count: 150, month: "January", year: "2024" },
    { plan: "Premium", count: 200, month: "January", year: "2024" },
    { plan: "Basic", count: 120, month: "February", year: "2024" },
    { plan: "Standard", count: 180, month: "February", year: "2024" },
    { plan: "Premium", count: 240, month: "February", year: "2024" }
  ]);
  const [revenueCount, setRevenueCount] = useState<RevenueStatsDTO[]>([
    { month: "january", amount: 800, year: 2023 },
    { month: "february", amount: 1200, year: 2023 },
    { month: "march", amount: 1500, year: 2023 },
    // Sample data for current year (replace with your actual data)
    { month: "january", amount: 1000, year: 204 },
    { month: "february", amount: 1500, year: 204 },
    // Add more data for the current year here (replace with your actual data)
    { month: "march", amount: 2000, year: 204 },
    { month: "april", amount: 1800, year: 204 }
  ]);

  const [selectedYear, setSelectedYear] = useState<string>();
  const [subsMonth, setSubsMonth] = useState<string>();
  const [revenueMonth, setRevenueMonth] = useState<string>();

  const processSubscriptions = (
    subs: SubscriptionStatsDTO[],
    month?: string,
    year?: string
  ): { plans: string[]; values: number[] } => {
    return {
      plans: subs
        .filter(
          (sub) =>
            (month ? sub.month === month : true) &&
            (year ? sub.year === year : true)
        )
        .map((sub) => sub.plan),
      values: subs
        .filter(
          (sub) =>
            (month ? sub.month === month : true) &&
            (year ? sub.year === year : true)
        )
        .map((sub) => sub.count)
    };
  };

  //Endpoints aren't available yet
  // const loadStats = () => {
  //   getUserStats()
  //     .then((res) => {
  //       console.log("🚀 ~ loadStats ~ res:", res);
  //       return setUserCount(res);
  //     })
  //     .catch((err) => console.log("failed to load users"));

  //   getSubscriptionStats()
  //     .then((res) => {
  //       console.log("🚀 ~ loadStats ~ res:", res);
  //       return setSubscriptionsCount(res);
  //     })
  //     .catch((err) => console.log("failed to load subscriptions"));

  //   getRevenueStats()
  //     .then((res) => {
  //       console.log("🚀 ~ loadStats ~ res:", res);
  //       return setRevenueCount(res);
  //     })
  //     .catch((err) => console.log("failed to load revenue"));
  // };
  // useEffect(() => {
  //   loadStats();
  // }, []);

  return (
    <div className="p-4 container">
      {/* <div className="h-full overflow-auto flex flex-row items-end align-middle justify-end">
        <div className="w-[130px]">
          <Select
            onValueChange={(val) => setSelectedYear(val)}
            value={selectedYear}
          >
            <SelectTrigger id="sub year">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent position="popper">
              {yearOptions.map((year) => (
                <SelectItem
                  key={year}
                  className="capitalize"
                  value={year.toString()}
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mx-1">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
            <span className="m-2"> Refresh </span>
          </Button>
        </div>
      </div> */}

      {/* All Charts Wrapper  */}
      <div className="my-8 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* users */}
          <Card className="w-full">
            <CardTitle>
              <div className="px-5 py-5 uppercase font-bold">Users</div>
            </CardTitle>
            <CardContent>
              {userCount ? (
                <PieChart
                  labels={["Admins", "Students"]}
                  data={[userCount?.admins, userCount?.users]}
                  colors={["#509CDB", "#152259"]}
                />
              ) : (
                <div className="text-center text-secondary">
                  There are no users at the moment
                </div>
              )}
            </CardContent>
          </Card>
          {/* subscriptions */}
          <Card className="w-full">
            <CardTitle className="flex justify-between align-middle items-center">
              <div className="px-5 py-5 uppercase font-bold">Subscriptions</div>
              {/* <div className="w-[130px]">
                <Select
                  onValueChange={(val) => setSubsMonth(val)}
                  value={subsMonth}
                >
                  <SelectTrigger id="sub year">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {monthOptions.map((month) => (
                      <SelectItem
                        key={month}
                        className="capitalize"
                        value={month}
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            </CardTitle>
            <CardContent>
              {subscriptionsCount ? (
                <BarChart
                  colors={subscriptionsCount.map(() => "#152259")}
                  labels={subscriptionsCount.map((sub) => sub.plan)}
                  data={subscriptionsCount.map((sub) => sub.count)}
                />
              ) : (
                <div className="text-center text-secondary">
                  There are no Subscriptions at the moment
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* revenue */}
        <Card className="y-3 w-full">
          <CardTitle className="flex justify-between align-middle items-center">
            <div className="px-5 py-5 uppercase font-bold">Revenue</div>
            {/* <div className="w-[130px]">
              <Select
                onValueChange={(val) => setRevenueMonth(val)}
                value={revenueMonth}
              >
                <SelectTrigger id="revenue-month">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {monthOptions.map((month) => (
                    <SelectItem
                      key={month}
                      className="capitalize"
                      value={month}
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </CardTitle>
          <CardContent>
            {revenueCount ? (
              <LineChart
                colors={revenueCount.map(() => "#152259")}
                labels={revenueCount.map((revenue) => revenue.month)}
                data={revenueCount.map((revenue) => revenue.amount)}
              />
            ) : (
              <div className="text-center text-secondary">Revenue</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
