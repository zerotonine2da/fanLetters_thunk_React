import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import { getFormattedDate } from 'util/data';

export default function LetterCard({ letter }) {
    const naviagte = useNavigate();

    return (
        <LetterWrapper onClick={() => naviagte(`/detail/${letter.id}`)}>
            <UserInfo>
                <Avatar src={letter.avatar} />
                <NickNameAndData>
                    <p>{letter.nickname}</p>
                    <time>{getFormattedDate(letter.createdAt)}</time>
                </NickNameAndData>
            </UserInfo>
            <Content>{letter.content}</Content>
        </LetterWrapper>
    );
}

const LetterWrapper = styled.li`
    background-color: #8dd2ef;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: white;
    padding: 12px;
    border: 1px solid white;
    border-radius: 12px;
    cursor: pointer;
    &:hover {
        transform: scale(1.02);
        transition: all 0.2s; /**0.2초만에 작동 */
    }
`;
const UserInfo = styled.div`
    display: flex;
    gap: 12px;
    align-items: center; /*세로 가운데정렬 */
`;

const NickNameAndData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Content = styled.p`
    background-color: #e09dd3;
    border-radius: 12px;
    padding: 12px;
    margin-left: 60px;
    white-space: nowrap; /*줄바꿈을 담당함: 줄바꿈 안함 */
    overflow: hidden; /* 초과되는 부분을 숨기기*/
    text-overflow: ellipsis; /* (생략부호=ellipsis)초과된 부분...표시 */
`;
