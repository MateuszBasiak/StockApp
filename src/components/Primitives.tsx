export interface ICompany{
    symbol: string;
    name: string;
    exchange: string;
  }
  
export interface IPopup{
    visible: boolean;
    symbol: string;
    name: string;
}

export interface ICompanyGet {
    Symbol?: string;
    Name?: string;
    Exchange?: string;
    Currency?: string;
    Country?: string;
    Sector?: string;
    Industry?: string;
    Address?: string;
    "52WeekHigh"?: number;
    "52WeekLow"?: number;
    "50DayMovingAverage"?: number;
    SharesOutstanding?: number;
    ShareShort?: number;
    ShortRatio?: number;
    PayoutRatio?: number;
    ForwardPE?: number;
}

export interface IChartData{
    date: string;
    open: number;
    high: number;
    low: number;
}

export const MainColor = "#3d3d3d";
export const SecondaryColor = "lightgrey";