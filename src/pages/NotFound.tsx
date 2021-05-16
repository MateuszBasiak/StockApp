import React from 'react';
import styled from 'styled-components';
import { MainColor } from '../components/Primitives';

const ErrorWrap = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 30px;
	line-height: 100vh;
    color: ${MainColor};
`;

const NotFound: React.FC = () => <ErrorWrap>Error 404: Page not found</ErrorWrap>;

export default NotFound;