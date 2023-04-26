import React, {useEffect, useState} from 'react';
import { Route, Link } from 'react-router-dom';

import {
    AccountForm,
    Home,
    Posts,
    Profile
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
                {
                    token
                        ? <Link to="/profile">My Profile</Link>
                        : <Link to="/account/login">Log In</Link>
                }
            </nav>

            <Route exact path="/">
                <Home user={user} />
            </Route>
            <Route path="/posts">
                <Posts  token={token} />
            </Route>
            <Route exact path="/profile">
                <Profile user={user} />
            </Route>
            <Route path="/account/:actionType">
                <AccountForm 
                    setToken={setToken}
                    setUser={setUser}/>
            </Route>
        </>
    )
}

export default App;