import Detail from 'pages/Detail';
import Home from 'pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Layout from 'pages/Layout';
export default function Router() {
    const { isLoggin } = useSelector((state) => state.auth);
    console.log('isLoggin', isLoggin);
    return (
        <BrowserRouter>
            <Routes>
                {isLoggin ? (
                    <>
                        <Route element={<Layout />}>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/detail/:id" element={<Detail />}></Route>
                            <Route path="/profile" element={<Profile />}></Route>
                            <Route path="*" element={<Navigate replace to="/" />}></Route>
                        </Route>
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Login />}></Route>
                        <Route path="*" element={<Navigate replace to="/" />}></Route>
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}
