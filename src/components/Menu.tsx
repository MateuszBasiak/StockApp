import React from 'react';
import {ICompany, MainColor} from './Primitives';
import styled from 'styled-components';

interface Props{
    allCompanies: Array<ICompany>;
    setCurrCompanies: (x: Array<ICompany>) => void;
    setPage: (x: number) => void;
};

const MenuWrap = styled.div`
    width: 255px;
    padding: 20px 20px;
    left: -238px;
    color: white;
    position: fixed;
    background: ${MainColor};
    text-align: center;
    transition: left 0.1s 2s;

    :hover{
        left: -5px;
        transition: left 0.1s;
        #name-wrap{
            visibility: hidden;
            height: 0;
            transition: visibility 0s;
        }
    }
`;

const NameWrap = styled.div`
    position: relative;
    float: right;
    width: 20px;
    height: 282px;
    padding-left: 15px;
    writing-mode: vertical-rl;
    font-size: 30px;
    font-weight: bold;
    transition: visibility 0s 2s, height 0s 2s;
`

const SearchBox = styled.input`
    width: 210px;
    height: 25px;
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
    height: 30px;
    margin-top: 10px;
    font-size: 17px;
`;

const exchanges = ['NYSE', 'NYSE ARCA', 'NASDAQ', 'NYSE MKT', 'BATS'];

const Menu: React.FC<Props> = ({setCurrCompanies, allCompanies, setPage}) => {

    const searchCompanies = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let res: Array<ICompany> = [];
        const currExchanges: Array<string> = [];
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
}

export default Menu;