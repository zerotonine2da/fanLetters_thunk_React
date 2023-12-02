import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'redux/modules/authSlice';
import { __getLetters } from 'redux/modules/letters';
const { default: Router } = require('shared/Router');

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const avatar = localStorage.getItem('avatar');
        const nickname = localStorage.getItem('nickname');
        const userId = localStorage.getItem('userId');

        const payload = { accessToken, avatar, nickname, userId };

        dispatch(login(payload));
    }, []);

    return <Router />;
}

export default App;
