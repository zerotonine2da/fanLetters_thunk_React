import Detail from 'pages/Detail';
import Home from 'pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import { useSelector } from 'react-redux';

export default function Router() {
    const { isLoggin } = useSelector((state) => state.auth);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/detail/:id" element={<Detail />}></Route>
                <Route path="/login" element={isLoggin ? <Navigate replace to="/" /> : <Login />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="*" element={<Navigate replace to="/" />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
