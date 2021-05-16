import React, { useEffect, useState } from 'react';
import {ICompany, MainColor, BackgroundColor} from './Primitives';
import styled from 'styled-components';

interface Props{
    allCompanies: Array<ICompany>;
    setCurrCompanies: (x: Array<ICompany>) => void;
    setPage: (x: number) => void;
}

interface SearchState{
    searchString: string;
    checked: Array<boolean>;
}

const MenuWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 305px;
    padding-left: 20px;
    left: -265px;
    color: ${BackgroundColor};
    position: fixed;
    background: ${MainColor};
    text-align: center;
    transition: left 0.1s 2s;
    box-shadow: 0 0 5px black;

    :hover{
        left: 0px;
        transition: left 0.1s;
    }
`;

const NameWrap = styled.div`
    writing-mode: vertical-rl;
    font-size: 30px;
    font-weight: bold;
    line-height: 60px;
    align-self: stretch;
    box-shadow: -2px 0px 10px 0px black;
`;

const SearchBar = styled.input`
    width: 200px;
    height: 30px;
    font-size: 17px;
    margin-bottom: 15px;
	box-shadow: 0 0 5px 1px black;
`;

const SubTitle = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
`;

const StyledForm = styled.form`
    margin-top: 20px;
    margin-bottom: 20px;
`;

const CheckBoxWrap = styled.div`
    text-align: left;
`;

const StyledCheckBox = styled.input`
    margin-bottom: 7px;
`;

const exchanges = ['NYSE', 'NYSE ARCA', 'NASDAQ', 'NYSE MKT', 'BATS'];

const useDidMount = (): boolean => {
	const [didMount, setDidMount] = useState<boolean>(false);
	useEffect(() => setDidMount(true), []);
	return didMount;
};

const Menu: React.FC<Props> = ({setCurrCompanies, allCompanies, setPage}) => {
	const [searchOptions, setSearchOptions] = useState<SearchState>({
		searchString: '',
		checked: [true, true, true, true, true]
	});
	const didMount = useDidMount();

	useEffect(() => {
		if(didMount){
			const currExchanges: Array<string> = [];
			for(let i = 0; i < exchanges.length; i++){
				searchOptions.checked[i] && currExchanges.push(exchanges[i]);
			}
			setCurrCompanies(allCompanies.filter(company => currExchanges.includes(company.exchange) && company.name.toLowerCase().includes(searchOptions.searchString)));
			setPage(1);
		}
	}, [searchOptions]);

	const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const idx = exchanges.indexOf(event.currentTarget.name);
		const tmp = searchOptions.checked;
		tmp[idx] = event.currentTarget.checked;
		setSearchOptions({
			...searchOptions,
			checked: tmp
		});
	};

	const handleSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchOptions({
			...searchOptions,
			searchString: event.currentTarget.value.toLowerCase().trim()
		});
	};

	return (
		<MenuWrap>
			<StyledForm>
				<SubTitle>Search Company:</SubTitle>
				<SearchBar onChange={handleSearchBarChange} name='searchbar'/>
				<SubTitle>Exchanges:</SubTitle>
				<CheckBoxWrap>
					{exchanges.map(exchange => <div key={exchange + 'div'}><StyledCheckBox type="checkbox" onChange={handleCheckBoxChange} name={exchange} defaultChecked/><label htmlFor={exchange}>{exchange}</label></div>)}
				</CheckBoxWrap>
			</StyledForm>
			<NameWrap>Menu</NameWrap>
		</MenuWrap>);
};

export default Menu;