import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ApiClient from '../apiclient/ApiClient';
import { ICompany, IPopup, MainColor, recordsPerPage } from '../components/Primitives';
import InfoPopup from '../components/InfoPopup';
import Menu from '../components/Menu';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import NotFound from './NotFound';
import CompanyTable from '../components/CompanyTable';
import PageButtons from '../components/PageButtons';

const MainDiv = styled.div`
  box-sizing: border-box;
  padding: 50px 0 100px 0;
`;

const Title = styled.div`
  color: ${MainColor};
  width: 1145px;
  height: 200px;
  line-height: 200px;
  margin: auto;
  border: 5px solid black;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const ContentWrap = styled.div`
  width: 1145px;
  margin: auto;
`;

const LoadingWrap = styled.div`
    position: relative;
    top: 60%;
    width: 100px;
    margin: auto;
`;

const MainPage: React.FC = () => {
	const { id }: {id: string} = useParams();
	const history = useHistory();
	const [allCompanies, setCompanies] = useState<Array<ICompany>>([]);
	const [currCompanies, setCurrCompanies] = useState<Array<ICompany>>([]);
	const [page, setPage] = useState<number>(id !== undefined ? parseInt(id) : 1);
	const [popup, setPopupVisibility] = useState<IPopup>({
		visible: false,
		symbol: '',
		name: '',
	});

	const changePage = (page: number) => {
		history.push('/page/' + page);
		setPage(page);
	};

	const validatePageNumber = (): boolean => !isNaN(parseInt(id)) && (currCompanies.length === 0 || (page > 0 && page <= Math.ceil(currCompanies.length / recordsPerPage)));

	useEffect(() => {
		const apiClient = new ApiClient();
		apiClient.getListedCompanies()
			.then(response => {setCompanies(response); setCurrCompanies(response);})
			.catch(e => console.log(e));
	}, []);

	useEffect(() => {
		const pages = history.location.pathname.split('/');
		setPage(Number.parseInt(pages[pages.length-1]));
	}, [history.location]);
	
	return (
		<>
			{popup.visible && <InfoPopup closePopup={setPopupVisibility} name={popup.name} symbol={popup.symbol}/>}
			{validatePageNumber() ?
				<MainDiv>
					<Title>Stock Platform</Title>
					<Menu setPage={changePage} allCompanies={allCompanies} setCurrCompanies={setCurrCompanies}/>
					{allCompanies.length > 0 ? 
						<ContentWrap>
							<PageButtons page={page} changePage={changePage} companiesLength={currCompanies.length} />
							<CompanyTable companies={currCompanies} page={page} showPopup={setPopupVisibility} />
							<PageButtons page={page} changePage={changePage} companiesLength={currCompanies.length} />
						</ContentWrap>
						:
						<LoadingWrap>
							<ReactLoading height={100} width={100} type={'spin'} color={MainColor}/>
						</LoadingWrap>}            
				</MainDiv>
				: <NotFound />}
		</>
	);
};

export default MainPage;
