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
    TrailingPE?: number;
    PERatio?: number;
    PEGRatio?: number;
    BookValue?: number;
    '52WeekHigh'?: number;
    '52WeekLow'?: number;
    EPS?: number;
    PayoutRatio?: number;
    SharesShort?: number;
    ShortRatio?: number;
    Beta?: number;
    ForwardPE?: number;
}

export interface IChartData{
    date: string;
    open: number;
    high: number;
    low: number;
}

export const MainColor = '#3d3d3d';
export const SecondaryColor = 'lightgrey';
export const BackgroundColor = '#f5f2e9';

export const recordsPerPage = 25;