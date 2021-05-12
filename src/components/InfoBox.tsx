import React from 'react';
import {SecondaryColor} from './Primitives';
import styled from 'styled-components';

interface Props{
    name: string;
    value?: string | number;
}

const GreyBox = styled.div`
    width: 150px;
    height: 50px;
    background: ${SecondaryColor};
    box-shadow: 0 0 5px grey;
    display: flex;
    flex-direction: column;
    justify-content: center; 
`;

const TitleDiv = styled.div`
    margin: auto;
    font-weight: bold;
    text-align: center;
`;

const ValueDiv = styled.div`
    margin: auto;
    text-align: center;
`;

const InfoBox: React.FC<Props> = ({name, value}) => {
	return (
		<GreyBox>
			<TitleDiv>{name}</TitleDiv>
			<ValueDiv>{value}</ValueDiv>
		</GreyBox>);
};

export default InfoBox;
