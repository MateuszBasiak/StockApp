import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {IPopup, MainColor, ICompanyGet, IChartData, BackgroundColor} from './Primitives';
import closeButton from '../img/closeButton.png';
import ApiClient from '../apiclient/ApiClient';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip} from 'recharts';
import ReactLoading from 'react-loading';
import InfoBox from './InfoBox';

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
    padding-top: calc(50vh - 300px);
    z-index: 2;
`;

const ContentDiv = styled.div`
	color: ${MainColor};
    box-sizing: border-box;
    width: 1200px;
    height: 600px;
    margin: auto;
    position: sticky;
    background: ${BackgroundColor};
    padding: 20px 20px 50px 20px;
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
    display: flex;
    justify-content: space-between;
`;

const InfoWrap = styled.div`
    width: 550px;
    float: right;
`;

const BoxesWrap = styled.div`
	width: 100%;
	height: 85%;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;	
`;

const ChartWrap = styled.div`
    margin: auto;
    width: 550px;
    float: left;
`;

const LoadingWrap = styled.div`
    position: relative;
    top: 40%;
    width: 100px;
    margin: auto;
`;

const ErrorWrap = styled.div`
	position: relative;
	width: 80%;
	margin: auto;
	height: 530px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30px;
	font-weight: bold;
`;

const InfoPopup: React.FC<Props> = ({symbol, closePopup, name}) => {
	const [company, setCompany] = useState<ICompanyGet>({});
	const [chartData, setData] = useState<Array<IChartData>>([]);
	const [reloadError, setError] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => setError(true), 5000);
		const apiClient = new ApiClient();
		apiClient.getCompanyInfo(symbol)
			.then(response => setCompany(response))
			.catch(e => console.log(e));
		apiClient.getTodaysStocks(symbol, '5min')
			.then(response => setData(response))
			.catch(() => setError(true));
		return () => clearInterval(interval);
	}, [symbol]);

	const keys: Array<keyof ICompanyGet> = ['Exchange', 'Currency', 'Country', 'PERatio', 'PEGRatio', '52WeekHigh', '52WeekLow', 'EPS', 'Beta', 'SharesShort', 'ShortRatio', 'PayoutRatio', 'ForwardPE', 'TrailingPE', 'BookValue'];

	return (
		<BackgroundDiv>
			<ContentDiv>
				{reloadError ? <ErrorWrap>Error Occured: Please reload the popup</ErrorWrap> :
					<>
						<StyledImg src={closeButton} onClick={() => closePopup({visible: false, symbol: '', name: ''})}/>
						{chartData.length > 0 && company !== {} ?
							<>
								<Name>{name} ({symbol})</Name>
								<ContentWrap>
									<ChartWrap>
										<SubTitle>Today&apos;s stock price</SubTitle>
										<LineChart width={500} height={400} data={chartData}>
											<Line type="monotone" dataKey="open" stroke={MainColor} dot={false}/>
											<Line type="monotone" dataKey="high" stroke={'green'} dot={false}/>
											<Line type="monotone" dataKey="low" stroke={'red'} dot={false}/>
											<CartesianGrid strokeDasharray="3 3"/>
											<Legend />
											<Tooltip />
											<XAxis dataKey="date" />
											<YAxis tickFormatter={(tick: number) => (Math.round((tick + Number.EPSILON) * 100) / 100).toString()} domain={['dataMin-0.6', 'dataMax+0.6']}/>
										</LineChart>
									</ChartWrap>
									<InfoWrap>
										<SubTitle>Company Info</SubTitle>
										<BoxesWrap>
											{keys.map(key => <InfoBox  key={key} name={key} value={company[key]} />)}
										</BoxesWrap>
									</InfoWrap>
								</ContentWrap>
							</> 
							: 
							<LoadingWrap>
								<ReactLoading height={100} width={100} type={'spin'} color={MainColor}/>
							</LoadingWrap>
						}
					</>}
			</ContentDiv>
		</BackgroundDiv>);
};

export default InfoPopup;