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
  BarElement,
} from "chart.js";

import { DailyReportForCertainWell } from "./DailyReportForCertainWell/DailyReportForCertainWell";
import { ProductiveOrEnergyBar } from "./ProductiveOrEnergyBar/ProductiveOrEnergyBar";
import { TotalOilProduceLine } from "./TotalOilProduceLine/TotalOilProduceLine";
import styles from "./WellsAnalytics.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const WellsAnalytics = () => {
  const tabItems = [
    {
      key: "1",
      label: "10 самых производительных и энергозатратных скважин",
      children: <ProductiveOrEnergyBar />,
    },
    {
      key: "2",
      label: "Суммарный объём добытой нефти",
      children: <TotalOilProduceLine />,
    },
    {
      key: "3",
      label: "Ежедневный отчет о скважине",
      children: <DailyReportForCertainWell />,
    },
  ];

  return (
    <>
      <Typography.Title>Аналитика по скважинам</Typography.Title>
      <Tabs
        className={styles.wellsAnalyticsTabsWrapper}
        defaultActiveKey="1"
        items={tabItems}
      />
    </>
  );
};
