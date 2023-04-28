import React, {useEffect, useState} from 'react';
import { Route, Link } from 'react-router-dom';
import { callAPI } from './api';

import {
    AccountForm,
    Home,
    Posts,
    Profile,
    PostPage
} from './components';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') ?? '');
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const data = await callAPI({
            path: "/posts", token
        })

        if (data?.posts) {
            setPosts(data.posts);
            console.log('setPosts:', data.posts)
        }

        if (token && !user) {
            const data = await callAPI({path: 'users/me', token});
            if (data.user) {
                setUser(data.user);
            }
        }
    }

    useEffect(() => {
        token !== ""
            ? localStorage.setItem('token', token)
            : localStorage.removeItem('token');
        fetchPosts();
    }, [token]);

    const onLogout = async () => {
        setToken("");
        await fetchPosts();
        setUser(null);
    }

    return (
        <>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/posts">Posts</Link> |
                {
                    token
                        ? (
                            <>
                                <Link to="/profile">My Profile</Link>
                                <a href='#' onClick={onLogout}>Log Out</a>
                            </>
                        ) : <Link to="/account/login">Log In</Link>
                }
            </nav>

            <Route exact path="/">
                <Home user={user} />
            </Route>
            <Route exact path="/posts">
                {posts
                    ? <Posts
                        token={token}
                        fetchPosts={fetchPosts}
                        posts={posts}
                    /> : <strong>No posts to display!</strong>
                }
            </Route>
            <Route path="/posts/:post_Id">
                <PostPage
                    fetchPosts={fetchPosts}
                    token={token}
                    posts={posts} 
                />
            </Route>
            <Route exact path="/profile">
                <Profile user={user} token={token}/>
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