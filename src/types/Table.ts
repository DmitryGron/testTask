export interface RowData {
  USD: CurrencyData;
  GBP: CurrencyData;
  EUR: CurrencyData;
}

export interface CurrencyData {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}
