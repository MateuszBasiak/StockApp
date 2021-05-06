import React from 'react';
import {ICompany, MainColor} from './Primitives';
import styled from 'styled-components';

interface Props{
    allCompanies: Array<ICompany>;
    setCurrCompanies: (x: Array<ICompany>) => void;
    setPage: (x: number) => void;
};

const StyledDiv = styled.div`
    box-sizing: border-box;
    width: 250px;
    padding: 20px 10px;
    left: 0%;
    color: white;
    position: absolute;
    background: ${MainColor};
    text-align: center;
    align-items: center;
`;
const SearchBox = styled.input`
    width: 210px;
    height: 25px;
    font-size: 15px;
    border-radius: 5px;
    margin-bottom: 25px;
`;

const SubTitle = styled.div`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
`;

const CheckBoxWwrap = styled.div`
    text-align: left;
`;

const StyledCheckBox = styled.input`
    margin-bottom: 7px;
`;

const exchanges = ['NYSE', 'NYSE ARCA', 'NASDAQ', 'NYSE MKT', 'BATS'];

const Menu: React.FC<Props> = ({setCurrCompanies, allCompanies, setPage}) => {

    const searchCompanies = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let res: Array<ICompany> = [];
        let currExchanges: Array<string> = [];
        let searchString = (event.currentTarget[0] as HTMLInputElement).value.toLowerCase().trim();
        for(let i = 1; i<exchanges.length+1; i++){
            if((event.currentTarget[i] as HTMLInputElement).checked) 
                currExchanges.push((event.currentTarget[i] as HTMLInputElement).name);
        }
        res = allCompanies.filter(company => currExchanges.includes(company.exchange) && company.name.toLowerCase().includes(searchString));
       setCurrCompanies(res);
       setPage(1); 
    }

    return (
    <StyledDiv>
        <form onSubmit={searchCompanies}>
            <SubTitle>Search Company By Name</SubTitle>
            <SearchBox id='searchbar' name='searchbar'/>
            <SubTitle>Exchanges:</SubTitle>
            <CheckBoxWwrap>
                {exchanges.map(exchange => <div key={exchange+'div'}><StyledCheckBox key={exchange} type="checkbox" id={exchange} name={exchange} defaultChecked/><label key={exchange+"label"}htmlFor={exchange}>{exchange}</label></div>)}
            </CheckBoxWwrap>
            <button type='submit'>Search</button>
        </form>
    </StyledDiv>);
}

export default Menu;