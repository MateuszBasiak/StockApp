import React from 'react';
import styled from 'styled-components';
import { MainColor, SecondaryColor, BackgroundColor, recordsPerPage } from './Primitives';

interface Props{
    changePage: (x: number) => void;
    companiesLength: number;
    page: number;
}

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


const PageButtons: React.FC<Props> = ({ changePage, companiesLength, page }) => {
	const size = Math.ceil((companiesLength) / recordsPerPage);
	const buttons = [];

	if(page > 6) buttons.push(<PageBlock key={-7} onClick={() => changePage(1)}>{'<<'}</PageBlock>);
	if(page > 1) buttons.push(<PageBlock key={-6} onClick={() => changePage(page - 1)}>{'<'}</PageBlock>);
	for(let i = -5; i <= 5; i++){
		if(i === 0){
			buttons.push(<PageBlock key={i} id="current-page" onClick={() => changePage(page + i)}>{page + i}</PageBlock>);
		}
		else if(page + i >= 1 && page + i < size) buttons.push(<PageBlock key={i} onClick={() => changePage(page + i)}>{page + i}</PageBlock>);
	}
	if(page + 1 < size) buttons.push(<PageBlock key={6} onClick={() => changePage(page + 1)}>{'>'}</PageBlock>);
	if(page + 6 < size) buttons.push(<PageBlock key={7} onClick={() => changePage(size)}>{'>>'}</PageBlock>);
    
	return (
		<PageWrap>
			{buttons}
		</PageWrap>
	);
};

export default PageButtons;