import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { setMember } from 'redux/modules/member';
export default function Tabs() {
    const activeMember = useSelector((state) => state.member);
    const dispatch = useDispatch();

    const onActiveMember = (event) => {
        if (event.target === event.currentTarget) {
            // 멤버 버튼 이외의 부분을 클릭시 종료
            return;
        }
        dispatch(setMember(event.target.textContent));
    };

    return (
        <TabWrapper onClick={onActiveMember}>
            <Tab $activeMember={activeMember}>민지</Tab>
            <Tab $activeMember={activeMember}>하니</Tab>
            <Tab $activeMember={activeMember}>다니엘</Tab>
            <Tab $activeMember={activeMember}>해린</Tab>
            <Tab $activeMember={activeMember}>혜인</Tab>
        </TabWrapper>
    );
}

const TabWrapper = styled.ul`
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 12px;
    gap: 12px; /*멤버들 사이에 간격주기*/
    border-radius: 12px;
`;

const Tab = styled.li`
    ${(props) => {
        if (props.$activeMember === props.children) {
            return css`
                background-color: #e09dd3;
                color: white;
            `;
        }
        return css`
            background-color: #8dd2ef;
            color: white;
        `;
    }}

    font-size: 20px;
    width: 80px; /*멤버들 이름 길이 설정*/
    text-align: center; /*글자 가운데 정렬*/
    padding: 12px 6px; /*위아래 12px 좌우6px*/
    border-radius: 12px;
    cursor: pointer; /*마우스 hover시 손가락모양*/
`;
