import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PieChart({ labels, data, colors }: { labels: string[], data: number[], colors?: string[], }) {
    return (
        <ReactApexChart
            options={{
                dataLabels: {
                    enabled: true,
                },
                xaxis: {
                    categories: labels
                },
                colors: colors,

            }}
            series={data}
            type="bar"
            height="350"
        />
    )
}


