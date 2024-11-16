import { Tabs, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"], // X-axis labels
  datasets: [
    {
      label: "Dataset 1", // Legend label
      data: [65, 59, 80, 81, 56, 55, 40], // Y-axis data points
      borderColor: "rgba(75, 192, 192, 1)", // Line color
      backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill under the line
      tension: 0.4, // Line smoothness
    },
    {
      label: "Dataset 2",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "rgba(153, 102, 255, 1)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Months", // X-axis title
      },
    },
    y: {
      title: {
        display: true,
        text: "Values", // Y-axis title
      },
      beginAtZero: true, // Ensure the Y-axis starts from zero
    },
  },
};

export const WellsAnalytics = () => {
  const tabItems = [
    {
      key: "1",
      label: "10 самых производительных скважин",
      children: <Line data={data} options={options} />,
    },
    {
      key: "2",
      label: "10 самых энергозатратных скважин",
      children: <Line data={data} options={options} />,
    },
    {
      key: "3",
      label: "Количество скважин в разрезе месторождений",
      children: <Line data={data} options={options} />,
    },
    {
      key: "4",
      label: "Суммарный объём добытой нефти",
      children: <Line data={data} options={options} />,
    },
  ];

  return (
    <>
      <Typography.Title>Аналитика по скважинам</Typography.Title>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </>
  );
};
