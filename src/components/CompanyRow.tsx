import React from 'react';
import {IPopup} from './Primitives';

interface Props{
    symbol: string;
    name: string;
    exchange: string;
    showPopup: (x: IPopup) => void;
}

const CompanyRow: React.FC<Props> = ({symbol, name, exchange, showPopup}) => {

	return (
		<tr onClick={() => showPopup({visible: true, symbol, name})}>
			<td>{symbol}</td>
			<td>{name}</td>
			<td>{exchange}</td>
		</tr>);
};

export default CompanyRow;