import React from 'react';
import {ICompany, MainColor} from './Primitives';
import styled from 'styled-components';

interface Props{
    allCompanies: Array<ICompany>;
    setCurrCompanies: (x: Array<ICompany>) => void;
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

const StyledForm = styled.form`
    text-align: left;
`;

const StyledCheckBox = styled.input`
    margin-bottom: 7px;
`;

const exchanges = ['NYSE', 'NYSE ARCA', 'NASDAQ', 'NYSE MKT', 'BATS'];

const Navi: React.FC<Props> = ({setCurrCompanies, allCompanies}) => {
    const searchCompanies = () => {
        let res: Array<ICompany> = [];
        let currExchanges: Array<string> = [];
        const searchBar = document.getElementById('searchbar');
        const form = document.getElementById('exchangeForm');
        if(form){
            exchanges.forEach(exchange => {if((form as HTMLFormElement)[exchange].checked) currExchanges.push(exchange);});
        }
        if(searchBar){
            let searchString : string = (searchBar as HTMLInputElement).value.trim().toLowerCase();
            allCompanies.forEach(company => {if(currExchanges.includes(company.exchange) && company.name.toLowerCase().includes(searchString)) res.push(company);});
        }
       setCurrCompanies(res); 
    }
    return (
    <StyledDiv>
        <SubTitle>Search Company By Name</SubTitle>
        <SearchBox id='searchbar'/>
        <SubTitle>Exchanges:</SubTitle>
        <StyledForm id='exchangeForm'>
            {exchanges.map(exchange => <div key={exchange+'div'}><StyledCheckBox key={exchange} type="checkbox" id={exchange} name={exchange} defaultChecked/><label key={exchange+"label"}htmlFor={exchange}>{exchange}</label></div>)}
        </StyledForm>
        <button onClick={() => searchCompanies()}>Search</button>
    </StyledDiv>);
}

export default Navi;