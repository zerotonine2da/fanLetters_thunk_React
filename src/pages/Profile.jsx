import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeNickName, changeProfileImg } from 'redux/modules/authSlice';
import personImg from '../shared/person.png';
import { __editLetters, __editNickName } from 'redux/modules/letters';
function Profile() {
    const avatar = localStorage.getItem('avatar');
    const nickname = localStorage.getItem('nickname');
    const userid = localStorage.getItem('userId');

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [changeNickname, setChangeNickName] = useState('');

    const [uploadFile, setUploadFile] = useState(null);

    const changeProfile = () => {
        setIsEdit(true);
        // dispatch(changeNickName(changeNickname));
    };

    const cancelChange = () => {
        setIsEdit(false);
    };

    const changeDone = () => {
        dispatch(changeNickName(changeNickname));
        dispatch(changeProfileImg(uploadFile));
        dispatch(__editNickName(changeNickname));
        setIsEdit(false);
    };

    const changeImage = (event) => {
        setIsEdit(true);
        //input태그에서 선택한 파일 = event.target.files 배열에 담겨있고 첫번째 파일 저장
        const file = event.target.files[0];
        //URL 메소드 사용해서 URL 생성
        //<img>태그에서 이미지 표시 가능
        const imageUrl = URL.createObjectURL(file);

        setUploadFile(imageUrl);
    };

    return (
        <>
            <StDiv>
                <h1>프로필 관리</h1>
                <label>
                    {uploadFile ? (
                        <ProfileImg src={uploadFile} alt="프로필 없음" />
                    ) : (
                        <ProfileImg src={personImg} alt="프로필사진" />
                    )}

                    <input onChange={changeImage} type="file"></input>
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
                        <p>{userid}</p>
                        <BtnWrapper>
                            <button onClick={cancelChange}> 취소 </button>
                            <button onClick={changeDone}> 수정완료 </button>
                        </BtnWrapper>
                    </>
                ) : (
                    <>
                        <h2>{nickname}</h2>
                        <p>{userid}</p>
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

    & input[type='file'] {
        display: none;
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

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid black;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`;

export default Profile;
