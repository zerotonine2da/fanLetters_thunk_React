import AddForm from 'components/AddForm';
import Header from 'components/Header';
import LetterList from 'components/LetterList';
import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

export default function Home({ letters, setLetters }) {
    const [activeMember, setActiveMember] = useState('민지');

    return (
        <Container>
            <Header />
            <AddForm />
            <LetterList />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /*가로축 정렬*/
`;
