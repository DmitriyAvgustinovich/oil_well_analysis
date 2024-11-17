export interface IWell {
  well: number;
  ngdu: number;
  sdng: number;
  kust: number;
  mest: number;
}

export interface IDailyDebitWell {
  date_fact: string;
  debit: number;
}

export interface IProductiveOrEnergyWell {
  well: number;
  value: number;
}

export interface IDailyReportWell {
  date_fact: string;
  debit: number;
  ee_consume: number;
  expenses: number;
  pump_operating: number;
  well: number;
}
