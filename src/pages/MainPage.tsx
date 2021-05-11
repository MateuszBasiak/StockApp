import React, {useEffect, useState} from 'react';
import CompanyBlock from '../components/CompanyBlock';
import styled from 'styled-components';
import ApiClient from '../apiclient/ApiClient';
import {BackgroundColor, ICompany, IPopup, MainColor, SecondaryColor} from '../components/Primitives';
import CompanyInfo from '../components/CompanyInfo';
import Menu from '../components/Menu';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

const MainDiv = styled.div`
  box-sizing: border-box;
  padding: 100px 0;
`;

const Title = styled.div`
  color: ${MainColor};
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 100px;
`;

const StockTable = styled.table`
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  border-style: hidden;
  overflow: visible;
  td {
    border-top: 1px solid black;
    padding: 15px 20px;
    text-align: center;
    cursor: pointer;
  }
  tr{
    margin-bottom: 20px;
  }
  tbody tr:hover{
    background: ${MainColor};
    color: ${BackgroundColor};
	box-shadow: 0 0 5px black;
  }
  th{
    color: ${BackgroundColor};
    background: ${MainColor};
    padding: 20px 20px;
  }
  thead{
	box-shadow: 0 0 5px black;
  }

  #symbol, #exchange{
    width: 225px;
  }
`;

const ContentWrap = styled.div`
  width: 1145px;
  margin: auto;
`;

const PageWrap = styled.div`
  margin: 5px 0px;

  #current-page{
    background: ${MainColor};
    color: ${BackgroundColor};
  }
`;

const PageBlock = styled.div`
  font-size: 12px;
  padding: 3px 5px; 
  margin-right: 3px;
  background: ${SecondaryColor};
  display: inline-block;
  text-align: center;
  cursor: pointer;
  :hover{
    background: ${MainColor};
    color: ${BackgroundColor};
  }
`;

const LoadingWrap = styled.div`
    position: relative;
    top: 60%;
    width: 100px;
    margin: auto;
`;

const ErrorWrap = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 30px;
`;

const decodeString = (string: string) => {
	const lines = string.split('\n');
	const res: Array<ICompany> = [];
	lines.slice(1).forEach(line => {
		const tmp = line.split(',');
		if(tmp.length > 2 && tmp[1].length > 0){
			res.push({
				symbol: tmp[0],
				name: tmp[1],
				exchange: tmp[2],
				...tmp
			});
		}
    
	});
	return res;
};

const MainPage: React.FC = () => {
	const { id }: {id: string} = useParams();
	const history = useHistory();
	const [allCompanies, setCompanies] = useState<Array<ICompany>>([]);
	const [currCompanies, setCurrCompanies] = useState<Array<ICompany>>([]);
	const [page, setPage] = useState<number>(id !== undefined ? Number.parseInt(id) : 1);
	const [popup, setPopupVisibility] = useState<IPopup>({
		visible: false,
		symbol: '',
		name: '',
	});

	const changePage = (page: number) => {
		history.push('/page/' + page);
		setPage(page);
	};

	const validatePageNumber = (): boolean => currCompanies.length === 0 || (page > 0 && page <= Math.ceil(currCompanies.length / recordsPerPage));

	useEffect(() => {
		const apiClient = new ApiClient();
		apiClient.getListedCompanies()
			.then(response => response.text())
			.then(response => decodeString(response))
			.then(response => {setCompanies(response); setCurrCompanies(response);})
			.catch(e => console.log(e));
	}, []);

	useEffect(() => {
		const pages = history.location.pathname.split('/');
		setPage(Number.parseInt(pages[pages.length-1]));
	},[history.location]);

	const recordsPerPage = 25;
	let counter = 0;

	const generatePages = () => {
		const size = Math.ceil((currCompanies.length) / recordsPerPage);
		const res = [];
		if(page > 6) res.push(<PageBlock key={counter++} onClick={() => changePage(1)}>{'<<'}</PageBlock>);
		if(page > 1) res.push(<PageBlock key={counter++} onClick={() => changePage(page -1)}>{'<'}</PageBlock>);
		for(let i = -5; i <= 5; i++){
			if(i === 0){
				res.push(<PageBlock key={counter++} id="current-page" onClick={() => changePage(page + i)}>{page + i}</PageBlock>);
			}
			else if(page + i >= 1 && page + i < size) res.push(<PageBlock key={counter++} onClick={() => changePage(page + i)}>{page + i}</PageBlock>);
		}
		if(page + 1 < size) res.push(<PageBlock key={counter++} onClick={() => changePage(page + 1)}>{'>'}</PageBlock>);
		if(page + 6 < size) res.push(<PageBlock key={counter++} onClick={() => changePage(size)}>{'>>'}</PageBlock>);
		return res;
	};

	return (
		<>
			{popup.visible ? <CompanyInfo closePopup={setPopupVisibility} name={popup.name} symbol={popup.symbol}/> : null}
      
			<MainDiv>
				<Title>Stock Platform</Title>
				<Menu setPage={changePage} allCompanies={allCompanies} setCurrCompanies={setCurrCompanies}/>
				{validatePageNumber() ? 
					allCompanies.length > 0 ? 
						<ContentWrap>
							<PageWrap>
								{generatePages()}
							</PageWrap>
							<StockTable>
								<thead>
									<tr>
										<th id="symbol">Company Symbol</th>
										<th id="name">Company Name</th>
										<th id="exchange">Exchange</th>
									</tr>
								</thead>
								<tbody>
									{currCompanies.slice((page - 1) * recordsPerPage,page * recordsPerPage).map(company => <CompanyBlock key={counter++} showPopup={setPopupVisibility} symbol={company.symbol} name={company.name} exchange={company.exchange}/>)}
								</tbody>
							</StockTable>
							<PageWrap>
								{generatePages()}
							</PageWrap>
						</ContentWrap>
						:
						<LoadingWrap>
							<ReactLoading height={100} width={100} type={'spin'} color={MainColor}/>
						</LoadingWrap>            
					: <ErrorWrap>Error 404: Page not found</ErrorWrap>}
			</MainDiv>
		</>
	);
};

export default MainPage;
