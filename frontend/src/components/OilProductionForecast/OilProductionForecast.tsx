import React from "react";

import { Typography } from "antd";
import { Line } from "react-chartjs-2";
import { IDailyReportWell } from "types";

import { UploadCsvButton } from "components/UploadCsvButton/UploadCsvButton";

export const OilProductionForecast = () => {
  const [forecastData, setForecastData] = React.useState<IDailyReportWell[]>(
    []
  );

  const handleUploadSuccess = (data: string) => {
    const extractedData = data.match(/```json\n([\s\S]*)\n```/)?.[1];

    setForecastData(JSON.parse(extractedData ?? ""));
  };

  const chartData = {
    labels: forecastData.map((item) => item.date_fact),
    datasets: [
      {
        label: "Добыча",
        data: forecastData.map((item) => item.debit),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Энергопотребление",
        data: forecastData.map((item) => item.ee_consume),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
      {
        label: "Затраты",
        data: forecastData.map((item) => item.expenses),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Наработка насоса",
        data: forecastData.map((item) => item.pump_operating),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Значения",
        },
      },
      x: {
        title: {
          display: true,
          text: "Дата",
        },
      },
    },
  };

  return (
    <div style={{ width: "80vw", maxWidth: "100%" }}>
      <Typography.Title>Прогноз добычи нефти</Typography.Title>
      <UploadCsvButton onSuccess={handleUploadSuccess} />
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};
