import { rtkApi } from "../rtk-api";
import {
  TGetAllWellsResponse,
  TGetAllWellsRequest,
  TGetTopWellsResponse,
  IGetTopWellsRequest,
  TGetProductiveOrEnergyWellsResponse,
  IGetProductiveOrEnergyWellsRequest,
  TGetAmountOilPumpedByCertainWellResponse,
  IGetAmountOilPumpedByCertainWellRequest,
  TGetDailyReportForCertainWellResponse,
  IGetDailyReportForCertainWellRequest,
} from "./types";

export const wellsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllWells: build.query<TGetAllWellsResponse, TGetAllWellsRequest>({
      query: () => "/wells",
      providesTags: ["Wells"],
    }),

    getTopWells: build.query<TGetTopWellsResponse, IGetTopWellsRequest>({
      query: (body) =>
        `/wells/debit/daily/${body.wellId}?startDate=${body.startDate}&endDate=${body.endDate}`,
      providesTags: ["Wells"],
    }),

    getProductiveOrEnergyWells: build.query<
      TGetProductiveOrEnergyWellsResponse,
      IGetProductiveOrEnergyWellsRequest
    >({
      query: (body) => `/wells/top/${body.operationType}`,
      providesTags: ["Wells"],
    }),

    getAmountOilPumpedByCertainWell: build.query<
      TGetAmountOilPumpedByCertainWellResponse,
      IGetAmountOilPumpedByCertainWellRequest
    >({
      query: (body) =>
        `/wells/debit/total/${body.wellId}?startDate=${body.startDate}&endDate=${body.endDate}`,
      providesTags: ["Wells"],
    }),

    getDailyReportForCertainWell: build.query<
      TGetDailyReportForCertainWellResponse,
      IGetDailyReportForCertainWellRequest
    >({
      query: (body) =>
        `/wells/daily-report/${body.wellId}?startDate=${body.startDate}&endDate=${body.endDate}`,
      providesTags: ["Wells"],
    }),
  }),
});

export const {
  useGetAllWellsQuery,
  useGetTopWellsQuery,
  useGetProductiveOrEnergyWellsQuery,
  useGetAmountOilPumpedByCertainWellQuery,
  useGetDailyReportForCertainWellQuery,
} = wellsApi;
