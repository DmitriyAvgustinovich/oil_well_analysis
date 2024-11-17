import React from "react";

import { DatePicker, Select } from "antd";
import { Line } from "react-chartjs-2";

import {
  useGetAllWellsQuery,
  useGetDailyReportForCertainWellQuery,
} from "store/api/wells/wells-api";

import styles from "./DailyReportForCertainWell.module.scss";

export const DailyReportForCertainWell = () => {
  const [wellId, setWellId] = React.useState<number | null>(null);
  const [selectedMetric, setSelectedMetric] = React.useState<string>("debit");

  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);

  const { data: allWellsData } = useGetAllWellsQuery();

  const { data: dailyReportForCertainWellData } =
    useGetDailyReportForCertainWellQuery(
      { wellId, startDate, endDate },
      { skip: !wellId || !startDate || !endDate }
    );

  const metricsOptions = [
    { value: "debit", label: "Производительность" },
    { value: "ee_consume", label: "Энергозатраты" },
    { value: "expenses", label: "Наработка насоса" },
    { value: "pump_operating", label: "Время работы насоса" },
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Дата",
        },
      },
      y: {
        title: {
          display: true,
          text:
            selectedMetric === "debit"
              ? "Производительность (куб.м)"
              : selectedMetric === "ee_consume"
              ? "Энергозатраты (кВт·ч)"
              : selectedMetric === "expenses"
              ? "Расходы в у.е."
              : "Время работы насоса (ч.)",
        },
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels:
      dailyReportForCertainWellData?.map((item) =>
        new Date(item.date_fact).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      ) ?? [],
    datasets: [
      {
        label: metricsOptions.find((option) => option.value === selectedMetric)
          ?.label,
        data:
          dailyReportForCertainWellData?.map((item) => item[selectedMetric]) ??
          [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setStartDate(dates[0].format("YYYY-MM-DD"));
      setEndDate(dates[1].format("YYYY-MM-DD"));
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleWellIdChange = (value: number) => {
    setWellId(value);
  };

  const handleMetricChange = (value: string) => {
    setSelectedMetric(value);
  };

  const wellsIdsOptions = allWellsData?.map(({ well }) => ({
    value: well,
    label: `Скважина ${well}`,
  }));

  return (
    <>
      <div className={styles.dailyReportForCertainWellWrapper}>
        <Select
          placeholder="Выберите номер скважины"
          onChange={handleWellIdChange}
          options={wellsIdsOptions}
          showSearch
        />

        <DatePicker.RangePicker
          className={styles.dailyReportForCertainWellDatePicker}
          onChange={handleDateChange}
          placeholder={["Начальная дата", "Конечная дата"]}
        />

        <Select
          placeholder="Выберите метрику"
          onChange={handleMetricChange}
          options={metricsOptions}
        />
      </div>

      <Line data={chartData} options={chartOptions} />
    </>
  );
};
