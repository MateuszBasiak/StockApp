import React from 'react';
import styled from 'styled-components';

const ErrorWrap = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 30px;
	line-height: 100vh;
`;

const NotFound: React.FC = () => <ErrorWrap>Error 404: Page not found</ErrorWrap>;

export default NotFound;