import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { __getLetters } from 'redux/modules/letters';
const { default: Router } = require('shared/Router');

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getLetters());
    }, [dispatch]);

    return <Router />;
}

export default App;
