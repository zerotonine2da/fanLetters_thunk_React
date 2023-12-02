import Avatar from 'components/common/Avatar';
import Button from 'components/common/Button';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getFormattedDate } from 'util/data';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __editLetters, deleteLetter } from 'redux/modules/letters';

export default function Detail() {
    const dispatch = useDispatch();
    const letters = useSelector((state) => state.letters.letters);

    const { id } = useParams();
    const navigate = useNavigate();

    // console.log('Detail letters', letters);
    // console.log('Detail id', id);

    //구조분해할당으로 가져옴
    const { avatar, nickname, createdAt, writedTo, content } = letters.find((letter) => letter.id === id);
    // console.log(avatar, nickname, createdAt, writedTo, content);

    const [isEditing, setIsEditing] = useState(false);
    const [editingText, setEditingText] = useState('');

    const onDeleteBtn = () => {
        const answer = window.confirm('정말로 삭제하시겠습니까');
        if (!answer) return;
        dispatch(deleteLetter(id));
        //const newLetters = letters.filter((letter) => letter.id !== id);
        navigate('/');
    };

    const onEditDone = () => {
        if (!editingText) return alert('수정사항이 없습니다.');

        dispatch(__editLetters({ id, editingText }));
        setIsEditing(false);
        setEditingText('');
    };

    return (
        <Container>
            <Link to="/">
                <HomeBtn>
                    <Button text="홈으로" />
                </HomeBtn>
            </Link>
            <DetailWrapper>
                <UserInfo>
                    <AvatarAndNickName>
                        <Avatar src={avatar} size="large" />
                        <NickName>{nickname}</NickName>
                    </AvatarAndNickName>
                    <time>{getFormattedDate(createdAt)}</time>
                </UserInfo>

                <ToMember>To: {writedTo}</ToMember>

                {isEditing ? (
                    <>
                        <TextArea autoFocus defaultValue={content} onChange={(e) => setEditingText(e.target.value)} />
                        <BtnWrapper>
                            <Button
                                text="취소"
                                onClick={() => {
                                    setIsEditing(false);
                                }}
                            />
                            <Button text="수정완료" onClick={onEditDone} />
                        </BtnWrapper>
                    </>
                ) : (
                    <>
                        <Content>{content}</Content>
                        <BtnWrapper>
                            <Button
                                text="수정"
                                onClick={() => {
                                    setIsEditing(true);
                                }}
                            />
                            <Button text="삭제" onClick={onDeleteBtn} />
                        </BtnWrapper>
                    </>
                )}
            </DetailWrapper>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const HomeBtn = styled.div`
    position: absolute; /**기준점은  Container */
    top: 20px;
    left: 20px;
`;
const DetailWrapper = styled.section`
    background-color: #8dd2ef;
    color: white;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 700px;
    min-height: 400px;
`;

const UserInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AvatarAndNickName = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const NickName = styled.span`
    font-size: 32px;
`;

const ToMember = styled.span`
    font-size: 24px;
`;

const Content = styled.p`
    font-size: 24px;
    line-height: 30px;
    padding: 12px;
    background-color: #e09dd3;
    border-radius: 12px;
    height: 200px;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

const TextArea = styled.textarea`
    font-size: 24px;
    line-height: 30px;
    padding: 12px;
    background-color: #e09dd3;
    border-radius: 12px;
    height: 200px;
    resize: none;
    color: white;
`;
