import React from "react";

import { DatePicker, Select, Typography } from "antd";
import { Line } from "react-chartjs-2";
import { getFormattedDate } from "utils";

import {
  useGetAllWellsQuery,
  useGetTopWellsQuery,
} from "store/api/wells/wells-api";

import { AmountOilPumpedByCertainWell } from "./AmountOilPumpedByCertainWell/AmountOilPumpedByCertainWell";
import styles from "./TotalOilProduceLine.module.scss";

export const TotalOilProduceLine = () => {
  const [wellId, setWellId] = React.useState<number | null>(null);
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);

  const { data: allWellsData } = useGetAllWellsQuery();
  const { data: topWellsData } = useGetTopWellsQuery(
    {
      wellId,
      startDate,
      endDate,
    },
    { skip: !wellId || !startDate || !endDate }
  );

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "День",
        },
      },
      y: {
        title: {
          display: true,
          text: "Количество выкачанной нефти (в кубометрах) за сутки",
        },
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: topWellsData?.map((item) => getFormattedDate(item.date_fact)) ?? [],
    datasets: [
      {
        label: "Количество выкачанной нефти (в кубометрах) за сутки",
        data: topWellsData?.map((item) => item.debit) ?? [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setStartDate(dates[0].toISOString());
      setEndDate(dates[1].toISOString());
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleWellIdChange = (value: number) => {
    setWellId(value);
  };

  const wellsIdsOptions = allWellsData?.map(({ well }) => {
    return {
      value: well,
      label: well,
    };
  });

  return (
    <>
      <AmountOilPumpedByCertainWell wellsIdsOptions={wellsIdsOptions} />

      <Typography.Text>Суммарный объём добытой нефти:</Typography.Text>

      <div className={styles.totalOilProduceLineButtonsWrapper}>
        <DatePicker.RangePicker
          className={styles.totalOilProduceLineDateRangeSelect}
          onChange={handleDateChange}
          placeholder={["Начальная дата", "Конечная дата"]}
        />

        <Select
          className={styles.totalOilProduceLineSelect}
          placeholder="Выберите номер скважины"
          onChange={handleWellIdChange}
          options={wellsIdsOptions}
          showSearch
        />
      </div>

      <Line data={chartData} options={chartOptions} />
    </>
  );
};
