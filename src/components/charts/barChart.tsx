import dynamic from "next/dynamic";
import { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export default function BarChart({
  labels,
  data,
  colors
}: {
  labels: string[];
  data: number[];
  colors: string[];
}) {
  return (
    <ReactApexChart
      options={{
        xaxis: {
          categories: labels
        }
        // colors: colors
      }}
      plotOptions={{
        bar: {
          borderRadius: 8,
          borderRadiusApplication: "end"
        }
      }}
      series={[{ data }]}
      type="bar"
      // height="350"
    />
  );
}
