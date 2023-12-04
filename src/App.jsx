import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from 'redux/modules/authSlice';
import { __getLetters } from 'redux/modules/letters';
const { default: Router } = require('shared/Router');

function App() {
    const dispatch = useDispatch();
    const HasAccessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (HasAccessToken) {
            const accessToken = localStorage.getItem('accessToken');
            const avatar = localStorage.getItem('avatar');
            const nickname = localStorage.getItem('nickname');
            const userId = localStorage.getItem('userId');

            const payload = { accessToken, avatar, nickname, userId };

            dispatch(login(payload));
        } else {
            dispatch(logout());
        }
    }, []);

    return <Router />;
}

export default App;
