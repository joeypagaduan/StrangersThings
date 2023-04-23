import React, {useEffect, useState} from 'react';
import { Route, Link } from 'react-router-dom';

import {
    AccountForm,
    Posts
} from './components';

const App = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
    }, [token, user])

    return (
        <>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/posts">Posts</Link> |
                <Link to="/account/login">Log In</Link>
            </nav>

            <Route exact path="/">
                <h1>Stranger's Things</h1>
            </Route>
            <Route path="/posts">
                <Posts />
            </Route>
            <Route exact path="/account">
                <h1>My Account</h1>
            </Route>
            <Route path="/account/:actionType">
                <AccountForm setToken={setToken} setUser={setUser}/>
            </Route>
        </>
    )
}

export default App;