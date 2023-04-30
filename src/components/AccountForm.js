import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { useParams, useHistory } from "react-router-dom";
import { callAPI } from "../api";

const AccountForm = ({setToken, setUser}) => {
    const params = useParams();
    const history = useHistory();
    
    const {actionType} = params;
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            user: {
                username,
                password
            }
        }
        const data = await callAPI({
            path: `/users/${actionType}`,
            method: "post",
            body: requestBody,
        })
        const {token} = data;
        if (token) {
            const data = await callAPI({
                path: '/users/me',
                token,
            })
            const username = data?.username;
            if (username) {
                setUsername('');
                setPassword('');
                setToken(token);
                setUser(data);
                history.push('/');
            }
        }
    }

    return (
        <>
            <h1>{actionType === "register" ? "Sign Up" : "Log In"}</h1>
            <form onSubmit={handleSubmit} id="signLogFrom">
                <div id="signLogName">
                    <label htmlFor="username">Username</label>
                    <input className="loginBox"
                        name="username"
                        type="text"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div id="signLogPassword">
                    <label htmlFor="password">Password</label>
                    <input className="loginBox"
                        name="password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div id="registerLoginDiv">
                    <button id="registerLoginButton" type="submit">{actionType === "register" ? "Register" : "Log In"}</button>
                    {actionType === "register"
                        ? <Link to="/account/login">Already have an account? Log in here.</Link>
                        : <Link to="/account/register">Need an account? Register here.</Link>}
                        <img src="/images/800_800logo2.png" alt="Stranger's Things Logo" id='logo'/>
                </div>
            </form>
        </>
    );
}

export default AccountForm;