import React from 'react';
import styled from 'styled-components';

export default function Button({ text, onClick = () => {} }) {
    return (
        <BtnWrapper>
            <button onClick={onClick}>{text}</button>
        </BtnWrapper>
    );
}

const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & button {
        background-color: #e09dd3;
        color: white;
        font-size: 16px;
        padding: 6px 12px;
        cursor: pointer;
        border: none;
    }
`;
