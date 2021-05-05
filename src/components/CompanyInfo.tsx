import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {IPopup, MainColor, ICompanyGet, IChartData} from './Primitives';
import closeButton from '../img/closeButton.png';
import ApiClient from '../apiclient/ApiClient';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend} from 'recharts';
import ReactLoading from 'react-loading';

interface Props{
    symbol: string;
    closePopup: (x: IPopup) => void;
    name: string;
}

const BackgroundDiv = styled.span`
    width: 100%;
    height: 100vh;
    position: fixed;
    background: rgb(0,0,0,0.5);
    padding-top: 10%;
    z-index: 2;
`;

const ContentDiv = styled.div`
    box-sizing: border-box;
    width: 1200px;
    height: 600px;
    margin: auto;
    position: sticky;
    background: white;
    opacity: 1;
    padding: 20px;
`;

const StyledImg = styled.img`
    position: relative;
    float: right;
    width: 20px;
    color: ${MainColor};
    cursor: pointer;
`;

const Name = styled.div`
    font-size: 35px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 50px;
`;

const SubTitle = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 25px;
`;

const ContentWrap = styled.div`
    padding: 0 30px;
`;

const InfoWrap = styled.div`
    width: 550px;
    float: right;
    display: inline;
`;

const ChartWrap = styled.div`
    margin: auto;
    width: 550px;
    float: left;
`;

const InfoRow = styled.td`
    padding-right: 60px;
`;

const LoadingWrap = styled.div`
    position: relative;
    top: 40%;
    width: 100px;
    margin: auto;
`

const decodeTimeSeries = (response: any) : Array<IChartData> => {
    const res: Array<IChartData> = [];
    const header = "Time Series (5min)";
    if(!response[header]) return res;
    Object.keys(response[header]).slice(0, 50).forEach((date: string) => {
        res.push({
            date: date.split(' ')[1],
            open: response[header][date]["1. open"],
            high: response[header][date]["2. high"],
            low: response[header][date]["3. low"],
        })
    });
    return res.reverse();
}

const findMaxDiff = (arr: Array<IChartData>): Array<number> => {
    let max = 0;
    let min = Infinity;
    arr.forEach(object => {
        max = Math.max(object.high, object.open, max);
        min = Math.min(object.open, object.low, min);
    })
    return [max, min];
}

const CompanyInfo: React.FC<Props> = ({symbol, closePopup, name}) => {
    const [company, setCompany] = useState<ICompanyGet>({});
    const [chartData, setData] = useState<Array<IChartData>>([]);
    const [difference, setDiff] = useState<Array<number>>([]);

    useEffect(() => {
        let apiClient = new ApiClient();
        apiClient.getCompanyInfo(symbol)
        .then(response => response.json())
        .then(response => setCompany(response))
        .catch(e => console.log(e));
    }, [symbol])

    useEffect(() => {
        let apiClient = new ApiClient();
        apiClient.getTodaysStocks(symbol, "5min")
        .then(response => response.json())
        .then(response => decodeTimeSeries(response))
        .then(response => {setDiff(findMaxDiff(response)); return response;})
        .then(response => setData(response))
        .catch(e => console.log(e))
    }, [symbol])

    const keys: Array<keyof ICompanyGet> = ["Symbol", "Exchange", "Currency", "Country", "Sector", "Industry", "Address", "52WeekHigh", "52WeekLow", "50DayMovingAverage"];

    return (
        <BackgroundDiv>
            <ContentDiv>
                <StyledImg src={closeButton} onClick={() => closePopup({visible: false, symbol: "", name: ""})}/>
                {chartData.length > 0 ?
                    <>
                        <Name>{name}</Name>
                        <ContentWrap>
                            <ChartWrap>
                                <SubTitle>Today's stock price</SubTitle>
                                <LineChart width={500} height={400} data={chartData}>
                                    <Line type="monotone" dataKey="open" stroke={MainColor} dot={false}/>
                                    <Line type="monotone" dataKey="high" stroke={"green"} dot={false}/>
                                    <Line type="monotone" dataKey="low" stroke={"red"} dot={false}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Legend />
                                    <XAxis dataKey="date" />
                                    <YAxis domain={difference}/>
                                </LineChart>
                            </ChartWrap>
                            <InfoWrap>
                                <SubTitle>Company Info</SubTitle>
                                <table>
                                    <tbody>
                                        {keys.map(key => <tr key={key}><InfoRow>{key}:</InfoRow><td>{company[key]}</td></tr>)}
                                    </tbody>
                                </table>
                            </InfoWrap>
                        </ContentWrap>
                    </> 
                    : 
                    <LoadingWrap>
                        <ReactLoading height={100} width={100} type={"spin"} color={"black"}/>
                    </LoadingWrap>
                }
            </ContentDiv>
        </BackgroundDiv>);
}

export default CompanyInfo;