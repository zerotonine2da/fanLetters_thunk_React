import React from 'react';
import Tabs from './Tabs';
import styled from 'styled-components';

export default function Header({ activeMember, setActiveMember }) {
    return (
        <Container>
            <Title>NewJeans</Title>
            <Tabs activeMember={activeMember} setActiveMember={setActiveMember}></Tabs>
        </Container>
    );
}

const Container = styled.section`
    width: 100%; /* 전체 채우기 */
    background-color: #8dd2ef;
    height: 300px;
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    align-items: center; /* 가운데 정렬 */
    padding: 24px;
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 700; /* 폰트 두껍게 */
    color: white;

    display: flex;
    flex: 1; /* 세로로 쫙! 늘어나게 설정 */
    align-items: center; /* 세로에서 가운데 위치하도록 설정 */
`;
