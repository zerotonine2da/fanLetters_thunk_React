import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from 'redux/modules/authSlice';

function Layout() {
    const { isLoggin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            <StDiv>
                <Link to="/">
                    <div>Home</div>
                </Link>

                <section>
                    <Link to="/profile">
                        <div>내 프로필</div>
                    </Link>
                    <Link to="/login">
                        <div
                            onClick={() => {
                                dispatch(logout());
                            }}
                        >
                            로그아웃
                        </div>
                    </Link>
                </section>
            </StDiv>
            <Outlet />
        </>
    );
}

const StDiv = styled.div`
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 100%;
    & section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
`;

export default Layout;
