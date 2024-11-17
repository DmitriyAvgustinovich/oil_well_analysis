import {
  IWell,
  IDailyDebitWell,
  IProductiveOrEnergyWell,
  IDailyReportWell,
} from "types";

export type TGetAllWellsResponse = IWell[];
export type TGetAllWellsRequest = void;

export type TGetTopWellsResponse = IDailyDebitWell[];
export interface IGetTopWellsRequest {
  wellId: number | null;
  startDate: string | null;
  endDate: string | null;
}

export type TGetProductiveOrEnergyWellsResponse = IProductiveOrEnergyWell[];
export interface IGetProductiveOrEnergyWellsRequest {
  operationType: string;
}

export type TGetAmountOilPumpedByCertainWellResponse = number;
export interface IGetAmountOilPumpedByCertainWellRequest {
  wellId: number | null;
  startDate: string | null;
  endDate: string | null;
}

export type TGetDailyReportForCertainWellResponse = IDailyReportWell[];
export interface IGetDailyReportForCertainWellRequest {
  wellId: number | null;
  startDate: string | null;
  endDate: string | null;
}
