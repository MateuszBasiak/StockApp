import React from 'react';
import {ICompany, MainColor, BackgroundColor} from './Primitives';
import styled from 'styled-components';

interface Props{
    allCompanies: Array<ICompany>;
    setCurrCompanies: (x: Array<ICompany>) => void;
    setPage: (x: number) => void;
}

const MenuWrap = styled.div`
    width: 255px;
    padding: 20px 20px;
    left: -238px;
    color: ${BackgroundColor};
    position: fixed;
    background: ${MainColor};
    text-align: center;
    transition: left 0.1s 2s;
    box-shadow: 0 0 5px black;

    :hover{
        left: -5px;
        transition: left 0.1s;
        #name-wrap{
            opacity: 0;
            height: 0;
            transition: opacity 0.1s;
        }
    }
`;

const NameWrap = styled.div`
    position: relative;
    float: right;
    width: 20px;
    height: 282px;
    padding-left: 15px;
    opacity: 1;
    writing-mode: vertical-rl;
    font-size: 30px;
    font-weight: bold;
    transition: height 0s 2s, opacity 1s 2.2s;
`;

const SearchBox = styled.input`
    width: 210px;
    height: 30px;
    font-size: 17px;
    border-radius: 5px;
    margin-bottom: 15px;
`;

const SubTitle = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
`;

const CheckBoxWrap = styled.div`
    text-align: left;
`;

const StyledCheckBox = styled.input`
    margin-bottom: 7px;
`;

const StyledButton = styled.button`
    width: 210px;
    height: 35px;
    margin-top: 10px;
    font-size: 17px;
`;

const exchanges = ['NYSE', 'NYSE ARCA', 'NASDAQ', 'NYSE MKT', 'BATS'];

const Menu: React.FC<Props> = ({setCurrCompanies, allCompanies, setPage}) => {

	const searchCompanies = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let res: Array<ICompany> = [];
		const currExchanges: Array<string> = [];
		const searchString = (event.currentTarget[0] as HTMLInputElement).value.toLowerCase().trim();
		for(let i = 1; i<exchanges.length+1; i++){
			if((event.currentTarget[i] as HTMLInputElement).checked) 
				currExchanges.push((event.currentTarget[i] as HTMLInputElement).name);
		}
		res = allCompanies.filter(company => currExchanges.includes(company.exchange) && company.name.toLowerCase().includes(searchString));
		setCurrCompanies(res);
		setPage(1); 
	};



	return (
		<MenuWrap>
			<NameWrap id='name-wrap'>Menu</NameWrap>
			<form onSubmit={searchCompanies}>
				<SubTitle>Search Company:</SubTitle>
				<SearchBox name='searchbar'/>
				<SubTitle>Exchanges:</SubTitle>
				<CheckBoxWrap>
					{exchanges.map(exchange => <div key={exchange+'div'}><StyledCheckBox type="checkbox" name={exchange} defaultChecked/><label htmlFor={exchange}>{exchange}</label></div>)}
				</CheckBoxWrap>
				<StyledButton type='submit'>Search</StyledButton>
			</form>
		</MenuWrap>);
};

export default Menu;