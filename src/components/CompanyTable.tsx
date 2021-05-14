import React from 'react';
import styled from 'styled-components';
import { MainColor, BackgroundColor, ICompany, IPopup, recordsPerPage } from './Primitives';
import CompanyRow from './CompanyRow';

interface Props{
  companies: Array<ICompany>;
  page: number;
  showPopup: (x: IPopup) => void;
}

const StyledTable = styled.table`
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  border-style: hidden;
  overflow: visible;
  td {
    border-top: 1px solid ${MainColor};
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

const CompanyTable: React.FC<Props> = ({ companies, page, showPopup }) => {
	return (<StyledTable>
		<thead>
			<tr>
				<th id="symbol">Company Symbol</th>
				<th id="name">Company Name</th>
				<th id="exchange">Exchange</th>
			</tr>
		</thead>
		<tbody>
			{companies.slice((page - 1) * recordsPerPage,page * recordsPerPage).map(company => <CompanyRow key={company.symbol} showPopup={showPopup} symbol={company.symbol} name={company.name} exchange={company.exchange}/>)}
		</tbody>
	</StyledTable>);
};

export default CompanyTable;