import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

export default function LineChart({
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
        },
        colors: colors
      }}
      series={[{ data }]}
      type="line"
      height="270"
      width={"100%"}
    />
  );
}
