import React from "react";

import { DatePicker, Select, Typography } from "antd";
import { TRecordObjectNumber } from "types";

import { LoadingOutlined } from "@ant-design/icons";

import { useGetAmountOilPumpedByCertainWellQuery } from "store/api/wells/wells-api";

import styles from "./AmountOilPumpedByCertainWell.module.scss";

interface IAmountOilPumpedByCertainWellProps {
  wellsIdsOptions?: TRecordObjectNumber[];
}

export const AmountOilPumpedByCertainWell = (
  props: IAmountOilPumpedByCertainWellProps
) => {
  const { wellsIdsOptions } = props;

  const [wellId, setWellId] = React.useState<number | null>(null);
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);

  const {
    data: amountOilPumpedByCertainWellData,
    isLoading: amountOilPumpedByCertainWellIsLoading,
  } = useGetAmountOilPumpedByCertainWellQuery(
    {
      wellId,
      startDate,
      endDate,
    },
    {
      skip: !wellId || !startDate || !endDate,
    }
  );
  const handleWellIdChange = (value: number) => {
    setWellId(value);
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setStartDate(dates[0].format("YYYY-MM-DD"));
      setEndDate(dates[1].format("YYYY-MM-DD"));
    } else {
      setEndDate(null);
      setEndDate(null);
    }
  };

  return (
    <>
      <Typography.Text>
        Количество выкачанной нефти колонкой за определенный период:{" "}
        {amountOilPumpedByCertainWellIsLoading && <LoadingOutlined spin />}
        <b>{amountOilPumpedByCertainWellData}</b>
      </Typography.Text>

      <div className={styles.amountOilPumpedByCertainWellWrapper}>
        <DatePicker.RangePicker
          onChange={handleDateChange}
          placeholder={["Начальная дата", "Конечная дата"]}
        />

        <Select
          placeholder="Выберите номер скважины"
          onChange={handleWellIdChange}
          options={wellsIdsOptions}
          showSearch
        />
      </div>
    </>
  );
};
