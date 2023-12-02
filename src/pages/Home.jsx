import AddForm from 'components/AddForm';
import Header from 'components/Header';
import LetterList from 'components/LetterList';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { __getLetters } from 'redux/modules/letters';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getLetters());
    }, [dispatch]);

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
