import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/modules/authSlice';

function Login() {
    const [isMember, setIsMember] = useState(true);
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [nickname, setNickname] = useState('');

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState({
        id: '',
        pw: '',
        nickname: '',
    });

    //회원가입 : post
    //newUSEr
    const onNewUserHandler = async () => {
        setInputValue({ id, pw, nickname });
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/join`, inputValue);
        setIsMember(true);
    };

    const onLoginHandler = () => {
        dispatch(login());
    };

    return (
        <BackGround>
            <>
                <StForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        isMember ? onLoginHandler() : onNewUserHandler();
                    }}
                >
                    <h2>{isMember ? '로그인' : '회원가입'}</h2>
                    <input
                        minLength={4}
                        maxLength={10}
                        placeholder="아이디(4~10글자)"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    ></input>
                    <input
                        type="current-password"
                        minLength={4}
                        maxLength={15}
                        placeholder="비밀번호(4~15글자)"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                    ></input>
                    {isMember ? (
                        ''
                    ) : (
                        <input
                            minLength={1}
                            maxLength={10}
                            placeholder="닉네임(1~10글자)"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        ></input>
                    )}
                    <div>
                        {isMember ? (
                            <LoginBtn disabled={id !== '' && pw !== '' ? false : true}>로그인</LoginBtn>
                        ) : (
                            <LoginBtn disabled={id !== '' && pw !== '' && nickname !== '' ? false : true}>
                                회원가입
                            </LoginBtn>
                        )}
                    </div>

                    <SpanDiv>
                        <span
                            onClick={(e) => {
                                if (isMember) {
                                    setIsMember(false);
                                } else {
                                    setIsMember(true);
                                }
                            }}
                        >
                            {isMember ? '회원가입' : '로그인'}
                        </span>
                    </SpanDiv>
                </StForm>
            </>
        </BackGround>
    );
}

export default Login;

const StForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;

    margin: auto;
    width: 500px;
    height: 400px;
    border: 1px solid black;
    background-color: white;
    border-radius: 12px;
    border: none;
    padding: 20px;
    gap: 20px;

    & h2 {
        font-size: 30px;
        font-weight: 700;
        padding-bottom: 10px;
    }

    & input {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid gray;
        padding: 10px 0px;
    }
`;

const SpanDiv = styled.div`
    text-align: center;
    & span {
        cursor: pointer;
        margin: 0px;
        color: gray;
    }
    & :hover {
        color: black;
    }
`;

const BackGround = styled.div`
    background-color: lightgray;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginBtn = styled.button`
    cursor: pointer;
    height: 50px;
    width: 100%;
    font-size: 20px;
    background-color: ${(props) => (props.disabled ? 'lightgray' : '#8dd2ef')};
    border: none;
`;
