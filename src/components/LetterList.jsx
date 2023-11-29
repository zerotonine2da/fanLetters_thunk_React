import React from 'react';
import LetterCard from './LetterCard';
import styled from 'styled-components';

export default function LetterList({ activeMember, letters }) {
    const filteredLetters = letters.filter((letter) => letter.writedTo === activeMember);

    return (
        <ListWrapper>
            {filteredLetters.length === 0 ? (
                <p>{activeMember}에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되보세요!</p>
            ) : (
                filteredLetters.map((letter) => <LetterCard key={letter.id} letter={letter} />)
            )}
        </ListWrapper>
    );
}

const ListWrapper = styled.ul`
    background-color: #8dd2ef;
    display: flex;
    flex-direction: column; /* 방향 : 세로*/
    gap: 20px;
    width: 500px;
    border-radius: 12px;
    padding: 12px;
    color: white;
`;
