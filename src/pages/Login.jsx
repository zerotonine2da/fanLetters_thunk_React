import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from 'redux/modules/authSlice';
import { Cookies } from 'react-cookie';
import authAPI from 'api/auth.api';

function Login() {
    const [isMember, setIsMember] = useState(true);
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const cookies = new Cookies();

    const dispatch = useDispatch();

    //회원가입 : post
    const onNewUserHandler = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_AUTH_SERVER_URL}/register`, {
                id: userid,
                password,
                nickname,
            });

            setIsMember(true);
        } catch (error) {
            console.log(error);
        }
    };

    //로그인
    const onLoginHandler = async () => {
        try {
            const response = await authAPI.post(`/login`, {
                id: userid,
                password,
            });

            // 로그인 성공시, accessToken을 localStorage에 저장
            const { accessToken, userId, avatar, nickname } = response.data;

            setUserid('');
            setPassword('');
            dispatch(login({ accessToken, userId, avatar, nickname }));
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
        }
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
                        value={userid}
                        onChange={(e) => setUserid(e.target.value)}
                    ></input>
                    <input
                        type="current-password"
                        minLength={4}
                        maxLength={15}
                        placeholder="비밀번호(4~15글자)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            <LoginBtn type="submit" disabled={userid !== '' && password !== '' ? false : true}>
                                로그인
                            </LoginBtn>
                        ) : (
                            <LoginBtn
                                type="submit"
                                disabled={userid !== '' && password !== '' && nickname !== '' ? false : true}
                            >
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
