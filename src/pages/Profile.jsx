import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeNickName } from 'redux/modules/authSlice';
function Profile() {
    //const accessToken = localStorage.getItem('accessToken');
    const avatar = localStorage.getItem('avatar');
    const nickname = localStorage.getItem('nickname');
    const userId = localStorage.getItem('userId');

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    console.log('isEdit', isEdit);

    const [changeNickname, setChangeNickName] = useState('');
    const changeProfile = () => {
        setIsEdit(true);
        dispatch(changeNickName(changeNickname));
    };

    const cancelChange = () => {
        setIsEdit(false);
    };

    const changeDone = () => {
        setIsEdit(false);
        dispatch(changeNickName(changeNickname));
    };

    const previewImage = () => {
        //여기서 이미지..
    };

    return (
        <>
            <StDiv>
                <h1>프로필 관리</h1>
                <label>
                    <figure>{avatar}</figure>
                    <input onChange={previewImage} type="file" accept="image/*"></input>
                </label>
                {isEdit ? (
                    <>
                        <input
                            placeholder="최대 10글자까지 가능"
                            maxLength={10}
                            value={changeNickname}
                            onChange={(event) => {
                                setChangeNickName(event.target.value);
                            }}
                        ></input>
                        <p>{userId}</p>
                        <BtnWrapper>
                            <button onClick={cancelChange}> 취소 </button>
                            <button onClick={changeDone}> 수정완료 </button>
                        </BtnWrapper>
                    </>
                ) : (
                    <>
                        <h2>{nickname}</h2>
                        <p>{userId}</p>
                        <button onClick={changeProfile}> 수정하기 </button>
                    </>
                )}
            </StDiv>
        </>
    );
}

const StDiv = styled.div`
    margin: auto;
    width: 500px;
    height: 400px;
    border: 1px solid black;
    background-color: lightgray;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 20px;
    margin-top: 20%;
    gap: 20px;

    & h1 {
        font-size: 25px;
        font-weight: 900;
    }

    & h2 {
        font-size: 20px;
        font-weight: 900;
    }

    & p {
        font-size: 20px;
    }

    & figure {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid black;
    }

    & button {
        background-color: #8dd2ef;
        border: none;
        height: 50px;
        color: white;
        font-weight: 600;
        border-radius: 12px;
    }
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

export default Profile;
