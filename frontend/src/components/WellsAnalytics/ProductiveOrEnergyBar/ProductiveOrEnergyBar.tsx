import React from "react";

import { Select } from "antd";
import { Bar } from "react-chartjs-2";

import { useGetProductiveOrEnergyWellsQuery } from "store/api/wells/wells-api";

const wellsProductiveTypeOptions = [
  { value: "debit", label: "Самые производительные" },
  { value: "ee_consume", label: "Самые энергозатратные" },
  {
    value: "specific-debit-ee-consume",
    label: "Самые энергоэффективные",
  },
  {
    value: "specific-debit-expenses",
    label: "Самые экономически выгодные",
  },
];

export const ProductiveOrEnergyBar = () => {
  const [wellsProductiveType, setWellsProductiveType] =
    React.useState<string>("");

  const { data: productiveOrEnergyWellsData } =
    useGetProductiveOrEnergyWellsQuery(
      { operationType: wellsProductiveType },
      { skip: !wellsProductiveType }
    );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text:
            wellsProductiveType === "debit"
              ? "Кубометры в сутки"
              : wellsProductiveType === "specific-debit-ee-consume"
              ? "Кубометры/кВтч"
              : wellsProductiveType === "specific-debit-expenses"
              ? "Кубометры/руб"
              : "Значения",
        },
      },
      x: {
        title: {
          display: true,
          text: "Скважины",
        },
      },
    },
  };

  const chartData = {
    labels: productiveOrEnergyWellsData?.map(({ well }) => well) ?? [],
    datasets: [
      {
        label:
          wellsProductiveType === "debit"
            ? "Производительность"
            : wellsProductiveType === "ee_consume"
            ? "Энергозатраты"
            : wellsProductiveType === "specific-debit-ee-consume"
            ? "Энергоэффективность"
            : "Экономическая выгода",
        data: productiveOrEnergyWellsData?.map(({ value }) => value) ?? [],
        backgroundColor:
          wellsProductiveType === "debit" ||
          wellsProductiveType === "specific-debit-ee-consume"
            ? "rgba(75, 192, 192, 0.5)"
            : "rgba(255, 99, 132, 0.5)",
        borderColor:
          wellsProductiveType === "debit" ||
          wellsProductiveType === "specific-debit-ee-consume"
            ? "rgba(75, 192, 192, 1)"
            : "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleWellsProductiveTypeChange = (value: string) => {
    setWellsProductiveType(value);
  };

  return (
    <div>
      <Select
        placeholder="Выберите тип производительности скважины"
        onChange={handleWellsProductiveTypeChange}
        options={wellsProductiveTypeOptions}
        style={{ width: '250px'}}
      />

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
